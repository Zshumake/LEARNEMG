# Chapter 2: Instrumentation and Technical Factors

## An Original Reference for PM&R Board Preparation

---

## Learning Objectives

Upon completing this chapter, the reader should be able to:

1. Apply Ohm's law and basic electronic circuit principles to the electrodiagnostic laboratory
2. Describe the construction, recording properties, and clinical applications of surface electrodes, monopolar needles, concentric needles, bipolar needles, and single-fiber EMG electrodes
3. Explain stimulation parameters including constant current versus constant voltage, supramaximal stimulation, and stimulus duration
4. Describe the function of the differential amplifier, including the roles of E1, E2, and the ground electrode
5. Define common mode rejection ratio (CMRR) and explain factors that degrade it
6. State the standard filter settings for motor NCS, sensory NCS, needle EMG, and SSEPs, and predict the effects of altering filter settings on waveform morphology
7. Select appropriate sweep speed (time base) and sensitivity (gain) settings for each EDX study type
8. Describe the effects of temperature on nerve conduction parameters and state the minimum acceptable limb temperatures
9. Identify safety considerations for EDX testing in patients with pacemakers, implantable cardioverter-defibrillators, anticoagulation, and infection risk

---

## 2.1 Basic Electronic Circuitry 

### 2.1.1 Ohm's Law and Its Applications

Ohm's law is the foundational equation governing the behavior of electrical circuits and is directly applicable to understanding the electrodiagnostic system:

**V = I x R**

Where V is voltage (volts, V), I is current (amperes, A), and R is resistance (ohms, Omega).

In the context of EDX medicine:
- **Voltage (V)** represents the electrical potential difference driving current flow. The bioelectric signals recorded in NCS and EMG are voltage potentials (measured in millivolts for CMAPs, microvolts for SNAPs and MUAPs).
- **Current (I)** represents the flow of charge. The stimulator delivers current to depolarize nerves. Current flows through biological tissues as well as through the amplifier circuit.
- **Resistance (R)** in DC circuits, or **impedance (Z)** in AC circuits, opposes current flow. Tissue impedance, electrode impedance, and amplifier input impedance all influence signal quality.

For alternating current (AC) signals -- which biological signals are -- impedance replaces resistance and includes both resistive and reactive (capacitive and inductive) components:

**Z = sqrt(R^2 + X^2)**

Where Z is impedance, R is resistance, and X is reactance. Skin-electrode impedance is predominantly resistive but includes a capacitive component from the skin-electrode interface.

### 2.1.2 Power and Energy

**Power (P) = V x I = I^2 x R = V^2 / R** (measured in watts, W)

This is relevant to electrical safety. The amount of power dissipated in tissue during stimulation determines the potential for tissue heating or damage. Modern EMG machines operate at very low power levels that are inherently safe for routine use.

### 2.1.3 Capacitance

A capacitor stores electrical charge across an insulating barrier. In the EDX laboratory, capacitance is relevant in several contexts:

- The skin-electrode interface acts as a capacitor, affecting signal transmission
- Coupling between nearby cables creates stray capacitance that can introduce noise
- The high-pass filter in the amplifier uses capacitive elements to block DC signals while passing AC signals
- Stimulus artifact can be prolonged by capacitive coupling between the stimulator and recording electrodes

> **Clinical Pearl:** When stimulus artifact is excessive and obscures the response, several strategies can help: (1) Move the ground electrode between the stimulator and recording electrodes, (2) rotate the anode of the stimulator, (3) reduce stimulus duration, (4) ensure the skin is clean and dry between stimulating and recording sites to minimize surface current spread. All of these measures reduce capacitive coupling and direct current spread that create stimulus artifact.

---

## 2.2 Electrode Types 

### 2.2.1 Surface Recording Electrodes

Surface electrodes are non-invasive electrodes placed on the skin surface for recording CMAPs and SNAPs during nerve conduction studies. They are also used for the ground electrode.

**Types of surface electrodes:**

| Type | Construction | Advantages | Disadvantages |
|------|-------------|------------|---------------|
| Disc (Ag/AgCl) | Silver-silver chloride disc with conductive gel | Stable potential, low noise, standard for NCS | Requires gel; can shift position |
| Ring | Metal band placed around a digit | Convenient for digital sensory studies | Limited to finger recording |
| Bar | Two metal bars at fixed distance | Fixed interelectrode distance; reproducible | Less flexible positioning |
| Adhesive/disposable | Pre-gelled adhesive electrodes | Convenient; single-use; good for long studies | May have higher impedance if gel is insufficient |

**Key principles for surface electrode use:**

1. **Skin preparation**: Clean the skin with alcohol or abrasive prep to reduce impedance. Target impedance should be below 5-10 kOhm. Dead skin cells, oils, and lotions increase impedance.
2. **Conductive medium**: Electrode gel or paste creates a low-impedance interface between the electrode and skin.
3. **E1 placement**: For motor studies, E1 is placed directly over the motor point (the point on the muscle surface closest to the terminal zone of the motor nerve, producing the largest CMAP with an initial negative deflection). For sensory studies, E1 is placed over the nerve trunk.
4. **E2 placement**: E2 (reference) is placed over an electrically inactive area, typically 3-4 cm distal to E1 for motor studies (over the tendon) or at a fixed distance from E1 for sensory studies.
5. **Impedance matching**: E1 and E2 impedances should be closely matched. Impedance mismatch degrades common mode rejection ratio (CMRR).

### 2.2.2 Monopolar Needle Electrodes

Monopolar needles are solid, Teflon-coated stainless steel needles with only the bare tip exposed as the recording surface. A separate surface electrode serves as the reference.

**Characteristics:**
- Recording area: The exposed tip, typically 0.03-0.07 mm^2
- Recording radius: Larger than concentric needles (~1-2 mm); picks up activity from a wider territory
- MUAP appearance: Slightly larger amplitude, longer duration compared to concentric recording of the same motor unit (because of larger recording territory)
- Pain: Generally considered less painful than concentric needles (smaller diameter, sharper tip)
- Noise: Slightly more noise than concentric due to the larger recording area and distant reference electrode
- Cost: Less expensive; single-use disposable
- Reference electrode: Requires a separate surface reference electrode

### 2.2.3 Concentric Needle Electrodes

Concentric (coaxial) needles consist of a fine wire insulated from and running through the center of a hollow needle cannula. The central wire is the active electrode (E1), and the cannula serves as the reference (E2).

**Characteristics:**
- Recording area: The exposed elliptical tip of the central wire, typically 0.03-0.07 mm^2
- Recording radius: Smaller than monopolar (~0.5-1.0 mm); more selective recording
- MUAP appearance: Smaller amplitude, shorter duration compared to monopolar (smaller recording territory, built-in nearby reference)
- Pain: Slightly more painful than monopolar (larger overall diameter)
- Noise: Less electrical noise (reference is immediately adjacent to active electrode, improving CMRR)
- Cost: More expensive; traditionally reusable (now typically disposable)
- Reference electrode: Built-in (the cannula)

### 2.2.4 Comparison Table: Monopolar vs. Concentric Needles

| Parameter | Monopolar | Concentric |
|-----------|-----------|------------|
| Recording surface | Exposed tip only | Central wire tip |
| Reference electrode | Separate surface electrode | Cannula (built-in) |
| Recording radius | Larger (~1-2 mm) | Smaller (~0.5-1 mm) |
| MUAP amplitude | Higher | Lower |
| MUAP duration | Longer | Shorter |
| Noise | Slightly more | Less |
| Pain perception | Generally less painful | Slightly more painful |
| Cost | Less expensive | More expensive |
| Normal values | Require monopolar-specific norms | Require concentric-specific norms |

> **Clinical Pearl:** Normal values for MUAP parameters differ between monopolar and concentric recordings. Monopolar needles produce MUAPs that are approximately 2x larger in amplitude and slightly longer in duration compared to concentric needles studying the same motor unit. The electromyographer must use reference values appropriate to the needle type being used. Mixing needle types within a study without adjusting reference values will lead to interpretive errors.

### 2.2.5 Single-Fiber EMG Electrode

The single-fiber EMG (SFEMG) electrode is a specialized concentric needle with a very small recording surface (25 micrometers diameter) exposed through a side port in the cannula, approximately 3 mm from the tip.

**Characteristics:**
- Records from individual muscle fibers (recording radius ~300 micrometers)
- Used to measure jitter (variation in the time interval between action potentials of two muscle fibers belonging to the same motor unit)
- Used to measure fiber density (number of single muscle fiber action potentials belonging to one motor unit within the uptake area)
- Most sensitive test for NMJ disorders (sensitivity >95% for myasthenia gravis)
- Requires high-frequency filter of 500 Hz to 10 kHz (high low-frequency cutoff to isolate single fiber potentials)

### 2.2.6 Stimulating Electrodes

Surface stimulating electrodes typically consist of a cathode (negative pole) and anode (positive pole) separated by a fixed distance (usually 2-3 cm):

- **Cathode**: The negative pole, placed closer to the recording electrodes. Under the cathode, current flows outward across the nerve membrane, depolarizing it. This is where nerve activation occurs.
- **Anode**: The positive pole, placed proximal to the cathode (further from recording electrodes). Current flows inward under the anode, hyperpolarizing the membrane.

> **Board Mnemonic:** "Cathode = Current leaves (Causing depolarization) = Closer to recording." The cathode depolarizes because outward current flow across the membrane is equivalent to membrane depolarization.

**Anodal block**: If the anode is too close to the nerve and the stimulus intensity is high, the hyperpolarization under the anode may be sufficient to block propagation of action potentials generated under the cathode. This causes a falsely reduced response. Solution: ensure the cathode is oriented toward the recording electrodes and that the anode is proximal.

---

## 2.3 Stimulation Parameters 

### 2.3.1 Constant Current vs. Constant Voltage Stimulators

**Constant current stimulators** are the standard in clinical electrodiagnostic practice. They deliver a specified current regardless of tissue impedance variations between patients or between stimulation sites.

**Constant voltage stimulators** deliver a specified voltage. Because tissue impedance varies (with skin thickness, subcutaneous fat, hydration, and other factors), the actual current delivered to the nerve varies. This makes stimulation less reproducible.

| Feature | Constant Current | Constant Voltage |
|---------|-----------------|-----------------|
| Current delivered | Fixed | Variable (depends on impedance) |
| Reproducibility | High | Lower |
| Clinical standard | Yes | No (historical) |
| Advantage | Consistent nerve activation | Simpler circuit design |
| Disadvantage | Can deliver high voltage if impedance is high | Unpredictable nerve activation |

The total charge delivered to the nerve is:

**Q = I x t** (Charge = Current x Duration)

Where Q is charge in coulombs, I is current in amperes, and t is stimulus duration in seconds. Increasing either current intensity or stimulus duration increases the total charge and the likelihood of nerve depolarization.

### 2.3.2 Supramaximal Stimulation

For motor NCS, the goal is to activate every motor axon in the nerve to obtain a maximal CMAP. The protocol for achieving supramaximal stimulation:

1. Gradually increase stimulus intensity while monitoring CMAP amplitude
2. Identify the intensity at which CMAP amplitude no longer increases (maximal stimulation)
3. Increase intensity by an additional 20-25% above this level (supramaximal stimulation)

**Supramaximal stimulation ensures that all motor fibers are activated** and that minor variations in stimulus delivery (electrode position shift, impedance changes) do not cause submaximal responses.

> **Clinical Pearl:** Submaximal stimulation is the single most common technical error in motor nerve conduction studies. It produces a falsely low CMAP amplitude that may be misinterpreted as axonal loss. Always confirm supramaximal stimulation before accepting a low CMAP amplitude as genuine. Signs that stimulation may be submaximal include: incremental increase in CMAP with increasing stimulus intensity, inconsistent CMAP morphology between trials, and patient report of less-than-expected discomfort from stimulation in an obese limb.

### 2.3.3 Stimulus Duration

Standard stimulus duration for NCS is 0.1-0.2 ms (100-200 microseconds). In situations where nerve activation is difficult (obesity, edema, deeply situated nerves), the duration can be increased to 0.5-1.0 ms to increase total charge delivery.

Increasing stimulus duration:
- Increases total charge (Q = I x t)
- May increase stimulus artifact (wider pulse)
- Can activate adjacent nerves if too prolonged
- Should be considered before simply increasing current to painful levels

---

## 2.4 The Differential Amplifier 

### 2.4.1 Operating Principle

The differential amplifier is the core component of the electrodiagnostic recording system. It amplifies the difference between the signals at two inputs while rejecting signals common to both inputs (noise).

**Three-electrode system:**
- **E1 (Active electrode, G1)**: Placed over the area of interest. For motor NCS, over the motor point; for sensory NCS, over the nerve; for needle EMG, this is the needle electrode itself.
- **E2 (Reference electrode, G2)**: Placed over an electrically inactive area. For motor NCS, over the tendon; for sensory NCS, at a defined distance from E1.
- **E0 (Ground electrode)**: Placed between the stimulator and the recording electrodes. Provides a common reference point and reduces stimulus artifact and environmental noise.

**The amplifier output = Gain x (E1 - E2)**

Any signal present at both E1 and E2 (such as 60 Hz power line noise, cardiac artifact) is subtracted out (common mode rejection). Only the signal that differs between E1 and E2 (the biological signal of interest) is amplified.

### 2.4.2 Common Mode Rejection Ratio (CMRR)

CMRR quantifies the amplifier's ability to reject common mode signals (noise) while amplifying differential signals (the biological signal). It is expressed in decibels (dB):

**CMRR (dB) = 20 x log10 (Differential Gain / Common Mode Gain)**

| CMRR (dB) | Ratio | Noise Rejection |
|-----------|-------|-----------------|
| 60 dB | 1,000:1 | Minimal acceptable |
| 80 dB | 10,000:1 | Good |
| 90 dB | ~32,000:1 | Generally sufficient for clinical EMG |
| 100 dB | 100,000:1 | Excellent |
| 120 dB | 1,000,000:1 | Modern high-quality EMG machines |

**Factors that degrade CMRR:**

1. **Impedance mismatch between E1 and E2**: This is the most common and important cause of degraded CMRR in clinical practice. If one electrode has higher impedance than the other, the noise signal at each input will differ slightly, and the amplifier can no longer fully cancel it.
2. **High electrode impedance**: Even if matched, high overall impedance increases noise pickup.
3. **Cable damage or poor connections**: Broken shielding or loose connections alter impedance.
4. **Long electrode cables**: Longer cables act as antennae, picking up more electromagnetic interference.

> **Clinical Pearl:** When excessive 60 Hz noise is encountered during a study, the first troubleshooting step should be to check and reduce electrode impedance. Clean the skin, reapply electrode gel, and ensure firm electrode contact. If impedance is already low, check for impedance mismatch between E1 and E2 by swapping electrodes. A high-quality amplifier with excellent CMRR cannot compensate for poor electrode preparation.

### 2.4.3 Input Impedance

The amplifier's input impedance should be very high -- at least 100 MOhm, and modern machines typically exceed 1,000 MOhm (1 GOhm). High input impedance ensures that the amplifier draws negligible current from the biological source, preventing signal attenuation and distortion.

The relationship between electrode impedance and amplifier input impedance determines signal fidelity:

**V_recorded = V_signal x (Z_amplifier / (Z_amplifier + Z_electrode))**

When Z_amplifier >> Z_electrode, virtually all the signal voltage is recorded. If Z_amplifier is not much greater than Z_electrode, signal voltage is lost across the electrode impedance.

---

## 2.5 Filter Settings 

### 2.5.1 Filters in the EDX System

Filters selectively pass certain frequency components of a signal while attenuating others. The two primary filter types in EMG machines are:

- **High-pass filter (low-frequency filter)**: Passes frequencies above a cutoff frequency and attenuates frequencies below it. Removes slow baseline drift and movement artifact.
- **Low-pass filter (high-frequency filter)**: Passes frequencies below a cutoff frequency and attenuates frequencies above it. Removes high-frequency noise.

The frequency range between the high-pass and low-pass cutoffs is the **bandpass** -- the range of frequencies that the system allows through.

### 2.5.2 Standard Filter Settings by Study Type

| Study Type | High-Pass (Low-Freq) Filter | Low-Pass (High-Freq) Filter | Bandpass |
|-----------|---------------------------|---------------------------|----------|
| Motor NCS | 2-3 Hz | 10 kHz | 2 Hz - 10 kHz |
| Sensory NCS | 20 Hz | 2-3 kHz | 20 Hz - 2-3 kHz |
| Needle EMG | 10-20 Hz | 10 kHz | 10 Hz - 10 kHz |
| F waves | 2-3 Hz | 10 kHz | 2 Hz - 10 kHz (same as motor) |
| H reflex | 2-3 Hz | 10 kHz | 2 Hz - 10 kHz (same as motor) |
| SFEMG | 500 Hz | 10 kHz | 500 Hz - 10 kHz |
| SSEP (cortical) | 1-30 Hz | 250-1,000 Hz | 1 Hz - 1 kHz |
| SSEP (subcortical) | 30-100 Hz | 1,000-3,000 Hz | 30 Hz - 3 kHz |
| Repetitive nerve stimulation | 2-3 Hz | 10 kHz | 2 Hz - 10 kHz (same as motor) |

> **Board Mnemonic -- Filter settings by study type:** "Motor = wide open (2-10K); Sensory = narrower (20-3K); EMG = moderate (10-10K); SFEMG = very narrow high-pass (500-10K)." The wider the bandpass, the more of the signal is captured. Sensory NCS uses a narrower bandpass because SNAPs are smaller and more susceptible to noise.

### 2.5.3 Effects of Altering Filter Settings

Understanding how filter changes affect waveform measurements is a high-yield board topic:

**Raising the high-pass (low-frequency) filter:**
- Removes slow components of the waveform
- Reduces amplitude (SNAP and CMAP)
- May shorten onset latency (removes the slow initial phase)
- Reduces baseline wander and movement artifact
- Makes the waveform appear sharper

**Lowering the low-pass (high-frequency) filter:**
- Removes sharp, fast components of the waveform
- Reduces amplitude
- Prolongs onset latency (smooths the initial deflection)
- Smooths the waveform
- Reduces high-frequency noise
- May cause individual components of polyphasic potentials to merge

| Filter Change | Amplitude | Latency | Waveform Shape |
|---------------|-----------|---------|----------------|
| Raise high-pass | Decreases | May shorten | Sharper; loses slow components |
| Lower high-pass | Increases | May prolong | More baseline wander |
| Raise low-pass | Increases | May shorten | More noise; sharper |
| Lower low-pass | Decreases | Prolonged | Smoother; rounded |

> **Clinical Pearl:** Filters alter measured values. This means that filter settings must be standardized within a laboratory and documented with each study. Comparing results obtained with different filter settings -- either between studies or between laboratories -- can lead to erroneous conclusions. The AANEM recommends specifying filter settings when reporting NCS results.

### 2.5.4 The Notch Filter (60 Hz / 50 Hz)

The notch filter (also called a band-reject or band-stop filter) is designed to selectively attenuate a narrow frequency band, specifically the power line frequency (60 Hz in North America, 50 Hz in Europe and most other regions).

**When to use the notch filter:**
- Sensory NCS when 60 Hz noise cannot be eliminated by other means
- Needle EMG when noise is excessive despite proper grounding and impedance

**When NOT to use the notch filter:**
- Motor NCS (CMAP has significant frequency content near 60 Hz; notch filter can distort waveform)
- F waves and H reflexes (for the same reason)
- When the noise can be eliminated by improving electrode preparation, grounding, or cable management

> **Clinical Pearl:** The notch filter should be considered a last resort, not a first-line solution. Its use introduces a narrow "notch" in the frequency response that can distort waveforms and alter measured parameters. The preferred approach to eliminating 60 Hz noise is to address the source: check electrode impedance, ensure impedance matching between E1 and E2, verify ground electrode placement, move cables away from power sources, and turn off unnecessary electrical equipment in the room.

---

## 2.6 Display Settings 

### 2.6.1 Sweep Speed (Time Base)

The sweep speed determines the horizontal scale of the display and must be appropriate for the waveform being studied:

| Study Type | Sweep Speed | Rationale |
|-----------|------------|-----------|
| Motor NCS | 2-5 ms/division | CMAP duration is typically 5-15 ms |
| Sensory NCS | 1-2 ms/division | SNAP duration is typically 1-3 ms |
| Needle EMG | 10 ms/division | MUAP duration is 5-20 ms |
| F waves | 5-10 ms/division | Need to capture both M wave and late F wave |
| H reflex | 5-10 ms/division | Need to capture M wave and H response |
| Repetitive nerve stimulation | 1-2 ms/division per response | Need to see decrement across train |

### 2.6.2 Sensitivity (Gain)

The sensitivity setting determines the vertical scale of the display:

| Study Type | Sensitivity | Signal Amplitude Range |
|-----------|------------|----------------------|
| Motor NCS | 1-5 mV/division | CMAPs typically 4-20 mV |
| Sensory NCS | 10-20 microV/division | SNAPs typically 10-80 microV |
| Needle EMG (resting) | 50-100 microV/division | Fibrillation potentials ~50-300 microV |
| Needle EMG (voluntary) | 200-500 microV/division | MUAPs ~200 microV-3 mV |
| F waves | 200-500 microV/division | F waves are much smaller than CMAPs |

### 2.6.3 Analog-to-Digital Conversion

Modern EMG machines digitize the analog biological signal using an analog-to-digital converter (ADC). Two critical parameters govern the quality of digitization:

**Sampling rate**: The number of samples per second. By the Nyquist theorem (Nyquist-Shannon sampling theorem), the sampling rate must be at least twice the highest frequency of interest to avoid aliasing:

**Minimum sampling rate = 2 x f_max**

For a study using a 10 kHz high-frequency filter, the minimum sampling rate is 20 kHz (20,000 samples per second). In practice, sampling rates of 40-50 kHz are used to provide a comfortable margin above the Nyquist minimum.

**Resolution (bit depth)**: The number of discrete voltage levels the ADC can represent. A 12-bit ADC provides 4,096 levels; a 16-bit ADC provides 65,536 levels. Higher resolution provides finer voltage discrimination.

**Aliasing**: When the sampling rate is below the Nyquist minimum, high-frequency components of the signal are misrepresented as lower-frequency artifacts. This produces waveform distortion that cannot be corrected after digitization.

> **Clinical Pearl:** Aliasing is prevented by ensuring the sampling rate exceeds twice the high-frequency filter setting. In modern EMG machines, this is handled automatically. However, understanding the Nyquist theorem is important for board examinations and for understanding why digital systems require specific minimum sampling rates.

---

## 2.7 Temperature Effects 

### 2.7.1 The Critical Board Topic

Temperature effects on nerve conduction studies represent one of the most frequently tested topics on PM&R and electrodiagnostic board examinations. Cool extremity temperatures systematically alter NCS parameters and can lead to misdiagnosis if not recognized and corrected.

### 2.7.2 Minimum Acceptable Temperatures

| Measurement Site | Minimum Temperature |
|-----------------|-------------------|
| Upper extremity (dorsum of hand/wrist) | 32 degrees C (90 degrees F) |
| Lower extremity (dorsum of foot/ankle) | 31-32 degrees C (88-90 degrees F) |

If the limb temperature is below these thresholds, the extremity should be warmed before testing. Warming methods include warm water immersion, heat lamps, warm packs, or warming blankets. Temperature should be remeasured after warming and documented in the report.

### 2.7.3 Effects of Cooling on NCS Parameters

Cooling slows the kinetics of voltage-gated ion channels, particularly Na+ channels. This prolongs individual action potential duration and slows propagation velocity. The effects on each NCS parameter:

| Parameter | Effect of Cooling | Magnitude | Mechanism |
|-----------|------------------|-----------|-----------|
| Conduction velocity | Decreases | ~1.5-2.5 m/s per 1 degree C decrease | Slowed Na+ channel kinetics |
| Distal latency | Increases (prolonged) | ~0.2 ms per 1 degree C decrease | Slowed conduction in distal segment |
| SNAP amplitude | INCREASES (paradoxically) | Variable | Prolonged AP duration improves temporal summation |
| CMAP amplitude | Minimal change | Negligible | Safety factor maintains full activation |
| SNAP duration | Increases | Variable | Prolonged individual fiber APs |
| CMAP duration | May increase slightly | Variable | Prolonged individual fiber APs |
| F-wave latency | Increases | Proportional to CV slowing | Slowed proximal and distal conduction |
| H-reflex latency | Increases | Proportional to CV slowing | Slowed afferent and efferent limbs |

> **Board Mnemonic -- "Cold = Slow and Big SNAPs":** Cooling slows conduction (longer latency, slower CV) but paradoxically increases SNAP amplitude. Remember: Cold makes SNAPs look bigger. This is because the prolonged duration of individual fiber action potentials reduces phase cancellation (temporal dispersion decreases), allowing better summation of the compound response.

### 2.7.4 Clinical Implications of Temperature Effects

The temperature effects create specific diagnostic pitfalls:

1. **False diagnosis of carpal tunnel syndrome**: Cooling prolongs median distal latency, potentially exceeding the upper limit of normal and mimicking CTS. Always confirm that hand temperature is at least 32 degrees C before interpreting median distal latency.

2. **False diagnosis of demyelinating neuropathy**: Cooling slows conduction velocity and prolongs distal latency, mimicking the pattern of demyelination. In a cool extremity, CV may fall below the "demyelinating range" threshold.

3. **Missed axonal neuropathy**: The paradoxical increase in SNAP amplitude with cooling may mask an underlying reduction in SNAP amplitude from axonal loss, causing the amplitude to appear normal when it is actually reduced.

4. **Asymmetric temperature**: If one limb is cooler than the other, side-to-side comparisons of NCS parameters become unreliable. This is particularly relevant for H-reflex side-to-side latency comparisons.

### 2.7.5 Temperature Correction Factors

When warming is not feasible or practical, temperature correction formulas can be applied. Commonly cited correction factors per degree Celsius:

| Parameter | Correction Factor |
|-----------|------------------|
| Motor conduction velocity | Add ~1.5 m/s per degree C below standard |
| Sensory conduction velocity | Add ~1.4 m/s per degree C below standard |
| Motor distal latency | Subtract ~0.2 ms per degree C below standard |
| Sensory distal latency | Subtract ~0.2 ms per degree C below standard |

However, temperature correction is imprecise and non-linear (the effect is greater at lower temperatures). Warming the limb is always preferable to mathematical correction.

> **Clinical Pearl:** The relationship between temperature and NCS parameters is non-linear -- the effect of a 1 degree drop from 30 to 29 degrees C is greater than the effect of a 1 degree drop from 35 to 34 degrees C. Temperature correction formulas assume linearity and become increasingly inaccurate at very low temperatures. For this reason, the AANEM recommends warming the limb to meet minimum temperature standards rather than relying on correction factors.

---

## 2.8 Electrical Safety in the EDX Laboratory 

### 2.8.1 General Safety Principles

The EDX laboratory presents unique safety considerations because it involves direct electrical connection to the patient through surface and needle electrodes. While routine EDX testing is extremely safe, understanding the principles is essential for patient protection and board examinations.

**Leakage current**: The maximum allowable leakage current from patient-connected medical equipment is 10 microamperes (per IEC 60601 and equivalent national standards). Modern EMG machines are designed to meet this standard.

**Ground fault circuit interrupters (GFCI)**: Required for outlets in the EDX laboratory. GFCIs detect imbalances between line and neutral current (indicating current leakage to ground through the patient or equipment) and interrupt the circuit within milliseconds.

**Equipotential grounding**: All equipment in the EDX laboratory should be connected to a common ground to prevent ground potential differences that could drive current through the patient.

**Macroshock vs. microshock**: Macroshock involves current entering through intact skin (high impedance pathway), requiring relatively large currents (>1 mA) to produce perceptible sensation and much larger currents for cardiac effects. Microshock involves current directly contacting the heart (via intracardiac catheters or pacemaker leads), where currents as low as 10-100 microamperes can induce ventricular fibrillation. This distinction is critical for patients with cardiac devices.

### 2.8.2 Pacemaker and ICD Safety

EDX testing in patients with pacemakers and implantable cardioverter-defibrillators (ICDs) is a common clinical scenario and a frequently tested board topic.

**Needle EMG in patients with pacemakers/ICDs :**
- **NO CONTRAINDICATION** to routine needle EMG
- Needle EMG is safe because the electrical signals generated by muscle fibers are extremely small and cannot interfere with device function
- **Important caveat**: Pacemaker artifact can appear on the EMG recording and may mimic fibrillation potentials (periodic sharp waveforms). The electromyographer must recognize this pattern and not misinterpret it as denervation activity. Pacemaker artifact is time-locked to the cardiac rhythm and occurs at a regular rate.

**Nerve conduction studies in patients with pacemakers/ICDs :**
- Routine NCS (motor, sensory, F waves) are considered safe when performed with standard precautions
- The stimulating electrodes should be kept at least **15 cm (6 inches)** from any pacemaker leads, cardiac catheters, or the pulse generator
- Bipolar stimulation (standard technique) is preferred over monopolar stimulation to minimize current spread
- No cases of pacemaker or ICD malfunction from routine NCS have been reported in the published literature when standard precautions are observed

**Repetitive nerve stimulation (RNS) in patients with pacemakers/ICDs :**
- **AVOID** repetitive stimulation of the spinal accessory nerve or upper trunk of the brachial plexus in patients with pacemakers or ICDs
- The proximity of these stimulation sites to the heart and device leads creates a theoretical risk of device interference
- No safety studies have specifically evaluated RNS at these sites in device patients
- Distal nerve RNS (e.g., ulnar nerve at wrist) is considered safe with standard precautions

> **Clinical Pearl:** The bottom line for device patients: Needle EMG is safe (watch for pacemaker artifact). Routine NCS is safe (keep stimulator 15 cm from leads). Avoid RNS near the neck/shoulder in device patients. When in doubt, consult cardiology and have the device interrogated before and after the study.

### 2.8.3 Anticoagulation Considerations

Needle EMG involves insertion of a needle into muscle tissue, creating a theoretical risk of bleeding. In clinical practice:

- Needle EMG **can be performed** in patients on anticoagulation therapy (warfarin, DOACs, heparin) and antiplatelet agents
- The risk of clinically significant bleeding is very low in the published literature
- **Precautions in anticoagulated patients:**
  - Avoid deep muscles adjacent to major neurovascular bundles when possible
  - Apply firm pressure to needle insertion sites after withdrawal
  - Review the INR (for warfarin) and platelet count before the study
  - Be aware of supratherapeutic anticoagulation levels
  - Monitor for signs of hematoma formation
- **Compartment syndrome**: An extremely rare but reported complication of needle EMG, particularly in anticoagulated patients undergoing deep muscle examination (e.g., tibialis posterior, iliopsoas). While exceedingly rare, awareness is important.

> **Clinical Pearl:** The AANEM position is that needle EMG should not be withheld solely because a patient is on anticoagulation. The clinical benefit of the diagnostic information typically outweighs the small bleeding risk. However, the electromyographer should exercise judgment in selecting muscles to examine and apply appropriate post-procedure care in highly anticoagulated patients.

### 2.8.4 Infection Control

Standard precautions for bloodborne pathogen exposure apply in the EDX laboratory:

- **Disposable needle electrodes** (both monopolar and concentric) are single-use and must be discarded after a single patient use in a sharps container
- **Surface electrodes** should be cleaned between patients or discarded if single-use
- **Gloves** should be worn during needle EMG
- **Skin preparation** should use alcohol or antiseptic wipes
- **Reusable needle electrodes** (largely historical): If used, must be sterilized by gas sterilization or autoclaving. Needles used on patients with suspected prion disease (Creutzfeldt-Jakob disease) cannot be sterilized and must be destroyed.
- **HIV, hepatitis B, hepatitis C**: Standard precautions are sufficient. Needle EMG does not transmit these pathogens when disposable needles are used.

---

## 2.9 Artifact Recognition and Troubleshooting 

### 2.9.1 Common Artifacts and Solutions

| Artifact | Appearance | Cause | Solution |
|----------|------------|-------|----------|
| 60 Hz interference | Regular sinusoidal waveform at 60 Hz | Power line electromagnetic fields; nearby electrical equipment | Reduce electrode impedance; match E1/E2 impedance; check ground; move cables away from power cords; turn off nearby equipment |
| Stimulus artifact | Large deflection at time of stimulation that may obscure the response onset | Direct current spread from stimulator to recording electrodes; capacitive coupling | Place ground between stimulator and recording; rotate anode; reduce stimulus duration; clean skin between sites |
| Movement artifact | Low-frequency, irregular baseline shifts | Patient movement; cable motion; breathing | Immobilize limb; secure cables; coach patient relaxation; raise high-pass filter if needed |
| Pacemaker artifact | Regular sharp spikes at cardiac rate | Pacemaker electrical output detected by EMG | Recognize pattern; do not confuse with fibrillation potentials; use triggered sweep if needed |
| Cardiac artifact (ECG) | Regular waveforms at cardiac rate | ECG signal detected through volume conduction | Move ground; reposition recording electrodes; use triggered sweep |
| Electrocautery artifact | High-amplitude, irregular bursts | Nearby surgical electrocautery | Wait until cautery stops; cannot filter effectively |

### 2.9.2 Systematic Troubleshooting Protocol

When encountering noise or artifact in the EDX laboratory, follow this systematic approach:

1. **Check electrode impedance**: Ensure impedance is below 5-10 kOhm for each electrode
2. **Check impedance matching**: E1 and E2 impedances should be similar
3. **Verify ground electrode**: Should be placed between stimulator and recording electrodes, with good skin contact
4. **Inspect cables**: Check for damage, ensure shielding is intact, route away from power sources
5. **Skin preparation**: Re-prepare skin if needed (abrasion, alcohol, electrode gel)
6. **Environmental check**: Turn off unnecessary equipment (phones, fluorescent lights, electric beds)
7. **Reposition electrodes**: Move electrodes away from sources of artifact
8. **Adjust filters**: Use notch filter only as a last resort; consider raising high-pass filter for motion artifact
9. **Equipment check**: Test with a different channel; replace cables or electrodes if damaged

---

## 2.10 AANEM Standards and Documentation Requirements 

### 2.10.1 Supervision and Performance

The AANEM 2023 Recommended Policy for Electrodiagnostic Medicine establishes key standards:

- NCS should be performed by or under the direct supervision of a qualified physician
- **Direct supervision** means the physician is in close physical proximity to the EDX laboratory during testing
- **Real-time interpretation** is required -- the physician must be able to direct the study based on evolving findings
- Trans-telephonic or internet transmission with delayed interpretation does NOT constitute a quality study
- The physician should determine which nerves and muscles to study based on clinical assessment

### 2.10.2 Documentation Standards

A complete EDX report must include:

1. **Clinical information**: Referring diagnosis, presenting symptoms, relevant history
2. **Nerves tested**: All nerves evaluated with stimulation and recording sites
3. **Distances**: Measured distances between stimulation and recording sites
4. **NCS data**: Latencies, amplitudes, conduction velocities, in tabular format
5. **Limb temperature**: Must be documented
6. **Needle EMG data**: Muscles examined, spontaneous activity, MUAP characteristics, recruitment pattern
7. **Interpretation**: Summary and electrodiagnostic impression correlating findings with clinical presentation
8. **Filter settings**: Should be specified when reporting results
9. **Side-to-side comparisons**: When clinically relevant

---

## Chapter Summary

This chapter has covered the technical foundations of electrodiagnostic medicine. The key themes are:

1. **The differential amplifier** with its three-electrode system (E1, E2, ground) is the heart of the recording system. CMRR is degraded primarily by electrode impedance mismatch.
2. **Filter settings** directly alter measured waveform parameters. Standardized settings are essential for reproducible and interpretable results.
3. **Temperature** is the most important technical variable affecting NCS parameters. Cool limbs produce slow CVs, prolonged latencies, and paradoxically increased SNAP amplitudes.
4. **Supramaximal stimulation** is essential for accurate motor NCS. Submaximal stimulation is the most common technical error.
5. **Safety** in patients with cardiac devices, anticoagulation, and infection risk can be managed with appropriate precautions.

---

## References

1. American Association of Neuromuscular & Electrodiagnostic Medicine (AANEM). Recommended Policy for Electrodiagnostic Medicine. Rochester, MN: AANEM; 2023.

2. American Association of Neuromuscular & Electrodiagnostic Medicine (AANEM). Risks in Electrodiagnostic Medicine. Muscle Nerve. 2020;61(1):11-16.

3. American Association of Neuromuscular & Electrodiagnostic Medicine (AANEM). Practice Parameter for Electrodiagnostic Studies in Carpal Tunnel Syndrome. Muscle Nerve. 2018;58(6):1-8.

4. Aminoff MJ. Aminoff's Electrodiagnosis in Clinical Neurology. 7th ed. Philadelphia: Elsevier; 2024.

5. Bolton CF, Chen R, Wijdicks EF, Zifko UA. Neurology of Breathing. Philadelphia: Butterworth-Heinemann; 2004.

6. Cuccurullo SJ, ed. Physical Medicine and Rehabilitation Board Review. 4th ed. New York: Demos Medical; 2020.

7. Dumitru D, Amato AA, Zwarts MJ. Electrodiagnostic Medicine. 2nd ed. Philadelphia: Hanley & Belfus; 2002.

8. Kimura J. Electrodiagnosis in Diseases of Nerve and Muscle: Principles and Practice. 5th ed. New York: Oxford University Press; 2024.

9. Natus Medical. Troubleshooting Guide: Reducing Noise and Artifact in EMG/NCS Studies. Technical Note. 2021.

10. Oh SJ. Clinical Electromyography: Nerve Conduction Studies. 4th ed. Philadelphia: Lippincott Williams & Wilkins; 2022.

11. Preston DC, Shapiro BE. Electromyography and Neuromuscular Disorders: Clinical-Electrophysiologic-Ultrasound Correlations. 4th ed. Philadelphia: Elsevier; 2021.

12. Tankisi H, Burke D, Cui L, et al. Standards of instrumentation of EMG. Clin Neurophysiol. 2020;131(1):243-258.

13. Todnem K, Knudsen G, Riise T, et al. The non-linear relationship between nerve conduction velocity and skin temperature. J Neurol Neurosurg Psychiatry. 1989;52(4):497-501.

14. Webster JG, ed. Medical Instrumentation: Application and Design. 5th ed. Hoboken, NJ: Wiley; 2020.

