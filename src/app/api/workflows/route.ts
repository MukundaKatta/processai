import { NextRequest, NextResponse } from "next/server";

// POST /api/workflows — convert natural language to workflow steps
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description } = body;

    if (!description) {
      return NextResponse.json(
        { error: "Process description is required" },
        { status: 400 }
      );
    }

    // In production, calls the AI conversion function
    // For now, return mock workflow steps
    const steps = [
      {
        id: `step-${Date.now()}-1`,
        name: "Receive Input",
        type: "trigger",
        description: "Process triggered by incoming event",
        config: {},
        position: { x: 0, y: 0 },
        next_steps: [`step-${Date.now()}-2`],
      },
      {
        id: `step-${Date.now()}-2`,
        name: "Process Data",
        type: "action",
        description: "AI processes and validates the input data",
        config: {},
        position: { x: 0, y: 100 },
        next_steps: [`step-${Date.now()}-3`],
      },
      {
        id: `step-${Date.now()}-3`,
        name: "Decision Point",
        type: "condition",
        description: "Route based on data analysis results",
        config: {},
        position: { x: 0, y: 200 },
        next_steps: [],
      },
    ];

    return NextResponse.json({ steps });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate workflow" },
      { status: 500 }
    );
  }
}
