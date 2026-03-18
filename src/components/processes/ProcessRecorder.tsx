"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Wand2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface GeneratedStep {
  name: string;
  type: string;
  description: string;
}

const TYPE_COLORS: Record<string, string> = {
  trigger: "bg-sky-100 text-sky-700",
  action: "bg-brand-100 text-brand-700",
  condition: "bg-amber-100 text-amber-700",
  approval: "bg-violet-100 text-violet-700",
  notification: "bg-emerald-100 text-emerald-700",
  document_extract: "bg-orange-100 text-orange-700",
  integration: "bg-indigo-100 text-indigo-700",
  human_review: "bg-red-100 text-red-700",
  delay: "bg-surface-100 text-surface-600",
  loop: "bg-pink-100 text-pink-700",
};

const EXAMPLE_DESCRIPTIONS = [
  "When a new invoice PDF is uploaded, extract the vendor name, amount, and due date. If the amount is over $5,000, route to the finance manager for approval. Otherwise, auto-approve and post to our accounting system. Send a Slack notification when done.",
  "When HR submits a new hire form, create their email account, Slack account, and GitHub access. Send welcome documents for e-signature. Assign role-based training and notify their team in Slack.",
  "Every Monday at 9am, pull all pending expense reports from the shared drive. Scan receipts and verify against company policy. Flag violations for finance review. Approved reports go to payroll.",
];

export function ProcessRecorder() {
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [steps, setSteps] = useState<GeneratedStep[]>([]);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setGenerating(true);

    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 2000));

    const mockSteps: GeneratedStep[] = [
      { name: "Receive Document", type: "trigger", description: "Triggered when a new file is uploaded" },
      { name: "Extract Data", type: "document_extract", description: "AI extracts key fields from the document" },
      { name: "Validate Data", type: "action", description: "Cross-reference extracted data with existing records" },
      { name: "Check Threshold", type: "condition", description: "Evaluate amount against approval thresholds" },
      { name: "Route for Approval", type: "approval", description: "Send to appropriate approver based on rules" },
      { name: "Update System", type: "integration", description: "Post approved data to connected systems" },
      { name: "Send Notification", type: "notification", description: "Notify stakeholders of completion" },
    ];
    setSteps(mockSteps);
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 p-2.5">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-surface-900">
              AI Process Recorder
            </h3>
            <p className="text-sm text-surface-500">
              Describe your business process in plain English. AI will convert it
              into an automated workflow.
            </p>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="Describe your business process here... For example: 'When a new invoice arrives via email, extract the key data, validate against our purchase orders, and route for approval based on the amount.'"
          className="w-full rounded-lg border border-surface-200 bg-surface-50 p-4 text-sm text-surface-700 placeholder:text-surface-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-none"
        />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs text-surface-400">Try:</span>
            {EXAMPLE_DESCRIPTIONS.map((desc, i) => (
              <button
                key={i}
                onClick={() => setDescription(desc)}
                className="text-xs text-brand-600 hover:text-brand-700 hover:underline"
              >
                Example {i + 1}
              </button>
            ))}
          </div>
          <Button onClick={handleGenerate} loading={generating} disabled={!description.trim()}>
            <Sparkles className="h-4 w-4" />
            Generate Workflow
          </Button>
        </div>
      </Card>

      {/* Generated Steps */}
      {steps.length > 0 && (
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-surface-900">
              Generated Workflow
            </h3>
            <Badge variant="success">{steps.length} steps</Badge>
          </div>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-500 bg-white text-xs font-bold text-brand-600">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-8 w-0.5 bg-surface-200" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-surface-900">
                      {step.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        TYPE_COLORS[step.type] || "bg-surface-100 text-surface-600"
                      }`}
                    >
                      {step.type.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-surface-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3 border-t border-surface-100 pt-4">
            <Button>
              Create Process
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setSteps([])}>
              Regenerate
            </Button>
          </div>
        </Card>
      )}

      {generating && (
        <Card>
          <div className="flex items-center justify-center gap-3 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            <span className="text-sm text-surface-500">
              AI is analyzing your process description...
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
