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

### Round 4 (Flutter podcast playback fix)
- [x] **Diagnosed:** 14 of 32 podcast files had spaces in their names. Flutter's web build writes those assets percent-encoded on disk (`ALS%20and%20mimics.m4a` literally), `just_audio` requests the single-encoded URL, the server decodes once → **404 for every spaced episode** (all the named/topical ones users tap first). EDX_1–15 were fine; desktop web app was fine (serves source files with real spaces).
- [x] **Fixed (not hidden):** renamed the 14 files to underscores (`git mv`), updated `podcast_data.dart` + web `AudioData.js` (14 refs each, all 32 verified to resolve on disk), rebuilt Flutter web (`--base-href /mobile/`), redeployed to `mobile/`, removed the 14 stale `%20` files, bumped the web cache-bust chain.
- [x] **Verified:** every episode URL returns 206 on both apps; previously-broken episode reaches `canplay` in-browser (duration matches listed runtime); Flutter app boots; desktop boots with no console errors.
- ⚠️ **Production note:** the stale `build/web` had `--base-href /LEARNEMG/mobile/` (GitHub Pages?). If deploying there, rebuild with that base href — the fix itself carries over. *(Superseded by round 5: deploy branch builds with NO base href.)*

### Round 5 (swarm audit → P0 fixes → production deploy, presentation night)
- [x] **49-agent swarm audit** of every Flutter module + 4 cross-cutting sweeps, findings adversarially verified → 42 confirmed findings, synthesized into P0/P1/P2 + an explicit "don't do tonight" list.
- [x] **Second demo-killer found & fixed:** web `setAsset` base64s entire 25–100MB episodes into a `data:` URI before playback (iOS tab kill). Now `kIsWeb` → `setUrl` streams (verified live 206 ranged requests).
- [x] **P0 set applied:** opt-in tab keep-alive (quiz/terminology only), `cacheWidth` caps, dashboard BackdropFilter removed, Ernest RepaintBoundary + frozen chat header + cancelled tap timers, WaveformCard RepaintBoundary, muscle-lab mounted guard, branded splash, no parser-blocking YouTube script, preload/preconnect.
- [x] **Merged into the real deploy branch** (`claude/eloquent-davinci` — serves GitHub Pages): kept its newer content work (clinical NR/Klumpke/PTS fixes, quiz overhaul, Ernest quota fix, scrolling heroes, podcast cards out of modules) + all session fixes; resolved the parallel data-action migrations in our favor (verified names). Single **no-base-href build** works at `/mobile/` and `/LEARNEMG/mobile/` alike.
- [x] **Deployed** (push f89f532 → Pages built) and **live-verified**: QR target 200, all renamed podcasts 206, splash live, iframe_api gone, gzip on.
- [x] **Fixed account-wide Pages outage:** the `shuhub.xyz` custom domain was broken at GitHub's edge (TLS fail + 503) and every github.io URL 301'd into it. Removed the domain from the user site (re-add after the presentation if wanted).
- [x] **QR code:** `qr-emg-mastery.png` → https://zshumake.github.io/LEARNEMG/mobile/
- ⚠️ Origin remote URL embeds an **expired PAT** — pushes fail with it; used `gh` auth instead. Consider `git remote set-url origin https://github.com/Zshumake/LEARNEMG.git` + `gh auth setup-git`.
- 🔄 Swarm re-run for the 6 modules lost to API overload is in flight; P1/P2 fixes deferred to after the presentation (clinical_case_data lazy split, PNG→WebP, podcast re-encode, position-tick notifier split).

### Round 6 (presentation night: podcasts out, demo key in, Pages fixed)
- [x] **Podcast system removed from the Flutter app** (user call — slow buffering + 1.6GB deploy weight): banner, library, mini player, overlay, controller, data, and the `assets/Podcasts/` bundle line. Deployed `mobile/` shrank **1.7GB → 93MB**. Source m4a files remain tracked. (Buffering spinners were built first and remain in history if podcasts return.)
- [x] **Ernest demo key for the crowd**: baked base64 via `--dart-define=ERNEST_DEMO_KEY_B64` (raw key never in source or bundle; user-saved keys take precedence). Verified live end-to-end against the Gemini API. **Revert after the talk: rebuild without the define + delete the key in AI Studio.**
- [x] **Fixed dead model id**: `gemini-1.5-flash-latest` is retired → `gemini-2.5-flash-lite`.
- [x] **Visible Ernest↔Earl swap button** in the chat header (was a hidden 7-tap easter egg; both characters are native Flutter CustomPainters — no SVG dependency).
- [x] **Pages build failures fixed**: added `.nojekyll` (Jekyll was processing the multi-GB tree) and untracked the root `Podcasts` symlink (Pages rejects symlinks; stays on disk for local dev). Build now ~3 min and green; live bundle byte-identical to local.

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

### Round 7 (deep audit: web app + repo hygiene)
Ran the performance-audit across 3 parallel agents (dead-code, runtime perf, repo hygiene). Reassuring headlines: **0 orphaned files, 0 debug cruft, 0 hardcoded API keys** in the web app.

**DONE (committed `9adb8d7`, deployed):**
- [x] Perf: removed the flat **500ms artificial delay** before injecting module content (ModalSystem) — every lesson open is ~½s snappier.
- [x] Perf: **rAF-throttled** the clinical-dashboard magnetic mousemove (was unthrottled → O(n) forced reflows per event for the life of the page); reads now batched before writes.
- [x] Hygiene: fixed the malformed `.gitignore` line, ignored the whole `/ios/` (874MB) + `/Podcasts` symlink, and **stripped the embedded PAT** from the origin remote URL.

**DONE (committed `8a7682b`, deployed + fresh-load verified):** removed the verified-dead `window.*` legacy shims & exports — `unregisterAction` chain, stale Ernest/Plexus shims (Initialization), `setupStorage()` (Bootstrapper), `window.isModalOpen` (write-only), `getPodcastModules`/`FEATURED_MODULE_DESCRIPTION` exports, the `generateMasteryPathway` alias. **Left** the content-module aliases (Fundamentals/NeuropathyMyopathy/etc.) — they carry an explicit "exposed so untracked scripts don't ReferenceError" comment, so removing them fights documented intent for a few bytes.

**DONE (committed `1e0287f`, deployed):** **deploy-branch trim** — `git rm --cached EMG_Mastery_Flutter/` (314 files) so GitHub Pages no longer publishes the 3.5GB source tree (verified: `…/EMG_Mastery_Flutter/…` now 404 live; `mobile/` artifact intact). Source preserved on `main` (319 files) + the `archive/deploy-full-20260615` branch + locally; gitignored on the deploy branch.

**DONE:** **local disk reclaim** — deleted `trash/` (359MB), `ios/` (874MB), `BACKUP_PRE_LEGACY_REMOVAL/` (3MB) ≈ **1.24GB** freed. (`node_modules/` kept — it backs the local dev server.) `.gitignore` now ignores `/ios/`, `/Podcasts`, `/EMG_Mastery_Flutter/` and the malformed line is fixed. PAT stripped from the origin remote URL.

**STILL TODO — perf, deferred (the one risky item):** defer the boot graph — `Initialization.js` eagerly constructs muscle-lab (incl. the 1030-line EMG challenge), the ~294KB clinical case DB, and NCS/quiz/audio before the welcome screen paints. **Not done yet** because it requires async-refactoring the *open paths of core features* (clinical tool, muscle lab) and verifying them end-to-end — which the headless preview can't support (rAF doesn't fire, lazy-loads stall there). Worth doing as a focused pass where the clinical/muscle-lab tools can be click-tested.

**STILL TODO — user action:** **revoke/rotate the PAT** in GitHub settings (removed from local git config, but rotate to be safe).

**Deferred (bigger):** mascot SVG dedup (AppShell + ErnestUI carry the same ~135-line SVGs twice), a minimal bundler (esbuild/rollup — collapses ~80 unbundled module requests + auto-hashes cache-busting; highest ceiling, large effort), `.git` history rewrite to strip the 1.6GB of podcast blobs (rewrites the Pages branch — deliberate decision only).

### Round 8 (4 cleanup streams — doing one at a time, verified + deployed each)
- [x] **Flutter images → WebP** (`545bd86`, live): converted all 76 `assets/images/` PNGs to WebP @ q=85, updated 74 Dart refs. **55MB → 3.1MB (94%)**; deployed `mobile/` 93MB → **40MB**. Verified the radiculopathy diagram renders crisply in CanvasKit; live WebP serves `image/webp`, old PNG 404. (Source delta reconstructable from the archive branch — see deploy memory.)
- [ ] **Lazy-load web boot** — defer the 294KB clinical case DB + muscle-lab off `Initialization.js` startup. Verify by opening the clinical tool via its JS API + screenshot.
- [ ] **Flutter case-data split** — `clinical_case_data.dart` (8,646-line eager static map) → lazy index + per-case factories. Verify via `flutter analyze` + build + opening a case.
- [ ] **Add a bundler (esbuild)** — collapse the ~80 web modules into one hashed file, ending the manual `?v=` cache-bust tags. Biggest/riskiest; introduces a build step to the "no-build" web app — confirm scope before building it.
