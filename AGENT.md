# AGENT.md - GPA Calculator Project

## Commands
- Build: `npm run build` or `pnpm run build`
- Dev server: `npm run dev` or `pnpm run dev` (uses turbopack)
- Lint: `npm run lint` or `pnpm run lint`
- Production: `npm run start` or `pnpm start`

## Architecture
- Next.js 15 React app with TypeScript
- Uses Tailwind CSS v4 and shadcn/ui components
- Main components: `components/semesterTable/` for GPA calculations, `components/ui/` for reusable UI
- App Router structure with pages in `app/` directory
- Single utility file at `lib/utils.ts` with `cn()` helper

## Code Style
- TypeScript strict mode enabled
- Use `"use client"` directive for client components
- Import aliases: `@/` maps to project root, `@/components`, `@/lib`
- shadcn/ui conventions: components in `components/ui/`, styled with cva and tw-merge
- Tailwind classes with responsive prefixes (sm:, md:) and important modifiers (!text-sm)
- React 19 features supported
- Use Radix UI primitives for complex components
- File naming: kebab-case for directories, camelCase for components
