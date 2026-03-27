# EMG/NCS Case Database - Full Medical Audit & Sierra Wave Compliance

## Audit Summary

Reviewed all 13 case files (35+ cases). The case database is **medically strong overall**. Clinical presentations, differentials, teaching points, and localization logic are excellent. Found a few data accuracy bugs and structural gaps vs. Sierra Wave format.

---

## Phase 1: Medical Accuracy Fixes (Quick Wins)

- [ ] **Bug 1**: hand14 (CTS) - Ulnar Motor marked `abnormal: true` but values are normal (lat 2.8, amp 5.0, vel 62). Contradicts teaching that only median is affected. Fix: `abnormal: false`
- [ ] **Bug 2**: ALS - Fibular Motor velocity 32 m/s is too slow for axonal disease (suggests demyelination). Fix: change to 40 m/s
- [ ] **Bug 3**: hand14 - Ulnar Sensory velocity 67 m/s unrealistically high (typical 48-62). Fix: change to 60 m/s
- [ ] **Bug 4**: ClinicalDataStandardizer reference values don't match standard lab norms (Ulnar motor amp 3.0 should be 6.0, Median sensory amp 10 should be 20, etc.)

---

## Phase 2: Sierra Wave Display Format Enhancements

- [ ] Add `onset` latency to all sensory studies (Sierra Wave shows both onset and peak)
- [ ] Add `distance` field to all NCS entries (standard recording distances)
- [ ] Standardize motor studies to show multiple stimulation sites (wrist, elbow, etc.)
- [ ] Ensure all studies include normal reference values for display

---

## Phase 3: EMG Table Format Standardization

- [ ] Standardize EMG fields: `insertionalActivity`, `fibs`, `psws`, `fasciculations`, `muapAmplitude`, `muapDuration`, `muapPhases`, `recruitment`

---

## All 35+ Cases Passed Medical Audit (No Changes Needed):
CTS, Guyon's, Severe CTS, Double Crush, Cubital Tunnel, Klumpke's, C5/C6/C7/L5/S1 radiculopathies, MG, LEMS, Polymyositis, Diabetic PN, ALS (vel fix), GBS, CIDP, MMN, CMT, Small Fiber, Foot Drop, Tarsal Tunnel, Deep Peroneal, Femoral, Obturator, Piriformis, Baxter's, Suprascapular, Axillary, Long Thoracic, Musculocutaneous, PTS, Radial/Saturday Night, Wartenberg's, PIN, Pronator, AIN, Struthers, Avulsion, Erb's, Radiation Plexopathy, Diabetic Amyotrophy, Stroke
