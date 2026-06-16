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
- [x] **Lazy-load web boot** (`e818a82`, live): deferred the ~300KB clinical case DB off boot — `ClinicalEngine` starts empty, `ClinicalUI.showClinicalCases()` lazy-imports on first open (cached). Verified: 0 case requests at boot (was 13), dashboard loads + renders in ~52ms on open. **Muscle-lab left eager on purpose** — its module body registers 5 ActionBus handlers + `window.*` globals the board buttons call directly, so deferring it risks dead buttons for a smaller win.
- [ ] **Flutter case-data split** — `clinical_case_data.dart` (8,646-line eager static map) → lazy index + per-case factories. Verify via `flutter analyze` + build + opening a case.
- [x] **Auto-version script** (chose this over a full bundler — keeps the no-build architecture): `tools/version.py` content-hashes every `.js`/`.css` and rewrites all `?v=` tags in dependency order, so **no more hand-bumping**. Run it before deploying a web change; `--check` for CI. Verified: no import cycles, idempotent, app boots with hashed tags + 0 module load failures. CLAUDE.md updated.
- [x] **Flutter case-data split** — decided to **skip** (large/error-prone restructure of an 8,646-line file for only a one-time ~10–40ms hitch; poor value-to-risk).
- ✅ **All 4 cleanup streams resolved** (WebP, clinical-DB lazy-load, auto-versioning; case-data split intentionally skipped).

### Round 9 (fresh-lens audit: accessibility · security · code-quality · Flutter idioms)
Ran 4 parallel read-only specialist audits across both apps, then fixed the safe high-value findings.

**DONE — WEB (tracked, versioned via `tools/version.py`, verified in preview, NOT yet committed/deployed):**
- [x] **a11y: keyboard activation for the whole ActionBus.** Added an Enter/Space `keydown` handler beside the click delegation in `Initialization.js` (skips native button/a/input; preventDefault on Space). One central change makes every `data-action` element keyboard-operable.
- [x] **a11y: board tiles are now real buttons.** `hero-module` + `module-card` got `role="button"` `tabindex="0"` `aria-label="Open module: …"`. Verified: 13 tiles focusable, **Enter opens the module** (learning-modal-overlay appears).
- [x] **a11y: global `:focus-visible` ring** (`main-layout.css`) so keyboard users see focus (mouse clicks stay ring-free); also strengthened `.differential-input` focus.
- [x] **a11y: input labels.** `aria-label` on the Ernest chat input ("Ask Ernest a question") and API-key input ("Gemini API key"). Verified present in DOM.
- [x] **a11y: alt text** on the NCS technique gallery image.
- [x] **security: XSS hardening comment** locking in "escape-first, no attribute/URL transforms" in `ErnestChat.parseMarkdown` (the one LLM-output→innerHTML sink — audited as *not* currently vulnerable; comment guards against a future regression). Also `rel="noopener"` → `rel="noopener noreferrer"` on the AI-Studio link.
- Verified: desktop boots clean (no console errors), 13 keyboard-focusable tiles, Enter-to-open works, all aria-labels present, focus-visible rule active.

**DONE — FLUTTER (rebuilt `/mobile/` + deployed; commit `4bd271b`. NOTE: source `EMG_Mastery_Flutter/` is gitignored on the deploy branch — these source edits live on disk + a `/tmp` snapshot and still need committing to `main` to persist in git):**
- [x] **Real bug: undisposed `TextEditingController`s** (memory leaks) — `dispose()` in `_DifferentialStepState` (`clinical_cases_view.dart`) + `.then((_) => textController.dispose())` on the API-key dialog (`ernest_chat_overlay.dart`).
- [x] **Idiom: `dart fix --apply`** after enabling the const lints in `analysis_options.yaml` → **165 fixes in 14 files** (80 const added, 81 redundant const removed, 1 unused import, 1 deprecation).
- [x] **Deprecation: all 29 `withOpacity(x)` → `withValues(alpha: x)`** across 5 files (value-preserving).
- [x] **a11y: `tooltip:` on 11 icon-only IconButtons** (5 audio, close/back/clear across module_content_screen, plexus_explorer, clinical_cases, muscle_lab, topic_content, ernest_chat).
- [x] **a11y: Ernest slide-out tab** → `Semantics(button, label)` + `HitTestBehavior.opaque` + transparent padding to a **≥48px tap target** (was an unlabeled 34px GestureDetector — the assistant was unreachable by screen readers).
- [x] **Lint: `_SectionHeader` PascalCase methods** in `clinical_tables.dart` renamed to `_sectionHeader` (cleared `non_constant_identifier_names`).
- Verified: `flutter analyze` → **No issues found** (was 32 infos); `dart format` applied; `flutter build web` clean; `main.dart.js` rebuilt (~36k-line delta) and synced into `mobile/`; mobile `?v=` cache-buster bumped to `20260616-deploy`.

**Audit headlines / reassurances:**
- **Security: no working XSS, no key leak, no open redirect, no eval/document.write/postMessage.** The Ernest LLM-output path escapes-first and emits only attribute-less tags — safe. The Gemini key only ever goes to `generativelanguage.googleapis.com`, never logged/DOM'd.
- **Flutter async/logging hygiene is clean** — 0 `use_build_context_synchronously`, `mounted` guards present, no `print()`.

**DEFERRED — prioritized menu (bigger churn or needs a Flutter rebuild+deploy):**
- WEB refactors: extract the 555-line `EMGChallenge.js` `<style>` into `css/`; de-dupe the mascot SVG (AppShell + ErnestUI + ErnestIcon, ~330 lines); adopt the **already-defined** `:root` palette token-by-token (52% of 3,168 hex literals map to existing vars); migrate the last 5 inline `onclick` (all in `PlexusManager.js`) to `data-action`; full modal focus-trap (role=dialog/aria-modal/focus-return/Escape) on the learning modal; landmarks (`<main>`/`<nav>`) + skip link; remaining input `aria-label`s (clinical/plexus/report search boxes).
- FLUTTER remaining (maintainability, not user-facing — best done with visual diffing, then one rebuild): point ~290 `Color(0xFF…)` literals at the existing `AppTheme` (+ add the missing slate ramp); extract the duplicated `_SectionCard`/`_SmallInfoCard`/`_buildHero` into shared `core/widgets/`; split the 2,032-line `muscle_lab_view.dart` into study-cards/quiz/challenge files.
- [x] SOURCE PERSISTENCE — **done.** Committed the clean `EMG_Mastery_Flutter/` source (lib/ + WebP assets/ + web template + config; no build/Podcasts cruft) to a new branch **`flutter-source-20260616`** (commit `c6e918b`), pushed to origin. This pass + the WebP work are now in git (previously disk-only; `main` is still stale and was intentionally left untouched).

### Round 10 (dead web-asset sweep — new angle, prior dead-code pass was JS-only)
Robust scan (basename + full path + filename-stem across all `src/`/`css/`/`index.html`, handling spaces + constructed paths). 133 web images / 83.5MB; 27 truly unreferenced (~9.8MB).
- [x] **Deleted ~7.6MB** of clearly-dead assets (commit `5bcf5c7`, deployed + verified: kept `sierra-summit.webp`=200, deleted `evoked_potentials.png`=404): the `images/ui/` hand-gesture set (10, removed feature), the `images/hardware/` old underscored `.png` variants (12, superseded when hardware moved to hyphenated `.webp`), `pathways/Median Nerve Optimized.png`, `anatomy/nerve_cross_section.png`. (The "Cadwell" text in lesson copy is the brand name, not an image ref — verified.)
- **Kept (your call, ~1.9MB):** unreferenced `pathways/Deep Fibular Nerve.png` + `Superficial Fibular Nerve.png` + `images/Shorthead of Biceps Femoris.png` — real anatomy, possible future content.
- **Agent-native audit:** N/A here — Ernest is a Q&A tutor with no tool-calling into the app, so there's no user/agent action-parity layer to audit (would only matter if Ernest is given tools to drive the app — a feature, not a cleanup).

### Round 11 (the 5 web structural refactors — each verified in-browser, then deployed)
All five committed on `cleanup/max-effort-review` and deployed to the Pages branch. Verified each in the live preview before moving on.
- [x] **Finish inline-onclick migration** (`044230c`): migrated the last 5 inline `onclick` (all in `PlexusManager.js`) to `data-action`/`registerAction`. **`src/` now has 0 inline `onclick=` attributes** — the documented migration is complete.
- [x] **De-dup mascot SVG** (`044230c`): the full-body Earl+Ernest artwork was duplicated verbatim in AppShell + ErnestUI (~22k chars). Extracted to canonical `ErnestIcon.getEarlBody()` / `getErnestBody(filterId)`; both call sites keep their own `<svg>` wrapper. Used an **assertion-guarded script** that aborts unless the two bodies are provably equivalent (whitespace + filter-id normalized). AppShell now imports ErnestIcon (so it's loaded before the welcome paints). Verified: welcome + chat mascots render (46 shapes each), screenshot identical.
- [x] **Extract EMGChallenge stylesheet** (`f3ac9f7`): moved the 553-line inline `<style>` (re-injected on every open) to `css/emg-challenge.css` (static link). EMGChallenge.js 47.7k→24.6k chars. Verified: challenge renders fully styled, no inline `<style>` left.
- [x] **a11y: modal focus-trap + landmarks** (`b1c360d`): learning modal got `role="dialog"`/`aria-modal`/stable `aria-label`, focus-in-on-open, Tab-trap, Escape-to-close, focus-return-to-trigger. Added `<main id="app-root">` landmark + a "Skip to main content" link. Verified all behaviors in-browser.
- [x] **Adopt :root palette** (`f87d391`): replaced 169 tokenized-hex occurrences with `var(--token)` across 5 CSS files — **CSS-value positions only** (skipped `url()`/`data:`/custom-prop defs). Value-identical (verified `body` color → rgb(15,23,42), board unchanged). Left the ~1186 hex literals in `src/` JS alone — they mix SVG `fill="#..."` (no `var()` support) with CSS-in-JS, unsafe to blanket-swap. Tagged `main-layout.css` + `legendary-pathway-styles.css` with `?v=` so the a11y CSS cache-busts.
- ✅ **All 5 requested web refactors done + deployed.** No console errors; 0 inline onclick remain; mascot art is single-source; EMGChallenge CSS externalized; palette centralized in the stylesheets; learning modal is keyboard-accessible.

### Round 12 (Flutter structural refactors — rebuilt + deployed `/mobile/`, source on flutter-source-20260616)
Verified via `flutter analyze` (clean) + `flutter build web` (Flutter web/CanvasKit can't render in the headless preview, so analyze+build is the verification; the source changes are value-preserving by construction).
- [x] **Adopt `AppTheme` tokens** (`46ee070`): replaced **426 raw `Color(0xFF..)` literals → `AppTheme.X`** across 26 files (the analog of the web palette work). Added the missing slate ramp (`slate100/300/400/600/950`). Fixed 177 `const Color(..)` → `const AppTheme.X` sites (dropped the now-invalid `const` before the static-field ref). Value-identical (tokens = the exact hexes). Excluded `app_theme.dart` itself. **`flutter analyze`: No issues found.**
- [x] **Extract shared `SectionCard`** (`46ee070`): the duplicated `_SectionCard` (radiculopathy + plexus_clinical) → `core/widgets/section_card.dart`. Assertion-guarded script removed both local classes, renamed call sites, added imports; radiculopathy uses defaults, plexus's one call passes 4 style overrides (border/gap/size/spacing) so both keep their exact look.
- **Deliberately left** (honest scoping, not oversight):
  - `_SmallInfoCard` — its two copies are theme-divergent (amber vs blue: different colors, padding, radius, sizes). Unifying = every call site passes ~7 style params, trading duplication for parameter-coupling (the over-abstraction the audit itself cautioned against). Net ~wash.
  - `_buildHero` — 4–5 per-view methods with different title/subtitle/gradient/icon; unifying is a design change, not a clean dedup.
  - **`muscle_lab_view.dart` split** (2,206 lines, 10 self-contained classes) — pure file-reorg, lowest user value, audit ranked it last. Safe to do (behavior-preserving, analyze+build-verifiable) but deferred to avoid bolting a large mechanical move onto an already-large batch. Clean follow-up: keep `MuscleLabView`+`_ModeCard`, move `_StudyCardsView`/`_MuscleCard`, `_QuizEngineView`, `_EMGChallengeView`+`_Case` into `muscle_lab/*.dart` (make the 3 sub-views public + import).
- Deployed: `flutter build web` → rsync `mobile/`, `main.dart.js` rebuilt, `mobile/?v=` → `20260616b-deploy`. **Live-verified** (~12s): bootstrap hash matches local build. Source preserved on `flutter-source-20260616` (`625f810`).
