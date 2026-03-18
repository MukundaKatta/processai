"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-surface-300 bg-surface-50 px-6 py-16 text-center">
      <div className="rounded-full bg-surface-100 p-4">
        <Icon className="h-8 w-8 text-surface-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-surface-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-surface-500">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
