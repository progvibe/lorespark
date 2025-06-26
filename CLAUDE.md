# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a LoreSpark application built with SST v3, featuring a React web frontend and AWS Lambda functions.

**Architecture:**
- `packages/web/` - React frontend (Vite + TanStack Router + TailwindCSS + shadcn/ui)
- `packages/functions/` - AWS Lambda functions (Hono framework)
- `infra/` - SST infrastructure definitions
- `src/` - Shared database schema and utilities (Drizzle ORM)

**Key Infrastructure Components:**
- Aurora PostgreSQL database with VPC
- OpenAuth-based authentication system
- Static site hosting for React app
- API Gateway with Lambda functions
- Integration with Fal AI service

## Development Commands

**Root level (SST commands):**
```bash
# Database operations
npm run db                    # Open Drizzle Kit shell
npx drizzle-kit studio       # Database studio (via sst shell)

# Deploy/develop
sst dev                      # Start development environment
sst deploy                   # Deploy to AWS
```

**Web frontend (packages/web/):**
```bash
# Development
pnpm dev                     # Start dev server (Vite)
pnpm start                   # Start dev server on port 3000
pnpm build                   # Build for production
pnpm test                    # Run tests (Vitest)
pnpm lint                    # Run ESLint

# UI Components
pnpx shadcn@latest add button  # Add shadcn/ui components
```

**Functions (packages/functions/):**
- No specific build commands (handled by SST)
- Uses TypeScript with ES modules

## Technology Stack

**Frontend:**
- React 19 with TypeScript
- TanStack Router (file-based routing in `src/routes/`)
- TanStack Query for data fetching
- TailwindCSS + shadcn/ui components
- Vite build system

**Backend:**
- Hono framework for Lambda functions
- OpenAuth for authentication
- Drizzle ORM with PostgreSQL
- Valibot for validation

**Infrastructure:**
- SST v3 for AWS deployment
- Aurora PostgreSQL Serverless
- VPC configuration
- Static site hosting

## Database

- Uses Drizzle ORM with PostgreSQL
- Schema defined in `src/schema.sql.ts`
- Configuration in `drizzle.config.ts`
- Access via `sst shell drizzle-kit` or `npm run db`

## Authentication

- OpenAuth-based system
- Handler in `packages/functions/src/auth.ts`
- Auth context in web app: `packages/web/src/AuthContext.tsx`

## Key Files

- `sst.config.ts` - Main SST configuration
- `packages/web/src/routes/` - React Router routes
- `packages/functions/src/api.ts` - Main API handler
- `infra/` - Infrastructure as code definitions
- `src/schema.sql.ts` - Database schema

## Notes

- Uses pnpm for web package management
- Environment variables injected via SST
- File-based routing automatically generates route tree
- shadcn/ui components configured and ready to use