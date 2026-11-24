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

| Branch | Purpose | How code gets in |
|---|---|---|
| `main` | Stable, deployed, demo-ready | Merge from `dev` only (by Kahar, after testing) |
| `dev` | Shared integration branch (default branch) | Pull Request + 1 review |
| `feat/*`, `fix/*`, `docs/*` | One task by one person | Push freely |

**Never push directly to `main` or `dev`.**

Branch naming:

- Features: `feat/<task-id>-<short-slug>`, e.g. `feat/BE-05-create-order`
- Bug fixes: `fix/<task-id>-<short-slug>`
- Docs: `docs/<short-slug>`

### Daily workflow

```bash
# 1. Start a task from the latest dev
git checkout dev
git pull
git checkout -b feat/BE-05-create-order

# 2. Work, commit, push
git add -A
git commit -m "feat(api): add POST /orders endpoint"
git push -u origin feat/BE-05-create-order

# 3. Open a Pull Request on GitHub: base = dev, compare = your branch

# 4. After it is merged, go back to dev and repeat
git checkout dev
git pull
```

If `dev` changes while you're still working, update your branch with `git pull origin dev` and fix any conflicts before opening the PR.

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
