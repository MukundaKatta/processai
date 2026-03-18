"use client";

import { Header } from "@/components/layout/Header";
import { ScheduleList } from "@/components/processes/ScheduleList";

export default function SchedulesPage() {
  return (
    <div>
      <Header
        title="Schedules"
        subtitle="Automated process scheduling and event triggers"
      />
      <div className="page-content">
        <ScheduleList />
      </div>
    </div>
  );
}
