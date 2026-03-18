"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MOCK_ROI } from "@/lib/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils/format";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  ArrowDown,
  Sparkles,
} from "lucide-react";

export function ROICalculator() {
  const roi = MOCK_ROI;

  const [inputs, setInputs] = useState({
    processes_count: 5,
    runs_per_month: 200,
    manual_minutes_per_run: 35,
    hourly_rate: 45,
  });

  const estimated = {
    hours_saved: (inputs.runs_per_month * inputs.manual_minutes_per_run * 0.93) / 60,
    monthly_savings: (inputs.runs_per_month * inputs.manual_minutes_per_run * 0.93 * inputs.hourly_rate) / 60,
    yearly_savings: ((inputs.runs_per_month * inputs.manual_minutes_per_run * 0.93 * inputs.hourly_rate) / 60) * 12,
  };

  return (
    <div className="space-y-6">
      {/* Current ROI Summary */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6" />
          <h2 className="text-xl font-bold">Automation ROI</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-emerald-200 text-sm">Monthly Savings</p>
            <p className="text-3xl font-bold">
              {formatCurrency(roi.estimated_cost_savings_monthly)}
            </p>
          </div>
          <div>
            <p className="text-emerald-200 text-sm">Yearly Projection</p>
            <p className="text-3xl font-bold">
              {formatCurrency(roi.estimated_cost_savings_yearly)}
            </p>
          </div>
          <div>
            <p className="text-emerald-200 text-sm">Hours Freed</p>
            <p className="text-3xl font-bold">
              {formatNumber(roi.employee_hours_freed)}
            </p>
          </div>
          <div>
            <p className="text-emerald-200 text-sm">Error Reduction</p>
            <p className="text-3xl font-bold">
              {((1 - roi.error_rate_automated / roi.error_rate_manual) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Current Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Current Performance</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-600">Processes Automated</span>
              <span className="text-sm font-bold text-surface-900">
                {roi.processes_automated}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-600">Total Runs</span>
              <span className="text-sm font-bold text-surface-900">
                {formatNumber(roi.total_runs)}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-surface-600">
                  Avg Time (Automated)
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {roi.avg_time_per_process_minutes} min
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-surface-600">
                  Avg Time (Manual)
                </span>
                <span className="text-sm font-bold text-surface-400 line-through">
                  {roi.manual_time_per_process_minutes} min
                </span>
              </div>
              <ProgressBar
                value={
                  (1 - roi.avg_time_per_process_minutes / roi.manual_time_per_process_minutes) * 100
                }
                color="success"
                size="sm"
              />
              <p className="mt-1 text-xs text-emerald-600">
                {(
                  (1 - roi.avg_time_per_process_minutes / roi.manual_time_per_process_minutes) *
                  100
                ).toFixed(0)}
                % faster
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-surface-600">Error Rate (Automated)</span>
                <span className="text-sm font-bold text-emerald-600">
                  {(roi.error_rate_automated * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-surface-600">Error Rate (Manual)</span>
                <span className="text-sm font-bold text-surface-400 line-through">
                  {(roi.error_rate_manual * 100).toFixed(1)}%
                </span>
              </div>
              <ProgressBar
                value={(1 - roi.error_rate_automated / roi.error_rate_manual) * 100}
                color="success"
                size="sm"
              />
              <p className="mt-1 text-xs text-emerald-600">
                {((1 - roi.error_rate_automated / roi.error_rate_manual) * 100).toFixed(0)}%
                fewer errors
              </p>
            </div>
          </div>
        </Card>

        {/* Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-brand-600" />
                ROI Estimator
              </div>
            </CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Number of Processes
              </label>
              <input
                type="number"
                value={inputs.processes_count}
                onChange={(e) =>
                  setInputs({ ...inputs, processes_count: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-surface-200 px-3 py-2 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Runs per Month
              </label>
              <input
                type="number"
                value={inputs.runs_per_month}
                onChange={(e) =>
                  setInputs({ ...inputs, runs_per_month: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-surface-200 px-3 py-2 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Manual Time per Run (minutes)
              </label>
              <input
                type="number"
                value={inputs.manual_minutes_per_run}
                onChange={(e) =>
                  setInputs({ ...inputs, manual_minutes_per_run: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-surface-200 px-3 py-2 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Average Hourly Rate ($)
              </label>
              <input
                type="number"
                value={inputs.hourly_rate}
                onChange={(e) =>
                  setInputs({ ...inputs, hourly_rate: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-surface-200 px-3 py-2 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-bold">Estimated Savings</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-emerald-600">Hours/Month</p>
                  <p className="text-lg font-bold text-emerald-800">
                    {Math.round(estimated.hours_saved)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600">Monthly</p>
                  <p className="text-lg font-bold text-emerald-800">
                    {formatCurrency(estimated.monthly_savings)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600">Yearly</p>
                  <p className="text-lg font-bold text-emerald-800">
                    {formatCurrency(estimated.yearly_savings)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-emerald-600">
                Based on 93% automation efficiency (avg 7% exception rate)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
