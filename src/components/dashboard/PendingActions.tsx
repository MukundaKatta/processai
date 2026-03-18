"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_APPROVALS, MOCK_EXCEPTIONS } from "@/lib/data/mock";
import { formatRelative, formatCurrency } from "@/lib/utils/format";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

export function PendingActions() {
  const pendingApprovals = MOCK_APPROVALS.filter((a) => a.status === "pending");
  const pendingExceptions = MOCK_EXCEPTIONS.filter(
    (e) => e.status === "pending"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
        <Badge variant="warning">
          {pendingApprovals.length + pendingExceptions.length} items
        </Badge>
      </CardHeader>

      {/* Approvals */}
      {pendingApprovals.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-500">
              Approvals
            </span>
          </div>
          <div className="space-y-2">
            {pendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center gap-3 rounded-lg border border-surface-100 p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-surface-900">
                    {approval.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-surface-400">
                    <Clock className="h-3 w-3" />
                    {formatRelative(approval.submitted_at)}
                    {approval.amount && (
                      <>
                        <span className="text-surface-300">|</span>
                        <span className="font-medium text-surface-600">
                          {formatCurrency(approval.amount)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exceptions */}
      {pendingExceptions.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-500">
              Exceptions
            </span>
          </div>
          <div className="space-y-2">
            {pendingExceptions.map((exc) => (
              <div
                key={exc.id}
                className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50/30 p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-surface-900">
                    {exc.process_name}: {exc.step_name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-surface-500">
                    {exc.reason}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 border-t border-surface-100 pt-3">
        <Link
          href="/approvals"
          className="flex items-center justify-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all pending actions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
