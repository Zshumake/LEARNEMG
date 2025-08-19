# Universal Medical Residency Scheduler - Production Deployment Guide

## 🚀 Production Deployment Options

The Universal Medical Residency Scheduler supports multiple deployment methods for production environments.

## Prerequisites

### System Requirements
- **CPU**: 4+ cores recommended
- **RAM**: 8GB+ recommended  
- **Storage**: 50GB+ for database and logs
- **OS**: Linux (Ubuntu 20.04+ or CentOS 8+)

### Software Dependencies
- Docker 20.10+
- Docker Compose 2.0+ (for Docker deployment)
- Kubernetes 1.21+ (for Kubernetes deployment)
- PostgreSQL 13+ (if not using containerized database)
- Redis 6+ (for caching)

## 🐳 Docker Deployment (Recommended)

### Quick Start with Docker Compose

1. **Clone and prepare the application:**
   ```bash
   git clone <repository-url>
   cd universal-scheduler
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Generate secure secrets:**
   ```bash
   # Generate a secure secret key
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   
   # Update .env file with generated values
   ```

4. **Deploy the stack:**
   ```bash
   docker-compose up -d
   ```

5. **Verify deployment:**
   ```bash
   # Check service status
   docker-compose ps
   
   # View logs
   docker-compose logs -f app
   
   # Test API health
   curl http://localhost:8000/api/health
   ```

### Production Environment Variables

Create a `.env` file with the following production settings:

```bash
# Environment Configuration
ENVIRONMENT=production
DEBUG=false

# Security (REQUIRED - Generate secure values)
SECRET_KEY=your-super-secure-secret-key-at-least-32-characters-long
ADMIN_PASSWORD=your-secure-admin-password-123

# Database Configuration  
POSTGRES_PASSWORD=your-secure-database-password
DATABASE_URL=postgresql://scheduler_user:your-secure-database-password@postgres:5432/medical_scheduler

# Redis Configuration
REDIS_PASSWORD=your-secure-redis-password
REDIS_URL=redis://:your-secure-redis-password@redis:6379/0

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-oauth-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-oauth-client-secret

# Email Configuration (Optional)
SMTP_HOST=smtp.your-domain.com
SMTP_USERNAME=noreply@your-domain.com
SMTP_PASSWORD=your-smtp-password

# Domain Configuration
CORS_ORIGINS=https://scheduler.your-domain.com,https://your-domain.com
```

### Docker Services Overview

The Docker Compose stack includes:

- **app**: Main FastAPI application (Port 8000)
- **postgres**: PostgreSQL database (Port 5432)
- **redis**: Redis cache (Port 6379)  
- **nginx**: Reverse proxy with SSL termination (Ports 80/443)

## ☸️ Kubernetes Deployment

### Kubernetes Quick Start

1. **Create namespace and apply configurations:**
   ```bash
   kubectl apply -f deployment/kubernetes/namespace.yaml
   kubectl apply -f deployment/kubernetes/configmap.yaml
   ```

2. **Update secrets (IMPORTANT):**
   ```bash
   # Edit the secrets file with your production values
   vi deployment/kubernetes/secrets.yaml
   kubectl apply -f deployment/kubernetes/secrets.yaml
   ```

3. **Deploy the application:**
   ```bash
   kubectl apply -f deployment/kubernetes/deployment.yaml
   ```

4. **Verify deployment:**
   ```bash
   kubectl get pods -n medical-scheduler
   kubectl logs -f deployment/scheduler-app -n medical-scheduler
   ```

### Kubernetes Architecture

The Kubernetes deployment provides:

- **High Availability**: 3 replicas with automatic failover
- **Auto Scaling**: Horizontal Pod Autoscaler support
- **Health Checks**: Liveness and readiness probes
- **Persistent Storage**: For logs and file uploads
- **Service Discovery**: Internal service networking
- **Monitoring**: Prometheus metrics endpoint

## 🔒 Security Configuration

### SSL/TLS Setup

#### Docker Deployment
```bash
# Generate SSL certificates
mkdir -p docker/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/ssl/key.pem \
  -out docker/ssl/cert.pem

# Update nginx.conf to enable HTTPS
# Uncomment the HTTPS server block
```

#### Kubernetes Deployment
```bash
# Create TLS secret
kubectl create secret tls scheduler-tls \
  --cert=path/to/cert.pem \
  --key=path/to/key.pem \
  -n medical-scheduler
```

### Firewall Configuration

Open only required ports:
```bash
# Docker deployment
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# Database access (if external)
ufw allow from <app-subnet> to any port 5432
```

### Authentication Setup

1. **OAuth 2.0 Integration:**
   - Configure Google/Microsoft OAuth applications
   - Add redirect URLs: `https://your-domain.com/api/auth/callback`
   - Update environment variables with client credentials

2. **Default Admin Account:**
   - Username: `admin`
   - Password: Value from `ADMIN_PASSWORD` environment variable
   - Change password immediately after first login

## 🗃️ Database Setup

### Automated Setup (Recommended)
The application automatically creates all required database tables on startup.

### Manual Database Setup
```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE medical_scheduler;
CREATE USER scheduler_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE medical_scheduler TO scheduler_user;
```

### Database Backups
```bash
# Backup (Docker)
docker-compose exec postgres pg_dump -U scheduler_user medical_scheduler > backup.sql

# Restore (Docker) 
docker-compose exec -T postgres psql -U scheduler_user medical_scheduler < backup.sql

# Kubernetes backup
kubectl exec -it deployment/postgres -n medical-scheduler -- pg_dump -U scheduler_user medical_scheduler > backup.sql
```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Health Check Endpoint:**
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Metrics Endpoint:**
   ```bash
   curl https://your-domain.com/api/metrics
   ```

### Log Management

#### Docker Logs
```bash
# Application logs
docker-compose logs -f app

# Database logs
docker-compose logs -f postgres

# All services
docker-compose logs -f
```

#### Kubernetes Logs
```bash
# Application logs
kubectl logs -f deployment/scheduler-app -n medical-scheduler

# Previous container logs
kubectl logs --previous deployment/scheduler-app -n medical-scheduler
```

### Log Rotation
Configure log rotation to prevent disk space issues:

```bash
# /etc/logrotate.d/scheduler
/app/logs/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
    create 644 scheduler scheduler
}
```

## 🔧 Maintenance Tasks

### Regular Maintenance

1. **Update Application:**
   ```bash
   # Docker
   docker-compose pull
   docker-compose up -d
   
   # Kubernetes
   kubectl set image deployment/scheduler-app scheduler-app=universal-medical-scheduler:latest -n medical-scheduler
   ```

2. **Database Maintenance:**
   ```bash
   # Database vacuum (weekly)
   docker-compose exec postgres psql -U scheduler_user medical_scheduler -c "VACUUM ANALYZE;"
   ```

3. **Log Cleanup:**
   ```bash
   # Clean old logs (monthly)
   find /app/logs -name "*.log" -mtime +30 -delete
   ```

### Scaling

#### Docker Scaling
```bash
# Scale application containers
docker-compose up -d --scale app=3
```

#### Kubernetes Scaling
```bash
# Manual scaling
kubectl scale deployment scheduler-app --replicas=5 -n medical-scheduler

# Auto-scaling
kubectl autoscale deployment scheduler-app --cpu-percent=70 --min=3 --max=10 -n medical-scheduler
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed:**
   ```bash
   # Check database status
   docker-compose exec postgres pg_isready
   
   # Check connection string
   echo $DATABASE_URL
   ```

2. **High Memory Usage:**
   ```bash
   # Monitor container resources
   docker stats
   
   # Kubernetes resource monitoring
   kubectl top pods -n medical-scheduler
   ```

3. **Authentication Issues:**
   ```bash
   # Check secret key configuration
   docker-compose exec app python -c "from src.scheduler.config import settings; print(len(settings.secret_key))"
   
   # Verify admin user exists
   docker-compose exec app python -c "from src.scheduler.models import get_db, User; db=next(get_db()); print(db.query(User).filter(User.username=='admin').first())"
   ```

### Performance Tuning

1. **Database Optimization:**
   ```sql
   -- Add indexes for frequently queried columns
   CREATE INDEX CONCURRENTLY idx_residents_search ON residents USING gin(to_tsvector('english', name));
   
   -- Update table statistics
   ANALYZE;
   ```

2. **Application Tuning:**
   ```bash
   # Increase worker processes
   docker-compose exec app uvicorn --workers 8
   
   # Kubernetes resource limits
   kubectl patch deployment scheduler-app -p '{"spec":{"template":{"spec":{"containers":[{"name":"scheduler-app","resources":{"limits":{"memory":"2Gi","cpu":"1000m"}}}]}}}}' -n medical-scheduler
   ```

## 📋 Production Checklist

Before going live, verify:

- [ ] All environment variables set with secure values
- [ ] SSL/TLS certificates installed and valid
- [ ] Database backups configured and tested
- [ ] Monitoring and alerting setup
- [ ] Log rotation configured
- [ ] Firewall rules applied
- [ ] OAuth providers configured (if used)
- [ ] SMTP settings tested (if email enabled)
- [ ] Health check endpoints responding
- [ ] Admin account password changed
- [ ] API documentation access restricted in production
- [ ] Rate limiting configured appropriately
- [ ] Disaster recovery procedures documented

## 🆘 Support

For production deployment support:

1. Check application logs first
2. Verify all environment variables
3. Test database connectivity
4. Review system resource usage
5. Check network configuration

The Universal Medical Residency Scheduler is designed for high availability and reliability in medical environments. Following these deployment guidelines ensures a secure, scalable, and maintainable production system.