"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_AUDIT } from "@/lib/data/mock";
import { formatDateTime, formatRelative } from "@/lib/utils/format";
import {
  Play,
  CheckCircle2,
  XCircle,
  FileSearch,
  Shield,
  Plug,
  AlertTriangle,
  Clock,
  Workflow,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import type { AuditAction } from "@/types";

const actionConfig: Record<
  AuditAction,
  { icon: React.ElementType; color: string; label: string }
> = {
  process_created: { icon: Workflow, color: "text-brand-600 bg-brand-50", label: "Process Created" },
  process_updated: { icon: Workflow, color: "text-brand-600 bg-brand-50", label: "Process Updated" },
  process_deleted: { icon: XCircle, color: "text-red-600 bg-red-50", label: "Process Deleted" },
  process_run_started: { icon: Play, color: "text-sky-600 bg-sky-50", label: "Run Started" },
  process_run_completed: { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", label: "Run Completed" },
  process_run_failed: { icon: XCircle, color: "text-red-600 bg-red-50", label: "Run Failed" },
  step_executed: { icon: Play, color: "text-brand-600 bg-brand-50", label: "Step Executed" },
  document_uploaded: { icon: FileSearch, color: "text-violet-600 bg-violet-50", label: "Document Uploaded" },
  document_extracted: { icon: FileSearch, color: "text-violet-600 bg-violet-50", label: "Document Extracted" },
  approval_requested: { icon: Shield, color: "text-amber-600 bg-amber-50", label: "Approval Requested" },
  approval_decided: { icon: Shield, color: "text-amber-600 bg-amber-50", label: "Approval Decided" },
  integration_connected: { icon: Plug, color: "text-indigo-600 bg-indigo-50", label: "Integration Connected" },
  integration_used: { icon: Plug, color: "text-indigo-600 bg-indigo-50", label: "Integration Used" },
  exception_raised: { icon: AlertTriangle, color: "text-red-600 bg-red-50", label: "Exception Raised" },
  human_review_completed: { icon: User, color: "text-emerald-600 bg-emerald-50", label: "Human Review" },
  schedule_created: { icon: Clock, color: "text-sky-600 bg-sky-50", label: "Schedule Created" },
  schedule_updated: { icon: Clock, color: "text-sky-600 bg-sky-50", label: "Schedule Updated" },
};

export function AuditTrail() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-0">
      {MOCK_AUDIT.map((entry, index) => {
        const config = actionConfig[entry.action];
        const Icon = config.icon;
        const isExpanded = expandedId === entry.id;

        return (
          <div key={entry.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < MOCK_AUDIT.length - 1 && (
                <div className="h-full w-0.5 bg-surface-200" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div
                className="cursor-pointer rounded-lg border border-surface-200 bg-white p-4 transition-shadow hover:shadow-sm"
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-surface-900">
                        {config.label}
                      </span>
                      <Badge variant="neutral">{entry.entity_type}</Badge>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-surface-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-surface-400" />
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-surface-400">
                      <User className="h-3 w-3" />
                      <span>{entry.actor_name}</span>
                      <span className="text-surface-300">|</span>
                      <Clock className="h-3 w-3" />
                      <span>{formatRelative(entry.timestamp)}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-surface-400">
                    {entry.entity_id}
                  </span>
                </div>

                {/* Decision Rationale */}
                {entry.decision_rationale && (
                  <div className="mt-2 rounded-md bg-brand-50 p-2 text-xs text-brand-700">
                    <span className="font-semibold">AI Rationale:</span>{" "}
                    {entry.decision_rationale}
                  </div>
                )}

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 space-y-2 border-t border-surface-100 pt-3">
                    <div>
                      <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                        Details
                      </p>
                      <pre className="rounded-md bg-surface-50 p-3 text-xs text-surface-600 overflow-x-auto font-mono">
                        {JSON.stringify(entry.details, null, 2)}
                      </pre>
                    </div>
                    {entry.output_snapshot && (
                      <div>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                          Output Snapshot
                        </p>
                        <pre className="rounded-md bg-surface-50 p-3 text-xs text-surface-600 overflow-x-auto font-mono">
                          {JSON.stringify(entry.output_snapshot, null, 2)}
                        </pre>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-surface-400">
                      <span>Full timestamp: {formatDateTime(entry.timestamp)}</span>
                      <span>Entity: {entry.entity_type}/{entry.entity_id}</span>
                      <span>Actor: {entry.actor_id}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
