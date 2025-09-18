# FreelancePro - SaaS Project Management for Freelancers

## Project Overview
FreelancePro is a comprehensive SaaS platform designed to help freelancers manage their projects, clients, contracts, invoices, and business operations efficiently. The goal is to launch an MVP within 1-2 months.

## Target Users
- Individual freelancers
- Small freelance teams
- Creative professionals (developers, designers, writers, consultants)

## Tech Stack

### Frontend
- **Next.js 15** (App Router, TypeScript)
- **Shadcn/ui** (Component library)
- **TailwindCSS** (Styling)
- **React Query (TanStack Query)** (Data fetching & caching)
- **Zustand** (State management)
- **Axios** (HTTP client)

### Backend & Services
- **Supabase** (Database, Real-time, Storage, Edge Functions)
- **Clerk** (Authentication with JWT/Session cookies, refresh tokens)
- **Stripe** (Payments & subscriptions)
- **Resend** (Transactional emails)
- **Supabase Storage** (File storage for contracts, invoices, documents)

### Deployment
- **Vercel** (Frontend deployment)
- **Supabase** (Backend services)

## MVP Core Features

### 1. Authentication & User Management
- [x] Sign up/Sign in with Clerk
- [x] User profile management
- [x] Password reset functionality
- [x] JWT session management

### 2. Dashboard
- [x] Overview of active projects
- [x] Recent activities
- [x] Revenue analytics (basic)
- [x] Quick actions

### 3. Project Management
- [x] Create, edit, delete projects
- [x] Project status tracking (Not Started, In Progress, Completed, On Hold)
- [x] Project categories/tags
- [x] Time tracking per project
- [x] Project deadlines
- [x] File attachments

### 4. Client Management
- [x] Add, edit, delete clients
- [x] Client contact information
- [x] Client project history
- [x] Client communications log

### 5. Contract & Proposal Management
- [x] Create contracts/proposals
- [x] Contract templates
- [x] Digital signatures (basic)
- [x] Contract status tracking
- [x] PDF generation and storage

### 6. Invoice Management
- [x] Create, send invoices
- [x] Invoice templates
- [x] Invoice status tracking (Draft, Sent, Paid, Overdue)
- [x] Automatic payment reminders
- [x] PDF generation

### 7. Payment Integration
- [x] Stripe integration for invoice payments
- [x] Payment status tracking
- [x] Payment history

### 8. Time Tracking
- [x] Start/stop timer for projects
- [x] Manual time entry
- [x] Time reports
- [x] Billable hours tracking

### 9. Basic Reporting
- [x] Revenue reports
- [x] Time tracking reports
- [x] Project completion rates
- [x] Client payment history

### 10. Notifications & Communication
- [x] Email notifications via Resend
- [x] Invoice reminders
- [x] Project deadline alerts

## Database Schema (Supabase)

```sql
-- Users (handled by Clerk, but we'll store additional data)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'on_hold')) DEFAULT 'not_started',
  category TEXT,
  hourly_rate DECIMAL(10,2),
  fixed_price DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contracts
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'sent', 'signed', 'expired')) DEFAULT 'draft',
  file_url TEXT,
  signed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  status TEXT CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
  due_date DATE,
  paid_date TIMESTAMP WITH TIME ZONE,
  stripe_payment_intent_id TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time Tracking
CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  is_billable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Project Structure

```
freelance-pro/
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   └── api/
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── forms/
│   │   ├── charts/
│   │   └── layout/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── stripe.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── hooks/
│   ├── store/ (Zustand stores)
│   ├── types/
│   └── constants/
├── public/
└── docs/
```

## Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

```

## Key Implementation Notes

1. Authentication Flow: Use Clerk for complete auth handling

2. Database: Supabase PostgreSQL with Row Level Security (RLS)

3. File Storage: Supabase Storage for contracts and invoices

4. Real-time: Use Supabase real-time for live updates

5. Payments: Stripe Checkout for invoice payments

6. Emails: Resend for transactional emails

7. State Management: Zustand for client state, React Query for server state

## Success Metrics for MVP

- User can sign up and complete onboarding

- Create and manage clients and projects

- Track time and generate invoices

- Receive payments via Stripe

- Generate basic reports

## Post-MVP Features (Future Iterations)

- Advanced reporting and analytics

- Team collaboration features

- Mobile app

- API for integrations

- Advanced contract templates

- Expense tracking

- Tax reporting

- Multi-currency support
