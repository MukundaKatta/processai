"use client";

import { Header } from "@/components/layout/Header";
import { ApprovalList } from "@/components/approvals/ApprovalList";

export default function ApprovalsPage() {
  return (
    <div>
      <Header
        title="Approvals & Exceptions"
        subtitle="Review pending approvals and handle exceptions"
      />
      <div className="page-content">
        <ApprovalList />
      </div>
    </div>
  );
}
