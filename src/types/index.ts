// ============================================================================
// ProcessAI — Core Type Definitions
// ============================================================================

// --- Process Types ---
export type ProcessStatus =
  | "draft"
  | "active"
  | "paused"
  | "completed"
  | "failed"
  | "archived";

export type StepType =
  | "trigger"
  | "action"
  | "condition"
  | "approval"
  | "notification"
  | "document_extract"
  | "integration"
  | "human_review"
  | "delay"
  | "loop";

export type TriggerType =
  | "manual"
  | "schedule"
  | "webhook"
  | "email"
  | "file_upload"
  | "form_submit";

export interface ProcessStep {
  id: string;
  name: string;
  type: StepType;
  description: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  next_steps: string[];
  condition?: string;
  timeout_minutes?: number;
  retry_count?: number;
  on_error?: "stop" | "skip" | "human_review";
}

export interface Process {
  id: string;
  name: string;
  description: string;
  status: ProcessStatus;
  trigger_type: TriggerType;
  steps: ProcessStep[];
  template_id?: string;
  schedule_cron?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  last_run_at?: string;
  run_count: number;
  success_count: number;
  error_count: number;
  avg_duration_seconds?: number;
  tags: string[];
  org_id: string;
}

// --- Process Run (execution instance) ---
export type RunStatus =
  | "queued"
  | "running"
  | "waiting_approval"
  | "waiting_human"
  | "completed"
  | "failed"
  | "cancelled";

export interface ProcessRun {
  id: string;
  process_id: string;
  status: RunStatus;
  current_step_id?: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  step_results: StepResult[];
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  error?: string;
  triggered_by: string;
}

export interface StepResult {
  step_id: string;
  step_name: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
  error?: string;
  decision_rationale?: string;
}

// --- Document Extraction ---
export type DocumentType =
  | "invoice"
  | "receipt"
  | "purchase_order"
  | "expense_report"
  | "contract"
  | "other";

export interface ExtractedDocument {
  id: string;
  filename: string;
  document_type: DocumentType;
  file_url: string;
  file_size: number;
  status: "uploading" | "processing" | "extracted" | "reviewed" | "failed";
  extracted_fields: Record<string, ExtractedField>;
  confidence_score: number;
  needs_review: boolean;
  reviewed_by?: string;
  reviewed_at?: string;
  process_run_id?: string;
  created_at: string;
  org_id: string;
}

export interface ExtractedField {
  key: string;
  value: string | number | null;
  confidence: number;
  bounding_box?: { x: number; y: number; width: number; height: number };
  corrected_value?: string | number;
}

// --- Approval Workflows ---
export type ApprovalStatus = "pending" | "approved" | "rejected" | "escalated";

export interface ApprovalRule {
  id: string;
  name: string;
  description: string;
  conditions: ApprovalCondition[];
  approver_chain: ApproverLevel[];
  auto_approve_below?: number;
  escalation_timeout_hours: number;
  org_id: string;
}

export interface ApprovalCondition {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
  value: string | number | string[];
}

export interface ApproverLevel {
  level: number;
  approvers: string[];
  min_approvals: number;
  timeout_hours: number;
  auto_escalate: boolean;
}

export interface ApprovalRequest {
  id: string;
  rule_id: string;
  process_run_id: string;
  title: string;
  description: string;
  amount?: number;
  category?: string;
  status: ApprovalStatus;
  current_level: number;
  decisions: ApprovalDecision[];
  submitted_by: string;
  submitted_at: string;
  resolved_at?: string;
  org_id: string;
}

export interface ApprovalDecision {
  approver_id: string;
  approver_name: string;
  level: number;
  decision: "approved" | "rejected";
  comment?: string;
  decided_at: string;
}

// --- Integrations ---
export type IntegrationType =
  | "slack"
  | "email"
  | "google_drive"
  | "google_sheets"
  | "rest_api"
  | "webhook";

export type IntegrationStatus = "connected" | "disconnected" | "error";

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  config: Record<string, unknown>;
  credentials_encrypted: string;
  last_used_at?: string;
  error_message?: string;
  org_id: string;
  created_at: string;
}

// --- Audit Trail ---
export type AuditAction =
  | "process_created"
  | "process_updated"
  | "process_deleted"
  | "process_run_started"
  | "process_run_completed"
  | "process_run_failed"
  | "step_executed"
  | "document_uploaded"
  | "document_extracted"
  | "approval_requested"
  | "approval_decided"
  | "integration_connected"
  | "integration_used"
  | "exception_raised"
  | "human_review_completed"
  | "schedule_created"
  | "schedule_updated";

export interface AuditEntry {
  id: string;
  action: AuditAction;
  entity_type: string;
  entity_id: string;
  actor_id: string;
  actor_name: string;
  details: Record<string, unknown>;
  input_snapshot?: Record<string, unknown>;
  output_snapshot?: Record<string, unknown>;
  decision_rationale?: string;
  ip_address?: string;
  timestamp: string;
  org_id: string;
}

// --- Scheduling ---
export interface ProcessSchedule {
  id: string;
  process_id: string;
  process_name: string;
  cron_expression: string;
  timezone: string;
  enabled: boolean;
  next_run_at: string;
  last_run_at?: string;
  last_run_status?: RunStatus;
  created_at: string;
  org_id: string;
}

// --- Templates ---
export type TemplateCategory =
  | "finance"
  | "hr"
  | "procurement"
  | "operations"
  | "compliance";

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  steps: ProcessStep[];
  default_trigger: TriggerType;
  estimated_time_saved_minutes: number;
  popularity: number;
  tags: string[];
}

// --- ROI ---
export interface ROIMetrics {
  processes_automated: number;
  total_runs: number;
  total_time_saved_hours: number;
  avg_time_per_process_minutes: number;
  manual_time_per_process_minutes: number;
  error_rate_automated: number;
  error_rate_manual: number;
  estimated_cost_savings_monthly: number;
  estimated_cost_savings_yearly: number;
  employee_hours_freed: number;
}

// --- Dashboard ---
export interface DashboardMetrics {
  active_processes: number;
  total_runs_today: number;
  total_runs_week: number;
  success_rate: number;
  pending_approvals: number;
  pending_exceptions: number;
  time_saved_today_minutes: number;
  time_saved_week_minutes: number;
  documents_processed_today: number;
  active_integrations: number;
  recent_runs: ProcessRun[];
  process_stats: { name: string; runs: number; success_rate: number }[];
}

// --- Exception / Human Review ---
export interface ExceptionItem {
  id: string;
  process_run_id: string;
  process_name: string;
  step_id: string;
  step_name: string;
  reason: string;
  confidence_score: number;
  context: Record<string, unknown>;
  status: "pending" | "resolved" | "dismissed";
  assigned_to?: string;
  resolution?: string;
  created_at: string;
  resolved_at?: string;
  org_id: string;
}
