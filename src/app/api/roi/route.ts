import { NextRequest, NextResponse } from "next/server";
import { MOCK_ROI } from "@/lib/data/mock";

// GET /api/roi — get ROI metrics
export async function GET() {
  return NextResponse.json({ metrics: MOCK_ROI });
}

// POST /api/roi/estimate — calculate estimated ROI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      processes_count = 1,
      runs_per_month = 100,
      manual_minutes_per_run = 30,
      hourly_rate = 40,
    } = body;

    // Automation efficiency factor (based on real-world data)
    const automationEfficiency = 0.93; // 93% of tasks fully automated
    const automatedTimeMinutes = manual_minutes_per_run * 0.07; // 7% of manual time
    const timeSavedPerRun = manual_minutes_per_run - automatedTimeMinutes;

    const monthlyTimeSavedHours =
      (runs_per_month * timeSavedPerRun * automationEfficiency) / 60;
    const monthlyCostSavings = monthlyTimeSavedHours * hourly_rate;
    const yearlyProjection = monthlyCostSavings * 12;

    // Error reduction estimate
    const manualErrorRate = 0.12;
    const automatedErrorRate = 0.04;
    const errorReduction =
      ((manualErrorRate - automatedErrorRate) / manualErrorRate) * 100;

    return NextResponse.json({
      estimate: {
        monthly_time_saved_hours: Math.round(monthlyTimeSavedHours),
        monthly_cost_savings: Math.round(monthlyCostSavings),
        yearly_projection: Math.round(yearlyProjection),
        automation_efficiency: automationEfficiency,
        error_reduction_percent: Math.round(errorReduction),
        payback_period_months: 1, // typically immediate with SaaS
        assumptions: {
          automation_efficiency: `${automationEfficiency * 100}%`,
          manual_error_rate: `${manualErrorRate * 100}%`,
          automated_error_rate: `${automatedErrorRate * 100}%`,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate ROI" },
      { status: 500 }
    );
  }
}
