# SixtyFour

A minimal, Material-inspired Base64 encoder web app built with Vue 3 and Tailwind CSS v4.

Drop files or paste text to get instant Base64 output with one-click copy.

## Features

- **File encoding** — drag & drop or click to browse; outputs full `data:` URI ready for HTML/CSS embedding
- **Text encoding** — type or paste text for real-time Base64 conversion (Unicode-safe)
- **Full-page drop zone** — dragging a file anywhere over the browser triggers a full-viewport overlay
- **Image preview** — thumbnails for dropped image files
- **One-click copy** — clipboard copy with visual confirmation
- **Dark mode** — toggle between light and dark themes; respects system preference, persists choice in localStorage
- **Responsive** — side-by-side panels on desktop, stacked on mobile
- **Zero external runtime dependencies** — only Vue 3 + Tailwind CSS

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7** (build tool)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- No router, no store, no external icon library

## Project Structure

```
src/
├── main.js                    Entry point
├── style.css                  Tailwind v4 config + custom theme
├── App.vue                    Root layout, global drag detection, mode tabs
├── composables/
│   ├── useBase64.js           Shared state & encoding logic (singleton)
│   └── useTheme.js            Dark/light theme toggle + localStorage
├── components/
│   ├── FullPageDrop.vue       Full-viewport drag overlay
│   ├── DropZone.vue           In-panel drop area + click-to-browse
│   ├── TextInput.vue          Text input textarea
│   └── OutputPanel.vue        Base64 output + copy button
└── icons/
    ├── IconUpload.vue         Upload arrow
    ├── IconCopy.vue           Clipboard
    ├── IconCheck.vue          Checkmark
    ├── IconFile.vue           Document
    ├── IconText.vue           Text/type
    ├── IconClear.vue          Close/clear
    ├── IconSun.vue            Sun (switch to light)
    └── IconMoon.vue           Moon (switch to dark)
```

## Getting Started

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview   # preview production build locally
```

## Requirements

Node.js `^20.19.0` or `>=22.12.0`
