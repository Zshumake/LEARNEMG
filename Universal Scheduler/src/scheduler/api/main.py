"""FastAPI main application."""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from ..config import settings, validate_environment
from ..models import create_tables, get_db
from .routes import auth, residents, schedules, users
from . import compliance, workflow, system
from .middleware import RateLimitMiddleware, LoggingMiddleware, SecurityMiddleware


# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Security
security = HTTPBearer()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan events."""
    # Startup
    logger.info("Starting Universal Medical Residency Scheduler API")

    # Validate environment
    if not validate_environment():
        logger.error("Environment validation failed")
        raise RuntimeError("Environment validation failed")

    # Create database tables
    try:
        create_tables()
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise RuntimeError(f"Database initialization failed: {e}")

    logger.info("API startup completed successfully")

    yield

    # Shutdown
    logger.info("Shutting down Universal Medical Residency Scheduler API")


# Create FastAPI app
app = FastAPI(
    title="Universal Medical Residency Scheduler",
    description="""
    A production-ready medical residency scheduling system with:
    - Constraint Satisfaction Problem (CSP) optimization
    - PM&R specific rules engine (47 rules: 30 hard + 17 soft)
    - Multi-user authentication and authorization
    - Real-time schedule generation and validation
    - Comprehensive audit logging and monitoring
    """,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs" if not settings.is_production else None,
    redoc_url="/api/redoc" if not settings.is_production else None,
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"] if settings.is_development else settings.cors_origins,
)

# Custom middleware
app.add_middleware(RateLimitMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_middleware(SecurityMiddleware)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(residents.router, prefix="/api/residents", tags=["Residents"])
app.include_router(schedules.router, prefix="/api/schedules", tags=["Schedules"])
app.include_router(compliance.router)
app.include_router(workflow.router, prefix="/api", tags=["Workflow"])
app.include_router(system.router, prefix="/api", tags=["System"])


@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "message": "Universal Medical Residency Scheduler API",
        "version": "1.0.0",
        "environment": settings.environment,
        "docs": "/api/docs" if not settings.is_production else "disabled",
        "status": "operational",
    }


@app.get("/api/health")
async def health_check(db: Session = Depends(get_db)):
    """Health check endpoint for load balancers and monitoring."""
    try:
        # Test database connectivity
        from sqlalchemy import text

        db.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "environment": settings.environment,
            "database": "connected",
            "timestamp": "2025-01-01T00:00:00Z",  # Would use actual timestamp
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"status": "unhealthy", "error": str(e), "database": "disconnected"},
        )


@app.get("/api/metrics")
async def metrics():
    """Prometheus metrics endpoint."""
    if not settings.enable_metrics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Metrics endpoint disabled"
        )

    # Return basic metrics (would integrate with Prometheus client)
    return {
        "http_requests_total": 0,
        "http_request_duration_seconds": 0,
        "database_connections_active": 0,
        "schedule_generations_total": 0,
        "active_users": 0,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.scheduler.api.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
        workers=1 if settings.api_reload else settings.api_workers,
        log_level=settings.log_level.lower(),
        access_log=True,
    )
