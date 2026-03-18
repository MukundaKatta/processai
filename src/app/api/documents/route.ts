import { NextRequest, NextResponse } from "next/server";
import { MOCK_DOCUMENTS } from "@/lib/data/mock";

// GET /api/documents — list extracted documents
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const needsReview = searchParams.get("needs_review");

  let documents = [...MOCK_DOCUMENTS];

  if (status) {
    documents = documents.filter((d) => d.status === status);
  }
  if (type) {
    documents = documents.filter((d) => d.document_type === type);
  }
  if (needsReview === "true") {
    documents = documents.filter((d) => d.needs_review);
  }

  return NextResponse.json({
    documents,
    total: documents.length,
  });
}

// POST /api/documents — upload a document for extraction
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const documentType = formData.get("document_type") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // In production:
    // 1. Upload file to Supabase Storage
    // 2. Create document record in database
    // 3. Enqueue extraction job via BullMQ

    const document = {
      id: `doc-${Date.now()}`,
      filename: file.name,
      document_type: documentType || "other",
      file_url: `/uploads/${file.name}`,
      file_size: file.size,
      status: "processing",
      extracted_fields: {},
      confidence_score: 0,
      needs_review: false,
      created_at: new Date().toISOString(),
      org_id: "org-001",
    };

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
