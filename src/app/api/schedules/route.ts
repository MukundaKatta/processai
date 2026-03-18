import { NextRequest, NextResponse } from "next/server";
import { MOCK_SCHEDULES } from "@/lib/data/mock";

// GET /api/schedules — list process schedules
export async function GET() {
  return NextResponse.json({
    schedules: MOCK_SCHEDULES,
    total: MOCK_SCHEDULES.length,
    active: MOCK_SCHEDULES.filter((s) => s.enabled).length,
  });
}

// POST /api/schedules — create a new schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { process_id, cron_expression, timezone } = body;

    if (!process_id || !cron_expression) {
      return NextResponse.json(
        { error: "process_id and cron_expression are required" },
        { status: 400 }
      );
    }

    // In production:
    // 1. Validate cron expression
    // 2. Calculate next_run_at
    // 3. Save to database
    // 4. Register with BullMQ repeatable job
    // 5. Log to audit trail

    const schedule = {
      id: `sched-${Date.now()}`,
      process_id,
      process_name: "Process",
      cron_expression,
      timezone: timezone || "UTC",
      enabled: true,
      next_run_at: new Date(Date.now() + 86400000).toISOString(),
      created_at: new Date().toISOString(),
      org_id: "org-001",
    };

    return NextResponse.json({ schedule }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}
