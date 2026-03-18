"use client";

import { Header } from "@/components/layout/Header";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RecentRuns } from "@/components/dashboard/RecentRuns";
import { ProcessPerformance } from "@/components/dashboard/ProcessPerformance";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { PendingActions } from "@/components/dashboard/PendingActions";
import { ROICalculator } from "@/components/dashboard/ROICalculator";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Plus, Download } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div>
      <Header title="Dashboard" subtitle="Enterprise process automation overview">
        <Link href="/processes/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Process
          </Button>
        </Link>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </Header>
      <div className="page-content space-y-6">
        <Tabs
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "roi", label: "ROI Calculator" },
          ]}
          activeTab={activeView}
          onChange={setActiveView}
        />

        {activeView === "overview" && (
          <>
            <MetricsGrid />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ActivityChart />
              </div>
              <ProcessPerformance />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RecentRuns />
              <PendingActions />
            </div>
          </>
        )}

        {activeView === "roi" && <ROICalculator />}
      </div>
    </div>
  );
}
