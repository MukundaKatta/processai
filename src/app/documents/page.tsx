"use client";

import { Header } from "@/components/layout/Header";
import { DocumentList } from "@/components/documents/DocumentList";

export default function DocumentsPage() {
  return (
    <div>
      <Header
        title="Document Extraction"
        subtitle="Upload invoices, receipts, and POs for AI extraction"
      />
      <div className="page-content">
        <DocumentList />
      </div>
    </div>
  );
}
