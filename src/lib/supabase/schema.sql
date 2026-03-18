-- ============================================================================
-- ProcessAI — Supabase Database Schema
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Organizations
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  plan text default 'starter',
  created_at timestamptz default now()
);

-- Users
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text not null,
  avatar_url text,
  role text default 'member',
  org_id uuid references organizations(id),
  created_at timestamptz default now()
);

-- Processes
create table processes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  status text default 'draft',
  trigger_type text default 'manual',
  steps jsonb default '[]'::jsonb,
  template_id text,
  schedule_cron text,
  created_by uuid references users(id),
  run_count integer default 0,
  success_count integer default 0,
  error_count integer default 0,
  avg_duration_seconds float,
  tags text[] default '{}',
  org_id uuid references organizations(id),
  last_run_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Process Runs
create table process_runs (
  id uuid primary key default uuid_generate_v4(),
  process_id uuid references processes(id) on delete cascade,
  status text default 'queued',
  current_step_id text,
  input_data jsonb default '{}'::jsonb,
  output_data jsonb default '{}'::jsonb,
  step_results jsonb default '[]'::jsonb,
  error text,
  triggered_by text not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  duration_seconds float,
  org_id uuid references organizations(id)
);

-- Extracted Documents
create table extracted_documents (
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  document_type text not null,
  file_url text not null,
  file_size integer,
  status text default 'uploading',
  extracted_fields jsonb default '{}'::jsonb,
  confidence_score float default 0,
  needs_review boolean default false,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  process_run_id uuid references process_runs(id),
  org_id uuid references organizations(id),
  created_at timestamptz default now()
);

-- Approval Rules
create table approval_rules (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  conditions jsonb default '[]'::jsonb,
  approver_chain jsonb default '[]'::jsonb,
  auto_approve_below float,
  escalation_timeout_hours integer default 24,
  org_id uuid references organizations(id),
  created_at timestamptz default now()
);

-- Approval Requests
create table approval_requests (
  id uuid primary key default uuid_generate_v4(),
  rule_id uuid references approval_rules(id),
  process_run_id uuid references process_runs(id),
  title text not null,
  description text,
  amount float,
  category text,
  status text default 'pending',
  current_level integer default 1,
  decisions jsonb default '[]'::jsonb,
  submitted_by uuid references users(id),
  submitted_at timestamptz default now(),
  resolved_at timestamptz,
  org_id uuid references organizations(id)
);

-- Integrations
create table integrations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null,
  status text default 'disconnected',
  config jsonb default '{}'::jsonb,
  credentials_encrypted text,
  last_used_at timestamptz,
  error_message text,
  org_id uuid references organizations(id),
  created_at timestamptz default now()
);

-- Audit Trail
create table audit_trail (
  id uuid primary key default uuid_generate_v4(),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  actor_id text not null,
  actor_name text not null,
  details jsonb default '{}'::jsonb,
  input_snapshot jsonb,
  output_snapshot jsonb,
  decision_rationale text,
  ip_address text,
  timestamp timestamptz default now(),
  org_id uuid references organizations(id)
);

-- Process Schedules
create table process_schedules (
  id uuid primary key default uuid_generate_v4(),
  process_id uuid references processes(id) on delete cascade,
  process_name text not null,
  cron_expression text not null,
  timezone text default 'UTC',
  enabled boolean default true,
  next_run_at timestamptz,
  last_run_at timestamptz,
  last_run_status text,
  org_id uuid references organizations(id),
  created_at timestamptz default now()
);

-- Exceptions / Human Review Queue
create table exceptions (
  id uuid primary key default uuid_generate_v4(),
  process_run_id uuid references process_runs(id),
  process_name text not null,
  step_id text not null,
  step_name text not null,
  reason text not null,
  confidence_score float,
  context jsonb default '{}'::jsonb,
  status text default 'pending',
  assigned_to uuid references users(id),
  resolution text,
  org_id uuid references organizations(id),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- Indexes
create index idx_processes_org on processes(org_id);
create index idx_processes_status on processes(status);
create index idx_process_runs_process on process_runs(process_id);
create index idx_process_runs_status on process_runs(status);
create index idx_audit_trail_entity on audit_trail(entity_type, entity_id);
create index idx_audit_trail_timestamp on audit_trail(timestamp desc);
create index idx_approval_requests_status on approval_requests(status);
create index idx_exceptions_status on exceptions(status);
create index idx_extracted_documents_status on extracted_documents(status);

-- RLS Policies
alter table processes enable row level security;
alter table process_runs enable row level security;
alter table extracted_documents enable row level security;
alter table approval_rules enable row level security;
alter table approval_requests enable row level security;
alter table integrations enable row level security;
alter table audit_trail enable row level security;
alter table process_schedules enable row level security;
alter table exceptions enable row level security;
