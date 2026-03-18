import { Queue } from "bullmq";
import { QUEUE_NAMES, redisConnection, defaultJobOptions } from "./config";

export const processExecutionQueue = new Queue(
  QUEUE_NAMES.PROCESS_EXECUTION,
  { connection: redisConnection, defaultJobOptions }
);

export const documentExtractionQueue = new Queue(
  QUEUE_NAMES.DOCUMENT_EXTRACTION,
  { connection: redisConnection, defaultJobOptions }
);

export const notificationQueue = new Queue(
  QUEUE_NAMES.NOTIFICATION,
  { connection: redisConnection, defaultJobOptions }
);

export const scheduledProcessQueue = new Queue(
  QUEUE_NAMES.SCHEDULED_PROCESS,
  { connection: redisConnection, defaultJobOptions }
);

// Helper to enqueue a process run
export async function enqueueProcessRun(
  processId: string,
  runId: string,
  inputData: Record<string, unknown>
) {
  return processExecutionQueue.add("execute", {
    processId,
    runId,
    inputData,
    enqueuedAt: new Date().toISOString(),
  });
}

// Helper to enqueue document extraction
export async function enqueueDocumentExtraction(
  documentId: string,
  fileUrl: string,
  documentType: string
) {
  return documentExtractionQueue.add("extract", {
    documentId,
    fileUrl,
    documentType,
    enqueuedAt: new Date().toISOString(),
  });
}

// Helper to send notification
export async function enqueueNotification(
  channel: "slack" | "email",
  recipient: string,
  subject: string,
  message: string,
  metadata?: Record<string, unknown>
) {
  return notificationQueue.add("send", {
    channel,
    recipient,
    subject,
    message,
    metadata,
    enqueuedAt: new Date().toISOString(),
  });
}
