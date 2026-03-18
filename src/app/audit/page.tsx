"use client";

import { Header } from "@/components/layout/Header";
import { AuditTrail } from "@/components/audit/AuditTrail";
import { Button } from "@/components/ui/Button";
import { Download, Filter } from "lucide-react";

export default function AuditPage() {
  return (
    <div>
      <Header title="Audit Trail" subtitle="Complete log of all actions, decisions, and AI rationale">
        <Button size="sm" variant="outline">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </Header>
      <div className="page-content">
        <AuditTrail />
      </div>
    </div>
  );
}
