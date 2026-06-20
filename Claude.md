Claude.MD rules:
Standard Workflow
1. First think through the problem, read the codebase for relevant files, and write a plan to todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. ALWAYS end each response with the current server URL so the user can easily click on it to test the system.

## IMPORTANT REMINDER
🖥️ ALWAYS SHOW SERVER URL: End every response with the current server URL so the user can easily access the system.

## Running locally
- Static site, no build step. Serve the repo root.
- `./start-local-server.sh` (Python http.server) or `npx http-server -p 8080` → http://localhost:8080
- `index.html` redirects narrow/mobile viewports (width <= 800) to `/mobile/` (a separate Flutter web build), so test the desktop app in a window wider than 800px.

## Versioning / cache-busting
- There is **no** version badge in `index.html` (the old one was removed during the refactor — past instructions referencing "line ~1542" are obsolete).
- Cache-busting is done with `?v=...` query strings on the CSS `<link>`s in `index.html` and on ES-module import specifiers inside `src/`.
- **Do NOT bump these by hand.** Run `python3 tools/version.py` before committing/deploying any web change — it content-hashes each `.js`/`.css` file and rewrites every `?v=` tag automatically (in dependency order, so a change cascades to everything that imports it). It's idempotent (no source change → no edits); `--check` exits non-zero if any tag is stale (CI-friendly). This keeps the "no build step / serve the repo root" model — it only edits the query strings, never the code or paths.
- The one tag the script does NOT manage is the `mobile/?v=...` query on the mobile-redirect line in `index.html` — that's a separate manual deploy-cache-buster for the Flutter `/mobile/` HTML, bump it when you redeploy the Flutter app.

---

## Current Architecture (the active web app)

Static, vanilla-JS **ES-module** site. No framework, no bundler. D3 is loaded from a CDN.

- **`index.html`** — thin app shell. Loads three scripts: `src/utils/ViewHelpers.js` (general modal helpers), `src/modules/Initialization.js` (the composition root), and `src/modules/core/LegacyGlobals.js` (classic-script `window.*` shims that back legacy inline handlers).
- **`src/`** — all application code (~80 ES modules):
  - `modules/` — subsystems. `Initialization.js` boots everything, wires dependencies, and publishes the `window.appComponents` service locator. `core/Bootstrapper.js` + `ui/AppShell.js` paint the welcome screen. Other subsystems: `candyland/` (the learning board), `clinical/`, `ncs/`, `plexus/`, `muscle-lab/`, `ernest/` (Ernest/Earl mascot + chat), `quiz/`, `audio/`.
  - `content/` — the lesson modules (`emg/`, `ncs/`, `pathology/`, `anatomy/`, `nerves/`, ...). Each exposes `generateContent()` and is **lazy-loaded on demand** via `src/utils/ModuleLoader.js` (a string-id → `import()` registry).
  - `data/` — case and reference data (`cases/`, `clinical-exam/`, `MuscleDatabase.js`, ...), consumed via `index.js` barrels.
  - `utils/` — shared helpers: `Logger.js` (debug-gated logging — **use this, not `console.log`**), `ActionBus.js` + the delegated `data-action` click handler (**prefer this over inline `onclick`**), `ModuleLoader.js`, `shuffle.js` (unbiased Fisher-Yates), `ErnestIcon.js`.
- **`css/`** — global stylesheets (candyland board, layout, animations). Note: many component styles are still embedded in JS template strings (tech debt).
- **`mobile/`** — separate **compiled** Flutter web build (the phone experience). **`EMG_Mastery_Flutter/`** — its Flutter/Dart source. **`ios/`** — Capacitor wrapper. These are parallel to, and currently lag, the web app.

**Conventions**
- Event handling: prefer `data-action="name"` markup + `registerAction('name', fn)` (ActionBus). A legacy pattern of inline `onclick="window.fn()"` + `window.fn = ...` globals still exists and is being migrated away.
- Logging: `import logger from '.../utils/Logger.js'` — never raw `console.log`.

---

## EMG/NCS Case Database
Cases live in `src/data/cases/` (e.g. `RadiculopathyCases.js`, `LowerExtremityCases.js`, `SystemicCases.js`) and `src/data/clinical-exam/` (entrapment, plexopathy, polyneuropathy, ...), wired through `index.js` barrels. The clinical case engine/UI is `src/modules/clinical/`.

The case library is **comprehensive (~50 cases** in `src/data/cases/`) — radiculopathies (C5/C6/C7/L5/S1), entrapments (CTS mild+severe, cubital/Guyon's, AIN/PIN/pronator/Struthers, axillary, suprascapular, long-thoracic, fibular, sciatic, tarsal tunnel, meralgia, Baxter's…), plexopathies (traumatic avulsions, Erb's, Klumpke's, Parsonage-Turner, radiation, diabetic LS), NMJ (MG, LEMS), motor neuron (ALS), and acquired/hereditary polyneuropathies (GBS/AIDP, CIDP, MMN, CMT1, small-fiber, diabetic). **Obsolete note (was here):** the old "candidate cases not yet added" list — C6 radiculopathy, Guillain-Barré, Saturday-night palsy, brachial plexopathy, Lambert-Eaton — is wrong; **all five were added 2026-06-11** and are live. Remaining gaps are niche: standalone C8/T1 radiculopathy, critical-illness myopathy/neuropathy, inclusion-body myositis, botulism. To add one: match the schema in an existing case file, append to that file's exported `xxxCases` object (the `index.js` barrel spreads it into `clinicalCasesData`), then run `python3 tools/version.py`.

---

## Status notes
- ✅ **Refactor complete.** The old monolithic `js/enhanced-journey-modal-content.js` (~976KB single file) has been fully split into the modular `src/` structure above. Any older docs referencing a root `js/` directory or a "module splitting plan" are obsolete.
- 🚧 **AANEM report writing** (`src/content/emg/ReportWriting.js`): the step-by-step tutorial is complete; the interactive template-generator wizard is tabled (nice-to-have, not blocking).
