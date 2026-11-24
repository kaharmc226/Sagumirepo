# Contributing — Sagumi (A26-CS277)

## Package manager

This repo uses **npm workspaces**. Do not use pnpm or yarn, and do not commit other lock files. Always run `npm install` from the **repo root**.

## Module ownership

One module, one owner. Changes to someone else's module must be reviewed by that owner.

| Area | Owner |
|---|---|
| `apps/api` (Express, DB schema) | Kahar |
| `apps/web` (UI, chat widget) | Annisa |
| `services/ai/app` (`main.py`, routers, config, deploy) | Al-Fath |
| `services/ai/prompts` | Al-Fath |
| `services/ai/training`, `services/ai/models`, `services/ai/rag` | Raffi |
| `services/ai/notebooks` | Rezki & Fatih |
| `docs/API_CONTRACT.md` | Kahar + Al-Fath + Raffi |

## Branches

> The branch workflow is still being finalized. Until then, ask Kahar before pushing directly to `main`.

- Feature branch naming: `feat/<task-id>-<short-slug>`, e.g. `feat/BE-05-create-order`.
- Bug fixes: `fix/<task-id>-<short-slug>`.
- Docs: `docs/<short-slug>`.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(api): add POST /orders endpoint
fix(web): handle upload error state
docs: update API contract for chat history
chore: bump dependencies
```

Common scopes: `api`, `web`, `ai`, `db`, `docs`.

## Pull requests

- At least **1 review** from another team member before merging.
- Mention the task ID (e.g. `BE-05`) in the PR title or description, which also helps with logbooks.
- Describe what changed and how you tested it.
- Changes to `API_CONTRACT.md` after freeze need approval from Kahar, Al-Fath and Raffi.

## Secrets

- Never commit `.env` files, API keys or passwords.
- Add new variables to `.env.example` with a placeholder value.
