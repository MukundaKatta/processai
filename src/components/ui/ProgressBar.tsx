"use client";

import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  size?: "sm" | "md";
  color?: "brand" | "success" | "warning" | "danger";
  showLabel?: boolean;
}

const colorMap = {
  brand: "bg-brand-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

export function ProgressBar({
  value,
  className,
  size = "md",
  color = "brand",
  showLabel,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-surface-500">
          <span>Progress</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-surface-200",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            colorMap[color]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
