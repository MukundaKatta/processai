# ProcessAI

**AI-Powered Enterprise Process Automation Platform**

ProcessAI is an enterprise platform for automating business processes with AI. Design workflows, manage document processing, handle approval chains, set up integrations, track audit trails, and schedule recurring automations -- all with built-in AI intelligence.

## Features

- **Process Designer** -- Visual workflow builder for creating and configuring automation processes
- **Document Processing** -- AI-powered document intake, classification, and data extraction
- **Approval Workflows** -- Multi-step approval chains with role-based routing
- **Integration Hub** -- Connect to external systems and APIs with pre-built connectors
- **Template Library** -- Pre-built process templates for common enterprise workflows
- **Audit Trail** -- Complete audit log of all process actions and decisions
- **Scheduled Automation** -- Cron-based scheduling for recurring processes
- **ROI Calculator** -- Measure cost savings and efficiency gains from automation
- **Background Processing** -- BullMQ-powered async job execution with Redis

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Job Queue:** BullMQ + ioredis
- **Backend:** Supabase (Auth, Database, SSR)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **File Upload:** react-dropzone
- **Scheduling:** cron-parser
- **Validation:** Zod
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Redis instance (for background jobs)
- Supabase project

### Installation

```bash
git clone <repository-url>
cd processai
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
REDIS_URL=your_redis_url
```

### Development

```bash
npm run dev          # Start the web application
npm run worker       # Start the background job worker
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Redirect to dashboard
│   ├── dashboard/          # Overview & ROI calculator
│   ├── processes/          # Process designer & list
│   ├── documents/          # Document processing
│   ├── approvals/          # Approval workflows
│   ├── integrations/       # External connectors
│   ├── templates/          # Process templates
│   ├── audit/              # Audit trail
│   ├── schedules/          # Scheduled automations
│   └── settings/           # Configuration
├── components/
│   ├── layout/             # Header, navigation
│   ├── dashboard/          # Metrics, charts, ROI
│   └── ui/                 # Reusable UI components
└── lib/
    └── queue/              # BullMQ worker & job definitions
```

## License

MIT
