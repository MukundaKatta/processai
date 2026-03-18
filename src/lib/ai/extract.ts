import { ExtractedField, DocumentType } from "@/types";

const EXTRACTION_SCHEMAS: Record<DocumentType, string[]> = {
  invoice: [
    "vendor_name",
    "vendor_address",
    "invoice_number",
    "invoice_date",
    "due_date",
    "subtotal",
    "tax_amount",
    "total_amount",
    "currency",
    "payment_terms",
    "line_items",
    "po_number",
  ],
  receipt: [
    "merchant_name",
    "merchant_address",
    "date",
    "total_amount",
    "tax_amount",
    "payment_method",
    "items",
    "currency",
  ],
  purchase_order: [
    "po_number",
    "vendor_name",
    "order_date",
    "delivery_date",
    "ship_to_address",
    "line_items",
    "subtotal",
    "tax_amount",
    "total_amount",
    "terms",
    "requested_by",
  ],
  expense_report: [
    "employee_name",
    "employee_id",
    "department",
    "submission_date",
    "period_start",
    "period_end",
    "expenses",
    "total_amount",
    "category",
    "purpose",
    "approver",
  ],
  contract: [
    "party_a",
    "party_b",
    "effective_date",
    "expiration_date",
    "contract_value",
    "payment_terms",
    "key_terms",
    "governing_law",
  ],
  other: ["title", "date", "content_summary"],
};

export async function extractDocumentFields(
  fileContent: string,
  documentType: DocumentType
): Promise<{ fields: Record<string, ExtractedField>; overallConfidence: number }> {
  const schema = EXTRACTION_SCHEMAS[documentType];

  // Build the extraction prompt
  const prompt = `You are a document extraction AI. Extract the following fields from this ${documentType} document.

Fields to extract: ${schema.join(", ")}

Document content:
${fileContent}

Return a JSON object where each key is a field name and each value is an object with:
- "value": the extracted value (string or number)
- "confidence": a number from 0 to 1 indicating extraction confidence

If a field cannot be found, set value to null and confidence to 0.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a precise document extraction AI. Always return valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const extracted = JSON.parse(data.choices[0].message.content);

    const fields: Record<string, ExtractedField> = {};
    let totalConfidence = 0;
    let fieldCount = 0;

    for (const key of schema) {
      const field = extracted[key] || { value: null, confidence: 0 };
      fields[key] = {
        key,
        value: field.value,
        confidence: field.confidence || 0,
      };
      totalConfidence += field.confidence || 0;
      fieldCount++;
    }

    const overallConfidence = fieldCount > 0 ? totalConfidence / fieldCount : 0;

    return { fields, overallConfidence };
  } catch (error) {
    console.error("Document extraction error:", error);
    // Return empty fields on error
    const fields: Record<string, ExtractedField> = {};
    for (const key of schema) {
      fields[key] = { key, value: null, confidence: 0 };
    }
    return { fields, overallConfidence: 0 };
  }
}

export async function convertProcessDescription(
  description: string
): Promise<{ steps: Array<{ name: string; type: string; description: string; config: Record<string, unknown> }> }> {
  const prompt = `You are a business process automation expert. Convert this natural language description into a structured workflow.

Process description:
${description}

Return a JSON object with a "steps" array. Each step should have:
- "name": short name for the step
- "type": one of "trigger", "action", "condition", "approval", "notification", "document_extract", "integration", "human_review", "delay", "loop"
- "description": what this step does
- "config": relevant configuration object

Make the workflow practical and include appropriate error handling and notification steps.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a business process automation expert. Return valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Process conversion error:", error);
    return { steps: [] };
  }
}
