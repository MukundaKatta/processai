"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { ApprovalStatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_APPROVALS, MOCK_EXCEPTIONS } from "@/lib/data/mock";
import { formatRelative, formatCurrency } from "@/lib/utils/format";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  AlertTriangle,
  User,
  ArrowRight,
  Shield,
} from "lucide-react";

export function ApprovalList() {
  const [activeTab, setActiveTab] = useState("approvals");

  const tabs = [
    { id: "approvals", label: "Approvals", count: MOCK_APPROVALS.filter((a) => a.status === "pending").length },
    { id: "exceptions", label: "Exceptions", count: MOCK_EXCEPTIONS.filter((e) => e.status === "pending").length },
    { id: "history", label: "History" },
  ];

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "approvals" && (
        <div className="space-y-4">
          {MOCK_APPROVALS.map((approval) => (
            <Card key={approval.id}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-surface-900">
                      {approval.title}
                    </h3>
                    <ApprovalStatusBadge status={approval.status} />
                  </div>
                  <p className="mt-1 text-sm text-surface-500">
                    {approval.description}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-surface-400">
                    {approval.amount && (
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold text-surface-900">
                          {formatCurrency(approval.amount)}
                        </span>
                      </div>
                    )}
                    {approval.category && (
                      <Badge variant="neutral">{approval.category}</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Submitted {formatRelative(approval.submitted_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Level {approval.current_level} approval
                    </div>
                  </div>

                  {/* Approval Chain */}
                  {approval.decisions.length > 0 && (
                    <div className="mt-3 border-t border-surface-100 pt-3">
                      <p className="mb-2 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                        Approval Chain
                      </p>
                      <div className="space-y-2">
                        {approval.decisions.map((decision, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            {decision.decision === "approved" ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="font-medium text-surface-700">
                              {decision.approver_name}
                            </span>
                            <span className="text-xs text-surface-400">
                              Level {decision.level}
                            </span>
                            <ArrowRight className="h-3 w-3 text-surface-300" />
                            <span
                              className={`text-xs font-medium ${
                                decision.decision === "approved"
                                  ? "text-emerald-600"
                                  : "text-red-600"
                              }`}
                            >
                              {decision.decision}
                            </span>
                            {decision.comment && (
                              <span className="text-xs text-surface-400 italic">
                                &ldquo;{decision.comment}&rdquo;
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {approval.status === "pending" && (
                  <div className="flex flex-col gap-2">
                    <Button size="sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Comment
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "exceptions" && (
        <div className="space-y-4">
          {MOCK_EXCEPTIONS.map((exc) => (
            <Card key={exc.id}>
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    exc.status === "pending"
                      ? "bg-red-50"
                      : "bg-emerald-50"
                  }`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      exc.status === "pending"
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-surface-900">
                      {exc.process_name}
                    </h3>
                    <Badge
                      variant={
                        exc.status === "pending"
                          ? "danger"
                          : exc.status === "resolved"
                          ? "success"
                          : "neutral"
                      }
                      dot
                    >
                      {exc.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-surface-500">
                    <span className="font-medium">Step:</span> {exc.step_name}
                  </p>
                  <p className="mt-1 text-sm text-surface-600">{exc.reason}</p>

                  {exc.confidence_score > 0 && (
                    <p className="mt-1 text-xs text-surface-400">
                      AI confidence: {(exc.confidence_score * 100).toFixed(0)}%
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-2 text-xs text-surface-400">
                    <Clock className="h-3 w-3" />
                    {formatRelative(exc.created_at)}
                    {exc.assigned_to && (
                      <>
                        <span className="text-surface-300">|</span>
                        <User className="h-3 w-3" />
                        Assigned
                      </>
                    )}
                  </div>

                  {exc.resolution && (
                    <div className="mt-2 rounded-md bg-emerald-50 p-2 text-xs text-emerald-700">
                      <span className="font-semibold">Resolution:</span>{" "}
                      {exc.resolution}
                    </div>
                  )}
                </div>

                {exc.status === "pending" && (
                  <div className="flex flex-col gap-2">
                    <Button size="sm">Review</Button>
                    <Button size="sm" variant="outline">
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-surface-300" />
            <p className="mt-3 text-sm text-surface-500">
              Approval history will appear here
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
