"use client";

import { Header } from "@/components/layout/Header";
import { ProcessDetail } from "@/components/processes/ProcessDetail";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProcessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <Header title="Process Details" subtitle="View runs, configuration, and performance">
        <Link href="/processes">
          <Button size="sm" variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </Header>
      <div className="page-content">
        <ProcessDetail processId={params.id} />
      </div>
    </div>
  );
}
