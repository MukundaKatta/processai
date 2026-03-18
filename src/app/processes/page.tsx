"use client";

import { Header } from "@/components/layout/Header";
import { ProcessList } from "@/components/processes/ProcessList";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { MOCK_PROCESSES } from "@/lib/data/mock";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProcessesPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const counts = {
    all: MOCK_PROCESSES.length,
    active: MOCK_PROCESSES.filter((p) => p.status === "active").length,
    paused: MOCK_PROCESSES.filter((p) => p.status === "paused").length,
    draft: MOCK_PROCESSES.filter((p) => p.status === "draft").length,
  };

  return (
    <div>
      <Header title="Processes" subtitle="Manage your automated workflows">
        <Link href="/processes/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Process
          </Button>
        </Link>
      </Header>
      <div className="page-content space-y-6">
        <div className="flex items-center justify-between">
          <Tabs
            tabs={[
              { id: "all", label: "All", count: counts.all },
              { id: "active", label: "Active", count: counts.active },
              { id: "paused", label: "Paused", count: counts.paused },
              { id: "draft", label: "Draft", count: counts.draft },
            ]}
            activeTab={statusFilter}
            onChange={setStatusFilter}
          />
          <Button size="sm" variant="outline">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
        <ProcessList />
      </div>
    </div>
  );
}
