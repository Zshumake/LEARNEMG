"""API endpoints for ACGME compliance tracking and reporting."""

from datetime import date, datetime, timedelta
from typing import List, Dict, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, Query, Path, Body
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
import logging

from ..models import get_db, ACGMEViolationType, ACGMEViolationSeverity
from ..services.compliance_service import ComplianceService
from ..services.compliance_export_service import ComplianceExportService
from ..services.auth import AuthService, get_current_user, require_permissions

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/compliance", tags=["ACGME Compliance"])


# Pydantic models for request/response
class ComplianceStatusResponse(BaseModel):
    """Response model for compliance status."""

    resident_id: int
    period_start: date
    period_end: date
    compliance_percentage: float
    total_violations: int
    active_violations: int
    avg_weekly_hours: float
    weeks_over_80_hours: int
    requires_immediate_attention: bool


class ViolationResponse(BaseModel):
    """Response model for ACGME violations."""

    id: int
    type: str
    severity: str
    title: str
    description: str
    violation_date: date
    detected_at: datetime
    status: str
    actual_value: Optional[float]
    limit_value: Optional[float]
    excess_amount: Optional[float]
    requires_pd_review: bool
    pd_reviewed: bool


class WeeklyTrendResponse(BaseModel):
    """Response model for weekly trend data."""

    week_start_date: date
    week_end_date: date
    total_duty_hours: float
    total_clinical_hours: float
    educational_hours_percentage: float
    is_compliant: bool
    compliance_percentage: float
    violation_count: int


class CorrectiveActionRequest(BaseModel):
    """Request model for creating corrective actions."""

    action_type: str = Field(..., description="Type of corrective action")
    description: str = Field(..., description="Description of the corrective action")
    assigned_to: str = Field(..., description="Person responsible for the action")
    due_date: Optional[date] = Field(None, description="Due date for completion")


class ViolationResolutionRequest(BaseModel):
    """Request model for resolving violations."""

    resolution_method: str = Field(..., description="Method used to resolve violation")
    notes: str = Field(..., description="Resolution notes")


class ReportGenerationRequest(BaseModel):
    """Request model for generating compliance reports."""

    report_type: str = Field(
        ..., description="Type of report (monthly, quarterly, annual)"
    )
    start_date: date = Field(..., description="Report start date")
    end_date: date = Field(..., description="Report end date")
    program_id: Optional[str] = Field(None, description="Program ID filter")
    resident_ids: Optional[List[int]] = Field(None, description="Specific resident IDs")


# Dependencies to get services
def get_compliance_service(db: Session = Depends(get_db)) -> ComplianceService:
    """Get compliance service instance."""
    return ComplianceService(db)


def get_export_service(db: Session = Depends(get_db)) -> ComplianceExportService:
    """Get compliance export service instance."""
    return ComplianceExportService(db)


@router.post("/initialize")
async def initialize_compliance_system(
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["admin", "program_director"])),
):
    """Initialize the ACGME compliance tracking system."""
    try:
        compliance_service.initialize_compliance_system()
        return {"message": "ACGME compliance system initialized successfully"}
    except Exception as e:
        logger.error(f"Failed to initialize compliance system: {e}")
        raise HTTPException(status_code=500, detail=f"Initialization failed: {str(e)}")


@router.post("/schedules/{schedule_id}/process")
async def process_schedule_for_compliance(
    schedule_id: int = Path(..., description="Schedule ID to process"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(
        require_permissions(["program_director", "chief_resident", "admin"])
    ),
):
    """Process a schedule for ACGME compliance tracking."""
    try:
        result = compliance_service.process_new_schedule(schedule_id)
        return {"message": "Schedule processed for compliance", "result": result}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to process schedule {schedule_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")


@router.get("/residents/{resident_id}/dashboard")
async def get_resident_compliance_dashboard(
    resident_id: int = Path(..., description="Resident ID"),
    weeks_back: int = Query(12, ge=1, le=52, description="Number of weeks to analyze"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(
        require_permissions(["resident", "program_director", "chief_resident", "admin"])
    ),
):
    """Get compliance dashboard data for a specific resident."""
    try:
        # Check if user can access this resident's data
        if not current_user.can_access_resident_data(resident_id):
            raise HTTPException(
                status_code=403, detail="Access denied to resident data"
            )

        dashboard_data = compliance_service.get_resident_dashboard(
            resident_id, weeks_back
        )
        return dashboard_data
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to get resident dashboard for {resident_id}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Dashboard generation failed: {str(e)}"
        )


@router.get("/programs/dashboard")
async def get_program_compliance_dashboard(
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    weeks_back: int = Query(8, ge=1, le=52, description="Number of weeks to analyze"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Get compliance dashboard data for program directors."""
    try:
        dashboard_data = compliance_service.get_program_dashboard(
            program_id, weeks_back
        )
        return dashboard_data
    except Exception as e:
        logger.error(f"Failed to get program dashboard: {e}")
        raise HTTPException(
            status_code=500, detail=f"Dashboard generation failed: {str(e)}"
        )


@router.get("/residents/{resident_id}/status")
async def get_resident_compliance_status(
    resident_id: int = Path(..., description="Resident ID"),
    start_date: date = Query(..., description="Analysis start date"),
    end_date: date = Query(..., description="Analysis end date"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(
        require_permissions(["resident", "program_director", "chief_resident", "admin"])
    ),
) -> ComplianceStatusResponse:
    """Get detailed compliance status for a resident over a specific period."""
    try:
        if not current_user.can_access_resident_data(resident_id):
            raise HTTPException(
                status_code=403, detail="Access denied to resident data"
            )

        status = compliance_service.engine.get_resident_compliance_status(
            resident_id, start_date, end_date
        )
        return ComplianceStatusResponse(**status)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to get compliance status for resident {resident_id}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Status retrieval failed: {str(e)}"
        )


@router.get("/violations")
async def get_violations(
    resident_id: Optional[int] = Query(None, description="Filter by resident ID"),
    severity: Optional[ACGMEViolationSeverity] = Query(
        None, description="Filter by severity"
    ),
    violation_type: Optional[ACGMEViolationType] = Query(
        None, description="Filter by violation type"
    ),
    status: Optional[str] = Query("active", description="Filter by status"),
    start_date: Optional[date] = Query(None, description="Filter start date"),
    end_date: Optional[date] = Query(None, description="Filter end date"),
    limit: int = Query(50, ge=1, le=500, description="Maximum number of results"),
    offset: int = Query(0, ge=0, description="Results offset for pagination"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(
        require_permissions(["program_director", "chief_resident", "admin"])
    ),
) -> List[ViolationResponse]:
    """Get ACGME violations with filtering options."""
    try:
        from ..models import ACGMEViolation
        from sqlalchemy import and_, desc

        db = compliance_service.db
        query = db.query(ACGMEViolation)

        # Apply filters
        conditions = []
        if resident_id:
            if not current_user.can_access_resident_data(resident_id):
                raise HTTPException(
                    status_code=403, detail="Access denied to resident data"
                )
            conditions.append(ACGMEViolation.resident_id == resident_id)

        if severity:
            conditions.append(ACGMEViolation.severity == severity)

        if violation_type:
            conditions.append(ACGMEViolation.violation_type == violation_type)

        if status:
            conditions.append(ACGMEViolation.status == status)

        if start_date:
            conditions.append(ACGMEViolation.violation_date >= start_date)

        if end_date:
            conditions.append(ACGMEViolation.violation_date <= end_date)

        if conditions:
            query = query.filter(and_(*conditions))

        # Apply pagination and ordering
        violations = (
            query.order_by(desc(ACGMEViolation.violation_date))
            .offset(offset)
            .limit(limit)
            .all()
        )

        return [
            ViolationResponse(**compliance_service._serialize_violation(v))
            for v in violations
        ]

    except Exception as e:
        logger.error(f"Failed to get violations: {e}")
        raise HTTPException(
            status_code=500, detail=f"Violation retrieval failed: {str(e)}"
        )


@router.post("/violations/{violation_id}/corrective-action")
async def create_corrective_action(
    violation_id: int = Path(..., description="Violation ID"),
    action_request: CorrectiveActionRequest = Body(...),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(
        require_permissions(["program_director", "chief_resident", "admin"])
    ),
):
    """Create a corrective action for an ACGME violation."""
    try:
        corrective_action = compliance_service.create_corrective_action(
            violation_id=violation_id,
            action_type=action_request.action_type,
            description=action_request.description,
            assigned_to=action_request.assigned_to,
            due_date=action_request.due_date,
        )

        return {
            "message": "Corrective action created successfully",
            "corrective_action_id": corrective_action.id,
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(
            f"Failed to create corrective action for violation {violation_id}: {e}"
        )
        raise HTTPException(
            status_code=500, detail=f"Corrective action creation failed: {str(e)}"
        )


@router.post("/violations/{violation_id}/resolve")
async def resolve_violation(
    violation_id: int = Path(..., description="Violation ID"),
    resolution_request: ViolationResolutionRequest = Body(...),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Mark an ACGME violation as resolved."""
    try:
        resolved_violation = compliance_service.resolve_violation(
            violation_id=violation_id,
            resolution_method=resolution_request.resolution_method,
            notes=resolution_request.notes,
            resolved_by=current_user.username,
        )

        return {
            "message": "Violation resolved successfully",
            "violation_id": resolved_violation.id,
            "resolved_at": resolved_violation.resolved_at,
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to resolve violation {violation_id}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Violation resolution failed: {str(e)}"
        )


@router.post("/reports/monthly")
async def generate_monthly_report(
    year: int = Query(..., ge=2020, le=2030, description="Report year"),
    month: int = Query(..., ge=1, le=12, description="Report month"),
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Generate monthly ACGME compliance report."""
    try:
        report = compliance_service.generate_monthly_report(year, month, program_id)

        return {
            "message": "Monthly report generated successfully",
            "report_id": report.id,
            "report_name": report.report_name,
            "compliance_rate": report.compliance_rate,
            "total_violations": report.total_violations,
        }
    except Exception as e:
        logger.error(f"Failed to generate monthly report for {year}-{month}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Report generation failed: {str(e)}"
        )


@router.post("/reports/quarterly")
async def generate_quarterly_report(
    year: int = Query(..., ge=2020, le=2030, description="Report year"),
    quarter: int = Query(..., ge=1, le=4, description="Report quarter"),
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Generate quarterly ACGME compliance report."""
    try:
        report = compliance_service.generate_quarterly_report(year, quarter, program_id)

        return {
            "message": "Quarterly report generated successfully",
            "report_id": report.id,
            "report_name": report.report_name,
            "compliance_rate": report.compliance_rate,
            "total_violations": report.total_violations,
        }
    except Exception as e:
        logger.error(f"Failed to generate quarterly report for {year} Q{quarter}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Report generation failed: {str(e)}"
        )


@router.get("/reports")
async def get_compliance_reports(
    report_type: Optional[str] = Query(None, description="Filter by report type"),
    start_date: Optional[date] = Query(None, description="Filter by start date"),
    end_date: Optional[date] = Query(None, description="Filter by end date"),
    program_id: Optional[str] = Query(None, description="Filter by program ID"),
    limit: int = Query(20, ge=1, le=100, description="Maximum number of results"),
    offset: int = Query(0, ge=0, description="Results offset for pagination"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Get list of compliance reports with filtering options."""
    try:
        from ..models import ACGMEComplianceReport
        from sqlalchemy import and_, desc

        db = compliance_service.db
        query = db.query(ACGMEComplianceReport)

        # Apply filters
        conditions = []
        if report_type:
            conditions.append(ACGMEComplianceReport.report_type == report_type)

        if start_date:
            conditions.append(ACGMEComplianceReport.start_date >= start_date)

        if end_date:
            conditions.append(ACGMEComplianceReport.end_date <= end_date)

        if program_id:
            conditions.append(ACGMEComplianceReport.program_id == program_id)

        if conditions:
            query = query.filter(and_(*conditions))

        # Apply pagination and ordering
        reports = (
            query.order_by(desc(ACGMEComplianceReport.created_at))
            .offset(offset)
            .limit(limit)
            .all()
        )

        return [
            {
                "id": report.id,
                "report_name": report.report_name,
                "report_type": report.report_type,
                "start_date": report.start_date,
                "end_date": report.end_date,
                "program_id": report.program_id,
                "total_residents": report.total_residents,
                "compliance_rate": report.compliance_rate,
                "total_violations": report.total_violations,
                "status": report.status,
                "created_at": report.created_at,
            }
            for report in reports
        ]

    except Exception as e:
        logger.error(f"Failed to get compliance reports: {e}")
        raise HTTPException(
            status_code=500, detail=f"Report retrieval failed: {str(e)}"
        )


@router.get("/reports/{report_id}")
async def get_compliance_report_details(
    report_id: int = Path(..., description="Report ID"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Get detailed compliance report data."""
    try:
        from ..models import ACGMEComplianceReport

        db = compliance_service.db
        report = (
            db.query(ACGMEComplianceReport)
            .filter(ACGMEComplianceReport.id == report_id)
            .first()
        )

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        return {
            "id": report.id,
            "report_name": report.report_name,
            "report_type": report.report_type,
            "start_date": report.start_date,
            "end_date": report.end_date,
            "program_id": report.program_id,
            "total_residents": report.total_residents,
            "compliant_residents": report.compliant_residents,
            "compliance_rate": report.compliance_rate,
            "total_violations": report.total_violations,
            "critical_violations": report.critical_violations,
            "high_violations": report.high_violations,
            "avg_weekly_hours": report.avg_weekly_hours,
            "max_weekly_hours": report.max_weekly_hours,
            "weeks_over_80_hours": report.weeks_over_80_hours,
            "detailed_data": report.detailed_data,
            "summary_statistics": report.summary_statistics,
            "generated_by": report.generated_by,
            "created_at": report.created_at,
            "status": report.status,
        }

    except Exception as e:
        logger.error(f"Failed to get report details for {report_id}: {e}")
        raise HTTPException(
            status_code=500, detail=f"Report retrieval failed: {str(e)}"
        )


@router.get("/metrics/summary")
async def get_compliance_metrics_summary(
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    days_back: int = Query(30, ge=1, le=365, description="Number of days to analyze"),
    compliance_service: ComplianceService = Depends(get_compliance_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Get high-level compliance metrics summary."""
    try:
        from ..models import ACGMEViolation, Resident, WeeklyDutyHourSummary
        from sqlalchemy import and_, func

        db = compliance_service.db
        end_date = date.today()
        start_date = end_date - timedelta(days=days_back)

        # Get residents query
        residents_query = db.query(Resident).filter(Resident.is_active == True)
        if program_id:
            residents_query = residents_query.filter(Resident.program_id == program_id)

        total_residents = residents_query.count()
        resident_ids = [r.id for r in residents_query.all()]

        # Count violations by severity
        violations_query = db.query(ACGMEViolation).filter(
            and_(
                ACGMEViolation.resident_id.in_(resident_ids),
                ACGMEViolation.violation_date >= start_date,
                ACGMEViolation.status == "active",
            )
        )

        total_violations = violations_query.count()
        critical_violations = violations_query.filter(
            ACGMEViolation.severity == ACGMEViolationSeverity.CRITICAL
        ).count()
        high_violations = violations_query.filter(
            ACGMEViolation.severity == ACGMEViolationSeverity.HIGH
        ).count()

        # Get weekly summaries for compliance rate
        week_summaries = (
            db.query(WeeklyDutyHourSummary)
            .filter(
                and_(
                    WeeklyDutyHourSummary.resident_id.in_(resident_ids),
                    WeeklyDutyHourSummary.week_start_date >= start_date,
                )
            )
            .all()
        )

        compliant_weeks = sum(1 for w in week_summaries if w.is_compliant)
        total_weeks = len(week_summaries)
        compliance_rate = (
            (compliant_weeks / total_weeks * 100) if total_weeks > 0 else 100.0
        )

        # Average weekly hours
        avg_weekly_hours = (
            sum(w.total_duty_hours for w in week_summaries) / len(week_summaries)
            if week_summaries
            else 0.0
        )
        weeks_over_80 = sum(1 for w in week_summaries if w.total_duty_hours > 80)

        return {
            "period": f"{start_date} to {end_date}",
            "total_residents": total_residents,
            "total_violations": total_violations,
            "critical_violations": critical_violations,
            "high_violations": high_violations,
            "compliance_rate": compliance_rate,
            "avg_weekly_hours": avg_weekly_hours,
            "weeks_over_80_hours": weeks_over_80,
            "requires_immediate_attention": critical_violations > 0
            or high_violations > 0,
        }

    except Exception as e:
        logger.error(f"Failed to get compliance metrics summary: {e}")
        raise HTTPException(
            status_code=500, detail=f"Metrics retrieval failed: {str(e)}"
        )


# Export endpoints
@router.get("/exports/violations/csv")
async def export_violations_csv(
    start_date: date = Query(..., description="Export start date"),
    end_date: date = Query(..., description="Export end date"),
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    resident_ids: Optional[List[int]] = Query(
        None, description="Specific resident IDs"
    ),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Export ACGME violations to CSV format."""
    try:
        csv_content = export_service.export_violations_csv(
            start_date, end_date, program_id, resident_ids
        )

        filename = f"acgme_violations_{start_date}_to_{end_date}.csv"

        return JSONResponse(
            content={"csv_content": csv_content, "filename": filename},
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )

    except Exception as e:
        logger.error(f"Failed to export violations CSV: {e}")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")


@router.get("/exports/weekly-summaries/excel")
async def export_weekly_summaries_excel(
    start_date: date = Query(..., description="Export start date"),
    end_date: date = Query(..., description="Export end date"),
    program_id: Optional[str] = Query(None, description="Program ID filter"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Export weekly duty hour summaries to Excel format."""
    try:
        excel_content = export_service.export_weekly_summaries_excel(
            start_date, end_date, program_id
        )

        filename = f"weekly_duty_summaries_{start_date}_to_{end_date}.xlsx"

        # Return Excel file as binary response
        from fastapi.responses import Response

        return Response(
            content=excel_content,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )

    except Exception as e:
        logger.error(f"Failed to export weekly summaries Excel: {e}")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")


@router.get("/exports/residents/{resident_id}/duty-hours/csv")
async def export_resident_duty_hours_csv(
    resident_id: int = Path(..., description="Resident ID"),
    start_date: date = Query(..., description="Export start date"),
    end_date: date = Query(..., description="Export end date"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(
        require_permissions(["resident", "program_director", "admin"])
    ),
):
    """Export detailed duty hours for a specific resident."""
    try:
        if not current_user.can_access_resident_data(resident_id):
            raise HTTPException(
                status_code=403, detail="Access denied to resident data"
            )

        csv_content = export_service.export_duty_hours_detailed_csv(
            resident_id, start_date, end_date
        )

        # Get resident name for filename
        from ..models import Resident

        db = export_service.db
        resident = db.query(Resident).filter(Resident.id == resident_id).first()
        resident_name = (
            resident.name.replace(" ", "_") if resident else f"resident_{resident_id}"
        )

        filename = f"duty_hours_{resident_name}_{start_date}_to_{end_date}.csv"

        return JSONResponse(
            content={"csv_content": csv_content, "filename": filename},
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to export resident duty hours: {e}")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")


@router.get("/exports/corrective-actions/csv")
async def export_corrective_actions_csv(
    start_date: date = Query(..., description="Export start date"),
    end_date: date = Query(..., description="Export end date"),
    status_filter: Optional[str] = Query(None, description="Status filter"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Export corrective actions to CSV format."""
    try:
        csv_content = export_service.export_corrective_actions_csv(
            start_date, end_date, status_filter
        )

        filename = f"corrective_actions_{start_date}_to_{end_date}.csv"

        return JSONResponse(
            content={"csv_content": csv_content, "filename": filename},
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )

    except Exception as e:
        logger.error(f"Failed to export corrective actions CSV: {e}")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")


@router.get("/exports/reports/{report_id}/json")
async def export_compliance_report_json(
    report_id: int = Path(..., description="Report ID"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Export compliance report in JSON format."""
    try:
        json_content = export_service.export_compliance_report_json(report_id)

        # Get report name for filename
        from ..models import ACGMEComplianceReport

        db = export_service.db
        report = (
            db.query(ACGMEComplianceReport)
            .filter(ACGMEComplianceReport.id == report_id)
            .first()
        )

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        report_name = report.report_name.replace(" ", "_").replace("/", "-")
        filename = f"compliance_report_{report_name}.json"

        return JSONResponse(
            content={"json_content": json_content, "filename": filename},
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to export compliance report JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")


@router.get("/exports/acgme-submission/{report_id}")
async def generate_acgme_submission_package(
    report_id: int = Path(..., description="Report ID"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["program_director", "admin"])),
):
    """Generate complete ACGME submission package."""
    try:
        package = export_service.generate_acgme_submission_package(report_id)

        # Get report info for response
        from ..models import ACGMEComplianceReport

        db = export_service.db
        report = (
            db.query(ACGMEComplianceReport)
            .filter(ACGMEComplianceReport.id == report_id)
            .first()
        )

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        # Return package info (files would be downloaded separately)
        return {
            "message": "ACGME submission package generated successfully",
            "report_id": report_id,
            "report_name": report.report_name,
            "files_generated": list(package.keys()),
            "total_files": len(package),
            "package_size_bytes": sum(len(content) for content in package.values()),
        }

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to generate ACGME submission package: {e}")
        raise HTTPException(
            status_code=500, detail=f"Package generation failed: {str(e)}"
        )


@router.get("/exports/audit-trail")
async def get_export_audit_trail(
    start_date: date = Query(..., description="Audit trail start date"),
    end_date: date = Query(..., description="Audit trail end date"),
    export_service: ComplianceExportService = Depends(get_export_service),
    current_user=Depends(require_permissions(["admin"])),
):
    """Get audit trail of compliance data exports."""
    try:
        audit_trail = export_service.get_export_audit_trail(start_date, end_date)

        return {
            "audit_period": f"{start_date} to {end_date}",
            "total_export_activities": len(audit_trail),
            "audit_entries": audit_trail,
        }

    except Exception as e:
        logger.error(f"Failed to get export audit trail: {e}")
        raise HTTPException(
            status_code=500, detail=f"Audit trail retrieval failed: {str(e)}"
        )
