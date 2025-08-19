"""Configuration management for the scheduling system."""

import os
from typing import Optional, List


class Settings:
    """Application configuration settings."""

    def __init__(self):
        # Environment
        self.environment = os.getenv("ENVIRONMENT", "development")
        self.debug = os.getenv("DEBUG", "false").lower() == "true"

        # Database
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///./scheduler.db")
        self.database_pool_size = int(os.getenv("DB_POOL_SIZE", "10"))
        self.database_max_overflow = int(os.getenv("DB_MAX_OVERFLOW", "20"))
        self.database_echo = os.getenv("DB_ECHO", "false").lower() == "true"

        # Redis
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.redis_password = os.getenv("REDIS_PASSWORD")

        # Authentication
        self.secret_key = os.getenv("SECRET_KEY", "")
        if not self.secret_key:
            raise ValueError("SECRET_KEY environment variable is required")
        if len(self.secret_key) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters long")

        self.access_token_expire_minutes = int(
            os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
        )
        self.refresh_token_expire_days = int(
            os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7")
        )

        # OAuth2 Providers
        self.google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        self.google_client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
        self.microsoft_client_id = os.getenv("MICROSOFT_CLIENT_ID")
        self.microsoft_client_secret = os.getenv("MICROSOFT_CLIENT_SECRET")

        # API Configuration
        self.api_host = os.getenv("API_HOST", "0.0.0.0")
        self.api_port = int(os.getenv("API_PORT", "8000"))
        self.api_workers = int(os.getenv("API_WORKERS", "1"))
        self.api_reload = os.getenv("API_RELOAD", "false").lower() == "true"

        # CORS
        cors_origins_str = os.getenv(
            "CORS_ORIGINS", "http://localhost:3000,http://localhost:8501"
        )
        self.cors_origins = [origin.strip() for origin in cors_origins_str.split(",")]

        # Rate Limiting
        self.rate_limit_requests = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
        self.rate_limit_window = int(os.getenv("RATE_LIMIT_WINDOW", "60"))

        # Logging
        self.log_level = os.getenv("LOG_LEVEL", "INFO")
        self.log_format = os.getenv("LOG_FORMAT", "json")

        # Scheduling Configuration
        self.max_scheduling_iterations = int(
            os.getenv("MAX_SCHEDULING_ITERATIONS", "10000")
        )
        self.scheduling_timeout_minutes = int(
            os.getenv("SCHEDULING_TIMEOUT_MINUTES", "5")
        )
        self.enable_soft_rules = (
            os.getenv("ENABLE_SOFT_RULES", "true").lower() == "true"
        )

        # Email Configuration
        self.smtp_host = os.getenv("SMTP_HOST")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

        # File Storage
        self.upload_max_size = int(os.getenv("UPLOAD_MAX_SIZE", str(10 * 1024 * 1024)))
        allowed_types_str = os.getenv("ALLOWED_FILE_TYPES", ".csv,.xlsx,.json")
        self.allowed_file_types = [ext.strip() for ext in allowed_types_str.split(",")]

        # Security
        self.password_min_length = int(os.getenv("PASSWORD_MIN_LENGTH", "8"))
        self.password_require_uppercase = (
            os.getenv("PASSWORD_REQUIRE_UPPERCASE", "true").lower() == "true"
        )
        self.password_require_lowercase = (
            os.getenv("PASSWORD_REQUIRE_LOWERCASE", "true").lower() == "true"
        )
        self.password_require_numbers = (
            os.getenv("PASSWORD_REQUIRE_NUMBERS", "true").lower() == "true"
        )
        self.password_require_symbols = (
            os.getenv("PASSWORD_REQUIRE_SYMBOLS", "false").lower() == "true"
        )

        # Session Management
        self.session_expire_hours = int(os.getenv("SESSION_EXPIRE_HOURS", "24"))
        self.max_concurrent_sessions = int(os.getenv("MAX_CONCURRENT_SESSIONS", "5"))

        # Monitoring
        self.enable_metrics = os.getenv("ENABLE_METRICS", "true").lower() == "true"
        self.metrics_port = int(os.getenv("METRICS_PORT", "9090"))
        self.health_check_interval = int(os.getenv("HEALTH_CHECK_INTERVAL", "30"))

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment.lower() == "production"

    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment.lower() == "development"

    @property
    def is_testing(self) -> bool:
        """Check if running in test environment."""
        return self.environment.lower() == "test"


# Load environment variables from .env file if it exists
def load_env():
    """Load environment variables from .env file."""
    env_file = ".env"
    if os.path.exists(env_file):
        try:
            from dotenv import load_dotenv

            load_dotenv(env_file)
        except ImportError:
            # If python-dotenv not available, read .env manually
            with open(env_file, "r") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, value = line.split("=", 1)
                        os.environ.setdefault(key.strip(), value.strip())


# Load environment variables
load_env()

# Global settings instance
try:
    settings = Settings()
except ValueError as e:
    # For development/testing, provide a default secret key
    if not os.getenv("SECRET_KEY"):
        os.environ["SECRET_KEY"] = (
            "development-secret-key-not-for-production-use-32chars"
        )
        settings = Settings()
    else:
        raise e


def get_database_url() -> str:
    """Get database URL with environment-specific overrides."""
    if settings.is_testing:
        return "sqlite:///./test_scheduler.db"
    elif settings.is_development and settings.database_url.startswith("postgresql://"):
        # For development, allow falling back to SQLite if PostgreSQL not available
        try:
            import psycopg2

            return settings.database_url
        except ImportError:
            print("PostgreSQL not available, falling back to SQLite for development")
            return "sqlite:///./dev_scheduler.db"
    return settings.database_url


def get_redis_config() -> dict:
    """Get Redis configuration."""
    config = {
        "url": settings.redis_url,
        "decode_responses": True,
        "health_check_interval": 30,
    }

    if settings.redis_password:
        config["password"] = settings.redis_password

    return config


def validate_environment():
    """Validate environment configuration."""
    errors = []

    # Check required production settings
    if settings.is_production:
        if settings.database_url.startswith("sqlite://"):
            errors.append("SQLite database not recommended for production")

        if not settings.google_client_id and not settings.microsoft_client_id:
            errors.append(
                "At least one OAuth provider must be configured for production"
            )

        if not settings.smtp_host:
            errors.append("SMTP configuration required for production")

    # Check database connectivity
    try:
        from sqlalchemy import create_engine

        engine = create_engine(get_database_url())
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        print("✅ Database connection successful")
    except Exception as e:
        if settings.is_production:
            errors.append(f"Database connection failed: {e}")
        else:
            print(f"⚠️ Database connection failed (development): {e}")

    if errors:
        print("❌ Environment validation failed:")
        for error in errors:
            print(f"  - {error}")
        return False

    print("✅ Environment validation passed")
    return True
