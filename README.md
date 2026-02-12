## Fundocs

A playful remake of the OpenAI Platform docs structure, rewritten for non-technical readers.

Current scope implemented:

- Core Concepts
- Agents
- Tools

## Getting Started

Run the dev server:

```bash
pnpm dev
```

Then open `http://localhost:3000`.

Key routes:

- `/` home
- `/docs` docs home
- `/docs/core-concepts`, `/docs/agents`, `/docs/tools` section landings

Content lives in `content/docs/**.mdx`.

Build:

```bash
pnpm build
pnpm start
```
