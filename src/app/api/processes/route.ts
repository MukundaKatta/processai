import { NextRequest, NextResponse } from "next/server";
import { MOCK_PROCESSES } from "@/lib/data/mock";

// GET /api/processes — list all processes
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");

  let processes = [...MOCK_PROCESSES];

  if (status && status !== "all") {
    processes = processes.filter((p) => p.status === status);
  }
  if (tag) {
    processes = processes.filter((p) => p.tags.includes(tag));
  }

  return NextResponse.json({
    processes,
    total: processes.length,
  });
}

// POST /api/processes — create a new process
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    // In production, would save to Supabase
    const newProcess = {
      id: `proc-${Date.now()}`,
      name: body.name,
      description: body.description,
      status: "draft",
      trigger_type: body.trigger_type || "manual",
      steps: body.steps || [],
      template_id: body.template_id,
      created_by: "user-001",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      run_count: 0,
      success_count: 0,
      error_count: 0,
      tags: body.tags || [],
      org_id: "org-001",
    };

    return NextResponse.json({ process: newProcess }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
