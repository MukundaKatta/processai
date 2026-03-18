"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MOCK_DASHBOARD } from "@/lib/data/mock";

export function ProcessPerformance() {
  const stats = MOCK_DASHBOARD.process_stats;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Performance</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-surface-700">
                {stat.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-surface-400">
                  {stat.runs} runs
                </span>
                <span className="text-xs font-semibold text-surface-700">
                  {(stat.success_rate * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <ProgressBar
              value={stat.success_rate * 100}
              color={
                stat.success_rate >= 0.95
                  ? "success"
                  : stat.success_rate >= 0.85
                  ? "warning"
                  : "danger"
              }
              size="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
