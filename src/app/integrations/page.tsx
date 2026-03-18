"use client";

import { Header } from "@/components/layout/Header";
import { IntegrationHub } from "@/components/integrations/IntegrationHub";

export default function IntegrationsPage() {
  return (
    <div>
      <Header
        title="Integration Hub"
        subtitle="Connect external services to your automated workflows"
      />
      <div className="page-content">
        <IntegrationHub />
      </div>
    </div>
  );
}
