# Universal Medical Residency Scheduler - Production Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV ENVIRONMENT=production

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        gcc \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Create non-root user
RUN groupadd -r scheduler && useradd -r -g scheduler scheduler

# Copy application code
COPY src/ ./src/
COPY alembic.ini .
COPY migrations/ ./migrations/

# Create necessary directories
RUN mkdir -p /app/logs /app/uploads \
    && chown -R scheduler:scheduler /app

# Copy entrypoint script
COPY docker/entrypoint.sh .
RUN chmod +x entrypoint.sh

# Switch to non-root user
USER scheduler

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Expose port
EXPOSE 8000

# Set entrypoint
ENTRYPOINT ["./entrypoint.sh"]