# Bill Splitter

A modern, responsive tip calculator and bill splitter — built with React 19, TypeScript, and Vite.

## Features

- **Live updates** — results recalculate on every keystroke, no submit button needed
- **Tip presets** — one-click 5%, 10%, 15%, 20%, 25% buttons plus a freeform custom % field
- **Bill splitting** — divide any bill across up to 1,000 people
- **Round-up policy** — per-person shares are always rounded up to the nearest cent so the restaurant is never underpaid
- **Inline validation** — errors appear next to the offending field, never via `alert()`
- **Light / Dark mode** — auto-detects system preference, toggleable with one click, persisted to `localStorage`
- **Fully accessible** — linked labels, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-pressed`, keyboard-navigable

## Run locally

```bash
# 1. Install dependencies (Node 18+ required)
npm install

# 2. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Deployed URL

_Add your Vercel / Netlify / GitHub Pages URL here once deployed._

## Project structure

```
src/
  App.tsx              # Root component — state, validation, layout
  App.css              # All component styles
  index.css            # Design tokens (CSS variables), global resets
  types.ts             # Shared TypeScript interfaces
  components/
    BillInput.tsx      # Bill amount field
    TipSelector.tsx    # Preset buttons + custom tip input
    PeopleInput.tsx    # Number of people field
    OutputPanel.tsx    # Live results receipt
    ResetButton.tsx    # Reset / clear button
```

## Assessment files

- [`ANSWERS.md`](./ANSWERS.md) — answers to the 5 assessment questions
