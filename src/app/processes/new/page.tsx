"use client";

import { Header } from "@/components/layout/Header";
import { ProcessRecorder } from "@/components/processes/ProcessRecorder";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProcessPage() {
  return (
    <div>
      <Header title="Create New Process" subtitle="Describe your process or start from a template">
        <Link href="/processes">
          <Button size="sm" variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </Header>
      <div className="page-content">
        <ProcessRecorder />
      </div>
    </div>
  );
}
