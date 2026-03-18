import { NextRequest, NextResponse } from "next/server";
import { MOCK_AUDIT } from "@/lib/data/mock";

// GET /api/audit — list audit trail entries
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const entityType = searchParams.get("entity_type");
  const entityId = searchParams.get("entity_id");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  let entries = [...MOCK_AUDIT];

  if (action) {
    entries = entries.filter((e) => e.action === action);
  }
  if (entityType) {
    entries = entries.filter((e) => e.entity_type === entityType);
  }
  if (entityId) {
    entries = entries.filter((e) => e.entity_id === entityId);
  }

  // Sort by timestamp descending
  entries.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const paginated = entries.slice(offset, offset + limit);

  return NextResponse.json({
    entries: paginated,
    total: entries.length,
    limit,
    offset,
  });
}
