"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-200 bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-surface-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-surface-500">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search processes..."
            className="h-9 w-64 rounded-lg border border-surface-200 bg-surface-50 pl-9 pr-3 text-sm text-surface-700 placeholder:text-surface-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <button className="relative rounded-lg p-2 text-surface-400 hover:bg-surface-50 hover:text-surface-600">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
          JD
        </div>
      </div>
    </header>
  );
}
