import { IntegrationType } from "@/types";

export interface IntegrationDefinition {
  type: IntegrationType;
  name: string;
  description: string;
  icon: string;
  configFields: ConfigField[];
  actions: IntegrationAction[];
}

interface ConfigField {
  key: string;
  label: string;
  type: "text" | "password" | "url" | "select";
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface IntegrationAction {
  id: string;
  name: string;
  description: string;
  inputSchema: Record<string, string>;
  outputSchema: Record<string, string>;
}

export const INTEGRATION_REGISTRY: IntegrationDefinition[] = [
  {
    type: "slack",
    name: "Slack",
    description: "Send messages, create channels, and receive notifications via Slack",
    icon: "MessageSquare",
    configFields: [
      { key: "bot_token", label: "Bot Token", type: "password", required: true, placeholder: "xoxb-..." },
      { key: "default_channel", label: "Default Channel", type: "text", required: false, placeholder: "#general" },
    ],
    actions: [
      {
        id: "send_message",
        name: "Send Message",
        description: "Send a message to a Slack channel or user",
        inputSchema: { channel: "string", message: "string", thread_ts: "string?" },
        outputSchema: { ts: "string", ok: "boolean" },
      },
      {
        id: "create_channel",
        name: "Create Channel",
        description: "Create a new Slack channel",
        inputSchema: { name: "string", is_private: "boolean?" },
        outputSchema: { channel_id: "string" },
      },
    ],
  },
  {
    type: "email",
    name: "Email (SMTP/SendGrid)",
    description: "Send emails, attach documents, and track delivery",
    icon: "Mail",
    configFields: [
      { key: "provider", label: "Provider", type: "select", required: true, options: [
        { label: "SendGrid", value: "sendgrid" },
        { label: "SMTP", value: "smtp" },
      ]},
      { key: "api_key", label: "API Key / Password", type: "password", required: true },
      { key: "from_email", label: "From Email", type: "text", required: true, placeholder: "noreply@company.com" },
      { key: "from_name", label: "From Name", type: "text", required: false, placeholder: "ProcessAI" },
    ],
    actions: [
      {
        id: "send_email",
        name: "Send Email",
        description: "Send an email to one or more recipients",
        inputSchema: { to: "string[]", subject: "string", body: "string", attachments: "string[]?" },
        outputSchema: { message_id: "string", status: "string" },
      },
    ],
  },
  {
    type: "google_drive",
    name: "Google Drive",
    description: "Upload, download, and manage files in Google Drive",
    icon: "HardDrive",
    configFields: [
      { key: "client_id", label: "OAuth Client ID", type: "text", required: true },
      { key: "client_secret", label: "OAuth Client Secret", type: "password", required: true },
      { key: "folder_id", label: "Default Folder ID", type: "text", required: false },
    ],
    actions: [
      {
        id: "upload_file",
        name: "Upload File",
        description: "Upload a file to Google Drive",
        inputSchema: { file_data: "string", filename: "string", folder_id: "string?" },
        outputSchema: { file_id: "string", web_url: "string" },
      },
      {
        id: "download_file",
        name: "Download File",
        description: "Download a file from Google Drive",
        inputSchema: { file_id: "string" },
        outputSchema: { file_data: "string", filename: "string" },
      },
    ],
  },
  {
    type: "google_sheets",
    name: "Google Sheets",
    description: "Read and write data to Google Sheets spreadsheets",
    icon: "Table",
    configFields: [
      { key: "client_id", label: "OAuth Client ID", type: "text", required: true },
      { key: "client_secret", label: "OAuth Client Secret", type: "password", required: true },
    ],
    actions: [
      {
        id: "read_range",
        name: "Read Range",
        description: "Read data from a spreadsheet range",
        inputSchema: { spreadsheet_id: "string", range: "string" },
        outputSchema: { values: "string[][]" },
      },
      {
        id: "write_range",
        name: "Write Range",
        description: "Write data to a spreadsheet range",
        inputSchema: { spreadsheet_id: "string", range: "string", values: "string[][]" },
        outputSchema: { updated_cells: "number" },
      },
      {
        id: "append_row",
        name: "Append Row",
        description: "Append a row to the end of a sheet",
        inputSchema: { spreadsheet_id: "string", sheet_name: "string", values: "string[]" },
        outputSchema: { updated_range: "string" },
      },
    ],
  },
  {
    type: "rest_api",
    name: "REST API",
    description: "Make HTTP requests to any REST API endpoint",
    icon: "Globe",
    configFields: [
      { key: "base_url", label: "Base URL", type: "url", required: true, placeholder: "https://api.example.com" },
      { key: "auth_type", label: "Auth Type", type: "select", required: true, options: [
        { label: "None", value: "none" },
        { label: "Bearer Token", value: "bearer" },
        { label: "API Key Header", value: "api_key" },
        { label: "Basic Auth", value: "basic" },
      ]},
      { key: "auth_value", label: "Auth Value", type: "password", required: false },
      { key: "auth_header", label: "Auth Header Name", type: "text", required: false, placeholder: "X-API-Key" },
    ],
    actions: [
      {
        id: "http_request",
        name: "HTTP Request",
        description: "Make an HTTP request",
        inputSchema: { method: "string", path: "string", body: "object?", headers: "object?" },
        outputSchema: { status: "number", body: "object", headers: "object" },
      },
    ],
  },
  {
    type: "webhook",
    name: "Webhook",
    description: "Receive incoming webhooks to trigger processes",
    icon: "Webhook",
    configFields: [
      { key: "secret", label: "Webhook Secret", type: "password", required: false },
      { key: "allowed_ips", label: "Allowed IPs (comma-separated)", type: "text", required: false },
    ],
    actions: [
      {
        id: "receive",
        name: "Receive Webhook",
        description: "Listen for incoming webhook events",
        inputSchema: {},
        outputSchema: { payload: "object", headers: "object" },
      },
    ],
  },
];

export function getIntegrationDef(type: IntegrationType): IntegrationDefinition | undefined {
  return INTEGRATION_REGISTRY.find((i) => i.type === type);
}
