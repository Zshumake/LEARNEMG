// ============================================================================
// ERNEST'S PODCAST - EPISODE DATA
// ============================================================================
// Centralized metadata for all podcast episodes across modules
// Add new episodes by adding objects to the appropriate module array
// ============================================================================

console.log('🎧 Loading Ernest\'s Podcast episode data...');

export const podcastEpisodes = {
    'emg-introduction': [
        {
            id: 'emg-intro-ep1',
            title: 'Welcome to Electrodiagnostic Medicine',
            duration: '15:30',
            audioFile: 'audio/emg-introduction-ep1.mp3',
            description: 'Ernest introduces the fundamentals of EMG and NCS studies',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>What is electrodiagnostic medicine?</li>
                    <li>Overview of EMG and NCS techniques</li>
                    <li>Clinical applications and when to order studies</li>
                    <li>What to expect during an EMG/NCS examination</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Electrodiagnostic studies are powerful tools for evaluating nerve and muscle disorders. Understanding the basics will help you interpret results and provide better patient care.</p>
            `
        }
        // Add more episodes here as needed
    ],

    'plexus-anatomy': [
        {
            id: 'plexus-ep1',
            title: 'Navigating the Brachial Plexus',
            duration: '18:45',
            audioFile: 'audio/plexus-anatomy-ep1.mp3',
            description: 'Ernest takes you on a journey through peripheral nerve anatomy',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Anatomical organization of peripheral nerves</li>
                    <li>Key landmarks and nerve pathways</li>
                    <li>Clinical correlations with nerve injury patterns</li>
                    <li>Tips for remembering complex anatomy</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Understanding peripheral nerve anatomy is essential for localizing lesions and interpreting electrodiagnostic findings accurately.</p>
            `
        }
    ],

    'brachial-plexus': [
        {
            id: 'brachial-ep1',
            title: 'Plexopathies',
            duration: '25:00',
            audioFile: 'audio/Plexopathies.m4a',
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
            title: 'Radiculopathy',
            duration: '19:00',
            audioFile: 'audio/Radiculopathy.m4a',
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
            id: 'neuropathy-ep1',
            title: 'Neuropathy Pathophysiology',
            duration: '61:00',
            audioFile: 'audio/Neuropathy Pathophysiology.m4a',
            description: 'Comprehensive exploration of peripheral neuropathy mechanisms and patterns',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Axonal vs. demyelinating neuropathies: pathophysiology and EDX features</li>
                    <li>Mononeuropathy, mononeuropathy multiplex, and polyneuropathy patterns</li>
                    <li>Focal entrapment neuropathies: carpal tunnel, cubital tunnel, and more</li>
                    <li>Common causes: diabetes, toxins, hereditary conditions, inflammatory disorders</li>
                    <li>NCS and EMG patterns in different neuropathy types</li>
                    <li>Clinical localization and differential diagnosis strategies</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Understanding neuropathy pathophysiology is essential for accurate diagnosis. This comprehensive episode covers focal, multifocal, and generalized neuropathies with practical EDX correlation.</p>
            `
        }
    ],

    'ncs-fundamentals': [
        {
            id: 'ncs-ep1',
            title: 'NCS Techniques Demystified',
            duration: '22:10',
            audioFile: 'audio/ncs-fundamentals-ep1.mp3',
            description: 'Ernest breaks down nerve conduction study techniques',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Sensory vs. motor nerve conduction studies</li>
                    <li>Amplitude, latency, and conduction velocity explained</li>
                    <li>F-waves and H-reflexes: when and why to use them</li>
                    <li>Common technical pitfalls and how to avoid them</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>NCS is the foundation of electrodiagnostic medicine. Master the techniques to obtain reliable, interpretable results.</p>
            `
        }
    ],

    'basic-patterns': [
        {
            id: 'patterns-ep1',
            title: 'EMG Interpretation',
            duration: '28:00',
            audioFile: 'audio/EMG interpretation.m4a',
            description: 'Ernest teaches systematic EMG interpretation and pattern recognition',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Systematic approach to EMG/NCS interpretation</li>
                    <li>Classic patterns: CTS, cubital tunnel, fibular neuropathy</li>
                    <li>Radiculopathy patterns and myotomal distributions</li>
                    <li>Plexopathy vs. multiple mononeuropathies</li>
                    <li>Putting it all together: clinical correlation and diagnosis</li>
                    <li>Common pitfalls and how to avoid misinterpretation</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Pattern recognition is a skill that develops with practice. Learn a systematic approach to interpreting EMG/NCS studies and recognizing common patterns to build your diagnostic confidence.</p>
            `
        }
    ],

    'neuropathy-myopathy': [
        {
            id: 'neuro-myo-ep1',
            title: 'Myopathy vs. Neuropathy',
            duration: '32:00',
            audioFile: 'audio/Myopathy vs. Neuropathy.m4a',
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
            title: 'Writing Professional EMG Reports',
            duration: '21:00',
            audioFile: 'audio/simple-reports-ep1.mp3',
            description: 'Ernest teaches the art of clear, effective report writing',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>AANEM reporting guidelines overview</li>
                    <li>Essential elements: patient data, NCS, EMG, summary</li>
                    <li>Writing clear interpretations and recommendations</li>
                    <li>Common mistakes to avoid</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>A well-written report communicates your findings clearly to referring physicians and becomes part of the permanent medical record. Take time to craft quality reports.</p>
            `
        }
    ],

    'extra-topics': [
        {
            id: 'extra-als',
            title: 'ALS and Mimics',
            duration: '26:00',
            audioFile: 'audio/ALS and mimics.m4a',
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
            title: 'Blink Reflex',
            duration: '26:00',
            audioFile: 'audio/Blink Reflex.m4a',
            description: 'Ernest explains the blink reflex study and its clinical applications',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Anatomy of the blink reflex pathway (trigeminal and facial nerves)</li>
                    <li>R1 and R2 components: what they mean and how to measure them</li>
                    <li>Technical aspects: stimulation, recording, and interpretation</li>
                    <li>Clinical applications: facial nerve disorders, brainstem lesions</li>
                    <li>Troubleshooting and common artifacts</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>The blink reflex is a specialized study for evaluating the trigeminal and facial nerve pathways. Learn when to use it and how to interpret the results for optimal diagnostic yield.</p>
            `
        },
        {
            id: 'extra-mg-lems',
            title: 'Myasthenia Gravis vs. Lambert-Eaton Syndrome Scorecard',
            duration: '29:00',
            audioFile: 'audio/Myasthenia_Gravis_versus_Lambert-Eaton_Syndrome_Scorecard.m4a',
            description: 'Ernest compares and contrasts these two neuromuscular junction disorders',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Pathophysiology: presynaptic vs. postsynaptic NMJ disorders</li>
                    <li>Clinical presentation: weakness patterns and associated symptoms</li>
                    <li>Repetitive nerve stimulation: decremental vs. incremental responses</li>
                    <li>Single fiber EMG findings in both conditions</li>
                    <li>Antibody testing and clinical correlation</li>
                    <li>Treatment implications and prognosis</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Myasthenia gravis and Lambert-Eaton syndrome are both NMJ disorders but require different approaches to diagnosis and treatment. Master the clinical and electrodiagnostic features that distinguish these conditions.</p>
            `
        }
    ]
};

// Helper function to get episodes for a specific module
export function getModuleEpisodes(moduleId) {
    return podcastEpisodes[moduleId] || [];
}

// Get all available module IDs with podcasts
export function getPodcastModules() {
    return Object.keys(podcastEpisodes);
}

console.log('✅ Ernest\'s Podcast episode data loaded -', getPodcastModules().length, 'modules configured');
