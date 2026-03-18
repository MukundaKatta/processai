"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProcessStatusBadge, RunStatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MOCK_PROCESSES, MOCK_RUNS } from "@/lib/data/mock";
import {
  formatRelative,
  formatDuration,
  formatNumber,
} from "@/lib/utils/format";
import {
  Play,
  Pause,
  Settings,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Workflow,
  BarChart3,
} from "lucide-react";

export function ProcessDetail({ processId }: { processId: string }) {
  const process = MOCK_PROCESSES.find((p) => p.id === processId) || MOCK_PROCESSES[0];
  const runs = MOCK_RUNS.filter((r) => r.process_id === process.id);
  const successRate =
    process.run_count > 0
      ? (process.success_count / process.run_count) * 100
      : 0;

  return (
    <div className="space-y-6">
      {/* Process Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
              <Workflow className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-surface-900">
                  {process.name}
                </h2>
                <ProcessStatusBadge status={process.status} />
              </div>
              <p className="mt-1 text-sm text-surface-500">
                {process.description}
              </p>
              <div className="mt-2 flex gap-1.5">
                {process.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </Button>
            {process.status === "active" ? (
              <Button variant="outline" size="sm">
                <Pause className="h-3.5 w-3.5" />
                Pause
              </Button>
            ) : (
              <Button size="sm">
                <Play className="h-3.5 w-3.5" />
                Activate
              </Button>
            )}
            <Button size="sm">
              <Play className="h-3.5 w-3.5" />
              Run Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-brand-50 p-2">
              <Play className="h-4 w-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs text-surface-400">Total Runs</p>
              <p className="text-lg font-bold text-surface-900">
                {formatNumber(process.run_count)}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-surface-400">Success Rate</p>
              <p className="text-lg font-bold text-surface-900">
                {successRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sky-50 p-2">
              <Clock className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-surface-400">Avg Duration</p>
              <p className="text-lg font-bold text-surface-900">
                {process.avg_duration_seconds
                  ? formatDuration(process.avg_duration_seconds)
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-50 p-2">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-surface-400">Errors</p>
              <p className="text-lg font-bold text-surface-900">
                {process.error_count}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Runs</CardTitle>
        </CardHeader>
        <div className="overflow-hidden rounded-lg border border-surface-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 bg-surface-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500">
                  Run ID
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500">
                  Status
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500">
                  Triggered By
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500">
                  Started
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {runs.map((run) => (
                <tr
                  key={run.id}
                  className="hover:bg-surface-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-surface-600">
                    {run.id}
                  </td>
                  <td className="px-4 py-3">
                    <RunStatusBadge status={run.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-surface-600">
                    {run.triggered_by}
                  </td>
                  <td className="px-4 py-3 text-sm text-surface-500">
                    {formatRelative(run.started_at)}
                  </td>
                  <td className="px-4 py-3 text-sm text-surface-500">
                    {run.duration_seconds
                      ? formatDuration(run.duration_seconds)
                      : "In progress"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
