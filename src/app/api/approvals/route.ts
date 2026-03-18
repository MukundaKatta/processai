import { NextRequest, NextResponse } from "next/server";
import { MOCK_APPROVALS } from "@/lib/data/mock";

// GET /api/approvals — list approval requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let approvals = [...MOCK_APPROVALS];

  if (status) {
    approvals = approvals.filter((a) => a.status === status);
  }

  return NextResponse.json({
    approvals,
    total: approvals.length,
    pending: approvals.filter((a) => a.status === "pending").length,
  });
}

// POST /api/approvals — submit a decision on an approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { approval_id, decision, comment } = body;

    if (!approval_id || !decision) {
      return NextResponse.json(
        { error: "approval_id and decision are required" },
        { status: 400 }
      );
    }

    if (!["approved", "rejected"].includes(decision)) {
      return NextResponse.json(
        { error: "Decision must be 'approved' or 'rejected'" },
        { status: 400 }
      );
    }

    // In production:
    // 1. Validate user has approval permission
    // 2. Update approval_request in database
    // 3. Check if all required approvals are met
    // 4. If approved, resume process run
    // 5. Log to audit trail
    // 6. Send notifications

    return NextResponse.json({
      success: true,
      approval_id,
      decision,
      message: `Approval ${approval_id} ${decision}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
