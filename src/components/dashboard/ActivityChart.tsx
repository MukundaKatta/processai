"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

const CHART_DATA = [
  { day: "Mon", runs: 38, success: 35, failed: 3 },
  { day: "Tue", runs: 42, success: 40, failed: 2 },
  { day: "Wed", runs: 55, success: 53, failed: 2 },
  { day: "Thu", runs: 48, success: 45, failed: 3 },
  { day: "Fri", runs: 52, success: 50, failed: 2 },
  { day: "Sat", runs: 12, success: 12, failed: 0 },
  { day: "Sun", runs: 8, success: 8, failed: 0 },
];

const maxRuns = Math.max(...CHART_DATA.map((d) => d.runs));

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
            <span className="text-surface-500">Successful</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="text-surface-500">Failed</span>
          </div>
        </div>
      </CardHeader>

      <div className="flex items-end justify-between gap-2 pt-2" style={{ height: 200 }}>
        {CHART_DATA.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="relative flex w-full flex-col items-center gap-0.5">
              <div
                className="w-full max-w-[36px] rounded-t bg-brand-500 transition-all"
                style={{
                  height: `${(d.success / maxRuns) * 160}px`,
                }}
              />
              {d.failed > 0 && (
                <div
                  className="w-full max-w-[36px] rounded-t bg-red-400"
                  style={{
                    height: `${(d.failed / maxRuns) * 160}px`,
                    minHeight: "3px",
                  }}
                />
              )}
            </div>
            <span className="text-xs font-medium text-surface-500">{d.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-100 pt-3">
        <div>
          <p className="text-xs text-surface-400">Total this week</p>
          <p className="text-lg font-bold text-surface-900">
            {CHART_DATA.reduce((s, d) => s + d.runs, 0)} runs
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-surface-400">Avg. per day</p>
          <p className="text-lg font-bold text-surface-900">
            {Math.round(CHART_DATA.reduce((s, d) => s + d.runs, 0) / 7)}
          </p>
        </div>
      </div>
    </Card>
  );
}
