# Codebase Cleanup — Max-Effort Review & Plan

**Date:** 2026-06-10
**Branch:** `cleanup/max-effort-review` (8 commits; `main` untouched until you merge)
**Scope (approved):** active web app code, stale docs, Flutter app, safe-only git/disk (no history rewrite).

---

## DONE ✅ (committed on the branch)

### Dead code & smells (web app)
- [x] Deleted 9 verified zero-reference files (~2,850 lines): MuscleTestAnatomy.js, StandardNCSData.js, Plexus.js, competency/CompetencyManager.js, quiz/QuizPlaceholders.js, utils/MascotUtils.js, content/index.js, css/emg-challenge.css, board/CandylandBoard.js (+ its dead import in MuscleLab.js)
- [x] Removed leftover debug `console.log` (ClinicalDashboardRenderer.js) + clarified a silent catch (ClinicalUI.js)
- [x] Removed 3 dead "not yet implemented" category stubs + their bindings (ClinicalUI.js)

### Correctness
- [x] **Fixed biased card shuffle** — added `utils/shuffle.js` (Fisher–Yates) and replaced all 6 `sort(() => Math.random() - 0.5)` sites (NCSEngine, EMGChallenge ×4, MuscleAnatomyQuiz). Verified in-browser: returns a true permutation, doesn't mutate input.

### Flutter app (analyze-verified, behavior-preserving)
- [x] Removed an unnecessary import + tightened a field to `final`. `flutter analyze`: 41 → 39 issues, still 0 warnings / 0 errors.

### Docs
- [x] Rewrote `README.md` (was documenting the archived 2025 tabbed interface) and `Claude.md` (removed obsolete `js/` "Module Splitting Plan", fixed the dead version-badge rule) to match the real `src/` architecture. Workflow rules preserved verbatim.

### Git / disk hygiene (safe only — no history rewrite)
- [x] Stopped tracking `mobile/` (162 files, ~1.7 GB compiled Flutter build); gitignored it. Files remain on disk.
- [x] Gitignored local agent artifacts (`.claude/worktrees/`, `**/.mcp.json`, flutter `.claude/`)
- [x] Committed 14 unreferenced top-level nerve-image deletions
- [x] `git gc` — packed 4,789 loose objects → 1 pack; `.git` 2.0 GB → 1.6 GB

**Verification:** app boots with zero console errors/warnings; `appComponents` initializes; mascot renders; the edited Clinical and muscle-lab modules import and render correctly.

### Round 2 (follow-up cleanup)
- [x] Removed `lectures/` (standalone presentation material the app never references) + `werewolf.jpeg`
- [x] **Fixed mobile-redirect URL bug** (`index.html`): old code produced `/index.html/mobile/`; now derives the page directory (works for `/`, `/index.html`, subpaths), tightened the guard to `/mobile/`, and uses `location.replace()` (no back-button trap). Verified across all path shapes.
- [x] **Modal a11y**: `role="dialog" aria-modal="true" aria-labelledby` on both overlays + `aria-label="Close"` on both close buttons (were exposing only "×").
- [x] **De-coupled `showModal`**: 8 modules now `import { showModal }` from ViewHelpers instead of reaching for `window.showModal`. Verified: all import and the modal opens.
- [x] Confirmed (fresh import-graph sweep) that the dead-code removal left **no orphaned files** behind.

### Round 3 (inline onclick → data-action bus)
After dead-code removal only **15** `onclick` handlers remained (the bus is click-only; 56 hover + 19 change/input handlers can't use it). Migrated the 9 reachable/verifiable ones to the existing ActionBus:
- [x] **Board tiles** (BoardRenderer ×4: module cards, hero, featured, podcast rows) → `data-action="moduleClick"/"playExtraPodcast"`, registered in the BoardRenderer constructor. Verified at real boot: a tile click routes to `handleModuleClick(id, index)` with index parsed as a number.
- [x] **index.html close buttons ×2** → `closeModal` / `closeLearningObjectives` (already-registered actions). Verified real `×` clicks close their modals.
- [x] **ModalSystem ×2** (learning-modal close + app launch) → `closeLearningModal` / `launchApp`, registered in constructor. Verified real close-button click.
- [x] **ErnestCharacter ×1**: routed a dead `window.openModule` reference to `moduleClick`. (See finding below.)
- [x] Bumped the cache-bust `?v=` chain (BoardRenderer→CandylandCore→Initialization, + ErnestCharacter/ModalSystem) so the edits actually load; also retired the shipped `?v=bus9-caseorder-debug` debug tag.
- [x] **Regression check on the earlier dead-code removal:** the deleted `board/CandylandBoard.js` set ~16 `window.*` globals as an import side-effect. Cross-referenced all 16 against live code — only `window.openModule` was still referenced (ErnestCharacter), and that path is unreachable (`.module-square` is never rendered by the current board). **No user-facing regression**; dangling reference cleaned up anyway.

**Deferred (still onclick):** 5 compound/deep PlexusManager handlers (build-case & compare features — multi-statement DOM manipulation, hard to verify without driving the plexus UI) and 1 low-value "Coming Soon" placeholder in ViewHelpers.

---

## DEFERRED ⏭️ (documented, NOT done — higher risk / "massive change", needs your eyes)

Per CLAUDE.md ("keep every change simple and minimal"), I did not force these through autonomously:

- **Mascot SVG dedup (3 live copies, ~1,000 lines).** On inspection these are *divergent*, not clean duplicates: `ErnestIcon` uses per-instance namespaced gradient/clip IDs (collision-safe for the 8 icon sites); `ErnestUI`/`AppShell` use fixed IDs and carry an extra mouth path. Neither is a superset — consolidating is a merge-and-migrate across 10+ render sites with visual-regression risk. Needs a human to eyeball all three surfaces.
- **Color palette centralization** (3,251 hardcoded hexes, 226 distinct; a `:root` token set exists but is bypassed). Mechanical but high visual-regression risk; do per-color behind screenshot diffs.
- **Inline handler migration (partially done — see Round 3).** Remaining: 5 compound PlexusManager `onclick`s + 1 ViewHelpers placeholder; **56 hover (`onmouseover/out`) handlers → CSS `:hover`** (the click-only bus can't take them; some are functional `showModuleDescription` calls needing addEventListener instead); **19 `onchange/oninput/onfocus/onblur` handlers** would need the bus extended to delegate those event types.
- **Extract 56 embedded `<style>` blocks** from JS template strings into real CSS; convert the top ~143 repeated inline-style strings to utility classes.
- **Replace 13 remaining `alert()`s** with an in-app toast/modal (the dead "not yet implemented" ones are already gone; the rest are real validation feedback — a UX change).
- **Move ~300 lines of static modal markup out of `index.html`** into a JS template.
- **Replace hand-maintained `?v=` cache-bust tags** (58 in src + 5 in index.html) with a single build/deploy versioning step.
- **Split the giant `generateContent()` family** (8 funcs, 348–603 lines) and `EMGChallenge.launch()` (~714 lines).
- **Flutter:** 37 `withOpacity` deprecations left as-is (the `.withValues()` swap can shift rendered alpha — needs visual review).
- **Git history rewrite** to reclaim the remaining ~1.6 GB of binaries in history — you chose "safe only", so not done (would rewrite SHAs / break clones).

---

## Review

### Summary
A four-angle audit (architecture, code smells, HTML/CSS, repo hygiene) found the active app is clean on classic rot (0 TODO/FIXME, logging abstracted, sound error handling) — the debt is structural. I executed the **safe, high-value, verifiable** subset and committed it in 8 logical, reversible commits on a dedicated branch.

### Impact
- **~4,600 lines of dead JS removed** from `src/` (37,566 → 32,951 lines).
- **1 real bug fixed** (biased shuffle skewing quiz/answer order).
- **~1.7 GB of compiled output untracked** + **~320 MB reclaimed** from `.git`.
- **Docs now accurate** (no more phantom `js/` architecture).
- **Zero behavior change** intended on the web app; every edited module verified to import/boot/render with no console errors.

### How to use this branch
- Review commit-by-commit: `git log --oneline main..cleanup/max-effort-review`
- Merge when satisfied. **One caveat:** if you deploy by serving this repo directly, the `mobile/` untrack means you must build `mobile/` as part of deploy (it's no longer in git). That commit (`5c8b72a`) is isolated and easy to drop if needed.
- The DEFERRED list above is the roadmap for a future, more invasive pass (best done interactively so you can eyeball visual changes).
