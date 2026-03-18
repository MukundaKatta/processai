"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RunStatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_SCHEDULES } from "@/lib/data/mock";
import { formatDateTime, formatRelative } from "@/lib/utils/format";
import {
  Clock,
  Play,
  Pause,
  Plus,
  Calendar,
  Globe,
  ArrowRight,
} from "lucide-react";

function describeCron(cron: string): string {
  const parts = cron.split(" ");
  if (parts.length < 5) return cron;
  const [min, hour, day, month, dow] = parts;
  if (day === "L") return `Last day of month at ${hour}:${min.padStart(2, "0")}`;
  if (dow === "1-5") return `Weekdays at ${hour}:${min.padStart(2, "0")}`;
  if (day.includes(",")) return `${day.replace(",", " & ")} of month at ${hour}:${min.padStart(2, "0")}`;
  return `Every day at ${hour}:${min.padStart(2, "0")}`;
}

export function ScheduleList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-surface-900">
            Process Schedules
          </h2>
          <p className="text-sm text-surface-500">
            Run processes automatically on a schedule or triggered by events
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Schedule
        </Button>
      </div>

      <div className="space-y-3">
        {MOCK_SCHEDULES.map((schedule) => (
          <Card key={schedule.id}>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  schedule.enabled
                    ? "bg-brand-50"
                    : "bg-surface-100"
                }`}
              >
                <Clock
                  className={`h-5 w-5 ${
                    schedule.enabled
                      ? "text-brand-600"
                      : "text-surface-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-surface-900">
                    {schedule.process_name}
                  </h3>
                  <Badge
                    variant={schedule.enabled ? "success" : "neutral"}
                    dot
                  >
                    {schedule.enabled ? "Active" : "Paused"}
                  </Badge>
                  {schedule.last_run_status && (
                    <RunStatusBadge status={schedule.last_run_status} />
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-surface-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="font-mono">
                      {describeCron(schedule.cron_expression)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {schedule.timezone}
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-surface-400">
                  {schedule.next_run_at && (
                    <span>
                      Next: {formatDateTime(schedule.next_run_at)}
                    </span>
                  )}
                  {schedule.last_run_at && (
                    <span>
                      Last: {formatRelative(schedule.last_run_at)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Play className="h-3.5 w-3.5" />
                  Run Now
                </Button>
                <Button size="sm" variant="ghost">
                  {schedule.enabled ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
