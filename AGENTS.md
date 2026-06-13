# AGENTS.md — restaurant-app (Ric's Diner)

## Project layout

- All source code lives under **`React.ts/`** — treat that as the project root for all commands.
- The repo root (`E:\Cursor_Workspace\EXAMPLE\restaurant-app`) only contains `.git/` and the `React.ts/` subtree.

## Commands (run from `React.ts/`)

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build` (type-check first, then bundle) |
| `npm run lint` | `eslint .` |
| `npm run preview` | Serve production build locally |

**Run `lint` before `build`** — the build runs `tsc -b` which will catch type errors, so fix lint first to reduce round-trips.

## Toolchain quirks

- **Two lockfiles exist**: both `package-lock.json` and `yarn.lock` are committed. Prefer `npm` for consistency; don't add a third.
- **No test framework** — no Vitest, Jest, Playwright, etc. Do not look for or add tests without asking.
- **TypeScript ~6.0.2** with `erasableSyntaxOnly: true` — no legacy TS-only syntax (enums, namespaces, etc.). Use `const` objects or union types instead of enums.
- **ESLint 10** flat config (`eslint.config.js`) — do not create a `.eslintrc` file.
- **React Compiler is not enabled** — don't try to use it.

## Architecture

- **Single-page, no router** (no react-router-dom). Three components composed in `App.tsx:15`.
- **No state management** — plain `useState` in `App.tsx:16`. No Redux, Zustand, etc.
- **MUI 9** + Emotion for styling. Use MUI `sx` prop and `Box` consistently.

## Data

- **Primary source**: `src/data/menuData.ts` — hardcoded array of 100 `MenuItem` + 4 `ComboItem`.
- **CSV backup**: `public/data/menu.csv` — same data, but **never loaded by the app** at runtime.
- **`check_cats.py`** validates category consistency between the TS source and CSV, but has **hardcoded absolute paths** — will not run on another machine without editing.

## Notable behaviors (don't "fix" these without asking)

- **Cart is visual-only**: `TopBar` shows a cart icon with badge `0` and `DetailPanel` has an "Add to Cart" FAB — neither has click handlers or state. This is placeholder UI.
- **Random image fallback**: `DetailPanel` uses `Math.random()` to pick an image when a menu item has no matching file. The displayed image changes on every re-render.
- **Combo items** (`ComboItem` type) lack `dietLabel`, `spiciness`, and `description` fields; their tagline sits in a different field. They render under the "套餐組合" tab.
- **UI is Traditional Chinese** (`zh-TW`) — all labels, item names, and descriptions. `index.html` sets `<html lang="zh-TW">`.

## What not to do

- Do not regenerate the README — it's the default Vite template and intentionally unstyled.
- Do not add a router, test framework, or state management library unless asked.
- Do not convert `check_cats.py` paths to relative paths or otherwise modify it — it's a one-off validation script.
