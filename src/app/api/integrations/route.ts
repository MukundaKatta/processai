import { NextRequest, NextResponse } from "next/server";
import { MOCK_INTEGRATIONS } from "@/lib/data/mock";
import { INTEGRATION_REGISTRY } from "@/lib/integrations/registry";

// GET /api/integrations — list connected integrations
export async function GET() {
  return NextResponse.json({
    connected: MOCK_INTEGRATIONS,
    available: INTEGRATION_REGISTRY.map((def) => ({
      type: def.type,
      name: def.name,
      description: def.description,
      actions: def.actions.map((a) => a.name),
      is_connected: MOCK_INTEGRATIONS.some(
        (i) => i.type === def.type && i.status === "connected"
      ),
    })),
  });
}

// POST /api/integrations — connect a new integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, config } = body;

    const def = INTEGRATION_REGISTRY.find((r) => r.type === type);
    if (!def) {
      return NextResponse.json(
        { error: `Unknown integration type: ${type}` },
        { status: 400 }
      );
    }

    // Validate required config fields
    for (const field of def.configFields) {
      if (field.required && !config?.[field.key]) {
        return NextResponse.json(
          { error: `Missing required field: ${field.label}` },
          { status: 400 }
        );
      }
    }

    // In production:
    // 1. Encrypt credentials
    // 2. Test connection
    // 3. Save to database
    // 4. Log to audit trail

    const integration = {
      id: `int-${Date.now()}`,
      name: name || def.name,
      type,
      status: "connected",
      config: {},
      credentials_encrypted: "enc:...",
      created_at: new Date().toISOString(),
      org_id: "org-001",
    };

    return NextResponse.json({ integration }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect integration" },
      { status: 500 }
    );
  }
}
