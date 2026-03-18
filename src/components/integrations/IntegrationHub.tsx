"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_INTEGRATIONS } from "@/lib/data/mock";
import { INTEGRATION_REGISTRY } from "@/lib/integrations/registry";
import { formatRelative } from "@/lib/utils/format";
import {
  MessageSquare,
  Mail,
  HardDrive,
  Table,
  Globe,
  Webhook,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plug,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  MessageSquare,
  Mail,
  HardDrive,
  Table,
  Globe,
  Webhook,
};

const statusStyles: Record<string, { variant: "success" | "danger" | "neutral"; icon: React.ElementType }> = {
  connected: { variant: "success", icon: CheckCircle2 },
  disconnected: { variant: "neutral", icon: XCircle },
  error: { variant: "danger", icon: AlertTriangle },
};

export function IntegrationHub() {
  const [showAvailable, setShowAvailable] = useState(false);

  return (
    <div className="space-y-6">
      {/* Connected Integrations */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-surface-900">
              Connected Integrations
            </h2>
            <p className="text-sm text-surface-500">
              {MOCK_INTEGRATIONS.filter((i) => i.status === "connected").length}{" "}
              active connections
            </p>
          </div>
          <Button onClick={() => setShowAvailable(!showAvailable)}>
            <Plus className="h-4 w-4" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {MOCK_INTEGRATIONS.map((integration) => {
            const def = INTEGRATION_REGISTRY.find(
              (r) => r.type === integration.type
            );
            const IconComponent = def
              ? iconMap[def.icon] || Plug
              : Plug;
            const status = statusStyles[integration.status];
            const StatusIcon = status.icon;

            return (
              <Card key={integration.id}>
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      integration.status === "connected"
                        ? "bg-brand-50"
                        : integration.status === "error"
                        ? "bg-red-50"
                        : "bg-surface-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-6 w-6 ${
                        integration.status === "connected"
                          ? "text-brand-600"
                          : integration.status === "error"
                          ? "text-red-500"
                          : "text-surface-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-surface-900">
                        {integration.name}
                      </h3>
                      <Badge variant={status.variant} dot>
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-surface-400 capitalize">
                      {integration.type.replace("_", " ")}
                    </p>

                    {integration.last_used_at && (
                      <p className="mt-1 text-xs text-surface-400">
                        Last used {formatRelative(integration.last_used_at)}
                      </p>
                    )}

                    {integration.error_message && (
                      <div className="mt-2 flex items-start gap-1.5 rounded-md bg-red-50 p-2 text-xs text-red-600">
                        <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                        {integration.error_message}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    {integration.status === "error" && (
                      <Button size="sm">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Reconnect
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Available Integrations */}
      {showAvailable && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-surface-900">
            Available Integrations
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {INTEGRATION_REGISTRY.map((def) => {
              const IconComponent = iconMap[def.icon] || Plug;
              const isConnected = MOCK_INTEGRATIONS.some(
                (i) => i.type === def.type && i.status === "connected"
              );

              return (
                <Card key={def.type} hover>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-50">
                      <IconComponent className="h-7 w-7 text-surface-600" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-surface-900">
                      {def.name}
                    </h3>
                    <p className="mt-1 text-xs text-surface-500">
                      {def.description}
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {def.actions.map((action) => (
                        <Badge key={action.id} variant="neutral">
                          {action.name}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="mt-3 w-full"
                      variant={isConnected ? "outline" : "primary"}
                      size="sm"
                      disabled={isConnected}
                    >
                      {isConnected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
