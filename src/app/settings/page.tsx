"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Building2,
  Users,
  Shield,
  Bell,
  Key,
  Globe,
  Database,
  Cpu,
} from "lucide-react";

const settingSections = [
  {
    icon: Building2,
    title: "Organization",
    description: "Company name, plan, and billing settings",
    items: [
      { label: "Company Name", value: "Acme Corp" },
      { label: "Plan", value: "Enterprise", badge: true },
      { label: "Organization ID", value: "org-001" },
    ],
  },
  {
    icon: Users,
    title: "Team Members",
    description: "Manage users, roles, and permissions",
    items: [
      { label: "Total Members", value: "24" },
      { label: "Admins", value: "3" },
      { label: "Process Managers", value: "8" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Authentication, SSO, and access policies",
    items: [
      { label: "SSO", value: "Enabled", badge: true },
      { label: "2FA Required", value: "Yes" },
      { label: "Session Timeout", value: "8 hours" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alert channels and preferences",
    items: [
      { label: "Email Alerts", value: "Enabled" },
      { label: "Slack Alerts", value: "Enabled" },
      { label: "Digest Frequency", value: "Daily" },
    ],
  },
  {
    icon: Key,
    title: "API Keys",
    description: "Manage API keys for external integrations",
    items: [
      { label: "Active Keys", value: "3" },
      { label: "Rate Limit", value: "1000 req/min" },
    ],
  },
  {
    icon: Cpu,
    title: "AI Configuration",
    description: "Model settings, confidence thresholds, and extraction rules",
    items: [
      { label: "Model", value: "GPT-4o" },
      { label: "Confidence Threshold", value: "85%" },
      { label: "Auto-Review Below", value: "70%" },
    ],
  },
  {
    icon: Database,
    title: "Data & Storage",
    description: "Data retention, backup, and export settings",
    items: [
      { label: "Audit Retention", value: "365 days" },
      { label: "Document Storage", value: "23.4 GB / 100 GB" },
      { label: "Auto Backup", value: "Daily" },
    ],
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Timezone, currency, and language preferences",
    items: [
      { label: "Timezone", value: "America/New_York" },
      { label: "Currency", value: "USD" },
      { label: "Language", value: "English" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Configure your ProcessAI workspace" />
      <div className="page-content">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {settingSections.map((section) => (
            <Card key={section.title}>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-surface-100 p-2.5">
                  <section.icon className="h-5 w-5 text-surface-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-surface-900">
                    {section.title}
                  </h3>
                  <p className="text-xs text-surface-400">
                    {section.description}
                  </p>
                  <div className="mt-3 space-y-2">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-surface-500">{item.label}</span>
                        {item.badge ? (
                          <Badge variant="success">{item.value}</Badge>
                        ) : (
                          <span className="font-medium text-surface-700">
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
