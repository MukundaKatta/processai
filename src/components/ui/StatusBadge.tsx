"use client";

import { Badge } from "./Badge";
import type { ProcessStatus, RunStatus, ApprovalStatus } from "@/types";

const processStatusMap: Record<
  ProcessStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" | "neutral" }
> = {
  draft: { label: "Draft", variant: "neutral" },
  active: { label: "Active", variant: "success" },
  paused: { label: "Paused", variant: "warning" },
  completed: { label: "Completed", variant: "info" },
  failed: { label: "Failed", variant: "danger" },
  archived: { label: "Archived", variant: "neutral" },
};

const runStatusMap: Record<
  RunStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" | "neutral" | "default" }
> = {
  queued: { label: "Queued", variant: "neutral" },
  running: { label: "Running", variant: "info" },
  waiting_approval: { label: "Waiting Approval", variant: "warning" },
  waiting_human: { label: "Needs Review", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

const approvalStatusMap: Record<
  ApprovalStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" | "neutral" | "default" }
> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  escalated: { label: "Escalated", variant: "info" },
};

export function ProcessStatusBadge({ status }: { status: ProcessStatus }) {
  const config = processStatusMap[status];
  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  );
}

export function RunStatusBadge({ status }: { status: RunStatus }) {
  const config = runStatusMap[status];
  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  );
}

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const config = approvalStatusMap[status];
  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  );
}
