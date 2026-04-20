## SmartPlay skillbase audit (2026-04-20)

### Codebase read

SmartPlay is a Next.js 16 App Router youth soccer performance platform. It includes public marketing pages, athlete/coach/parent/admin app areas, Prisma/PostgreSQL production mode, demo JSON fallback, NextAuth credentials auth, local/S3 storage, Stripe athlete billing, OpenAI-backed AI coaching, and ffmpeg-powered video review.

The product center is not an agency, contractor, or luxury-service business. The useful emotional target is serious but supportive: a calm soccer development system for athletes, coaches, parents, schools, clubs, nonprofits, and access-aware programs.

### Skillbase decision

The old custom skillbase was replaced because it carried unrelated business assumptions: agency client operations, unrelated niche outreach, contract-document systems, vault-state workflows, old assistant references, and luxury-service creative standards.

The retained system/runtime skills are `.system`, `codex-primary-runtime`, and `pdf`. The custom layer is now a SmartPlay-specific Codex skill pack:

- `smartplay-orchestrator`
- `smartplay-build-engineer`
- `smartplay-product-architect`
- `smartplay-design-system`
- `smartplay-interaction-motion`
- `smartplay-copy-content`
- `smartplay-ai-coach-prompts`
- `smartplay-soccer-domain`
- `smartplay-research-strategy`
- `smartplay-quality-auditor`
- `smartplay-security-privacy`
- `smartplay-performance-lab`
- `smartplay-deploy-ops`
- `smartplay-growth-ops`

### Validation

All new custom skills passed `quick_validate.py`. A residual-term scan across the new SmartPlay skill files returned no matches for the removed business and assistant references.
