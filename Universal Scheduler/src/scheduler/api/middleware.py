"""Custom middleware for the FastAPI application."""

import time
import logging
from typing import Callable
from fastapi import Request, Response, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import hashlib
import json

logger = logging.getLogger(__name__)


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Simple rate limiting middleware."""

    def __init__(self, app, calls: int = 100, period: int = 60):
        super().__init__(app)
        self.calls = calls  # Max calls per period
        self.period = period  # Time period in seconds
        self.clients = {}  # In-memory store (would use Redis in production)

    def _get_client_key(self, request: Request) -> str:
        """Generate client key for rate limiting."""
        # Use IP address and User-Agent for basic client identification
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "unknown")
        return hashlib.md5(f"{client_ip}:{user_agent}".encode()).hexdigest()

    def _is_rate_limited(self, client_key: str) -> bool:
        """Check if client is rate limited."""
        now = time.time()

        # Clean up old entries
        self.clients = {
            k: v for k, v in self.clients.items() if now - v["start_time"] < self.period
        }

        if client_key not in self.clients:
            self.clients[client_key] = {"count": 1, "start_time": now}
            return False

        client_data = self.clients[client_key]

        # Reset if period has passed
        if now - client_data["start_time"] >= self.period:
            self.clients[client_key] = {"count": 1, "start_time": now}
            return False

        # Check rate limit
        if client_data["count"] >= self.calls:
            return True

        client_data["count"] += 1
        return False

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Process rate limiting."""
        # Skip rate limiting for health checks
        if request.url.path in ["/api/health", "/api/metrics"]:
            return await call_next(request)

        client_key = self._get_client_key(request)

        if self._is_rate_limited(client_key):
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "error": "Rate limit exceeded",
                    "message": f"Maximum {self.calls} requests per {self.period} seconds",
                },
            )

        return await call_next(request)


class LoggingMiddleware(BaseHTTPMiddleware):
    """Request/response logging middleware."""

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Log requests and responses."""
        start_time = time.time()

        # Log request
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "unknown")

        logger.info(
            f"Request: {request.method} {request.url.path} "
            f"from {client_ip} ({user_agent[:50]}...)"
        )

        # Process request
        response = await call_next(request)

        # Log response
        process_time = time.time() - start_time
        logger.info(
            f"Response: {request.method} {request.url.path} "
            f"-> {response.status_code} in {process_time:.3f}s"
        )

        # Add processing time header
        response.headers["X-Process-Time"] = str(process_time)

        return response


class SecurityMiddleware(BaseHTTPMiddleware):
    """Security headers and basic protection middleware."""

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Add security headers and basic protections."""

        # Basic security validations
        if request.method == "POST":
            # Check content length
            content_length = request.headers.get("content-length")
            if content_length and int(content_length) > 10 * 1024 * 1024:  # 10MB
                return JSONResponse(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    content={"error": "Request too large"},
                )

        # Process request
        response = await call_next(request)

        # Add security headers
        response.headers.update(
            {
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "Content-Security-Policy": (
                    "default-src 'self'; "
                    "script-src 'self' 'unsafe-inline'; "
                    "style-src 'self' 'unsafe-inline'; "
                    "img-src 'self' data: https:; "
                    "font-src 'self' https:; "
                    "connect-src 'self'"
                ),
            }
        )

        return response


class DatabaseMiddleware(BaseHTTPMiddleware):
    """Database transaction middleware."""

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Handle database transactions."""
        # For now, just pass through - database sessions are handled by FastAPI Depends
        # In a more complex setup, this could handle transaction scoping
        return await call_next(request)


class AuditMiddleware(BaseHTTPMiddleware):
    """Audit logging middleware for sensitive operations."""

    AUDIT_PATHS = [
        "/api/schedules",
        "/api/residents",
        "/api/users",
        "/api/auth/login",
        "/api/auth/logout",
    ]

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Log audit events for sensitive operations."""
        should_audit = any(
            request.url.path.startswith(path) for path in self.AUDIT_PATHS
        )

        if should_audit and request.method in ["POST", "PUT", "DELETE", "PATCH"]:
            # Log audit event (would integrate with audit service)
            logger.info(
                f"AUDIT: {request.method} {request.url.path} "
                f"from {request.client.host if request.client else 'unknown'}"
            )

        return await call_next(request)
