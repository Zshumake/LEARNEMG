# Neuromuscular Mastery — EMG/NCS Learning System

An interactive, browser-based learning system for EMG/NCS (electromyography / nerve
conduction studies), aimed at neurology and PM&R residents. It presents a gamified
"Candyland" learning board with lesson modules, interactive plexus anatomy, a clinical
case engine, quizzes, and the Ernest/Earl mascots.

## Stack
- Vanilla JavaScript (ES modules) — no framework, no bundler, no build step
- D3.js (loaded from a CDN) for the interactive plexus diagrams
- Static site: serve the repo root and open it in a browser

## Run locally
```bash
./start-local-server.sh        # Python http.server on :8080
# or, if you prefer Node:
npx http-server -p 8080
```
Then open http://localhost:8080.

Use a window wider than 800px for the desktop experience — narrower / mobile viewports
are redirected to `/mobile/`, which is a separate compiled Flutter web build.

## Layout
- `index.html` — app shell (loads `src/` modules)
- `src/` — all application code: `modules/` (subsystems), `content/` (lesson modules,
  lazy-loaded), `data/` (cases & reference data), `utils/` (shared helpers)
- `css/` — global stylesheets
- `mobile/` + `EMG_Mastery_Flutter/` — parallel Flutter mobile build & its Dart source
- `ios/` — Capacitor iOS wrapper

See [`Claude.md`](Claude.md) for the architecture overview and working conventions.
