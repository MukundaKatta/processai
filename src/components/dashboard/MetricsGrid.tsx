"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import {
  Workflow,
  Play,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSearch,
  Plug,
  TrendingUp,
} from "lucide-react";
import { MOCK_DASHBOARD } from "@/lib/data/mock";

export function MetricsGrid() {
  const m = MOCK_DASHBOARD;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Processes"
        value={m.active_processes}
        subtitle={`${m.total_runs_week} runs this week`}
        icon={Workflow}
        iconColor="bg-brand-50 text-brand-600"
        change={{ value: 12, label: "vs last week" }}
      />
      <MetricCard
        title="Runs Today"
        value={m.total_runs_today}
        subtitle={`${(m.success_rate * 100).toFixed(1)}% success rate`}
        icon={Play}
        iconColor="bg-emerald-50 text-emerald-600"
        change={{ value: 8, label: "vs yesterday" }}
      />
      <MetricCard
        title="Time Saved Today"
        value={`${Math.round(m.time_saved_today_minutes / 60)}h ${m.time_saved_today_minutes % 60}m`}
        subtitle={`${Math.round(m.time_saved_week_minutes / 60)}h this week`}
        icon={Clock}
        iconColor="bg-sky-50 text-sky-600"
        change={{ value: 15, label: "vs last week" }}
      />
      <MetricCard
        title="Pending Actions"
        value={m.pending_approvals + m.pending_exceptions}
        subtitle={`${m.pending_approvals} approvals, ${m.pending_exceptions} exceptions`}
        icon={AlertTriangle}
        iconColor="bg-amber-50 text-amber-600"
      />
      <MetricCard
        title="Documents Processed"
        value={m.documents_processed_today}
        subtitle="Today"
        icon={FileSearch}
        iconColor="bg-violet-50 text-violet-600"
        change={{ value: 22, label: "vs yesterday" }}
      />
      <MetricCard
        title="Success Rate"
        value={`${(m.success_rate * 100).toFixed(1)}%`}
        subtitle="Across all processes"
        icon={CheckCircle2}
        iconColor="bg-emerald-50 text-emerald-600"
        change={{ value: 2.3, label: "vs last month" }}
      />
      <MetricCard
        title="Active Integrations"
        value={m.active_integrations}
        subtitle="Connected services"
        icon={Plug}
        iconColor="bg-indigo-50 text-indigo-600"
      />
      <MetricCard
        title="Est. Monthly Savings"
        value="$28,400"
        subtitle="Based on automation ROI"
        icon={TrendingUp}
        iconColor="bg-emerald-50 text-emerald-600"
        change={{ value: 18, label: "vs last month" }}
      />
    </div>
  );
}
