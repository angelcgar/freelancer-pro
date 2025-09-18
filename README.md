# FreelancePro - SaaS Project Management for Freelancers

Comprehensive SaaS platform to help freelancers manage projects, clients, contracts, invoices, and business operations efficiently.

## Tech Stack

- **Frontend**: Next.js 15 (App Router, TypeScript), Shadcn/ui, TailwindCSS, React Query, Zustand, Axios
- **Backend**: Supabase (Database, Real-time, Storage, Edge Functions), Clerk (Auth), Stripe (Payments), Resend (Emails)
- **Deployment**: Vercel (Frontend), Supabase (Backend)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### 1. Clone and Install

```bash
git clone <repository-url>
cd freelance-pro
pnpm install
```

### 2. Environment Setup

Copy the environment variables template:

```bash
cp env.example .env.local
```

Fill in your environment variables in `.env.local`:

#### Clerk Authentication
1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Copy your publishable key and secret key

#### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > API to get your URL and anon key
4. Copy service role key for server-side operations

#### Stripe Setup (Optional for MVP)
1. Create account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the dashboard
3. Set up webhooks for payment processing

#### Resend Setup (Optional for MVP)
1. Create account at [resend.com](https://resend.com)
2. Get your API key from the dashboard

### 3. Database Setup

Run the SQL schema from `PROJECT_BRIEF.md` in your Supabase SQL editor to create the required tables.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/               # Shadcn UI components
│   └── layout/           # Layout components (navbar, sidebar)
├── lib/
│   ├── supabase.ts       # Supabase client & types
│   └── utils.ts          # Utility functions
└── providers/            # React providers (Clerk, React Query)
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm check` - Run Biome check and fix

## Features

### MVP Core Features
- ✅ Authentication & User Management (Clerk)
- ✅ Dashboard Layout with Navigation
- 🚧 Project Management
- 🚧 Client Management
- 🚧 Contract & Proposal Management
- 🚧 Invoice Management
- 🚧 Payment Integration (Stripe)
- 🚧 Time Tracking
- 🚧 Basic Reporting
- 🚧 Notifications & Communication

## Development Notes

- Uses Clerk for authentication with JWT/session cookies
- Supabase for database with Row Level Security (RLS)
- Shadcn/ui for consistent, accessible components
- React Query for server state management
- Zustand for client state management
- Biome for linting and formatting

## Deployment

The application is configured for deployment on Vercel with Supabase as the backend. Make sure to set all environment variables in your deployment platform.

## Contributing

1. Follow the existing code style and patterns
2. Use Biome for code formatting and linting
3. Test your changes thoroughly
4. Update documentation as needed
