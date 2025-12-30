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