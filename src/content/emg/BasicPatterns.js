import { BasicPatternsData } from './BasicPatternsData.js';

export const BasicPatterns = {
    generateContent: function (module) {
        return `
            <style>
                .bp-interactive-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    margin-bottom: 25px;
                }
                .bp-interactive-card:hover {
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    border-color: #cbd5e1;
                }
                .bp-video-card {
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                }
                .bp-video-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
                }
                .bp-pearl-box {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 20px;
                    border-left: 4px solid #6366f1;
                }
            </style>

            <div class="interactive-content" style="position: relative; font-family: 'Inter', sans-serif;">
                
                <!-- Learning Objective Banner -->
                <div style="
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    padding: 35px;
                    border-radius: 20px;
                    margin-bottom: 35px;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                ">
                    <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 1.8em; display: flex; align-items: center; gap: 12px; font-weight: 700;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> 
                        Learning Objectives
                    </h3>
                    <p style="color: #475569; font-size: 1.15em; font-weight: 500; margin: 0; line-height: 1.6;">
                        ${BasicPatternsData.objectives}
                    </p>
                </div>

                <!-- Pattern Analysis Framework -->
                <div class="bp-interactive-card">
                    <h3 style="color: #0f172a; margin-bottom: 25px; font-size: 1.5em; display: flex; align-items: center; gap: 10px; font-weight: 700;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
                        Systematic Pattern Analysis Framework
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                        ${BasicPatternsData.analysisFramework.map(section => `
                            <div style="background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
                                <h4 style="color: #0369a1; margin-bottom: 20px; font-size: 1.25em; font-weight: 600;">${section.title}</h4>
                                <ul style="color: #334155; line-height: 1.6; font-size: 0.95em; margin: 0; padding-left: 20px;">
                                    ${section.items.map(item => `
                                        <li style="margin-bottom: 12px;"><strong>${item.label}:</strong> ${item.desc}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Multimedia Pattern Recognition Library -->
                <div class="bp-interactive-card" style="border-top: 4px solid #f59e0b;">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.6em; display: flex; align-items: center; gap: 10px; font-weight: 700;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> 
                        Interactive Pattern Recognition Library
                    </h3>
                    <p style="color: #475569; margin-bottom: 35px; font-size: 1.1em; max-width: 800px;">
                        Master EMG pattern recognition through real-time video demonstrations. Read the clinical pearls alongside the videos to train your ear.
                    </p>

                    <!-- Abnormal Spontaneous Activity Videos -->
                    <div style="margin-bottom: 50px;">
                        <h4 style="color: #dc2626; margin-bottom: 25px; font-size: 1.4em; display: flex; align-items: center; gap: 10px; font-weight: 700; padding-bottom: 10px; border-bottom: 2px solid #fee2e2;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> 
                            Abnormal Spontaneous Activity
                        </h4>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">
                            ${BasicPatternsData.abnormalActivity.map(act => `
                                <div class="bp-video-card">
                                    <div style="padding: 20px 25px; background: #fafafa; border-bottom: 1px solid #e2e8f0;">
                                        <h5 style="color: #0f172a; margin: 0; font-size: 1.2em; font-weight: 700;">${act.title}</h5>
                                    </div>
                                    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                                        <iframe loading="lazy" src="https://www.youtube.com/embed/${act.videoId}"
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                    </div>
                                    <div style="padding: 25px;">
                                        <p style="color: #475569; font-size: 0.95em; line-height: 1.6; margin-top: 0;">${act.description}</p>
                                        
                                        <div class="bp-pearl-box" style="border-left-color: #dc2626;">
                                            <p style="color: #991b1b; font-weight: 700; margin: 0 0 10px 0; font-size: 0.9em; text-transform: uppercase;">Clinical Pearls:</p>
                                            <ul style="color: #334155; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 20px;">
                                                ${act.clinicalPearls.map(pearl => `
                                                    <li style="margin-bottom: 8px;"><strong>${pearl.label}:</strong> ${pearl.value}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Motor Unit Analysis Videos -->
                    <div style="margin-bottom: 50px;">
                        <h4 style="color: #2563eb; margin-bottom: 25px; font-size: 1.4em; display: flex; align-items: center; gap: 10px; font-weight: 700; padding-bottom: 10px; border-bottom: 2px solid #dbeafe;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
                            Motor Unit Analysis
                        </h4>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">
                             ${BasicPatternsData.motorUnitAnalysis.map(act => `
                                <div class="bp-video-card">
                                    <div style="padding: 20px 25px; background: #fafafa; border-bottom: 1px solid #e2e8f0;">
                                        <h5 style="color: #0f172a; margin: 0; font-size: 1.2em; font-weight: 700;">${act.title}</h5>
                                    </div>
                                    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                                        <iframe loading="lazy" src="https://www.youtube.com/embed/${act.videoId}"
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                    </div>
                                    <div style="padding: 25px;">
                                        <p style="color: #475569; font-size: 0.95em; line-height: 1.6; margin-top: 0;">${act.description}</p>
                                        
                                        <div class="bp-pearl-box" style="border-left-color: #2563eb;">
                                            <p style="color: #1e40af; font-weight: 700; margin: 0 0 10px 0; font-size: 0.9em; text-transform: uppercase;">Clinical Pearls:</p>
                                            <ul style="color: #334155; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 20px;">
                                                ${act.clinicalPearls.map(pearl => `
                                                    <li style="margin-bottom: 8px;"><strong>${pearl.label}:</strong> ${pearl.value}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Normal Activity Videos -->
                    <div>
                         <h4 style="color: #059669; margin-bottom: 25px; font-size: 1.4em; display: flex; align-items: center; gap: 10px; font-weight: 700; padding-bottom: 10px; border-bottom: 2px solid #d1fae5;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> 
                            Normal Spontaneous Activity
                        </h4>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">
                             ${BasicPatternsData.normalActivity.map(act => `
                                <div class="bp-video-card">
                                    <div style="padding: 20px 25px; background: #fafafa; border-bottom: 1px solid #e2e8f0;">
                                        <h5 style="color: #0f172a; margin: 0; font-size: 1.2em; font-weight: 700;">${act.title}</h5>
                                    </div>
                                    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                                        <iframe loading="lazy" src="https://www.youtube.com/embed/${act.videoId}"
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                    </div>
                                    <div style="padding: 25px;">
                                        <p style="color: #475569; font-size: 0.95em; line-height: 1.6; margin-top: 0;">${act.description}</p>
                                        
                                        <div class="bp-pearl-box" style="border-left-color: #059669;">
                                            <p style="color: #065f46; font-weight: 700; margin: 0 0 10px 0; font-size: 0.9em; text-transform: uppercase;">Clinical Pearls:</p>
                                            <ul style="color: #334155; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 20px;">
                                                ${act.clinicalPearls.map(pearl => `
                                                    <li style="margin-bottom: 8px;"><strong>${pearl.label}:</strong> ${pearl.value}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Advanced Clinical Scenarios -->
                <div class="bp-interactive-card" style="border-top: 4px solid #6366f1;">
                    <h3 style="color: #0f172a; margin-bottom: 25px; font-size: 1.5em; display: flex; align-items: center; gap: 10px; font-weight: 700;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 
                        Advanced Scenario Breakdown
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px;">
                        ${BasicPatternsData.advancedScenarios.map(caseStudy => `
                            <div style="background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; border-top: 4px solid ${caseStudy.id === 'case1' ? '#ef4444' : '#8b5cf6'};">
                                <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 1.25em;">${caseStudy.title}</h4>
                                <p style="color: #475569; line-height: 1.6; margin-bottom: 15px; font-size: 0.95em;">
                                    <strong style="color: #334155;">Clinical:</strong> ${caseStudy.clinical}<br><br>
                                    <strong style="color: #334155;">EMG Findings:</strong> ${caseStudy.findings}
                                </p>
                                <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0;">
                                    <strong style="color: ${caseStudy.id === 'case1' ? '#b91c1c' : '#6d28d9'}; font-size: 0.9em; text-transform: uppercase;">The Resident Breakdown:</strong>
                                    <ul style="color: #475569; margin-top: 10px; margin-bottom: 0; font-size: 0.9em; padding-left: 20px; line-height: 1.5;">
                                        ${caseStudy.features.map(f => `<li style="margin-bottom: 5px;">${f}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz([
            {
                question: "In systematic EMG pattern analysis, what are the THREE key parameters that must be evaluated?",
                options: [
                    "Morphology, Stability, and Firing Characteristics",
                    "Amplitude, Duration, and Frequency",
                    "Sound, Shape, and Speed",
                    "Recruitment, Rhythm, and Rate"
                ],
                correct: 0,
                explanation: "The three key parameters for systematic EMG pattern analysis are: (1) MORPHOLOGY (duration, amplitude, phases, initial deflection, shape), (2) STABILITY (consistent vs. waxing/waning), and (3) FIRING CHARACTERISTICS (rate, pattern, rhythm, recruitment, voluntary control)."
            },
            {
                question: "You observe a regular 'machine-like' sound with perfectly repetitive, multi-serrated discharges at 50Hz. Individual spikes are discernible and time-linked. This pattern most likely represents:",
                options: [
                    "Complex repetitive discharges",
                    "Myokymic discharges",
                    "Polyphasic motor unit potentials",
                    "Neuromyotonic discharges"
                ],
                correct: 0,
                explanation: "Complex repetitive discharges (CRDs) are characterized by a regular 'machine-like' sound and perfectly repetitive discharges (usually 5-100Hz). They are caused by ephaptic transmission between adjacent muscle fibers."
            },
            {
                question: "A patient with suspected motor neuron disease shows abundant spontaneous activity. Which combination of findings would be MOST supportive of this diagnosis?",
                options: [
                    "Fibrillations + large polyphasic MUAPs + fasciculations + reduced recruitment",
                    "Myotonic discharges + small MUAPs + early recruitment",
                    "Complex repetitive discharges + normal MUAPs",
                    "Endplate spikes + normal recruitment"
                ],
                correct: 0,
                explanation: "Motor Neuron Disease (ALS) typically presents with widespread active denervation (fibrillations/PSWs), chronic reinnervation changes (large, polyphasic MUAPs), fasciculations (motor neuron irritability), and reduced recruitment due to loss of motor units."
            },
            {
                question: "What is the characteristic sound of fibrillation potentials on EMG?",
                options: [
                    "Machine-like regular pattern",
                    "Rain on tin roof",
                    "Marching soldiers",
                    "Seashell sound"
                ],
                correct: 1,
                explanation: "Fibrillations produce a characteristic 'rain on tin roof' sound. These are brief spikes (1-5ms duration) firing regularly at 0.5-10Hz, indicating active denervation."
            },
            {
                question: "What is the clinical significance of myokymic discharges?",
                options: [
                    "Always indicate motor neuron disease",
                    "Grouped repetitive discharges of the same MUAP often associated with radiation plexopathy, MS, or Guillain-Barré",
                    "Normal finding in healthy muscle",
                    "Only seen in myopathies"
                ],
                correct: 1,
                explanation: "Myokymic discharges are grouped repetitive discharges of the same motor unit with a characteristic 'marching soldiers' sound. They are commonly associated with radiation plexopathy, MS (facial), and Guillain-Barré syndrome."
            },
            {
                question: "How can you distinguish endplate spikes (normal) from pathologic fibrillations?",
                options: [
                    "Endplate spikes have initial negative deflection; fibrillations have initial positive deflection",
                    "Endplate spikes are larger in amplitude",
                    "Endplate spikes fire faster",
                    "There is no difference"
                ],
                correct: 0,
                explanation: "The KEY DIFFERENTIATOR is the initial deflection: Endplate spikes have an INITIAL NEGATIVE deflection (needle-induced terminal nerve twig irritation), while pathologic fibrillations have an INITIAL POSITIVE deflection."
            },
            {
                question: "Which pattern is characterized by a 'dive bomber' sound and waxing/waning amplitude and frequency?",
                options: [
                    "Myotonic discharges",
                    "Complex repetitive discharges",
                    "Neuromyotonic discharges",
                    "Fasciculations"
                ],
                correct: 0,
                explanation: "Myotonic discharges are characterized by a distinctive 'dive bomber' or 'revving engine' sound due to the waxing and waning of both amplitude and frequency. This is seen in myotonic dystrophy and myotonia congenita."
            },
            {
                question: "Which spontaneous activity pattern is described as sounding like 'corn popping' and represents the spontaneous firing of an entire motor unit?",
                options: [
                    "Fibrillations",
                    "Myokymic discharges",
                    "Fasciculations",
                    "Complex repetitive discharges"
                ],
                correct: 2,
                explanation: "Fasciculations represent the spontaneous firing of a single motor unit. Their slow, irregular firing pattern (0.1-10Hz) produces a characteristic 'corn popping' or 'large distant pops' sound on audio."
            },
            {
                question: "What constitutes a 'polyphasic' motor unit potential?",
                options: [
                    "Greater than 4 phases (baseline crossings + 1)",
                    "Greater than 2 phases",
                    "Any potential with a negative onset",
                    "A potential with high amplitude"
                ],
                correct: 0,
                explanation: "A motor unit potential is considered polyphasic if it has more than 4 phases. While up to 10% of MUAPs can be polyphasic in normal muscle, an increase suggests desynchronization of muscle fiber firing, seen in both myopathy and reinnervation."
            },
            {
                question: "In a patient with severe myopathy, what recruitment pattern would you expect?",
                options: [
                    "Early recruitment (full interference pattern at low force)",
                    "Reduced recruitment (fast firing rate of few units)",
                    "Normal recruitment ratio (5:1)",
                    "Poor activation"
                ],
                correct: 0,
                explanation: "Myopathy leads to 'early recruitment'. Because each motor unit produces less force (due to loss of muscle fibers), the CNS recruits many more units than normal for a given level of force, leading to a full interference pattern with minimal effort."
            },
            {
                question: "Neuromyotonic discharges are characterized by:",
                options: [
                    "Very high frequency (150-300Hz) decrementing bursts with a 'pinging' sound",
                    "Slow, regular firing at 1-2Hz",
                    "Waxing and waning amplitude only",
                    "Irregular firing with 'popcorn' sound"
                ],
                correct: 0,
                explanation: "Neuromyotonic discharges are high-frequency (150-300Hz) bursts that typically decrement in amplitude, producing a characteristic high-pitched 'pinging' sound. They are seen in syndromes of peripheral nerve hyperexcitability (Isaac's syndrome)."
            }
        ]) : '<p class="error-text">Quiz module not loaded</p>'}

            </div>
        `;
    }
};
