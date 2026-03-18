"use client";

import { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MOCK_DOCUMENTS } from "@/lib/data/mock";
import { formatRelative } from "@/lib/utils/format";
import {
  FileText,
  Upload,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileSearch,
} from "lucide-react";

const typeIcons: Record<string, string> = {
  invoice: "text-brand-600 bg-brand-50",
  receipt: "text-amber-600 bg-amber-50",
  purchase_order: "text-violet-600 bg-violet-50",
  expense_report: "text-emerald-600 bg-emerald-50",
  contract: "text-sky-600 bg-sky-50",
  other: "text-surface-600 bg-surface-100",
};

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" | "neutral" }> = {
  uploading: { label: "Uploading", variant: "neutral" },
  processing: { label: "Processing", variant: "info" },
  extracted: { label: "Extracted", variant: "success" },
  reviewed: { label: "Reviewed", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
};

export function DocumentList() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-brand-400 bg-brand-50"
            : "border-surface-300 bg-surface-50"
        }`}
      >
        <Upload className="mx-auto h-10 w-10 text-surface-400" />
        <h3 className="mt-3 text-base font-semibold text-surface-900">
          Upload Documents
        </h3>
        <p className="mt-1 text-sm text-surface-500">
          Drag and drop invoices, receipts, POs, or expense reports here.
          AI will automatically extract key fields.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button>
            <Upload className="h-4 w-4" />
            Choose Files
          </Button>
          <Button variant="outline">Bulk Upload</Button>
        </div>
        <p className="mt-2 text-xs text-surface-400">
          Supports PDF, PNG, JPG, TIFF up to 25MB
        </p>
      </div>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Documents</CardTitle>
          <Badge variant="neutral">{MOCK_DOCUMENTS.length} documents</Badge>
        </CardHeader>

        <div className="space-y-3">
          {MOCK_DOCUMENTS.map((doc) => {
            const status = statusConfig[doc.status];
            const fieldCount = Object.keys(doc.extracted_fields).length;
            return (
              <div
                key={doc.id}
                className="flex items-start gap-4 rounded-lg border border-surface-200 p-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    typeIcons[doc.document_type]
                  }`}
                >
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-surface-900">
                      {doc.filename}
                    </span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                    {doc.needs_review && (
                      <Badge variant="warning" dot>
                        Needs Review
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-surface-400">
                    <span className="capitalize">
                      {doc.document_type.replace("_", " ")}
                    </span>
                    <span>{(doc.file_size / 1024).toFixed(0)} KB</span>
                    <span>{formatRelative(doc.created_at)}</span>
                    {fieldCount > 0 && (
                      <span>{fieldCount} fields extracted</span>
                    )}
                  </div>

                  {doc.confidence_score > 0 && (
                    <div className="mt-2 flex items-center gap-3">
                      <ProgressBar
                        value={doc.confidence_score * 100}
                        size="sm"
                        color={
                          doc.confidence_score >= 0.9
                            ? "success"
                            : doc.confidence_score >= 0.7
                            ? "warning"
                            : "danger"
                        }
                        className="max-w-[200px]"
                      />
                      <span className="text-xs font-medium text-surface-500">
                        {(doc.confidence_score * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  )}

                  {/* Extracted Fields Preview */}
                  {fieldCount > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.values(doc.extracted_fields)
                        .filter((f) => f.value !== null)
                        .slice(0, 4)
                        .map((field) => (
                          <span
                            key={field.key}
                            className="inline-flex items-center gap-1 rounded-md bg-surface-50 px-2 py-1 text-xs"
                          >
                            <span className="text-surface-400">
                              {field.key.replace("_", " ")}:
                            </span>
                            <span className="font-medium text-surface-700">
                              {String(field.value)}
                            </span>
                            {field.confidence < 0.8 && (
                              <AlertTriangle className="h-3 w-3 text-amber-500" />
                            )}
                          </span>
                        ))}
                      {fieldCount > 4 && (
                        <span className="text-xs text-surface-400">
                          +{fieldCount - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {doc.needs_review && (
                    <Button size="sm">
                      <Eye className="h-3.5 w-3.5" />
                      Review
                    </Button>
                  )}
                  {doc.status === "processing" && (
                    <div className="flex items-center gap-1.5 text-xs text-sky-600">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Processing...
                    </div>
                  )}
                  {doc.status === "extracted" && !doc.needs_review && (
                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Complete
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
