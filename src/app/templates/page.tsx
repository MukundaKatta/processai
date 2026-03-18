"use client";

import { Header } from "@/components/layout/Header";
import { TemplateGallery } from "@/components/processes/TemplateGallery";

export default function TemplatesPage() {
  return (
    <div>
      <Header
        title="Process Templates"
        subtitle="Pre-built workflows for common enterprise operations"
      />
      <div className="page-content">
        <TemplateGallery />
      </div>
    </div>
  );
}
