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

## VERSION TIMESTAMP UPDATES
📅 ALWAYS UPDATE VERSION: Whenever you make significant changes to the system, update the version timestamp in index.html (around line 1542). The version badge is located in the header section and follows this format:
- Format: `🎧 [Brief description of update]! (v2025.MM.DD HH:MM)`
- Example: `🎧 Ernest's Podcast Player - Optimized & Enhanced! (v2025.11.22 21:45)`
- Update both the description and timestamp to reflect the current changes and date/time

---

## EMG/NCS Case Database Status (25 Cases Complete)

### ✅ COMPLETED CASES (25/25):
**Current System Cases (16):**
1. hand14 - Carpal Tunnel Syndrome (mild)
2. hand5 - Cubital Tunnel Syndrome
3. hand6 - Post-Radiation Plexopathy
4. hand7 - Normal Study
5. foot1 - Common Fibular Neuropathy
6. back1 - L5 Radiculopathy
7. medical1 - Myasthenia Gravis
8. medical2 - Diabetic Polyneuropathy
9. medical3 - Inflammatory Myopathy
10. medical4 - Motor Neuron Disease
11. medical5 - Acute Stroke
12. medical6 - Severe CTS
13. medical7 - Ulnar Neuropathy
14. medical8 - C6 Radiculopathy
15. medical9 - Fibular Neuropathy
16. back5 - L5 Radiculopathy (detailed)

**Newly Added Cases (9):**
17. mg - Myasthenia Gravis (repetitive stimulation & single fiber EMG)
18. tarsal - Tarsal Tunnel Syndrome (plantar nerve studies)
19. s1radiculopathy - S1 Radiculopathy (H-reflex abnormalities)
20. doublecrush - Double Crush Syndrome (C8 radiculopathy + cubital tunnel)
21. diabetic - Diabetic Polyneuropathy (length-dependent neuropathy)
22. polymyositis - Inflammatory Myopathy (myopathic EMG changes)
23. als - Amyotrophic Lateral Sclerosis (upper + lower motor neuron)
24. stroke - Acute Stroke (EMG NOT indicated - educational)
25. severects - Severe Carpal Tunnel Syndrome (thenar atrophy)

---

### 📋 REMAINING CASES FOR FUTURE EXPANSION
**From emg_ncs_resident_tool copy.html - Ready for Integration:**

1. **fibular** - Common Fibular Neuropathy (foot drop)
   - Priority: Medium (similar to existing foot1)
   - Features: Complete fibular nerve compression at fibular head

2. **ulnar** - Cubital Tunnel Syndrome (carpenter with chronic compression)
   - Priority: Medium (similar to existing hand5)
   - Features: Workplace-related ulnar neuropathy with EMG

3. **cervical** - C6 Radiculopathy (motor vehicle accident)
   - Priority: High - Different root level from existing cases
   - Features: C6 nerve root compression with biceps/brachioradialis involvement

4. **polyneuropathy** - Diabetic Polyneuropathy (comprehensive)
   - Priority: Low (already have diabetic case)
   - Features: More detailed diabetic polyneuropathy case

5. **myopathy** - Inflammatory Myopathy (proximal weakness)
   - Priority: Low (already have polymyositis case)
   - Features: Similar to existing polymyositis case

6. **Additional Cases Found in Resident Tool:**
   - Guillain-Barré Syndrome
   - Lambert-Eaton Myasthenic Syndrome
   - Inclusion Body Myositis
   - Multifocal Motor Neuropathy
   - Critical Illness Polyneuropathy
   - Median Nerve Entrapment (Pronator Syndrome)
   - Radial Neuropathy (Saturday Night Palsy)
   - Brachial Plexopathy
   - Thoracic Outlet Syndrome

---

### 🎯 RECOMMENDED NEXT ADDITIONS (Priority Order):
1. **C6 Radiculopathy** - Different root level, adds educational value
2. **Guillain-Barré Syndrome** - Important acquired demyelinating neuropathy
3. **Radial Neuropathy** - Complete upper extremity nerve coverage
4. **Brachial Plexopathy** - Important anatomical region
5. **Lambert-Eaton Syndrome** - Complements myasthenia gravis

---

### 🔧 TECHNICAL NOTES:
- Enhanced conversion system handles both legacy and resident tool formats automatically
- All 25 cases use professional NCS/EMG chart format with standard studies
- System detects resident tool format via `ncsStudies` array with `type`, `nerve`, `interpretation` fields
- `convertResidentToolToProfessionalFormat()` function ready for future case additions

---

# FUTURE: Module Splitting Plan (Phase 2 Performance Optimization)

## Current Issue
- **File**: `js/enhanced-journey-modal-content.js` (976KB, 16,126 lines)
- **Problem**: Entire file loads on page load, causes iOS memory pressure
- **Current Solution**: iOS opens modules in new tab (workaround)
- **Future Solution**: Split into 13 separate module files, dynamic loading

---

## Module Mapping (13 Modules → 13 Files)
1. `emg-introduction` → `js/modules/emg-introduction.js` (~35KB)
2. `plexus-anatomy` → `js/modules/plexus-anatomy.js` (~28KB)
3. `brachial-plexus-interactive` → `js/modules/brachial-plexus-interactive.js` (~22KB)
4. `radiculopathy-pathophysiology` → `js/modules/radiculopathy-pathophysiology.js` (~24KB)
5. `neuropathy-pathophysiology` → `js/modules/neuropathy-pathophysiology.js` (~120KB) ⚠️ LARGE
6. `ncs-fundamentals` → `js/modules/ncs-fundamentals.js` (~52KB)
7. `ncs-techniques` → `js/modules/ncs-techniques.js` (~40KB)
8. `emg-needle-localization` → `js/modules/emg-needle-localization.js` (~10KB)
9. `muscle-quiz` → `js/modules/muscle-quiz.js` (~14KB)
10. `basic-patterns` → `js/modules/basic-patterns.js` (~30KB)
11. `neuropathy-myopathy-basics` → `js/modules/neuropathy-myopathy-basics.js` (~110KB) ⚠️ LARGE
12. `simple-reports` → `js/modules/simple-reports.js` (~35KB)
13. `clinical-correlation` → `js/modules/clinical-correlation.js` (~5KB)

---

## Implementation Phases

### PHASE 1: Create Shared Core File
**Create**: `js/modules/core.js`
- Extract utility functions (navigateWithTransition, showModal, closeModal)
- iOS detection code
- Shared helpers used across modules
- Risk: LOW

### PHASE 2: Create Dynamic Module Loader
**Create**: `js/module-loader.js`
- Module registry mapping IDs to file paths
- Dynamic import() with caching
- Error handling and retry logic
- Loading state management
- Risk: MEDIUM

### PHASE 3: Extract Individual Modules
**Process**: One module at a time, test after each

**Template Structure**:
```javascript
// js/modules/[module-name].js
import { showModal } from './core.js';

export function generateContent(module, moduleIndex) {
    return `<div class="interactive-content">
        <!-- Module content here -->
    </div>`;
}
```

**Extraction Order** (by risk level):
1. Start with smallest modules (8, 13, 9) - LOW RISK
2. Mid-size modules (1, 2, 3, 4, 7, 10, 12) - MEDIUM RISK
3. Large modules (5, 6, 11) - HIGH RISK, may need sub-splitting

### PHASE 4: Update index.html
**Changes**:
1. Replace monolithic script tag with module loader
2. Update `openAtriumModule()` to use async dynamic import
3. Add loading states/spinners during import

### PHASE 5: Update iOS New Tab System
**Goal**: New tab loads only specific module file (~30-50KB vs 976KB)

**Implementation**:
```javascript
const newTabHTML = '...' +
'<script type="module">\n' +
'    import { generateContent } from "./js/modules/' + moduleId + '.js";\n' +
'    // Load and render content\n' +
'</script>';
```

### PHASE 6: Testing Protocol
**After Each Module**:
- Desktop modal test (content, interactivity)
- iOS new tab test (load, zoom, columns)
- Memory usage check
- Console error check

**Final Integration Test**:
- Open all 13 modules in sequence
- Test module switching and caching
- Verify no memory leaks
- Test on Mac and iPhone

---

## Risk Mitigation

### HIGH RISK: Breaking Functionality
**Mitigation**: Test after EVERY module extraction, keep backup folder

### MEDIUM RISK: Module Dependencies
**Mitigation**: Map dependencies first, use shared core.js, explicit imports

### MEDIUM RISK: Async Loading Issues
**Mitigation**: Add loading spinners, error handling, retry logic

### LOW RISK: Browser Compatibility
**Mitigation**: ES6 modules work in Safari 11+, fallback to webpack if needed

---

## Backup Strategy

**Before Starting**:
```bash
mkdir backup-before-module-split
cp -r js/ backup-before-module-split/
cp index.html backup-before-module-split/
```

**During Work**:
- Git commit after each module extraction
- Don't push until all modules tested
- Keep original file until complete

**Rollback**:
```bash
cp backup-before-module-split/js/enhanced-journey-modal-content.js js/
cp backup-before-module-split/index.html .
```

---

## Success Metrics

- ✅ Initial page load: <200KB JS (down from 976KB)
- ✅ Module open time: <500ms with dynamic import
- ✅ iOS memory usage: <150MB (down from 250MB+)
- ✅ No zoom crashes on iPhone
- ✅ All interactive features work
- ✅ Smooth module switching

---

## Time Estimate

- Phase 1 (Core): 30 minutes
- Phase 2 (Loader): 45 minutes
- Phase 3 (13 modules @ 30min each): 6.5 hours
- Phase 4 (index.html): 30 minutes
- Phase 5 (iOS update): 45 minutes
- Phase 6 (Testing): 2 hours
- **Total**: ~11 hours

---

## Alternative: Partial Split

**Option B**: Split only 5 largest modules first
- Modules 5, 11, 6, 7, 10 (352KB / 36% of total)
- Time: ~4 hours
- Risk: Lower
- Benefit: 70% of performance gain

**Recommendation**: Start with Option B when modules grow even larger

---

## When to Execute This Plan

**Triggers**:
1. Modules grow beyond 1MB total
2. iOS workaround becomes too limiting
3. Users request faster initial load times
4. Memory issues return on iOS despite workaround

**Prerequisites**:
1. Dedicated 4-11 hour work session
2. Full backup created
3. All current features working and tested
4. No other major changes in progress

---

# TABLED: Module 12 AANEM Report Writing System (Partially Complete)

## Status: ✅ Tutorial Complete | 🚧 Template Generator Pending

**Last Updated**: 2025.11.20 16:30
**File**: `js/modules/simple-reports.js` (~50KB currently)
**Reference**: AANEM Report Writing Guidelines.pdf (137KB, 7 pages)

---

## ✅ COMPLETED WORK (Phases 1-2)

### Phase 1: Core Structure ✅
- Two-tab navigation system (Tutorial | Template Generator)
- Tab switching with professional styling and animations
- Responsive container layout
- **Status**: Fully functional

### Phase 2: Interactive Tutorial ✅
Complete 5-step walkthrough covering all AANEM report sections:

**Step 1: Patient Data & Clinical Problem**
- Demographics, referring provider info, clinical presentation
- Example: Jane Smith carpal tunnel case with proper formatting

**Step 2: Nerve Conduction Studies**
- Tabular format requirements (sensory, motor, F-wave, H-reflex)
- Example NCS table with abnormal values marked
- Reference values and interpretation guidelines

**Step 3: Needle EMG**
- Insertional activity, spontaneous activity, MUAP characteristics
- Example EMG table format (8 columns: muscle, insertion, fibs, PSWs, fascs, MUAP amp/dur, recruitment)
- Grading systems (0-4+ for denervation)

**Step 4: Summary Section**
- Narrative synthesis of findings
- Pattern recognition (focal vs diffuse, axonal vs demyelinating)
- Severity grading (mild, moderate, severe)
- Example: Median neuropathy at wrist summary

**Step 5: Diagnostic Interpretation**
- EDX diagnosis format (location + severity + pathophysiology)
- Clinical correlation with symptoms
- Recommendations for follow-up/treatment
- Common pitfalls section

**Features Implemented**:
- Progress bar with visual step indicators
- Previous/Next navigation between steps
- AANEM guideline callouts
- Example reports with proper table formatting
- Important tips and common pitfalls for each section
- Completion celebration message
- Smooth scrolling and transitions

---

## 🚧 REMAINING WORK (Phases 3-8) - TABLED

### Phase 3: Template Generator Wizard Framework (45 min)
**Not Started** - Currently shows placeholder message

**Plan**:
- Multi-step form structure matching Tutorial sections
- Next/Previous navigation buttons
- Form state management (localStorage for persistence)
- Progress bar for wizard steps
- Step validation before advancing

### Phase 4: Quick Mode Implementation (60 min)
**Not Started**

**Plan**:
- **Step 1**: Patient demographics form (name, age, DOB, date of study, MRN)
- **Step 2**: Clinical problem textarea (chief complaint, symptoms)
- **Step 3**: NCS findings textarea (key findings summary)
- **Step 4**: EMG findings textarea (key findings summary)
- **Step 5**: Summary & interpretation textareas
- **Step 6**: Final report preview with formatted output
- Copy to clipboard button
- Download as .txt file button

### Phase 5: Detailed Mode Implementation (90 min)
**Not Started**

**Plan**:
- **NCS Data Entry Table**:
  - Dynamic rows for multiple nerve studies
  - Columns: Nerve, Site, Amplitude, Latency, Distance, Velocity
  - Auto-calculate velocity from distance/latency
  - Red highlighting for abnormal values (based on reference ranges)
  - Dropdown selections for common nerves/sites

- **EMG Data Entry Table**:
  - Dynamic rows for multiple muscles
  - Columns: Muscle, Insertional Activity, Fib, PSW, Fasc, MUAP Amp, MUAP Dur, Recruitment
  - Dropdown selections for standard findings
  - Common muscle list with nerve/root distribution

- **Auto-Generate Professional Tables**:
  - Convert entered data into formatted AANEM-compliant tables
  - Include in final report output

### Phase 6: Mode Toggle & Report Output (30 min)
**Not Started**

**Plan**:
- Toggle switch at top of Template Generator: Quick Mode ⇄ Detailed Mode
- Preserve data when switching modes (localStorage)
- Report formatter function:
  - Takes form data (Quick or Detailed)
  - Generates properly formatted AANEM report
  - Includes patient header, NCS tables, EMG tables, summary, interpretation
- Copy to Clipboard functionality (Clipboard API)
- Download as Text functionality (Blob + download API)

### Phase 7: Styling & Polish (30 min)
**Not Started**

**Plan**:
- Smooth transitions between wizard steps (fade in/out)
- Form validation with error messages
- Required field indicators (red asterisks)
- Helpful tooltips explaining AANEM requirements
- Loading spinners during report generation
- Success confirmation messages
- Responsive design for tablet/mobile
- Match existing module color schemes

### Phase 8: Testing & AANEM Compliance (30 min)
**Not Started**

**Testing Checklist**:
- [ ] Tutorial navigation works (all 5 steps, forward/back)
- [ ] Progress bar updates correctly
- [ ] Tab switching (Tutorial ⇄ Template Generator)
- [ ] Quick Mode: Complete report workflow
- [ ] Detailed Mode: Complete report workflow
- [ ] Mode switching preserves data
- [ ] NCS table auto-calculations work
- [ ] EMG dropdowns populate correctly
- [ ] Copy to clipboard functionality
- [ ] Download as text functionality
- [ ] Form validation catches errors
- [ ] Mobile/tablet responsive design
- [ ] AANEM guideline compliance verification

---

## Design Decisions (User Confirmed)

1. **Tutorial Structure**: Step-by-step walkthrough (linear progression)
2. **Template Structure**: Guided wizard (multi-step form with Next/Previous)
3. **Integration**: Separate tabs (not single combined view)
4. **Data Entry**: Hybrid mode (Quick for summaries + Detailed for full numeric data)

---

## Technical Implementation Details

**File Structure**:
- Single file: `js/modules/simple-reports.js`
- No separate support file needed (all logic self-contained)
- Uses localStorage for wizard form persistence

**Key Functions**:
- `generateContent(module)` - Main export function
- `switchReportTab(tab)` - Toggle between Tutorial/Template
- `showTutorialStep(step)` - Navigate tutorial steps
- `generateProgressBar(currentStep, totalSteps)` - Visual progress indicator
- `generateTutorialStepX()` - Individual step content generators (1-5)
- Template Generator functions - TODO in Phases 3-6

**Styling Approach**:
- Inline styles for portability
- Gradient buttons (blue for Tutorial, purple for Template)
- Professional table formatting with borders and spacing
- Color-coded abnormalities (red for out-of-range values)
- AANEM guideline callouts with left border accent

---

## Time Estimate (Remaining Work)

- Phase 3: 45 min (Wizard framework)
- Phase 4: 60 min (Quick Mode)
- Phase 5: 90 min (Detailed Mode with tables)
- Phase 6: 30 min (Mode toggle + output)
- Phase 7: 30 min (Styling & polish)
- Phase 8: 30 min (Testing)
- **Total Remaining**: ~4.5 hours

**Total Project Time**: ~6 hours (1.5 hrs complete + 4.5 hrs remaining)

---

## Why Tabled

Module 12 Tutorial is fully functional and provides significant educational value. The Template Generator is a nice-to-have enhancement but not critical for the learning experience. Users can learn AANEM report writing from the comprehensive tutorial and apply that knowledge using their own EMR systems.

**Resume When**:
- User specifically requests Template Generator
- Additional development time available
- Other high-priority modules/features completed

---

# FUTURE: Brachial Plexus Visualization Improvements

## Current State
The plexus system uses D3.js with fixed-position grid layout, two interaction modes (Pathfinding + Lesion Simulator), 20 quiz questions, and a 59-muscle reference dictionary. Anatomy is accurate. Core issues are UX clarity, not content.

## Planned Improvements

### Phase 1: Interactive Clarity (High Impact, Moderate Effort)

**1. Animated Pathfinding**
Instead of highlighting the entire path at once, animate it step-by-step: root lights up first, then trunk, then division, then cord, then terminal nerve. Each step takes ~300ms with a glowing pulse. This teaches the anatomical sequence instead of just showing the answer.
- File: `PlexusRenderer.js` -- add `animatePath(nodeIds, delay)` method
- Use D3 transitions with staggered delays

**2. Hover Tooltips on All Nodes**
Currently info only appears on click. Add hover tooltips showing:
- Node name and type (e.g., "Upper Trunk (C5-C6)")
- For nerves: key muscles innervated (top 3)
- For roots: which trunk they feed
- File: `PlexusRenderer.js` -- add tooltip div, show on mouseover

**3. Search/Filter by Muscle Name**
Text input that highlights the path from a muscle back to its root. Type "biceps" and the musculocutaneous -> lateral cord -> anterior divisions -> upper trunk -> C5/C6 path lights up.
- File: `PlexusManager.js` -- add search input, reverse-lookup from MUSCLE_DETAILS

**4. Division Node Prominence**
Divisions (anterior/posterior) are the least visible layer. Add distinct styling:
- Anterior divisions: filled circles (solid)
- Posterior divisions: hollow circles (stroke only)
- This teaches the anterior/posterior split visually
- File: `PlexusRenderer.js` -- conditional fill based on node label

### Phase 2: Clinical Correlation (High Impact, Higher Effort)

**5. "Build a Case" Mode**
User selects clinical findings (weak deltoid, absent biceps reflex, numb lateral arm) and the system highlights which structure is most likely injured. Reverse of Lesion Simulator -- instead of "what happens if X is cut", it's "what's cut if these findings exist".
- New mode button alongside Pathfinding and Lesion Simulator
- File: `PlexusManager.js` -- add `buildCase()` method
- Uses intersection of ancestor sets to find common lesion point

**6. EMG Prediction Overlay**
When a lesion is simulated, show predicted NCS/EMG findings:
- Which SNAPs would be abnormal vs preserved (pre vs post-ganglionic)
- Which muscles would show fibrillations
- Expected timeline for changes
- Renders as a side panel next to the plexus diagram
- File: `PlexusLogic.js` -- extend `getLesionEffects()` with NCS predictions

**7. Side-by-Side Comparison**
Compare two lesion sites (e.g., upper trunk vs C5 root) showing which findings differ. Key for teaching localization.
- Split-screen view with two plexus diagrams
- Differences highlighted in contrasting colors
- File: New component or extend PlexusManager

### Phase 3: Polish (Lower Priority)

**8. Keyboard Navigation**
- Arrow keys to move between nodes
- Enter to select/click
- Escape to deselect
- Tab to cycle through modes

**9. SVG Export**
- "Save as Image" button exports the current view as PNG/SVG
- Useful for study materials and presentations

**10. Mobile Optimization**
- Touch gestures for zoom/pan
- Responsive layout for smaller screens
- Collapsible side panels

## Execution Estimate
- Phase 1 (items 1-4): ~4 hours
- Phase 2 (items 5-7): ~6 hours
- Phase 3 (items 8-10): ~3 hours

## Priority Recommendation
Start with Phase 1 items 1-3 (animated pathfinding, hover tooltips, muscle search). These three changes alone would dramatically improve comprehension for residents learning plexus anatomy for the first time.

---

# FUTURE: Radiculopathy Module Visual Aids

## Context
The radiculopathy module has excellent text content (9/10 audit score) but lacks visual aids. For residents learning EMG localization, seeing the anatomy is as important as reading about it.

## Visual Aid Ideas (Priority Order)

### 1. Dermatome/Myotome Body Map (Highest Impact)
Interactive SVG body figure (front + back views) with clickable dermatome regions. Click C6 -> thumb/index light up in the dermatome color, biceps/brachioradialis highlight as myotome muscles, biceps reflex arc shown. This is the #1 visual residents need -- "where does this root go?"
- Could reuse the anatomy diagram system from ClinicalExamLab (body region SVGs already exist)
- Each root gets a distinct color
- Toggle between dermatome view (sensory) and myotome view (motor)

### 2. "Behind the DRG" Animation
Animated cross-section of the spinal canal showing:
- Nerve root exiting through foramen
- DRG location (outside the canal)
- Disc herniation compressing the root PROXIMAL to DRG
- Arrow showing why sensory axons distal to DRG survive (the telephone wire analogy, but visual)
- This is THE core concept of radiculopathy EMG -- it deserves a dedicated animation

### 3. EMG Timeline Infographic
Visual timeline showing when findings appear after nerve root injury:
- Day 0: injury (red flash)
- Day 3-5: paraspinal fibrillations begin appearing (closest to root)
- Day 7-10: proximal limb muscles (deltoid, biceps)
- Day 14-21: distal muscles (hand intrinsics, foot)
- Each milestone shown as a body silhouette with the affected region glowing
- Teaches the "proximal to distal" wave of denervation

### 4. L5 vs Peroneal Nerve Comparison Diagram
Side-by-side anatomical diagram showing:
- LEFT: L5 root with ALL downstream muscles highlighted (TA, EHL, glut med, tib post)
- RIGHT: Common fibular nerve with ONLY its muscles highlighted (TA, EHL -- no glut med, no tib post)
- The overlap (TA, EHL) shown in one color, the differentiators (glut med, tib post) in another
- This is the single most tested clinical question in EMG boards

### 5. Disc-Level vs Root-Level Diagram
Shows why an L4-L5 disc herniation affects the L5 root (not L4):
- Sagittal view of lumbar spine
- Each disc labeled
- Arrows showing which root exits at each level
- The classic "traversing vs exiting root" concept
- Residents consistently get confused by this -- a visual solves it instantly

## Implementation Approach
- SVG-based (inline, no external image dependencies)
- Same style as existing anatomy diagrams in ClinicalExamLab
- Interactive where possible (click to highlight, hover for info)
- Can be added as a new "Visual Atlas" tab within the radiculopathy module
- Reuse the existing tab system pattern from ClinicalExamLab

## Effort Estimate
- Body map (item 1): ~3 hours (most complex, reuse existing SVG patterns)
- DRG animation (item 2): ~2 hours
- Timeline infographic (item 3): ~1.5 hours
- L5 vs Peroneal (item 4): ~1 hour
- Disc-level diagram (item 5): ~1.5 hours

---

# FUTURE: EMG Needle Localization Muscle Expansion

## Current State
13 muscles with full needle localization protocols (origin, insertion, patient position, electrode insertion, test maneuver, pitfalls, clinical pearl). The underlying MuscleDatabase.js has 65+ muscles but without needle-specific protocols.

## Muscles to Add (user will provide images later)

### Phase 1: High-Priority Clinical EMG Muscles (15 muscles)

**Shoulder/Scapular:**
1. Infraspinatus -- Suprascapular N, C5-C6 (rotator cuff, upper trunk evaluation)
2. Rhomboid Major -- Dorsal Scapular N, C5 (scapular winging, C5 root)
3. Serratus Anterior -- Long Thoracic N, C5-C7 (winged scapula, Parsonage-Turner)
4. Latissimus Dorsi -- Thoracodorsal N, C6-C8 (posterior cord evaluation)

**Forearm:**
5. Brachioradialis -- Radial N, C5-C6 (radial nerve, C6 root)
6. FCR -- Median N, C6-C7 (median nerve, C7 root)
7. FCU -- Ulnar N, C8-T1 (ulnar nerve, cubital tunnel)
8. EDC -- Posterior Interosseous N, C7-C8 (PIN syndrome, C7 root)

**Hand:**
9. ADM -- Ulnar N, C8-T1 (ulnar recording site, lower trunk)
10. Opponens Pollicis -- Median N, C8-T1 (deep to APB, CTS)

**Lower Extremity:**
11. Iliopsoas -- Lumbar Plexus, L1-L3 (proximal LE, lumbar root)
12. Rectus Femoris -- Femoral N, L2-L4 (quad component, femoral nerve)
13. Gluteus Maximus -- Inferior Gluteal N, L5-S2 (S1 root, hip extension)
14. Gluteus Medius -- Superior Gluteal N, L5-S1 (L5 vs peroneal differentiator)
15. Soleus -- Tibial N, S1-S2 (deep to gastroc, S1 root)

### Phase 2: Complete Limb Coverage (20 muscles)

**Upper Extremity:**
16. Brachialis -- Musculocutaneous/Radial N, C5-C6
17. Supinator -- Posterior Interosseous N, C5-C6
18. ECRL -- Radial N, C6-C7
19. ECU -- Posterior Interosseous N, C7-C8
20. EPL -- Posterior Interosseous N, C7-C8
21. APL -- Posterior Interosseous N, C7-C8
22. FPL -- Anterior Interosseous N, C8-T1
23. FDP (index) -- Anterior Interosseous N, C8-T1
24. FDP (ring/small) -- Ulnar N, C8-T1
25. FDS -- Median N, C7-T1
26. Pronator Quadratus -- Anterior Interosseous N, C8-T1
27. Adductor Pollicis -- Ulnar N, C8-T1

**Lower Extremity:**
28. Vastus Medialis -- Femoral N, L2-L4
29. Biceps Femoris Short Head -- Peroneal division Sciatic, L5-S2
30. Biceps Femoris Long Head -- Tibial division Sciatic, L5-S2
31. Semitendinosus -- Tibial division Sciatic, L5-S2
32. Semimembranosus -- Tibial division Sciatic, L5-S2
33. Adductor Longus -- Obturator N, L2-L4
34. Tensor Fasciae Latae -- Superior Gluteal N, L4-S1
35. EDB -- Deep Peroneal N, L5-S1

### Phase 3: Paraspinals + Specialized (12 muscles)

**Paraspinals:**
36. Cervical Paraspinals (technique for C5-C8 levels)
37. Thoracic Paraspinals (technique for T6-T12)
38. Lumbar Paraspinals (technique for L3-S1)

**Bulbar/Cranial:**
39. Genioglossus (Tongue) -- Hypoglossal CN XII
40. Masseter -- Trigeminal CN V3
41. Orbicularis Oris -- Facial CN VII
42. Orbicularis Oculi -- Facial CN VII
43. Mentalis -- Facial CN VII
44. Frontalis -- Facial CN VII
45. Nasalis -- Facial CN VII

**Other:**
46. FDL -- Tibial N, L5-S1
47. FHL -- Tibial N, S1-S2

## Data Format Per Muscle
Each entry needs: fullName, innervation (nerve + cord + trunk + roots), origin, insertion, position, electrodeInsertion, testManeuver, pitfalls, pearl. Image path will be added when photos are available.

## Execution Strategy
- Write all data entries first (text only, no images)
- User provides clinical photos later
- Phase 1 alone brings coverage from 13 to 28 muscles (covers all standard EMG exam muscles)
- Full expansion to 47 muscles would be the most comprehensive EMG localization reference available

---

# FUTURE: Muscle Study Lab UX Redesign

## Current State
3 learning modes (Study Cards, Quiz, EMG Challenge) with 70+ muscles. Anatomy data is 100% accurate. UX needs modernization: heavy inline CSS, no responsive design, no progress tracking, dense layouts.

## Planned Improvements (User-Selected Priorities)

### 1. Filterable Smart Grouping (High Impact, ~3 hours)
Replace the flat grid of all muscles with organized, filterable groups:
- **Group By options**: Nerve Family (Median, Ulnar, Radial, etc.), Root Level (C5, C6, C7...), Region (Shoulder, Forearm, Hand, Hip, Thigh, Leg, Foot), Plexus Level (Trunk, Cord, Terminal)
- **Search bar**: Type "biceps" or "C6" and instantly filter
- **Collapsible sections**: Click "Median Nerve (12 muscles)" to expand
- **Badge counts**: Show how many muscles per group
- File: `StudyCards.js` -- add filter state, group-by dropdown, search input
- Data: Already organized in `MuscleDatabase.js` by nerve/root/cord -- just need UI grouping logic

### 2. Progress Tracking + Spaced Repetition (~4 hours)
Track learning across sessions using localStorage:
- **Per-muscle mastery**: Track correct/incorrect quiz answers per muscle
- **Mastery levels**: New (gray) -> Learning (yellow) -> Familiar (blue) -> Mastered (green)
- **Progress dashboard**: Ring chart showing 45/70 mastered, 15 learning, 10 new
- **Spaced repetition**: Muscles answered wrong appear more frequently in quizzes
- **Streak counter**: "5-day study streak!" motivates daily use
- File: New `ProgressTracker.js` utility
- Storage: localStorage with keys like `muscle_progress_{muscleName}`
- Integration: `MuscleAnatomyQuiz.js` updates progress after each answer

### 3. Visual Nerve-to-Muscle Map (~5 hours)
Interactive SVG body diagram integrated into Study Cards:
- **Front + back body outline** with clickable regions
- **Click a nerve** (e.g., "Median Nerve" label) -> all median-innervated muscles highlight on the body
- **Click a root level** (e.g., "C6") -> all C6 muscles highlight in a distinct color
- **Bidirectional**: Click a muscle on the body -> shows its nerve, root, cord, actions in a detail panel
- **Color coding**: Each nerve family gets a color (Median=blue, Ulnar=purple, Radial=green, etc.)
- Reuse SVG patterns from ClinicalExamLab anatomy diagrams
- File: New `MuscleBodyMap.js` component
- Add as a new tab alongside Study Cards, Quiz, EMG Challenge

## Design Principles
- Match existing app aesthetic (teal accents, white cards, subtle shadows, 12-20px border radius)
- Mobile-responsive from the start (min-width 320px)
- Accessible (ARIA labels, not color-only coding)
- Fast (no heavy dependencies, inline SVG)

## Execution Order
1. Filterable Smart Grouping first (quick win, immediately useful)
2. Progress Tracking second (motivates daily use)
3. Visual Nerve Map third (most complex, highest wow factor)

---

# FUTURE: Basic Pattern Recognition -- 6 Critical Gaps to Fill

## Current State
Module covers 9 patterns well (fibs/PSWs, CRDs, myokymic, myotonic, fasciculations, polyphasic MUAPs, recruitment, endplate). Scored 98/100 on audit. But missing foundational patterns that residents need.

## Patterns to Add

### 1. Normal MUAPs (CRITICAL -- no baseline currently taught)
- 2-4 phases, duration 5-15ms (varies by muscle/age), amplitude 200uV-5mV
- Triphasic morphology: initial positive -> negative -> positive
- Duration increases with age and in proximal muscles
- Amplitude varies dramatically by muscle (deltoid ~1mV, FDI ~500uV)
- Sound: regular "thump-thump" during voluntary contraction
- Include a table of normal MUAP duration by muscle (at minimum: deltoid, biceps, FDI, TA, gastroc)
- Teaching pearl: "You MUST know what normal looks like before you can call anything abnormal"

### 2. Neurogenic MUAP Morphology (HIGH)
- Large amplitude (>5mV in some muscles), long duration (>15ms), polyphasic (>4 phases)
- Mechanism: surviving motor neurons adopt orphaned muscle fibers (collateral sprouting)
- Reduced recruitment: few units firing at high rates (>15-20 Hz before next unit recruits)
- Sound: "loud, thick thuds" firing rapidly
- Seen in: chronic radiculopathy, motor neuron disease, chronic entrapment neuropathy
- Teaching pearl: "Big MUAPs = the surviving neurons are doing the work of many"

### 3. Myopathic MUAP Morphology (HIGH)
- Small amplitude (<300uV), short duration (<5ms), polyphasic, may be complex
- Early/rapid recruitment: many units fire at low rates even with minimal effort
- Mechanism: each motor unit has fewer functioning muscle fibers (fiber loss/necrosis)
- Sound: "buzzy, full interference pattern" even with weak contraction
- Seen in: inflammatory myopathy, muscular dystrophy, toxic myopathy
- Teaching pearl: "Small MUAPs with full recruitment = the workforce is weak, not missing"
- Key contrast table: Neurogenic (big/few/fast) vs Myopathic (small/many/early) vs Normal

### 4. Nascent/Reinnervation MUAPs (HIGH -- prognosis indicator)
- Small, polyphasic, UNSTABLE (amplitude/duration vary beat-to-beat)
- Duration 3-8ms, amplitude 100-500uV, 5+ phases
- Mechanism: newly sprouted nerve terminal reaches muscle fiber but connection is immature
- Sound: irregular, "scratchy" or "crinkly" -- not the clean thump of normal MUAPs
- Timing: appear 2-4 months after nerve injury as reinnervation begins
- Prognostic significance: presence = good sign (nerve is recovering)
- Distinguishing from myopathic: nascent are unstable and in a neurogenic recruitment pattern; myopathic are stable with early recruitment
- Teaching pearl: "Seeing nascent units after a nerve injury is like seeing green shoots after a forest fire -- recovery is happening"

### 5. Insertional Activity Spectrum (HIGH)
Currently only endplate activity is covered. Need the full spectrum:
- **Normal**: Brief burst (<300ms) of sharp spikes during needle movement, stops when needle stops
- **Increased**: Prolonged activity (>300ms) that persists after needle stops moving. Indicates irritable membrane: active denervation, inflammatory myopathy, or early neuropathy
- **Decreased**: Minimal response to needle movement. Indicates fibrotic/atrophic muscle: chronic severe denervation, advanced muscular dystrophy, or fibrosis
- **Electrical Silence**: No response at all. Ominous: end-stage muscle replacement by fat/fibrous tissue
- Teaching pearl: "Insertional activity is your first clue before you even ask the patient to contract. Normal = quick burst and done. Too much = something is irritating the membrane. Too little = the muscle may be gone."

### 6. Cramp Potentials & Doublets/Triplets (MEDIUM)
**Cramp potentials:**
- Normal MUAPs firing at extremely high rates (up to 150 Hz) involuntarily
- Distinguished from voluntary contraction by: abrupt onset, inability to relax, spreads across muscle
- Sound: loud, full interference pattern that the patient cannot turn off
- Clinical: usually benign (nocturnal leg cramps, exercise cramps) but check for neuromyotonia or ALS if recurrent
- Teaching pearl: "Cramp = normal motors firing at max speed involuntarily. It's not a new pattern, it's normal patterns going haywire."

**Doublets/Triplets:**
- Same motor unit fires 2-3 times in rapid succession (5-20ms inter-spike interval)
- Distinguished from fasciculations (single discharge) and myokymia (grouped, repetitive, same unit)
- Seen in: early reinnervation, hyperexcitability states, tetany
- Teaching pearl: "A fasciculation is a single pop. A doublet is a quick double-tap. Myokymia is a whole burst."

## Implementation
- Add to BasicPatternsData.js as new pattern entries following existing format (title, description, clinicalPearls array with Sound/Look/Rate/Significance)
- Add corresponding quiz questions (2-3 per new pattern)
- Add to Flutter pattern_data.dart for mobile sync
- Estimated time: ~3 hours for all 6 patterns
- Total: ~9 hours for all 5, or ~5 hours for top 3