import { ConnectionOptions } from "bullmq";

export const QUEUE_NAMES = {
  PROCESS_EXECUTION: "process-execution",
  DOCUMENT_EXTRACTION: "document-extraction",
  NOTIFICATION: "notification",
  SCHEDULED_PROCESS: "scheduled-process",
} as const;

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
};

export const defaultJobOptions = {
  removeOnComplete: { count: 1000 },
  removeOnFail: { count: 5000 },
  attempts: 3,
  backoff: {
    type: "exponential" as const,
    delay: 2000,
  },
};
