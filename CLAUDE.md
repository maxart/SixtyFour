# CLAUDE.md — SixtyFour

## Project Overview

SixtyFour is a single-page Base64 encoder web app. It encodes files (via drag & drop or file picker) and text (via textarea) into Base64, displaying the result with a copy-to-clipboard button.

## Tech Stack

- **Vue 3.5** — Composition API with `<script setup>` syntax exclusively
- **Vite 7** — build tool, dev server on `npm run dev`
- **Tailwind CSS v4** — integrated via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **No router, no store, no external dependencies** — keep it that way

## Commands

- `npm run dev` — start dev server (default: http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Architecture

### State Management

Shared state lives in singleton composables (module-level refs, not per-instance). All components import composables and get the same reactive state. No Pinia/Vuex needed.

- `src/composables/useBase64.js` — encoding state: mode, input, output. Readonly wrappers on refs consumers should not mutate directly. Mutations go through exported functions (`setMode`, `processFile`, `clear`).
- `src/composables/useTheme.js` — dark/light theme. Reads `prefers-color-scheme` on first load, persists to `localStorage` under `sixtyfour-theme`. Toggles `.dark` class on `<html>`.

### Component Conventions

- All components use `<script setup>` (no Options API)
- SVG icons are individual Vue SFCs in `src/icons/` — they accept no props and inherit `currentColor` + sizing from parent
- Tailwind utility classes directly in templates — no `<style>` blocks, no CSS modules
- `@` alias maps to `src/` (configured in `vite.config.js` and `jsconfig.json`)

### Encoding Details

- **Files**: `FileReader.readAsDataURL()` → full `data:mime/type;base64,...` URI
- **Text**: `TextEncoder` → byte array → `btoa()` (handles Unicode correctly)

### Drag & Drop Architecture

Two layers:
1. **Document-level** (`App.vue`): listens on `document` for dragenter/dragleave/drop to show/hide `FullPageDrop` overlay. Uses a counter to handle nested drag events.
2. **Component-level** (`DropZone.vue`): local drag handlers for the in-panel drop zone (also supports click-to-browse via hidden `<input type="file">`).

When `FullPageDrop` is visible (z-50), it captures all drop events. Its `@drop` emits the file back to `App.vue` which calls `processFile()`.

## Styling

- Custom theme defined in `src/style.css` under `@theme` (Tailwind v4 syntax)
- Dark mode via `@custom-variant dark (&:where(.dark, .dark *))` — class-based strategy
- Primary color: indigo scale (`--color-primary-50` through `--color-primary-900`) using oklch
- Material-inspired: rounded-2xl cards, subtle shadows, smooth transitions, active:scale-95 feedback
- Responsive breakpoint: `md:` (768px) switches from stacked to side-by-side layout
- Dark surfaces: slate-800 cards on slate-900 background, slate-700 borders
- All components must include `dark:` variants for every color-bearing utility class

## Guidelines

- Do not add external dependencies without explicit approval
- Keep the UI minimal — icons over text, obvious over labeled
- All icons as Vue SFC files in `src/icons/` (inline SVG, no icon libraries)
- Prefer editing existing composable/components over creating new ones
- No `v-html` anywhere — all content is template-bound for XSS safety
