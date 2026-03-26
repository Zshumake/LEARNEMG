// ============================================================================
// ERNEST'S PODCAST - EPISODE DATA
// ============================================================================
// Centralized metadata for all podcast episodes across modules
// All audio files are located in the Podcasts/ directory
// ============================================================================

import { CUSTOM_ICON_MAPPING } from '../candyland/BoardData.js';
import { ErnestIcon } from '../../utils/ErnestIcon.js';
import logger from '../../utils/Logger.js';

logger.log('🎧 Loading Ernest\'s Podcast episode data...');

export const podcastEpisodes = {
    'emg-introduction': [
        {
            id: 'emg-intro-main',
            title: 'EMG Introduction Fundamentals',
            duration: '52:27',
            audioFile: 'Podcasts/EMG Intro.m4a',
            description: 'Comprehensive introduction to electrodiagnostic medicine fundamentals',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>What is electrodiagnostic medicine?</li>
                    <li>Overview of EMG and NCS techniques</li>
                    <li>Clinical applications and when to order studies</li>
                    <li>What to expect during an EMG/NCS examination</li>
                    <li>Comprehensive fundamentals for beginners</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Electrodiagnostic studies are powerful tools for evaluating nerve and muscle disorders. This comprehensive introduction covers everything you need to get started with EMG and NCS interpretation.</p>
            `
        },
        {
            id: 'emg-terminology',
            title: 'Essential EMG Terminology',
            duration: '64:49',
            audioFile: 'Podcasts/Essential Terminology.m4a',
            description: 'Master the essential vocabulary and definitions used in electrodiagnostic medicine',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Fundamental EMG and NCS terminology</li>
                    <li>Understanding motor unit action potentials (MUAPs)</li>
                    <li>Spontaneous activity patterns and their significance</li>
                    <li>Key concepts: recruitment, conduction velocity, latency</li>
                    <li>Essential definitions for accurate interpretation</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Mastering electrodiagnostic terminology is the foundation for accurate study interpretation. Learn the essential terms and concepts that every EDX physician needs to know.</p>
            `
        }
    ],

    'plexus-anatomy': [
        {
            id: 'plexus-peripheral',
            title: 'Peripheral Nerve Anatomy',
            duration: '39:07',
            audioFile: 'Podcasts/Peripheral Anatomy.m4a',
            description: 'Comprehensive exploration of peripheral nerve anatomy and organization',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Anatomical organization of peripheral nerves</li>
                    <li>Key landmarks and nerve pathways</li>
                    <li>Upper and lower extremity nerve anatomy</li>
                    <li>Clinical correlations with nerve injury patterns</li>
                    <li>Tips for remembering complex anatomy</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Understanding peripheral nerve anatomy is essential for localizing lesions and interpreting electrodiagnostic findings accurately. This comprehensive episode covers the entire peripheral nervous system.</p>
            `
        },
        {
            id: 'plexus-anomalous',
            title: 'Anomalous Anatomy',
            duration: '14:47',
            audioFile: 'Podcasts/Anamolous Anatomy.m4a',
            description: 'Explore anatomical variations and anomalies that can affect EDX interpretation',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Common anatomical variants in peripheral nerves</li>
                    <li>Martin-Gruber anastomosis and its clinical significance</li>
                    <li>Riche-Cannieu anastomosis in the hand</li>
                    <li>How anatomical variations affect NCS interpretation</li>
                    <li>Recognizing anomalies during electrodiagnostic studies</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Anatomical variations are more common than you might think. Learn to recognize anomalous anatomy and avoid misinterpretation of electrodiagnostic studies.</p>
            `
        }
    ],

    'brachial-plexus-interactive': [
        {
            id: 'brachial-ep1',
            title: 'Plexopathies',
            duration: '13:28',
            audioFile: 'Podcasts/Plexopathies.m4a',
            description: 'Ernest explores brachial and lumbosacral plexus pathology',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Brachial and lumbosacral plexus anatomy review</li>
                    <li>Clinical syndromes (Erb's palsy, Klumpke's palsy, traumatic injuries)</li>
                    <li>Electrodiagnostic evaluation of plexopathies</li>
                    <li>Differential diagnosis: plexus vs. root vs. nerve</li>
                    <li>Common causes: trauma, radiation, idiopathic inflammation</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Plexopathies can be challenging to diagnose. Learn the clinical and electrodiagnostic features that distinguish plexus lesions from other localizations.</p>
            `
        }
    ],

    'radiculopathy': [
        {
            id: 'radiculopathy-ep1',
            title: 'Radiculopathy Pathophysiology',
            duration: '10:17',
            audioFile: 'Podcasts/Radiculopathy.m4a',
            description: 'Ernest explains the pathophysiology of nerve root compression',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Mechanisms of nerve root compression and injury</li>
                    <li>Classic radiculopathy patterns (C5-T1, L4-S1)</li>
                    <li>EMG findings: denervation and reinnervation patterns</li>
                    <li>Differentiating radiculopathy from peripheral neuropathy and plexopathy</li>
                    <li>Clinical presentation and physical exam findings</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Radiculopathy is one of the most common reasons for EMG referral. Learn to recognize the patterns and correlate with imaging findings for accurate diagnosis.</p>
            `
        }
    ],

    'neuropathy-pathophysiology': [
        {
            id: 'neuropathy-poly',
            title: 'Polyneuropathies',
            duration: '16:02',
            audioFile: 'Podcasts/Polyneuropathies.m4a',
            description: 'Comprehensive exploration of polyneuropathy patterns and mechanisms',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Axonal vs. demyelinating polyneuropathies</li>
                    <li>Length-dependent vs. non-length-dependent patterns</li>
                    <li>Common causes: diabetes, toxins, hereditary conditions</li>
                    <li>NCS and EMG patterns in polyneuropathies</li>
                    <li>Diagnostic approach and differential diagnosis</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Polyneuropathies are among the most common peripheral nerve disorders. Master the pattern recognition and diagnostic approach for accurate classification and treatment.</p>
            `
        },
        {
            id: 'neuropathy-mono',
            title: 'Mononeuropathy Pathophysiology',
            duration: '33:22',
            audioFile: 'Podcasts/Mononeuropathy pathophysiology.m4a',
            description: 'Detailed examination of focal neuropathies and mononeuropathy multiplex',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><ul><li>Focal entrapment neuropathies</li><li>Mononeuropathy multiplex patterns</li><li>Electrodiagnostic localization</li></ul>`
        },
        {
            id: 'neuropathy-main',
            title: 'Neuropathy Pathophysiology',
            duration: '33:22',
            audioFile: 'Podcasts/Neuropathy Pathophysiology.m4a',
            description: 'Foundational pathophysiology of peripheral nerve disorders',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Foundational principles of nerve pathology.</p>`
        }
    ],

    'basic-patterns': [
        {
            id: 'patterns-ep1',
            title: 'Basic Pattern Recognition',
            duration: '14:59',
            audioFile: 'Podcasts/Basic Patter Recognition.m4a',
            description: 'Ernest teaches systematic EMG interpretation and pattern recognition',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Systematic approach to EMG/NCS interpretation.</p>`
        },
        {
            id: 'patterns-interpretation',
            title: 'EMG Interpretation',
            duration: '14:59',
            audioFile: 'Podcasts/EMG interpretation.m4a',
            description: 'Systematic approach to interpreting complex EMG signals',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Deep dive into reading EMG signals.</p>`
        }
    ],

    'neuropathy-myopathy-basics': [
        {
            id: 'neuro-myo-ep1',
            title: 'Neuropathy vs. Myopathy',
            duration: '17:09',
            audioFile: 'Podcasts/Myopathy vs. Neuropathy.m4a',
            description: 'Ernest explains how to differentiate nerve and muscle disorders using clinical and EDX features',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Clinical clues: distribution of weakness (proximal vs. distal)</li>
                    <li>NCS findings: normal in myopathy, abnormal in neuropathy</li>
                    <li>Needle EMG: myopathic vs. neuropathic changes in detail</li>
                    <li>Motor neuron disease: the great imitator with mixed features</li>
                    <li>Inflammatory myopathies and their EDX signatures</li>
                    <li>Practical diagnostic algorithms and clinical correlation</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Distinguishing neuropathy from myopathy is essential for proper patient management. Use clinical history, NCS, and needle EMG together for accurate diagnosis and appropriate treatment planning.</p>
            `
        }
    ],

    'simple-reports': [
        {
            id: 'reports-ep1',
            title: 'Basic Report Writing',
            duration: '11:56',
            audioFile: 'Podcasts/Basic Report Writing.m4a',
            description: 'Ernest teaches the art of clear, effective electrodiagnostic report writing',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>AANEM reporting guidelines overview</li>
                    <li>Essential elements: patient data, NCS, EMG, summary</li>
                    <li>Writing clear interpretations and recommendations</li>
                    <li>Common mistakes to avoid</li>
                    <li>Tips for efficient and professional report generation</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>A well-written report communicates your findings clearly to referring physicians and becomes part of the permanent medical record. Take time to craft quality reports that accurately convey your electrodiagnostic findings.</p>
            `
        }
    ],

    'extra-topics': [
        {
            id: 'extra-als',
            title: 'ALS and Mimics',
            duration: '13:54',
            audioFile: 'Podcasts/ALS and mimics.m4a',
            description: 'Ernest explores motor neuron disease and conditions that can mimic ALS',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Pathophysiology of amyotrophic lateral sclerosis (ALS)</li>
                    <li>Clinical presentation: upper and lower motor neuron signs</li>
                    <li>Electrodiagnostic features: widespread denervation and fasciculations</li>
                    <li>ALS mimics: multifocal motor neuropathy, Kennedy's disease, cervical myelopathy</li>
                    <li>Diagnostic criteria and role of EDX in confirming diagnosis</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>ALS is a devastating diagnosis that must be made carefully. Learn to recognize the classic features and rule out treatable mimics through thorough clinical and electrodiagnostic evaluation.</p>
            `
        },
        {
            id: 'extra-blink',
            title: 'The Blink Reflex Explained',
            duration: '14:14',
            audioFile: 'Podcasts/The Blink Reflex explained.m4a',
            description: 'Ernest explains the blink reflex study and its clinical applications',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Anatomy and clinical use of the blink reflex.</p>`
        },
        {
            id: 'extra-blink-alt',
            title: 'Blink Reflex Essentials',
            duration: '14:14',
            audioFile: 'Podcasts/Blink Reflex.m4a',
            description: 'Core principles of the electrodiagnostic blink reflex',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Core essentials of the blink reflex study.</p>`
        },
        {
            id: 'extra-nmj',
            title: 'Neuromuscular Junction Disorders',
            duration: '16:00',
            audioFile: 'Podcasts/Neuromuscular junction disorders.m4a',
            description: 'Ernest explores disorders affecting the neuromuscular junction',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `<h4>In This Episode:</h4><p>Exploring Myasthenia Gravis and LEMS.</p>`
        }
    ],

    'edx-series': [
        {
            id: 'edx-1',
            title: 'EDX Series: Episode 1',
            duration: '31:44',
            audioFile: 'Podcasts/EDX_1.m4a',
            description: 'A fundamental primer on electrodiagnostic medicine.',
            showNotes: `<p>A fundamental primer on electrodiagnostic medicine.</p>`
        },
        {
            id: 'edx-2',
            title: 'EDX Series: Episode 2',
            duration: '28:29',
            audioFile: 'Podcasts/EDX_2.m4a',
            description: 'Technical overview of the neuromuscular system and nerve injuries.',
            showNotes: `<p>Technical overview of the neuromuscular system.</p>`
        },
        {
            id: 'edx-3',
            title: 'EDX Series: Episode 3',
            duration: '36:29',
            audioFile: 'Podcasts/EDX_3.m4a',
            description: 'Overview of EDX instrumentation and NCS principles.',
            showNotes: `<p>Overview of EDX instrumentation.</p>`
        },
        {
            id: 'edx-4',
            title: 'EDX Series: Episode 4',
            duration: '43:10',
            audioFile: 'Podcasts/EDX_4.m4a',
            description: 'Details various nerve conduction studies (NCS).',
            showNotes: `<p>Details various nerve conduction studies.</p>`
        },
        {
            id: 'edx-5',
            title: 'EDX Series: Episode 5',
            duration: '35:24',
            audioFile: 'Podcasts/EDX_5.m4a',
            description: 'Diagnostic utility of EDX studies and needle EMG.',
            showNotes: `<p>Diagnostic utility of EDX studies.</p>`
        },
        {
            id: 'edx-6',
            title: 'EDX Series: Episode 6',
            duration: '34:56',
            audioFile: 'Podcasts/EDX_6.m4a',
            description: 'Clinical guide for interpreting EMG results.',
            showNotes: `<p>Clinical guide for interpreting EMG results.</p>`
        },
        {
            id: 'edx-7',
            title: 'EDX Series: Episode 7',
            duration: '29:57',
            audioFile: 'Podcasts/EDX_7.m4a',
            description: 'Diagnostic framework for identifying nerve injuries.',
            showNotes: `<p>Diagnostic framework for identifying nerve injuries.</p>`
        },
        {
            id: 'edx-8',
            title: 'EDX Series: Episode 8',
            duration: '28:28',
            audioFile: 'Podcasts/EDX_8.m4a',
            description: 'Clinical guide to plexopathies and nerve entrapments.',
            showNotes: `<p>Clinical guide to plexopathies.</p>`
        },
        {
            id: 'edx-9',
            title: 'EDX Series: Episode 9',
            duration: '37:25',
            audioFile: 'Podcasts/EDX_9.m4a',
            description: 'Comprehensive overview of upper extremity nerve pathologies.',
            showNotes: `<p>Overview of upper extremity nerve pathologies.</p>`
        },
        {
            id: 'edx-10',
            title: 'EDX Series: Episode 10',
            duration: '32:36',
            audioFile: 'Podcasts/EDX_10.m4a',
            description: 'Clinical guide to mononeuropathies of the limbs.',
            showNotes: `<p>Clinical guide to mononeuropathies.</p>`
        },
        {
            id: 'edx-11',
            title: 'EDX Series: Episode 11',
            duration: '37:13',
            audioFile: 'Podcasts/EDX_11.m4a',
            description: 'Anatomy and pathology of lower extremity nerves.',
            showNotes: `<p>Anatomy and pathology of lower extremity nerves.</p>`
        },
        {
            id: 'edx-12',
            title: 'EDX Series: Episode 12',
            duration: '28:43',
            audioFile: 'Podcasts/EDX_12.m4a',
            description: 'Clinical overview of peripheral polyneuropathy.',
            showNotes: `<p>Clinical overview of peripheral polyneuropathy.</p>`
        },
        {
            id: 'edx-13',
            title: 'EDX Series: Episode 13',
            duration: '40:27',
            audioFile: 'Podcasts/EDX_13.m4a',
            description: 'Clinical guide for diagnosing neuromuscular junction (NMJ) disorders.',
            showNotes: `<p>Clinical guide for diagnosing NMJ disorders.</p>`
        },
        {
            id: 'edx-14',
            title: 'EDX Series: Episode 14',
            duration: '34:38',
            audioFile: 'Podcasts/EDX_14.m4a',
            description: 'Comprehensive clinical guide for diagnosing and classifying myopathies.',
            showNotes: `<p>Clinical guide for diagnosing myopathies.</p>`
        },
        {
            id: 'edx-15',
            title: 'EDX Series: Episode 15',
            duration: '29:43',
            audioFile: 'Podcasts/EDX_15.m4a',
            description: 'Clinical guide to motor neuron diseases (MND).',
            showNotes: `<p>Clinical guide to motor neuron diseases (MND).</p>`
        }
    ]
};

// Auto-inject default icons derived from the module configuration config map
Object.keys(podcastEpisodes).forEach(moduleId => {
    podcastEpisodes[moduleId].forEach(ep => {
        ep.icon = CUSTOM_ICON_MAPPING[moduleId];
    });
});

// ============================================================================
// ERNEST BUTTON GENERATOR
// ============================================================================
export function generateErnestButton(moduleId, moduleTitle = null) {
    const episodes = getModuleEpisodes(moduleId);

    if (!episodes || episodes.length === 0) {
        return ''; // No button if no episodes
    }

    const displayTitle = moduleTitle || moduleId;
    const episodeCount = episodes.length;

    // SVG Icons
    const playIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const headphonesIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`;

    // SPECIAL CASE: EMG Introduction - Show both episodes with separate buttons
    if (moduleId === 'emg-introduction') {
        const iconSrc = CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/Ernest-mini-placeholder.png';
        return `
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.1));
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        padding: 24px;
                        border-radius: 20px;
                        margin-bottom: 24px;
                        box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15);">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div style="position: relative;">
                        ${ErnestIcon.getHTML({ size: '64px' })}
                        <div style="position: absolute; bottom: 0; right: 0; background: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 800; font-size: 1.25em; margin-bottom: 6px; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                            <span style="color: #ea580c;">${headphonesIcon}</span> Ernest's EMG Podcasts
                        </div>
                        <div style="font-size: 0.95em; color: #64748b; line-height: 1.5;">
                            Deep dive into EMG concepts with these audio lessons.
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <button data-podcast-trigger="true" data-module-id="emg-introduction" data-episode-id="emg-intro-main"
                            class="podcast-trigger-btn"
                            style="flex: 1; min-width: 220px;
                                   background: white;
                                   color: #0f172a;
                                   border: 1px solid #e2e8f0;
                                   padding: 16px 20px;
                                   border-radius: 16px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                                   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                   display: flex;
                                   align-items: center;
                                   gap: 12px;
                                   text-align: left;">
                        <div style="background: #fff7ed; color: #ea580c; padding: 10px; border-radius: 12px; display: flex;">${playIcon}</div>
                        <div>
                            <div style="font-weight: 700;">EMG Introduction</div>
                        </div>
                    </button>
                    <button data-podcast-trigger="true" data-module-id="emg-introduction" data-episode-id="emg-terminology"
                            class="podcast-trigger-btn"
                            style="flex: 1; min-width: 220px;
                                   background: white;
                                   color: #0f172a;
                                   border: 1px solid #e2e8f0;
                                   padding: 16px 20px;
                                   border-radius: 16px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                                   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                   display: flex;
                                   align-items: center;
                                   gap: 12px;
                                   text-align: left;">
                        <div style="background: #fff7ed; color: #ea580c; padding: 10px; border-radius: 12px; display: flex;">${playIcon}</div>
                        <div>
                            <div style="font-weight: 700;">Essential Terminology</div>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }

    // SINGLE EPISODE: Clickable banner with direct play
    if (episodeCount === 1) {
        const episode = episodes[0];
        const iconSrc = episode.icon || CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/Ernest-mini-placeholder.png';
        return `
            <div data-podcast-trigger="true" data-module-id="${moduleId}" data-episode-id="${episode.id}"
                 class="podcast-card-hover"
                 style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        padding: 24px;
                        border-radius: 20px;
                        margin-bottom: 24px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        position: relative;
                        overflow: hidden;">
                
                <!-- Decorative background blob -->
                <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

                <div style="position: relative;">
                    ${ErnestIcon.getHTML({ size: '72px' })}
                    <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
                </div>

                <div style="flex: 1; z-index: 1;">
                    <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                        ${displayTitle} Podcast
                    </div>
                    <div style="font-size: 0.95em; color: #64748b; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 12px; font-size: 0.85em; font-weight: 600; color: #475569;">${episode.duration}</span>
                        <span>Click to listen</span>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #f59e0b, #ea580c) !important;
                           color: white !important;
                           width: 48px;
                           height: 48px;
                           border-radius: 50%;
                           display: flex;
                           align-items: center;
                           justify-content: center;
                           box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                           transition: transform 0.2s;">
                    ${playIcon}
                </div>
            </div>
        `;
    }

    // MULTIPLE EPISODES: Generic message, opens player with first episode
    const firstEpisode = episodes[0];
    const iconSrc = CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/Ernest-mini-placeholder.png';
    return `
        <div data-podcast-trigger="true" data-module-id="${moduleId}" data-episode-id="${firstEpisode.id}"
             class="podcast-card-hover"
             style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    padding: 24px;
                    border-radius: 20px;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    position: relative;
                    overflow: hidden;">
            
            <!-- Decorative background blob -->
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

            <div style="position: relative;">
                ${ErnestIcon.getHTML({ size: '72px' })}
                <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
            </div>

            <div style="flex: 1; z-index: 1;">
                <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                    ${displayTitle} Series
                </div>
                <div style="font-size: 0.95em; color: #64748b;">
                    ${episodeCount} episodes available • Click to browse
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                       color: white;
                       width: 48px;
                       height: 48px;
                       border-radius: 50%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                       transition: transform 0.2s;">
                ${playIcon}
            </div>
        </div>
    `;
}


// Helper function to get episodes for a specific module
export function getModuleEpisodes(moduleId) {
    return podcastEpisodes[moduleId] || [];
}

// Get all available module IDs with podcasts
export function getPodcastModules() {
    return Object.keys(podcastEpisodes);
}
