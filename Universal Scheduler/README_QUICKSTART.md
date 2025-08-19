# 🏥 Universal Medical Residency Scheduler - Quick Start Guide

## 🚀 How to Run the Application

### Option 1: Run Everything (Recommended)
```bash
./run_all.sh
```

### Option 2: Run Services Separately

**Terminal 1 - Backend API:**
```bash
python run_backend.py
```

**Terminal 2 - Frontend UI:**
```bash
python run_frontend.py
```

### Option 3: Manual Commands
```bash
# Activate virtual environment
source venv/bin/activate

# Backend (FastAPI)
python -m uvicorn src.scheduler.api.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend (Streamlit) - in separate terminal
streamlit run streamlit_app.py --server.port 8501
```

## 🌐 Access URLs

Once running, access these URLs:

- **🎨 Main Application (Streamlit UI):** http://localhost:8501
- **📡 API Backend:** http://localhost:8000
- **📚 API Documentation:** http://localhost:8000/api/docs
- **🏥 Health Check:** http://localhost:8000/api/health
- **✅ ACGME Compliance:** http://localhost:8000/api/compliance/metrics/summary

## 🎯 Key Features Available

### 📅 Core Scheduling
- **PM&R Schedule Generation** with 47 specialized rules (30 hard + 17 soft)
- **Constraint Satisfaction Programming (CSP)** optimization
- **Multiple Algorithm Support** (CSP, PMR Sequential, Simple)
- **Real-time Rule Validation** and conflict detection

### ✅ ACGME Compliance Tracking
- **Duty Hour Monitoring** (80-hour weekly, 24-hour consecutive limits)
- **Real-time Violation Detection** with severity classification
- **Automated Compliance Reports** (Monthly, Quarterly, Annual)
- **Export Capabilities** (CSV, Excel, JSON, ACGME submission packages)
- **Program Director Dashboard** with compliance metrics
- **Corrective Action Tracking** and resolution management

### 👥 Resident Management
- **PGY-Level Specific Rules** (PGY-2, PGY-3, PGY-4)
- **Time-off Request Management**
- **Quota Tracking** and progress monitoring
- **Preference Management** and workload balancing

### 📊 Reporting & Analytics
- **Compliance Dashboards** for residents and program directors
- **Violation Tracking** with automated alerts
- **Historical Analysis** and trend reporting
- **Audit Trails** for all compliance activities

## 🔧 Configuration

Key settings in `.env` file:
- **Database:** SQLite (development) or PostgreSQL (production)
- **ACGME Compliance:** Enabled by default
- **Security:** JWT authentication with configurable settings
- **API:** CORS and rate limiting configured

## 🧪 Testing

Run the comprehensive test suite:
```bash
# All tests
pytest

# ACGME compliance tests only
pytest tests/test_acgme_compliance.py -v

# With coverage
pytest --cov=src/scheduler
```

## 🆘 Troubleshooting

### Database Issues
```bash
# Recreate database
rm medical_scheduler.db
python -c "
import sys; sys.path.insert(0, 'src')
from dotenv import load_dotenv; load_dotenv()
from scheduler.models import create_tables
from scheduler.services.acgme_compliance_engine import initialize_acgme_configuration
from scheduler.models import SessionLocal
create_tables()
db = SessionLocal()
try: initialize_acgme_configuration(db)
finally: db.close()
"
```

### Port Conflicts
- Backend uses port 8000 (change with `--port` flag)
- Frontend uses port 8501 (change with `--server.port` flag)

### Dependency Issues
```bash
pip install -r requirements.txt
pip install email-validator  # If missing
```

## 📋 System Requirements

- **Python:** 3.11+ (tested with 3.13)
- **Memory:** 4GB+ recommended
- **Storage:** 1GB for application + database
- **OS:** macOS, Linux, Windows

## 🎉 Production Ready Features

- ✅ **Complete ACGME Compliance System**
- ✅ **47 PM&R Scheduling Rules**
- ✅ **Production Database Support**
- ✅ **Docker & Kubernetes Deployment**
- ✅ **Comprehensive Testing (80% coverage)**
- ✅ **Security & Authentication**
- ✅ **API Documentation**
- ✅ **Audit Logging**
- ✅ **Export & Reporting**

## 📞 Support

The system is now fully operational with enterprise-grade ACGME compliance tracking. All major features are implemented and tested.