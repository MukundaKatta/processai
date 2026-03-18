"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Workflow,
  FileSearch,
  CheckCircle2,
  Plug,
  LayoutTemplate,
  ScrollText,
  Clock,
  Settings,
  Calculator,
  AlertTriangle,
  Cpu,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/processes", label: "Processes", icon: Workflow },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/documents", label: "Documents", icon: FileSearch },
  { href: "/approvals", label: "Approvals", icon: CheckCircle2, badge: 3 },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/audit", label: "Audit Trail", icon: ScrollText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-surface-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-surface-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <Cpu className="h-4.5 w-4.5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold text-surface-900">Process</span>
          <span className="text-lg font-bold text-brand-600">AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px]",
                    isActive ? "text-brand-600" : "text-surface-400"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger-500 px-1.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Exceptions Quick Link */}
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold">2 Pending Exceptions</span>
          </div>
          <p className="mt-1 text-xs text-amber-600">
            Items need human review
          </p>
          <Link
            href="/approvals?tab=exceptions"
            className="mt-2 block text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            Review now &rarr;
          </Link>
        </div>

        {/* ROI Summary */}
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center gap-2 text-emerald-700">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-semibold">ROI This Month</span>
          </div>
          <p className="mt-1 text-lg font-bold text-emerald-700">$28,400</p>
          <p className="text-xs text-emerald-600">847 hours saved</p>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            AC
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-surface-900">
              Acme Corp
            </p>
            <p className="text-xs text-surface-400">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
