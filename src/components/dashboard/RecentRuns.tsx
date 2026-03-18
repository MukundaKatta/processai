"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { RunStatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_RUNS } from "@/lib/data/mock";
import { MOCK_PROCESSES } from "@/lib/data/mock";
import { formatRelative, formatDuration } from "@/lib/utils/format";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function RecentRuns() {
  const runs = MOCK_RUNS.slice(0, 6);

  const getProcessName = (processId: string) => {
    return (
      MOCK_PROCESSES.find((p) => p.id === processId)?.name || "Unknown Process"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Process Runs</CardTitle>
        <Link
          href="/processes"
          className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <div className="space-y-0 divide-y divide-surface-100">
        {runs.map((run) => (
          <div
            key={run.id}
            className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                run.status === "completed"
                  ? "bg-emerald-50 text-emerald-600"
                  : run.status === "running"
                  ? "bg-sky-50 text-sky-600"
                  : run.status === "failed"
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              <Play className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-surface-900">
                {getProcessName(run.process_id)}
              </p>
              <p className="text-xs text-surface-400">
                {formatRelative(run.started_at)}
                {run.duration_seconds &&
                  ` / ${formatDuration(run.duration_seconds)}`}
              </p>
            </div>
            <RunStatusBadge status={run.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}
