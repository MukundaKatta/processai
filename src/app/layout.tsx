import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProcessAI — Agentic Process Automation",
  description:
    "AI-powered process automation for enterprise back-office operations. Automate invoices, approvals, onboarding, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="page-container">{children}</main>
      </body>
    </html>
  );
}
