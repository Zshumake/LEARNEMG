// ============================================================================
// ERNEST'S PODCAST - EPISODE DATA
// ============================================================================
// Centralized metadata for all podcast episodes across modules
// All audio files are located in the Podcasts/ directory
// ============================================================================

import { CUSTOM_ICON_MAPPING } from '../../data/ModuleConfig.js';

console.log('🎧 Loading Ernest\'s Podcast episode data...');

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
            duration: '14:46',
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
            duration: '39:08',
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
            duration: '14:48',
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
            duration: '13:29',
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
            duration: '15:49',
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
            duration: '16:03',
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
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Focal entrapment neuropathies: carpal tunnel, cubital tunnel, and more</li>
                    <li>Mononeuropathy multiplex patterns and causes</li>
                    <li>Compression, ischemia, and inflammation mechanisms</li>
                    <li>Electrodiagnostic localization techniques</li>
                    <li>Clinical localization and differential diagnosis strategies</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Understanding mononeuropathy pathophysiology is essential for accurate localization. Learn to distinguish focal compression from systemic causes and recognize mononeuropathy multiplex patterns.</p>
            `
        }
    ],

    'basic-patterns': [
        {
            id: 'patterns-ep1',
            title: 'Basic Pattern Recognition',
            duration: '15:00',
            audioFile: 'Podcasts/Basic Patter Recognition.m4a',
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

    'neuropathy-myopathy-basics': [
        {
            id: 'neuro-myo-ep1',
            title: 'Neuropathy vs. Myopathy',
            duration: '17:10',
            audioFile: 'Podcasts/Neuropathy vs. Myopathy.m4a',
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
            duration: '11:57',
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
            duration: '13:55',
            audioFile: 'Podcasts/ALS and Mimics.m4a',
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
            id: 'extra-nmj',
            title: 'Neuromuscular Junction Disorders',
            duration: '16:00',
            audioFile: 'Podcasts/Neuromuscular junction disorders.m4a',
            description: 'Ernest explores disorders affecting the neuromuscular junction',
            transcript: 'Episode transcript will appear here once available...',
            showNotes: `
                <h4>In This Episode:</h4>
                <ul>
                    <li>Pathophysiology: presynaptic vs. postsynaptic NMJ disorders</li>
                    <li>Myasthenia gravis and Lambert-Eaton syndrome comparison</li>
                    <li>Clinical presentation: weakness patterns and associated symptoms</li>
                    <li>Repetitive nerve stimulation: decremental vs. incremental responses</li>
                    <li>Single fiber EMG findings in NMJ disorders</li>
                    <li>Antibody testing and clinical correlation</li>
                    <li>Treatment implications and prognosis</li>
                </ul>
                <h4>Key Takeaways:</h4>
                <p>Neuromuscular junction disorders require specialized electrodiagnostic techniques for diagnosis. Master the clinical and EDX features that distinguish these treatable conditions from other causes of weakness.</p>
            `
        }
    ],

    'edx-series': [
        {
            id: 'edx-1',
            title: 'EDX Series: Episode 1',
            duration: '',
            audioFile: 'Podcasts/EDX_1.m4a',
            description: 'A fundamental primer on electrodiagnostic medicine.',
            showNotes: `<p>This podcast episode serves as a fundamental primer on electrodiagnostic medicine, positioning these specialized tests as essential extensions of the clinical physical examination for identifying neuromuscular disorders. It meticulously details the microscopic anatomy of the peripheral nervous system, including the structure of neurons, the role of connective tissues, and the functional organization of motor units. A significant portion of the audio is dedicated to nerve physiology, explaining how cellular mechanisms like sodium-potassium pumps and voltage-gated channels facilitate action potentials. Ultimately, the show provides the technical and biological framework necessary to interpret how electrical signals travel through the body and how external factors, such as temperature changes, can influence diagnostic results.</p>`
        },
        {
            id: 'edx-2',
            title: 'EDX Series: Episode 2',
            duration: '',
            audioFile: 'Podcasts/EDX_2.m4a',
            description: 'Technical overview of the neuromuscular system and nerve injuries.',
            showNotes: `<p>This podcast episode provides a technical overview of the neuromuscular system, detailing the physiological mechanisms of communication between nerves and muscles as well as the pathophysiology of nerve injuries. It outlines the precise chemical exchange of acetylcholine within the synaptic cleft and the subsequent electrical changes that trigger muscle fiber contraction through the sliding of actin and myosin filaments. Beyond healthy function, the show categorizes nerve trauma into demyelination, which slows signal conduction, and axonal injury, which triggers cellular degeneration and potential recovery through collateral sprouting or regrowth. By integrating the Seddon and Sunderland classifications, the episode serves as a foundational guide for understanding how electrodiagnostic tools measure nerve integrity and identify specific types of conduction failure.</p>`
        },
        {
            id: 'edx-3',
            title: 'EDX Series: Episode 3',
            duration: '',
            audioFile: 'Podcasts/EDX_3.m4a',
            description: 'Overview of EDX instrumentation and NCS principles.',
            showNotes: `<p>This podcast episode provides a comprehensive technical overview of electrodiagnostic instrumentation and the physiological principles underlying nerve conduction studies (NCS). It details the specialized hardware required for these tests, including recording, reference, and ground electrodes, alongside the role of differential amplifiers and filters in isolating clean neural signals from background noise. The episode explains how clinicians manipulate stimulation intensity—often reaching supramaximal levels to ensure all axons fire—while monitoring parameters such as latency, amplitude, and conduction velocity to assess nerve health. Furthermore, it addresses critical practical considerations, ranging from the effects of temperature and age on signal speed to the safety protocols and bleeding risks associated with invasive needle electromyography. The overarching purpose of the episode is to define the standardized methodology and physical variables necessary for accurately interpreting the electrical activity of the peripheral nervous system.</p>`
        },
        {
            id: 'edx-4',
            title: 'EDX Series: Episode 4',
            duration: '',
            audioFile: 'Podcasts/EDX_4.m4a',
            description: 'Details various nerve conduction studies (NCS).',
            showNotes: `<p>This podcast episode details various nerve conduction studies (NCS) used to assess the physiological integrity of the human nervous system. It primarily distinguishes between sensory nerve action potentials (SNAPs) and compound motor action potentials (CMAPs), emphasizing how these tests can localize lesions relative to the dorsal root ganglion. Beyond standard conduction, the episode explores late responses like the H-reflex and F-wave, which provide insight into long neural pathways and spinal cord connectivity. Additionally, specialized assessments such as the blink reflex and direct facial nerve studies are described to evaluate cranial nerve function and brainstem pathways. Together, these diagnostic tools allow listeners to understand how clinicians differentiate between preganglionic and postganglionic injuries by measuring electrical variables like latency, amplitude, and conduction velocity.</p>`
        },
        {
            id: 'edx-5',
            title: 'EDX Series: Episode 5',
            duration: '',
            audioFile: 'Podcasts/EDX_5.m4a',
            description: 'Diagnostic utility of EDX studies and needle EMG.',
            showNotes: `<p>This podcast episode outlines the diagnostic utility of electrodiagnostic studies, specifically focusing on how nerve and muscle health is measured through electrical activity. It details specialized procedures like facial and phrenic nerve studies to assess injury and prognosis, while also explaining how somatosensory evoked potentials (SSEPs) track sensory signals across long neural pathways to identify central or peripheral nervous system lesions. A significant portion of the episode focuses on needle EMG, categorizing various waveforms—such as fibrillations, positive sharp waves, and complex repetitive discharges—that appear when a muscle is either resting or provoked by a needle. Ultimately, the show serves as a technical roadmap for clinicians to interpret pathological spontaneous activity, allowing them to differentiate between neuropathic and myopathic conditions based on unique electrical signatures and auditory hallmarks.</p>`
        },
        {
            id: 'edx-6',
            title: 'EDX Series: Episode 6',
            duration: '',
            audioFile: 'Podcasts/EDX_6.m4a',
            description: 'Clinical guide for interpreting EMG results.',
            showNotes: `<p>This podcast episode serves as a clinical guide for interpreting electromyography (EMG) results by categorizing the various electrical signals produced by muscles and nerves. It systematically differentiates between abnormal spontaneous activity, such as the "corn popping" sounds of fasciculations or the rhythmic "marching soldiers" of myokymic discharges, and the voluntary motor unit action potentials (MUAPs) recorded during exertion. By analyzing specific parameters like amplitude, duration, and recruitment patterns, listeners can understand how clinicians distinguish between neuropathic disorders, which often show reduced recruitment of large-amplitude potentials, and myopathic diseases, characterized by early recruitment of small-amplitude signals. Ultimately, the episode provides a diagnostic framework to identify the underlying etiology of neuromuscular dysfunction based on the unique visual and auditory signatures of electrical waveforms.</p>`
        },
        {
            id: 'edx-7',
            title: 'EDX Series: Episode 7',
            duration: '',
            audioFile: 'Podcasts/EDX_7.m4a',
            description: 'Diagnostic framework for identifying nerve injuries.',
            showNotes: `<p>This podcast episode details the diagnostic framework for identifying nerve injuries, specifically distinguishing between radiculopathy, which occurs at the spinal root, and plexopathy, which affects the network of nerves further down the limb. The episode emphasizes that while imaging and nerve conduction studies often appear normal in root-level injuries, needle electromyography (EMG) serves as a critical tool for localizing damage by evaluating specific muscle groups known as myotomes. It further explores complex conditions such as brachial plexopathy and Thoracic Outlet Syndrome, providing a timeline of how electrical abnormalities evolve after an injury. Ultimately, the show serves as a technical roadmap for listeners to correlate physical symptoms, like weakness and numbness, with precise anatomical lesions through specialized electrodiagnostic testing.</p>`
        },
        {
            id: 'edx-8',
            title: 'EDX Series: Episode 8',
            duration: '',
            audioFile: 'Podcasts/EDX_8.m4a',
            description: 'Clinical guide to plexopathies and nerve entrapments.',
            showNotes: `<p>This podcast episode serves as a clinical guide to diagnosing and treating various plexopathies and nerve entrapments affecting both the upper and lower limbs. It systematically outlines conditions such as neuralgic amyotrophy, which is characterized by sudden pain followed by patchy weakness, and distinguishes between neoplastic and radiation-induced damage based on anatomical sites and symptoms. A significant portion of the episode is dedicated to the median nerve, detailing its path from the brachial plexus down to the hand and describing specific compression syndromes like carpal tunnel syndrome and anterior interosseous nerve syndrome. Throughout the episode, electrodiagnostic (EDX) pearls provide critical technical insights for using nerve conduction studies and electromyography to pinpoint the exact location and severity of neural injuries.</p>`
        },
        {
            id: 'edx-9',
            title: 'EDX Series: Episode 9',
            duration: '',
            audioFile: 'Podcasts/EDX_9.m4a',
            description: 'Comprehensive overview of upper extremity nerve pathologies.',
            showNotes: `<p>This podcast episode provides a comprehensive overview of upper extremity nerve pathologies, focusing specifically on the anatomy, diagnostic findings, and clinical signs of the median, ulnar, and radial nerves. It details various entrapment syndromes—such as carpal tunnel, cubital tunnel, and spiral groove palsy—while highlighting how electrodiagnostic studies (EDX) can pinpoint the exact location and severity of a lesion. A significant portion of the audio is dedicated to identifying anomalous innervations like the Martin-Gruber anastomosis, which can complicate clinical readings by creating deceptive data during nerve conduction tests. By synthesizing anatomical course, physical examination signs like Froment’s or Tinel’s, and specific treatment indications, the episode serves as a clinical guide for differentiating between similar neuropathic conditions.</p>`
        },
        {
            id: 'edx-10',
            title: 'EDX Series: Episode 10',
            duration: '',
            audioFile: 'Podcasts/EDX_10.m4a',
            description: 'Clinical guide to mononeuropathies of the limbs.',
            showNotes: `<p>This podcast episode serves as a comprehensive clinical guide to mononeuropathies of the upper and lower limbs, detailing the specific ways peripheral nerves can be damaged. It is structured systematically by nerve, providing a roadmap that includes anatomical origins, the physical etiology of injuries, and the resulting clinical presentations. By contrasting motor-heavy conditions like Posterior Interosseous Nerve Syndrome with purely sensory issues like Wartenberg Syndrome, the episode helps listeners differentiate between similar-looking disorders. The purpose of the episode is to aid in diagnosis and management, utilizing Electrodiagnostic (EDX) findings and specific Electromyography (EMG) patterns to pinpoint the exact site of nerve entrapment or trauma.</p>`
        },
        {
            id: 'edx-11',
            title: 'EDX Series: Episode 11',
            duration: '',
            audioFile: 'Podcasts/EDX_11.m4a',
            description: 'Anatomy and pathology of lower extremity nerves.',
            showNotes: `<p>This podcast episode details the anatomy and pathology of the lower extremity nerves, specifically examining the origins, pathways, and common injury patterns of the obturator, sciatic, tibial, and peroneal nerves. For each neural pathway, the episode provides a standardized diagnostic framework that includes etiology, clinical presentation, and electrodiagnostic findings (EDX), such as nerve conduction studies and electromyography. A primary focus is placed on neuropathic symptoms, such as muscle weakness and sensory deficits, highlighting how specific nerve compressions result in distinctive physical impairments like foot drop or wide-based gaits. The episode also covers rare anomalies like the accessory peroneal nerve and concludes with an overview of mononeuritis multiplex, a complex syndrome involving multiple nerve areas often triggered by systemic diseases.</p>`
        },
        {
            id: 'edx-12',
            title: 'EDX Series: Episode 12',
            duration: '',
            audioFile: 'Podcasts/EDX_12.m4a',
            description: 'Clinical overview of peripheral polyneuropathy.',
            showNotes: `<p>This podcast episode provides a comprehensive clinical overview of peripheral polyneuropathy, a condition defined by widespread damage to the nerves that connect the central nervous system to the rest of the body. The episode distinguishes between inherited disorders, which are often progressive and genetic like Charcot-Marie-Tooth disease, and acquired conditions, which typically stem from systemic issues such as diabetes mellitus or inflammatory responses. By utilizing electrodiagnostic (EDX) findings, listeners will learn how professionals categorize these neuropathies based on whether they primarily damage the nerve's protective myelin sheath or the axon itself. Ultimately, the show serves as a diagnostic guide to help practitioners identify specific patterns of nerve failure—whether diffuse or multifocal—to determine the underlying cause and the likely recovery path for the patient.</p>`
        },
        {
            id: 'edx-13',
            title: 'EDX Series: Episode 13',
            duration: '',
            audioFile: 'Podcasts/EDX_13.m4a',
            description: 'Clinical guide for diagnosing neuromuscular junction (NMJ) disorders.',
            showNotes: `<p>This podcast episode serves as a clinical guide for diagnosing neuromuscular junction (NMJ) disorders, such as Myasthenia Gravis and Lambert–Eaton syndrome, which disrupt the transmission of signals between nerves and muscles. It categorizes these pathologies based on whether they affect the presynaptic release or postsynaptic reception of acetylcholine, leading to muscle fatigue and weakness. To identify these conditions, the episode details specific electrodiagnostic findings, emphasizing the use of repetitive nerve stimulation (RNS) to detect significant drops in electrical response. Additionally, it highlights single-fiber EMG as a highly sensitive tool for measuring "jitter" and "blocking," which are critical indicators of an unstable connection between the nerve and the muscle fiber.</p>`
        },
        {
            id: 'edx-14',
            title: 'EDX Series: Episode 14',
            duration: '',
            audioFile: 'Podcasts/EDX_14.m4a',
            description: 'Comprehensive clinical guide for diagnosing and classifying myopathies.',
            showNotes: `<p>This podcast episode serves as a comprehensive clinical guide for diagnosing and classifying myopathies, which are diseases that primarily affect muscle fibers. The episode meticulously organizes various muscle disorders—ranging from genetic dystrophies and congenital defects to inflammatory and metabolic conditions—by their unique pathological origins and physical presentations. A central focus is placed on electrodiagnostic findings, specifically detailing how electromyography (EMG) and nerve conduction studies can identify hallmarks like early recruitment and short-duration motor unit potentials. Ultimately, the show acts as a technical manual designed to help listeners differentiate between complex muscular ailments through a combination of biopsy results, laboratory markers, and electrical muscle activity.</p>`
        },
        {
            id: 'edx-15',
            title: 'EDX Series: Episode 15',
            duration: '',
            audioFile: 'Podcasts/EDX_15.m4a',
            description: 'Clinical guide to motor neuron diseases (MND).',
            showNotes: `<p>This podcast episode serves as a clinical guide to motor neuron diseases (MND) and related neuromuscular conditions, focusing on their pathophysiology, clinical presentation, and electrodiagnostic (EDX) findings. It categorizes these disorders by the type of neurons affected, distinguishing between upper and lower motor neuron lesions found in diseases such as ALS, spinal muscular atrophy, and poliomyelitis. A significant portion of the episode is dedicated to differential diagnosis, providing specific criteria and laboratory markers to separate MND from mimics like multifocal motor neuropathy or critical illness polyneuropathy. Ultimately, the episode functions as a technical reference for listeners to accurately identify nerve and muscle degradation patterns using electromyography and nerve conduction studies.</p>`
        }
    ]
};

// Auto-inject default icons derived from the module configuration config map
Object.keys(podcastEpisodes).forEach(moduleId => {
    podcastEpisodes[moduleId].forEach(ep => {
        ep.icon = CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/ERNEST.png';
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
        const iconSrc = CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/ERNEST.png';
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
                        <img src="${iconSrc}"
                             style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                             alt="Ernest">
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
        const iconSrc = episode.icon || CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/ERNEST.png';
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
                    <img src="${iconSrc}"
                         style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                         alt="Ernest">
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
    const iconSrc = CUSTOM_ICON_MAPPING[moduleId] || 'images/ui/ERNEST.png';
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
                <img src="${iconSrc}"
                     style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                     alt="Ernest">
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
