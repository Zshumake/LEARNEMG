-- Universal Medical Residency Scheduler - Database Initialization

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create additional indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_residents_active 
    ON residents(is_active) WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_residents_pgy_active 
    ON residents(pgy_level, is_active) WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_time_off_dates 
    ON time_off_requests(resident_id, start_date, end_date);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assignments_schedule_date 
    ON assignments(schedule_id, assignment_date);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assignments_resident_date 
    ON assignments(resident_id, assignment_date);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_timestamp 
    ON audit_logs(timestamp DESC);

-- Create read-only user for reporting
CREATE USER scheduler_readonly WITH PASSWORD 'readonly_pass';
GRANT CONNECT ON DATABASE medical_scheduler TO scheduler_readonly;
GRANT USAGE ON SCHEMA public TO scheduler_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO scheduler_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO scheduler_readonly;

-- Comments for documentation
COMMENT ON DATABASE medical_scheduler IS 'Universal Medical Residency Scheduler Database';
COMMENT ON TABLE residents IS 'Medical residents and their information';
COMMENT ON TABLE schedules IS 'Generated scheduling periods';
COMMENT ON TABLE assignments IS 'Individual shift assignments';
COMMENT ON TABLE time_off_requests IS 'Resident time-off and vacation requests';
COMMENT ON TABLE quota_targets IS 'Annual quota requirements by resident';
COMMENT ON TABLE users IS 'System users and authentication';
COMMENT ON TABLE audit_logs IS 'System audit trail and change tracking';