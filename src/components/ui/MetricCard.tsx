"use client";

import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: { value: number; label: string };
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconColor = "text-brand-600 bg-brand-50",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-200 bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-surface-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-surface-900">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-surface-400">{subtitle}</p>
          )}
          {change && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  change.value >= 0 ? "text-emerald-600" : "text-red-600"
                )}
              >
                {change.value >= 0 ? "+" : ""}
                {change.value}%
              </span>
              <span className="text-xs text-surface-400">{change.label}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-lg p-2.5", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
