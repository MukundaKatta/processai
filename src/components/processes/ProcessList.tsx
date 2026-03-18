"use client";

import { Card } from "@/components/ui/Card";
import { ProcessStatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_PROCESSES } from "@/lib/data/mock";
import { formatRelative, formatNumber } from "@/lib/utils/format";
import {
  Play,
  Pause,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  Workflow,
} from "lucide-react";
import Link from "next/link";

export function ProcessList() {
  return (
    <div className="space-y-3">
      {MOCK_PROCESSES.map((process) => (
        <Card key={process.id} hover>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
              <Workflow className="h-5 w-5 text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <Link
                  href={`/processes/${process.id}`}
                  className="text-base font-semibold text-surface-900 hover:text-brand-600"
                >
                  {process.name}
                </Link>
                <ProcessStatusBadge status={process.status} />
              </div>
              <p className="mt-0.5 text-sm text-surface-500">
                {process.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-surface-400">
                <div className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  <span>{formatNumber(process.run_count)} runs</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span>{formatNumber(process.success_count)} success</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>{process.error_count} errors</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {process.last_run_at
                      ? `Last run ${formatRelative(process.last_run_at)}`
                      : "Never run"}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex gap-1.5">
                {process.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {process.status === "active" ? (
                <Button size="sm" variant="outline">
                  <Pause className="h-3.5 w-3.5" />
                  Pause
                </Button>
              ) : process.status === "paused" ? (
                <Button size="sm">
                  <Play className="h-3.5 w-3.5" />
                  Resume
                </Button>
              ) : null}
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
