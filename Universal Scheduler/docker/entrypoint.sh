#!/bin/bash
set -e

# Universal Medical Residency Scheduler - Production Entrypoint

echo "🏥 Starting Universal Medical Residency Scheduler..."
echo "Environment: $ENVIRONMENT"

# Wait for database to be ready
echo "🔗 Waiting for database connection..."
python -c "
import time
import sys
from src.scheduler.config import get_database_url
from sqlalchemy import create_engine

max_attempts = 30
attempt = 0
while attempt < max_attempts:
    try:
        engine = create_engine(get_database_url())
        with engine.connect() as conn:
            conn.execute('SELECT 1')
        print('✅ Database connection successful')
        break
    except Exception as e:
        attempt += 1
        if attempt == max_attempts:
            print(f'❌ Database connection failed after {max_attempts} attempts: {e}')
            sys.exit(1)
        print(f'⏳ Database connection attempt {attempt}/{max_attempts} failed, retrying in 2 seconds...')
        time.sleep(2)
"

# Run database migrations
echo "🗃️ Running database migrations..."
python -c "
from src.scheduler.models import create_tables
try:
    create_tables()
    print('✅ Database tables created/updated successfully')
except Exception as e:
    print(f'❌ Database migration failed: {e}')
    exit(1)
"

# Create default admin user if it doesn't exist
echo "👤 Setting up default admin user..."
python -c "
from src.scheduler.services.auth import AuthService
from src.scheduler.models import get_db
import os

try:
    db = next(get_db())
    auth_service = AuthService(db)
    
    # Check if admin exists
    from src.scheduler.models import User
    admin = db.query(User).filter(User.username == 'admin').first()
    
    if not admin:
        admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')
        admin = auth_service.create_user(
            username='admin',
            email='admin@scheduler.local',
            full_name='System Administrator',
            password=admin_password,
            role='admin'
        )
        print('✅ Default admin user created')
        print('   Username: admin')
        print('   Password: Check ADMIN_PASSWORD environment variable')
    else:
        print('✅ Admin user already exists')
        
except Exception as e:
    print(f'⚠️ Admin user setup warning: {e}')
    # Don't fail startup for this
"

# Start the application
echo "🚀 Starting API server..."
if [ "$ENVIRONMENT" = "production" ]; then
    # Production: Use Uvicorn with multiple workers
    exec uvicorn src.scheduler.api.main:app \
        --host 0.0.0.0 \
        --port 8000 \
        --workers 4 \
        --log-level info \
        --access-log \
        --no-use-colors
else
    # Development: Single worker with reload
    exec uvicorn src.scheduler.api.main:app \
        --host 0.0.0.0 \
        --port 8000 \
        --reload \
        --log-level debug
fi