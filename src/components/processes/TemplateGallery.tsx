"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PROCESS_TEMPLATES } from "@/lib/data/templates";
import {
  FileText,
  UserPlus,
  ShoppingCart,
  Receipt,
  ArrowRight,
  Clock,
  Sparkles,
  Star,
} from "lucide-react";
import type { TemplateCategory } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  UserPlus,
  ShoppingCart,
  Receipt,
};

const categoryColors: Record<TemplateCategory, string> = {
  finance: "bg-emerald-50 text-emerald-700 border-emerald-200",
  hr: "bg-violet-50 text-violet-700 border-violet-200",
  procurement: "bg-sky-50 text-sky-700 border-sky-200",
  operations: "bg-amber-50 text-amber-700 border-amber-200",
  compliance: "bg-red-50 text-red-700 border-red-200",
};

export function TemplateGallery() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6" />
          <h2 className="text-xl font-bold">Process Templates</h2>
        </div>
        <p className="mt-2 max-w-2xl text-brand-100">
          Start with a pre-built template for common back-office operations.
          Each template includes AI-powered steps, approval workflows, and
          integration points. Customize to fit your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROCESS_TEMPLATES.map((template) => {
          const IconComponent = iconMap[template.icon] || FileText;
          return (
            <Card key={template.id} hover className="flex flex-col">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <IconComponent className="h-6 w-6 text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-surface-900">
                      {template.name}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${
                        categoryColors[template.category]
                      }`}
                    >
                      {template.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-surface-500">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Steps Preview */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {template.steps.slice(0, 5).map((step, i) => (
                  <Badge key={step.id} variant="neutral">
                    {i + 1}. {step.name}
                  </Badge>
                ))}
                {template.steps.length > 5 && (
                  <Badge variant="neutral">
                    +{template.steps.length - 5} more
                  </Badge>
                )}
              </div>

              {/* Meta */}
              <div className="mt-4 flex items-center gap-4 border-t border-surface-100 pt-4">
                <div className="flex items-center gap-1 text-xs text-surface-400">
                  <Clock className="h-3 w-3" />
                  Saves ~{template.estimated_time_saved_minutes} min/run
                </div>
                <div className="flex items-center gap-1 text-xs text-surface-400">
                  <Star className="h-3 w-3 text-amber-400" />
                  {template.popularity}% popular
                </div>
                <div className="flex items-center gap-1 text-xs text-surface-400">
                  {template.steps.length} steps
                </div>
                <div className="ml-auto">
                  <Button size="sm">
                    Use Template
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
