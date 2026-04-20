---
name: Next.js 16 breaking changes note
description: This repo uses Next.js 16.2.1 which has breaking changes from training-data-era Next.js; check the bundled docs before API-heavy work
type: project
---

Repo pins `next: 16.2.1` and `react: 19.2.4`. AGENTS.md explicitly warns: "This is NOT the Next.js you know."

**Why:** APIs, conventions, and file structure may differ from training data. Silent failures from using older API shapes.

**How to apply:**
- Before writing route handlers, server actions, metadata, params, or middleware, read `node_modules/next/dist/docs/` if touching those areas.
- For pure client-component work (marketing UI, Framer Motion, Tailwind, client-side hooks), standard patterns still apply — no need to pull docs each time.
- Gotcha already seen: `document.startViewTransition` must be called with `document` as `this` — destructuring it breaks with "Illegal invocation." (See `components/marketing/transition-link.tsx`.)
