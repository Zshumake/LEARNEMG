import { NeuropathyData } from './NeuropathyData.js';
import { ErnestIcon } from '../../utils/ErnestIcon.js';

export const NeuropathyPathophysiology = {
    data: NeuropathyData,

    generateContent(module) {
        // Register tab switcher action
        window._registerAction('Pathophys_switchTab', (el) => {
            const tabName = el.dataset.tab;
            document.querySelectorAll('.patho-content').forEach(e => e.style.display = 'none');
            const target = document.getElementById('content-' + tabName);
            if (target) target.style.display = 'block';

            document.querySelectorAll('.patho-tab').forEach(e => {
                e.classList.remove('active');
                e.style.background = 'transparent';
                e.style.color = '#475569';
            });

            const btn = document.getElementById('tab-' + tabName);
            if (btn) {
                btn.classList.add('active');
                btn.style.background = '#6b21a8';
                btn.style.color = 'white';
            }
        });

        return `
        <div class="intro-container">

            <!-- Hero Section -->
            <div class="intro-hero" style="background: linear-gradient(135deg, #4c1d95, #6b21a8); padding: 50px 30px; border-radius: 24px; color: white; margin-bottom: 40px; text-align: center; box-shadow: 0 20px 40px rgba(76, 29, 149, 0.2);">
                <h1 style="font-size: 2.8em; font-weight: 900; margin-bottom: 15px; letter-spacing: -0.03em;">${this.data.header.title}</h1>
                <p style="font-size: 1.25em; opacity: 0.9; max-width: 800px; margin: 0 auto; line-height: 1.6;">${this.data.header.subtitle}</p>
            </div>

            <!-- Podcast Integration -->
            <div data-podcast-trigger="true" data-module-id="neuropathy-pathophysiology" data-episode-id="neuropathy-poly"
                 class="podcast-card-hover"
                 style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        padding: 24px;
                        border-radius: 20px;
                        margin-bottom: 40px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        position: relative;
                        overflow: hidden;
                        transition: transform 0.2s;">
                
                <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

                <div style="position: relative;">
                    ${ErnestIcon.getHTML({ size: '72px' })}
                    <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
                </div>

                <div style="flex: 1; z-index: 1;">
                    <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                        Neuropathy Series
                    </div>
                    <div style="font-size: 0.95em; color: #64748b;">
                        Deep Dive Episodes Available • Click to listen
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container" style="display: flex; flex-wrap: wrap; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 20px; margin-bottom: 40px; border: 1px solid #e2e8f0;">
                ${this.data.tabs.map((tab, i) => `
                    <button data-action="Pathophys_switchTab" data-tab="${tab.id}"
                            class="patho-tab ${i === 0 ? 'active' : ''}"
                            id="tab-${tab.id}"
                            style="flex: 1; min-width: 150px; padding: 12px 20px; background: ${i === 0 ? '#6b21a8' : 'transparent'}; color: ${i === 0 ? 'white' : '#475569'}; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${tab.icon}"></path></svg>
                        ${tab.label}
                    </button>
                `).join('')}
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. Anatomy -->
            <div id="content-anatomy" class="patho-content" style="display: block; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.anatomy.intro.title}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.anatomy.intro.text}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        ${this.data.anatomy.components.map(comp => `
                            <div style="background: ${comp.bgColor}; padding: 25px; border-radius: 16px; border-left: 5px solid ${comp.borderColor};">
                                <h4 style="color: ${comp.iconColor}; margin-bottom: 15px; font-weight: 800; font-size: 1.25em;">${comp.title}</h4>
                                <ul style="color: #334155; line-height: 1.6; padding-left: 20px; display: flex; flex-direction: column; gap: 10px;">
                                    ${comp.points.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                        <h4 style="color: #0f172a; margin-bottom: 15px; font-weight: 900; font-size: 1.4em;">${this.data.anatomy.physiology.title}</h4>
                        <p style="color: #475569; margin-bottom: 20px; font-size: 1.05em;">${this.data.anatomy.physiology.text}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                             ${this.data.anatomy.physiology.points.map((p, i) => `
                                <div style="background: #f8fafc; padding: 15px; border-radius: 12px;"><span style="color: #6b21a8; font-weight: 900; margin-right: 8px;">0${i + 1}</span> ${p}</div>
                             `).join('')}
                        </div>
                    </div>

                    <div class="resident-pearl">
                        <h4>The DRG Pearl</h4>
                        <p>${this.data.anatomy.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 2. Mechanisms -->
            <div id="content-mechanisms" class="patho-content" style="display: none; animation: fadeIn 0.5s;">
                 <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 30px; font-size: 1.8em; font-weight: 900;">${this.data.mechanisms.title}</h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 25px; margin-bottom: 30px;">
                        ${this.data.mechanisms.cards.map(card => `
                            <div style="background: ${card.bg}; border: 1px solid ${card.color}; padding: 30px; border-radius: 20px; position: relative; overflow: hidden;">
                                <div style="display: flex; align-items: flex-start; gap: 20px;">
                                    <div style="background: white; padding: 15px; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); color: ${card.color};">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${card.icon}"></path></svg>
                                    </div>
                                    <div>
                                        <h4 style="color: ${card.color}; font-size: 1.4em; font-weight: 900; margin: 0;">${card.type}</h4>
                                        <p style="color: ${card.color}; opacity: 0.8; font-weight: 700; font-size: 0.9em; margin-bottom: 15px;">${card.subtitle}</p>
                                        
                                        <div style="display: flex; flex-direction: column; gap: 12px; color: #334155; line-height: 1.6; font-size: 0.95em;">
                                            <div><strong>The 'Why':</strong> ${card.mechanism}</div>
                                            <div><strong>The Findings:</strong> ${card.findings}</div>
                                            <div><strong>Prognosis:</strong> ${card.prognosis}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>The 7-Day Waiting Period</h4>
                        <p>${this.data.mechanisms.pearl}</p>
                    </div>
                 </div>
            </div>

            <!-- 3. Classification -->
            <div id="content-injury-classification" class="patho-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 1.8em; font-weight: 900;">${this.data.injuryClassification.intro}</h3>
                    <p style="font-size: 1.05em; color: #475569; margin-bottom: 30px;">${this.data.injuryClassification.text}</p>
                    
                    <h4 style="color: #6b21a8; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Seddon's Clinical Classification</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                        ${this.data.injuryClassification.seddon.map(s => `
                            <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; border-top: 6px solid #6b21a8; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <h5 style="color: #0f172a; font-size: 1.2em; font-weight: 900; margin-bottom: 10px;">${s.grade}</h5>
                                <p style="color: #475569; font-size: 0.9em; line-height: 1.5;">${s.desc}</p>
                            </div>
                        `).join('')}
                    </div>

                    <h4 style="color: #0369a1; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Sunderland's Anatomical Grades</h4>
                    <div style="overflow-x: auto; background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 1px;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="background: #f8fafc; color: #0f172a; border-bottom: 2px solid #e2e8f0;">
                                    <th style="padding: 15px; font-weight: 800;">Grade</th>
                                    <th style="padding: 15px; font-weight: 800;">Anatomical Damage</th>
                                    <th style="padding: 15px; font-weight: 800;">Seddon Equivalent</th>
                                    <th style="padding: 15px; font-weight: 800;">Prognosis</th>
                                    <th style="padding: 15px; font-weight: 800;">Timeline</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.injuryClassification.sunderland.map(row => `
                                    <tr style="border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.95em;">
                                        <td style="padding: 15px; font-weight: 700; color: #0369a1;">${row.grade}</td>
                                        <td style="padding: 15px;">${row.anatomical}</td>
                                        <td style="padding: 15px;"><span style="background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 0.9em; font-weight: 600;">${row.seddonEq}</span></td>
                                        <td style="padding: 15px; font-weight: 600;">${row.recovery}</td>
                                        <td style="padding: 15px; color: #64748b;">${row.timeline}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="resident-pearl" style="margin-top: 30px;">
                        <h4>Why Sunderland Matters</h4>
                        <p>${this.data.injuryClassification.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 4. EDX Correlations -->
            <div id="content-correlations" class="patho-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 1.8em; font-weight: 900;">${this.data.correlations.intro}</h3>
                    <p style="font-size: 1.05em; color: #475569; margin-bottom: 30px;">${this.data.correlations.text}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 35px;">
                        ${this.data.correlations.table.map(row => `
                            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; display: grid; grid-template-columns: 200px 1fr; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <div style="background: #f8fafc; padding: 25px 20px; display: flex; align-items: center; border-right: 1px solid #e2e8f0;">
                                    <h4 style="color: #0f172a; font-weight: 900; margin: 0; font-size: 1.1em;">${row.patho}</h4>
                                </div>
                                <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; align-items: center;">
                                    <div>
                                        <div style="color: #64748b; font-size: 0.8em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Clinical Vitals</div>
                                        <div style="color: #334155; font-size: 0.9em; line-height: 1.5;">${row.clinical}</div>
                                    </div>
                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                        <div style="background: #eff6ff; padding: 10px 15px; border-radius: 8px; border-left: 3px solid #3b82f6;">
                                            <span style="font-weight: 800; color: #1e40af; font-size: 0.8em; margin-right: 8px;">NCS:</span>
                                            <span style="font-size: 0.85em; color: #1e3a8a;">${row.ncs}</span>
                                        </div>
                                        <div style="background: #fdf4ff; padding: 10px 15px; border-radius: 8px; border-left: 3px solid #c026d3;">
                                            <span style="font-weight: 800; color: #86198f; font-size: 0.8em; margin-right: 8px;">EMG:</span>
                                            <span style="font-size: 0.85em; color: #701a75;">${row.emg}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>The Double Crush Hypothesis</h4>
                        <p>${this.data.correlations.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 5. Fiber Classification -->
            <div id="content-classification" class="patho-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 1.8em; font-weight: 900;">${this.data.classification.intro}</h3>
                    <p style="font-size: 1.05em; color: #475569; margin-bottom: 30px;">${this.data.classification.text}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                        ${this.data.classification.fibers.map((fiber, idx) => `
                            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px 25px; display: flex; align-items: center; justify-content: space-between; transition: transform 0.2s;">
                                <div style="flex: 1;">
                                    <h5 style="color: #0f172a; font-weight: 800; font-size: 1.1em; margin-bottom: 4px;">${fiber.type} <span style="font-weight: 400; color: #64748b; font-size: 0.8em; margin-left: 10px;">${fiber.size}</span></h5>
                                    <p style="color: #475569; font-size: 0.9em; margin: 0;">${fiber.func}</p>
                                </div>
                                <div style="background: ${idx < 2 ? '#dcfce7' : '#f1f5f9'}; color: ${idx < 2 ? '#166534' : '#475569'}; padding: 6px 12px; border-radius: 20px; font-weight: 800; font-size: 0.85em; white-space: nowrap; margin-left: 20px;">
                                    ${fiber.speed}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>The Great Blind Spot of EDX</h4>
                        <p>${this.data.classification.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 6. Clinical Atlas -->
            <div id="content-atlas" class="patho-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card" style="padding: 0; overflow: hidden; background: transparent; border: none; box-shadow: none;">
                    
                    <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; border-radius: 24px 24px 0 0; color: white; text-align: center;">
                        <h3 style="margin-bottom: 15px; font-size: 1.8em; font-weight: 900;">${this.data.atlas.intro}</h3>
                        <p style="font-size: 1.05em; opacity: 0.8; margin: 0;">${this.data.atlas.text}</p>
                    </div>

                    <div style="overflow-x: auto; background: white; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 24px 24px; padding: 1px;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="background: #f8fafc; color: #475569; border-bottom: 2px solid #e2e8f0;">
                                    <th style="padding: 15px; font-weight: 800; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.5px;">Nerve</th>
                                    <th style="padding: 15px; font-weight: 800; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.5px;">Site</th>
                                    <th style="padding: 15px; font-weight: 800; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.5px;">Motor Loss</th>
                                    <th style="padding: 15px; font-weight: 800; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.5px;">Sensory Loss</th>
                                    <th style="padding: 15px; font-weight: 800; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.5px;">Classic Sign</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.atlas.data.map((row, idx) => `
                                    <tr style="border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9em; background: ${idx % 2 === 0 ? 'white' : '#fafafa'}; transition: background 0.2s;">
                                        <td style="padding: 15px; font-weight: 800; color: ${row.nerve === 'Median' ? '#047857' :
                row.nerve === 'Ulnar' ? '#9a3412' :
                    row.nerve === 'Radial' ? '#1d4ed8' : '#7c3aed'
            };">${row.nerve}</td>
                                        <td style="padding: 15px; font-weight: 700;">${row.site}</td>
                                        <td style="padding: 15px;">${row.motor}</td>
                                        <td style="padding: 15px;">${row.sensory}</td>
                                        <td style="padding: 15px; font-style: italic;">${row.sign}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Embedded Universal Quiz System -->
            <div style="margin-top: 50px;">
                ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(JSON.parse('[{"question":"What is the primary pathological difference between demyelinating and axonal neuropathies?","options":["Demyelinating affects myelin; axonal affects the axon itself","Demyelinating is painful; axonal is painless","Demyelinating occurs proximally; axonal occurs distally","Demyelinating affects motor fibers; axonal affects sensory fibers"],"correct":0,"explanation":"Demyelinating neuropathies primarily damage the myelin sheath (Schwann cells), leading to slowed conduction velocity and conduction blocks. Axonal neuropathies involve degeneration of the axon itself (Wallerian degeneration), resulting in reduced amplitudes but preserved conduction velocity. This fundamental distinction is crucial for diagnosis and prognosis."},{"question":"In a demyelinating neuropathy, what is the most characteristic electrodiagnostic finding?","options":["Reduced CMAP/SNAP amplitudes with normal conduction velocity","Slowed conduction velocity with conduction blocks","Fibrillation potentials and positive sharp waves","Reduced recruitment with large motor units"],"correct":1,"explanation":"Demyelinating neuropathies characteristically show SLOWED CONDUCTION VELOCITY and may demonstrate CONDUCTION BLOCKS or temporal dispersion. The myelin damage disrupts saltatory conduction, causing signals to travel more slowly. Amplitudes are typically preserved unless severe secondary axonal loss occurs. This contrasts with axonal neuropathies where velocities are normal but amplitudes are reduced."},{"question":"What NCS finding indicates axonal loss rather than demyelination?","options":["Prolonged F-wave latencies","Temporal dispersion of the waveform","Reduced CMAP amplitude with normal conduction velocity","Conduction block across a nerve segment"],"correct":2,"explanation":"REDUCED CMAP/SNAP AMPLITUDES with NORMAL/NEAR-NORMAL conduction velocities indicate axonal loss. The amplitude reflects the number of functioning axons - when axons degenerate, fewer motor units contribute to the response, reducing amplitude. Conduction velocity remains preserved because the surviving myelinated fibers conduct normally. This is the hallmark of axonal neuropathies."},{"question":"What are the three progressive stages of compression neuropathy pathophysiology?","options":["Inflammation → Fibrosis → Atrophy","Ischemia → Demyelination → Axonal Loss","Edema → Scarring → Necrosis","Conduction slowing → Conduction block → Denervation"],"correct":1,"explanation":"Compression neuropathies progress through three stages: (1) ISCHEMIA - reduced blood flow causes reversible dysfunction and conduction slowing, (2) DEMYELINATION - continued compression causes myelin breakdown with conduction blocks and temporal dispersion, (3) AXONAL LOSS - severe/prolonged compression leads to Wallerian degeneration with amplitude reduction and denervation changes. Understanding these stages guides prognosis and treatment timing."},{"question":"What EMG finding would you expect in an acute axonal neuropathy (less than 2 weeks)?","options":["Fibrillation potentials throughout affected muscles","Reduced recruitment with no spontaneous activity","Normal EMG with abnormal NCS amplitudes","Myotonic discharges with reduced recruitment"],"correct":1,"explanation":"In ACUTE axonal injury (<2-3 weeks), EMG shows REDUCED RECRUITMENT (due to motor unit loss) but NO SPONTANEOUS ACTIVITY yet. Fibrillation potentials and positive sharp waves require time to develop - typically appearing 2-3 weeks after denervation (distal muscles) or 3-4 weeks (proximal muscles). This time lag reflects Wallerian degeneration and muscle fiber membrane instability development."},{"question":"What pathophysiological mechanism causes conduction block in demyelinating neuropathies?","options":["Complete axonal transection at the compression site","Severe focal demyelination preventing action potential propagation","Ischemia causing temporary nerve dysfunction","Schwann cell hypertrophy blocking sodium channels"],"correct":1,"explanation":"CONDUCTION BLOCK occurs when severe focal demyelination is so extensive that the action potential cannot propagate past the lesion, despite intact axons. The demyelinated segment has increased capacitance and reduced resistance, causing current to leak away. Proximal stimulation shows reduced amplitude compared to distal stimulation (>50% drop). This is reversible with remyelination, unlike axonal loss."},{"question":"A diabetic patient has reduced sural and superficial peroneal SNAP amplitudes, but normal median/ulnar sensory responses. What pattern does this represent?","options":["Mononeuritis multiplex","Length-dependent sensory polyneuropathy","Dorsal root ganglionopathy","Small fiber neuropathy"],"correct":1,"explanation":"This represents LENGTH-DEPENDENT SENSORY POLYNEUROPATHY, the classic stocking-glove distribution. The longest nerves (lower extremities) are affected first because: (1) longer axons have greater metabolic demands, (2) more distance for toxin/metabolic dysfunction accumulation, and (3) greater vulnerability to vascular supply issues. Sural and superficial peroneal nerves are longest sensory nerves, hence affected earliest in diabetic neuropathy."},{"question":"What is the key difference between Seddon s and Sunderland s nerve injury classification systems?","options":["Seddon uses 3 categories based on severity; Sunderland uses 5 grades based on anatomical structures damaged","Seddon focuses on motor deficits; Sunderland focuses on sensory deficits","Seddon is used for compression injuries; Sunderland is used for traumatic injuries","Seddon classifies demyelinating injuries; Sunderland classifies axonal injuries"],"correct":0,"explanation":"SEDDON S CLASSIFICATION uses 3 broad categories based on injury severity: (1) Neurapraxia - temporary myelin damage, (2) Axonotmesis - axon damage with intact connective tissue, (3) Neurotmesis - complete nerve transection. SUNDERLAND S CLASSIFICATION expands this into 5 grades based on specific anatomical structures damaged: Grade 1 = myelin only, Grade 2 = axon + myelin (endoneurium intact), Grade 3 = endoneurium disrupted (perineurium intact), Grade 4 = perineurium disrupted (epineurium intact), Grade 5 = complete transection. Sunderland s system provides more detail for surgical planning and prognosis."},{"question":"A patient suffers a severe laceration to the median nerve. You counsel them that peripheral nerves regenerate at approximately what rate, and recovery time depends on distance to target?","options":["1 millimeter per week (~0.25 inches per month)","1 millimeter per day (~1 inch per month)","1 centimeter per day (~1 foot per month)","1 millimeter per hour (~2 feet per month)"],"correct":1,"explanation":"Peripheral nerves regenerate at approximately 1 MILLIMETER PER DAY (or about 1 INCH PER MONTH). This rate is relatively consistent across patients and is crucial for counseling about recovery expectations. For example, a median nerve injury at the wrist (about 10cm from APB muscle) would take approximately 3-4 months before reinnervation begins. This regeneration rate reflects the speed of axonal transport mechanisms that deliver structural proteins and organelles to the regenerating growth cone. Understanding this timeline helps set realistic expectations for functional recovery and guides timing of surgical interventions."}]')) : '<div class="quiz-container">Quiz System currently unavailable</div>'}
            </div>

        </div>

        <style>
            .intro-container {
                font-family: 'Inter', -apple-system, system-ui, sans-serif;
                max-width: 1100px;
                margin: 0 auto;
                color: #1e293b;
            }
            .content-card {
                background: white;
                padding: 40px;
                border-radius: 24px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .resident-pearl {
                background: linear-gradient(135deg, #fffbeb, #fef3c7);
                border: 1px solid #fde68a;
                border-radius: 16px;
                padding: 30px;
                margin-top: 30px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);
            }
            .resident-pearl h4 {
                color: #b45309;
                font-size: 1.3em;
                font-weight: 900;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .resident-pearl p {
                color: #92400e;
                font-size: 1.05em;
                line-height: 1.6;
                margin: 0;
            }
            .patho-tab.active {
                box-shadow: 0 4px 15px rgba(107, 33, 168, 0.3);
            }
            .patho-tab:hover:not(.active) {
                background: #f1f5f9 !important;
                color: #0f172a !important;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        `;
    }
};

window.Pathophysiology = NeuropathyPathophysiology;
