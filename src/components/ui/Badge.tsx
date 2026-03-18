"use client";

import { cn } from "@/lib/utils/cn";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-100 text-brand-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700",
  neutral: "bg-surface-200 text-surface-600",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "default",
  className,
  dot,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-brand-500": variant === "default",
            "bg-emerald-500": variant === "success",
            "bg-amber-500": variant === "warning",
            "bg-red-500": variant === "danger",
            "bg-sky-500": variant === "info",
            "bg-surface-400": variant === "neutral",
          })}
        />
      )}
      {children}
    </span>
  );
}
