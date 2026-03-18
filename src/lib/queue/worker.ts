import { Worker, Job } from "bullmq";
import { QUEUE_NAMES, redisConnection } from "./config";

// Process Execution Worker
const processWorker = new Worker(
  QUEUE_NAMES.PROCESS_EXECUTION,
  async (job: Job) => {
    const { processId, runId, inputData } = job.data;
    console.log(`[ProcessWorker] Executing process ${processId}, run ${runId}`);

    try {
      // Fetch process definition
      // Execute each step sequentially
      // Handle conditions, approvals, integrations
      // Update run status in database
      // Log audit trail entries

      await job.updateProgress(100);
      return { success: true, runId };
    } catch (error) {
      console.error(`[ProcessWorker] Error:`, error);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 5 }
);

// Document Extraction Worker
const documentWorker = new Worker(
  QUEUE_NAMES.DOCUMENT_EXTRACTION,
  async (job: Job) => {
    const { documentId, fileUrl, documentType } = job.data;
    console.log(`[DocWorker] Extracting ${documentType} from ${documentId}`);

    try {
      // Call AI extraction service
      // Parse response into structured fields
      // Calculate confidence scores
      // Flag for review if confidence below threshold
      // Update document record in database

      await job.updateProgress(100);
      return { success: true, documentId };
    } catch (error) {
      console.error(`[DocWorker] Error:`, error);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 3 }
);

// Notification Worker
const notificationWorker = new Worker(
  QUEUE_NAMES.NOTIFICATION,
  async (job: Job) => {
    const { channel, recipient, subject, message } = job.data;
    console.log(`[NotifWorker] Sending ${channel} to ${recipient}`);

    try {
      if (channel === "slack") {
        // Send via Slack API
      } else if (channel === "email") {
        // Send via email service
      }
      return { success: true };
    } catch (error) {
      console.error(`[NotifWorker] Error:`, error);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 10 }
);

// Scheduled Process Worker
const scheduleWorker = new Worker(
  QUEUE_NAMES.SCHEDULED_PROCESS,
  async (job: Job) => {
    const { processId, scheduleId } = job.data;
    console.log(`[ScheduleWorker] Triggering scheduled process ${processId}`);

    try {
      // Create a new process run
      // Enqueue it on the process execution queue
      // Update schedule's last_run_at
      return { success: true };
    } catch (error) {
      console.error(`[ScheduleWorker] Error:`, error);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 3 }
);

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down workers...");
  await Promise.all([
    processWorker.close(),
    documentWorker.close(),
    notificationWorker.close(),
    scheduleWorker.close(),
  ]);
  process.exit(0);
});

console.log("ProcessAI workers started.");
