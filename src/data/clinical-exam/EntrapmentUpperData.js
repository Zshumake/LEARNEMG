export const entrapmentUpperData = {

    cts: {
        id: 'cts',
        name: 'Carpal Tunnel Syndrome',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Women > Men (3:1), age 40-60, pregnancy, hypothyroidism, diabetes, obesity, repetitive wrist use',
            chiefComplaint: 'Numbness and tingling in the thumb, index, and middle fingers; worse at night',
            hpiKeyFeatures: [
                'Nocturnal paresthesias waking patient from sleep — classic "flick sign" (shaking hand for relief)',
                'Numbness in median nerve distribution (thumb, index, middle, radial ring finger)',
                'Worsened by sustained wrist flexion or extension (driving, holding phone, typing)',
                'Thenar weakness and clumsiness with fine motor tasks in advanced cases',
                'Gradual onset over weeks to months; bilateral in >50% of cases'
            ],
            associatedSymptoms: ['Wrist aching', 'Proximal radiation of pain to forearm or shoulder', 'Dropping objects', 'Difficulty with buttons/jars'],
            redFlags: ['Acute onset (consider acute CTS from fracture/hemorrhage)', 'Thenar atrophy (severe/longstanding)', 'Symptoms outside median distribution (consider alternative diagnosis)', 'Bilateral severe CTS in young patient (consider systemic disease)'],
            commonMisdiagnoses: ['C6-C7 radiculopathy', 'Pronator syndrome', 'De Quervain tenosynovitis', 'Peripheral polyneuropathy', 'Thoracic outlet syndrome']
        },
        physicalExam: {
            inspection: [
                'Thenar eminence atrophy (flatten or wasting of abductor pollicis brevis — late finding)',
                'Dry skin over radial 3.5 digits (autonomic involvement)',
                'Look for surgical scars from prior release'
            ],
            palpation: [
                'Tenderness over carpal tunnel (volar wrist at transverse carpal ligament)',
                'No Tinel sign at elbow or neck (helps exclude other sites)'
            ],
            rom: [
                'Wrist ROM typically normal unless concurrent pathology',
                'Finger ROM normal'
            ],
            strength: [
                { muscle: 'Abductor Pollicis Brevis (APB)', nerve: 'Median (recurrent branch)', root: 'C8-T1', action: 'Thumb palmar abduction', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Opponens Pollicis', nerve: 'Median (recurrent branch)', root: 'C8-T1', action: 'Thumb opposition', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'First/Second Lumbricals', nerve: 'Median', root: 'C8-T1', action: 'MCP flexion with IP extension (digits 2-3)', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Pollicis Longus', nerve: 'Anterior Interosseous (Median)', root: 'C8-T1', action: 'Thumb IP flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Interossei', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction/adduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Pronator Teres', nerve: 'Median (proximal)', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Palmar thumb, index, middle, radial half of ring finger', modality: 'Light touch, two-point discrimination', expectedFinding: 'Decreased (2PD >6mm abnormal)' },
                { area: 'Dorsal tips of index and middle finger', modality: 'Light touch', expectedFinding: 'Decreased (digital nerves)' },
                { area: 'Ulnar 1.5 digits (ring ulnar half, small finger)', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Thenar eminence (palmar cutaneous branch)', modality: 'Light touch', expectedFinding: 'Normal (branches proximal to tunnel)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Phalen Test', technique: 'Sustained wrist flexion for 60 seconds', positiveFinding: 'Paresthesias in median nerve distribution within 60 seconds', sensitivity: '68%', specificity: '73%' },
                { name: 'Tinel Sign at Wrist', technique: 'Tap over carpal tunnel at volar wrist crease', positiveFinding: 'Tingling/electric sensation radiating into median digits', sensitivity: '50%', specificity: '77%' },
                { name: 'Durkan Compression Test', technique: 'Direct pressure with thumbs over carpal tunnel for 30 seconds', positiveFinding: 'Reproduction of paresthesias in median distribution', sensitivity: '87%', specificity: '90%' },
                { name: 'Hand Elevation Test', technique: 'Patient raises both hands overhead for 2 minutes', positiveFinding: 'Paresthesias in median distribution', sensitivity: '76%', specificity: '99%' },
                { name: 'Flick Sign', technique: 'Ask patient: "What do you do with your hand when symptoms wake you at night?"', positiveFinding: 'Patient demonstrates flicking/shaking motion of the wrist', sensitivity: '93%', specificity: '96%' }
            ]
        },
        keyDistinguishingFindings: [
            'Sensory loss restricted to median digits DISTAL to the wrist — thenar eminence skin is spared (palmar cutaneous branch passes over the carpal tunnel)',
            'APB weakness with NORMAL pronator teres and FPL distinguishes CTS from pronator syndrome. NORMAL ulnar-innervated intrinsics distinguishes from C8-T1 radiculopathy',
            'Nocturnal symptoms with flick sign are highly specific for CTS',
            'Normal ulnar-innervated intrinsics with weak APB = median neuropathy at wrist',
            'EMG: Prolonged median distal sensory and motor latencies; comparison to ulnar values increases diagnostic sensitivity'
        ]
    },

    cubital_tunnel: {
        id: 'cubital_tunnel',
        name: 'Cubital Tunnel Syndrome',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Adults 30-60, men > women, occupations with repetitive elbow flexion or leaning on elbows',
            chiefComplaint: 'Numbness and tingling in the ring and small fingers; hand weakness and clumsiness',
            hpiKeyFeatures: [
                'Paresthesias in ulnar 1.5 digits (small finger and ulnar half of ring finger)',
                'Symptoms worsen with sustained elbow flexion (sleeping with elbow bent, phone use)',
                'Hand clumsiness and difficulty with fine motor tasks (key turning, jar opening)',
                'Medial elbow aching or pain radiating to forearm',
                'Gradual onset; may fluctuate with activity'
            ],
            associatedSymptoms: ['Grip weakness', 'Medial elbow pain', 'Finger "crossing" difficulty', 'Cold intolerance in affected digits'],
            redFlags: ['Rapid onset intrinsic hand wasting (consider motor neuron disease)', 'Bilateral symptoms (consider polyneuropathy or cervical myelopathy)', 'Palpable mass at elbow'],
            commonMisdiagnoses: ['C8-T1 radiculopathy', 'Guyon canal syndrome', 'Lower trunk plexopathy', 'Thoracic outlet syndrome', 'Medial epicondylitis']
        },
        physicalExam: {
            inspection: [
                'Hypothenar atrophy',
                'First dorsal interosseous atrophy (web space between thumb and index)',
                'Guttering between metacarpals (interosseous wasting)',
                'Wartenberg sign (small finger abduction posture)',
                'Claw hand deformity in severe cases (ring and small finger MCP hyperextension with IP flexion)'
            ],
            palpation: [
                'Tinel sign at cubital tunnel (posterior to medial epicondyle)',
                'Assess for ulnar nerve subluxation over medial epicondyle with elbow flexion/extension',
                'Palpate for thickened or enlarged ulnar nerve at elbow'
            ],
            rom: [
                'Elbow ROM typically normal',
                'Note if elbow flexion reproduces symptoms'
            ],
            strength: [
                { muscle: 'First Dorsal Interosseous (FDI)', nerve: 'Ulnar', root: 'C8-T1', action: 'Index finger abduction', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Abductor Digiti Minimi (ADM)', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Adductor Pollicis', nerve: 'Ulnar', root: 'C8-T1', action: 'Thumb adduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Digitorum Profundus (4th/5th digits)', nerve: 'Ulnar', root: 'C8-T1', action: 'DIP flexion of ring/small finger', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Carpi Ulnaris', nerve: 'Ulnar', root: 'C7-T1', action: 'Wrist flexion with ulnar deviation', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median', root: 'C8-T1', action: 'Thumb palmar abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Extensor Digitorum', nerve: 'Radial (PIN)', root: 'C7-C8', action: 'Finger MCP extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Small finger and ulnar half of ring finger (palmar and dorsal)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Dorsal ulnar hand (dorsal cutaneous branch)', modality: 'Light touch', expectedFinding: 'Decreased (branches proximal to Guyon canal — key localizing feature)' },
                { area: 'Median digits (thumb, index, middle)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Elbow Flexion Test', technique: 'Sustained maximal elbow flexion with wrist extension for 60 seconds', positiveFinding: 'Paresthesias in ulnar distribution (ring and small fingers)', sensitivity: '75%', specificity: '99%' },
                { name: 'Tinel Sign at Elbow', technique: 'Tap over ulnar nerve in cubital tunnel (behind medial epicondyle)', positiveFinding: 'Tingling/electric sensation radiating to small and ring fingers', sensitivity: '70%', specificity: '98%' },
                { name: 'Froment Sign', technique: 'Patient pinches paper between thumb and index finger; examiner pulls paper away', positiveFinding: 'Thumb IP flexion (FPL substitution) due to weak adductor pollicis', sensitivity: '60-80%' },
                { name: 'Wartenberg Sign', technique: 'Observe small finger posture with hand at rest', positiveFinding: 'Small finger held in abducted position due to weak 3rd palmar interosseous', sensitivity: '40-60%' },
                { name: 'Crossed Finger Test', technique: 'Ask patient to cross index over middle finger', positiveFinding: 'Unable to perform — requires intact first palmar interosseous', sensitivity: '50-70%' }
            ]
        },
        keyDistinguishingFindings: [
            'Dorsal ulnar hand sensory loss distinguishes cubital tunnel from Guyon canal (dorsal cutaneous branch arises proximal to wrist)',
            'FCU and FDP 4/5 weakness localizes to elbow (these branch proximal to Guyon canal)',
            'Normal median-innervated thenar muscles excludes C8-T1 radiculopathy and lower trunk plexopathy',
            'Ulnar nerve subluxation over medial epicondyle present in ~16% of normal population — not diagnostic alone',
            'EMG: Slowed conduction velocity across the elbow segment (>10 m/s drop) with denervation in ulnar-innervated hand muscles'
        ]
    },

    guyons_canal: {
        id: 'guyons_canal',
        name: "Guyon's Canal Syndrome",
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Cyclists (handlebar palsy), occupations with repetitive palm compression, ganglion cysts, ulnar artery aneurysm',
            chiefComplaint: 'Hand weakness and numbness in the ring and small fingers',
            hpiKeyFeatures: [
                'Numbness in palmar ulnar 1.5 digits',
                'Intrinsic hand weakness (grip, pinch strength)',
                'History of cycling, use of vibrating tools, or repetitive palm pressure',
                'May have palpable mass at wrist (ganglion cyst is most common cause)',
                'Dorsal hand sensation preserved (key distinguishing feature from cubital tunnel)'
            ],
            associatedSymptoms: ['Grip weakness', 'Hand clumsiness', 'Hypothenar pain'],
            redFlags: ['Pulsatile mass (ulnar artery aneurysm)', 'History of wrist fracture (hook of hamate)'],
            commonMisdiagnoses: ['Cubital tunnel syndrome', 'C8-T1 radiculopathy', 'Lower trunk plexopathy', 'Peripheral polyneuropathy']
        },
        physicalExam: {
            inspection: [
                'Hypothenar atrophy',
                'First dorsal interosseous atrophy',
                'Wartenberg sign may be present'
            ],
            palpation: [
                'Tinel sign over Guyon canal (ulnar side of wrist, hook of hamate)',
                'Palpate for mass or ganglion at wrist',
                'Check Allen test for ulnar artery patency'
            ],
            rom: [
                'Wrist and finger ROM typically normal'
            ],
            strength: [
                { muscle: 'First Dorsal Interosseous', nerve: 'Ulnar (deep branch)', root: 'C8-T1', action: 'Index finger abduction', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Abductor Digiti Minimi', nerve: 'Ulnar (deep branch)', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Adductor Pollicis', nerve: 'Ulnar (deep branch)', root: 'C8-T1', action: 'Thumb adduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Carpi Ulnaris', nerve: 'Ulnar', root: 'C7-T1', action: 'Wrist flexion/ulnar deviation', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Flexor Digitorum Profundus (4th/5th)', nerve: 'Ulnar', root: 'C8-T1', action: 'DIP flexion ring/small', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Palmar surface small finger and ulnar ring finger', modality: 'Light touch, pinprick', expectedFinding: 'Decreased (if superficial branch involved)' },
                { area: 'Dorsal ulnar hand and dorsal small finger', modality: 'Light touch', expectedFinding: 'Normal (dorsal cutaneous branch arises proximal to Guyon canal)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel at Guyon Canal', technique: 'Tap over ulnar nerve at the wrist (between pisiform and hook of hamate)', positiveFinding: 'Tingling in ulnar palmar digits', sensitivity: '40-60%' },
                { name: 'Froment Sign', technique: 'Pinch paper between thumb and index; pull away', positiveFinding: 'Thumb IP flexion substitution (weak adductor pollicis)', sensitivity: '60-80%' },
                { name: 'Allen Test', technique: 'Occlude radial and ulnar arteries, release ulnar; observe hand reperfusion', positiveFinding: 'Delayed or absent reperfusion suggests ulnar artery pathology' }
            ]
        },
        keyDistinguishingFindings: [
            'NORMAL dorsal ulnar hand sensation distinguishes Guyon canal from cubital tunnel — the dorsal cutaneous branch branches 5-8 cm proximal to the wrist',
            'NORMAL FCU and FDP 4/5 — these are innervated proximal to Guyon canal',
            'Three zones: Zone 1 (mixed motor/sensory), Zone 2 (deep motor only), Zone 3 (superficial sensory only)',
            'Most common cause is ganglion cyst; cyclists get it from handlebar pressure',
            'EMG: Normal ulnar conduction across elbow; abnormal at wrist segment'
        ]
    },

    radial_tunnel: {
        id: 'radial_tunnel',
        name: 'Radial Tunnel Syndrome',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Adults 30-50, repetitive forearm pronation/supination, manual laborers',
            chiefComplaint: 'Deep aching pain in the proximal dorsal forearm, 3-4 cm distal to lateral epicondyle',
            hpiKeyFeatures: [
                'Lateral forearm pain that mimics lateral epicondylitis but located more distally',
                'Pain worsened by repetitive forearm supination and pronation',
                'Typically NO motor weakness (unlike PIN syndrome — compression is not severe enough)',
                'Pain with resisted middle finger extension (Rule of Nine test)',
                'May coexist with lateral epicondylitis ("double crush" at elbow)'
            ],
            associatedSymptoms: ['Forearm aching', 'Grip weakness from pain inhibition', 'Night pain occasionally'],
            redFlags: ['Finger drop (suggests PIN syndrome, not just radial tunnel)', 'Mass at proximal forearm'],
            commonMisdiagnoses: ['Lateral epicondylitis (most common confusion)', 'PIN syndrome', 'C6-C7 radiculopathy', 'Posterior interosseous bursitis']
        },
        physicalExam: {
            inspection: [
                'No visible atrophy (purely sensory/pain syndrome)',
                'No finger or wrist drop'
            ],
            palpation: [
                'Point tenderness 3-4 cm distal to lateral epicondyle (over radial tunnel, not lateral epicondyle itself)',
                'Tenderness over mobile wad of Henry (brachioradialis, ECRL, ECRB)',
                'Compare with lateral epicondyle tenderness (which would be more proximal and at the bony prominence)'
            ],
            rom: [
                'Full passive ROM at elbow and wrist',
                'Active ROM may be limited by pain'
            ],
            strength: [
                { muscle: 'Extensor Digitorum', nerve: 'Posterior Interosseous (Radial)', root: 'C7-C8', action: 'Finger MCP extension', expectedFinding: 'NORMAL (pain only — no true weakness)', mrcGrade: '5/5' },
                { muscle: 'Extensor Carpi Ulnaris', nerve: 'Posterior Interosseous (Radial)', root: 'C7-C8', action: 'Wrist extension with ulnar deviation', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Supinator', nerve: 'Posterior Interosseous (Radial)', root: 'C5-C6', action: 'Forearm supination', expectedFinding: 'NORMAL but painful', mrcGrade: '5/5' },
                { muscle: 'Wrist extensors (ECRL, ECRB)', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Dorsal hand and forearm (superficial radial nerve)', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Lateral forearm (lateral antebrachial cutaneous)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Rule of Nine Test (Resisted Middle Finger Extension)', technique: 'Patient extends middle finger against resistance with elbow extended', positiveFinding: 'Pain at the radial tunnel (ECRB tendon edge compresses PIN)', sensitivity: '70%' },
                { name: 'Resisted Supination Test', technique: 'Resist forearm supination with elbow at 90 degrees', positiveFinding: 'Pain at proximal dorsal forearm (supinator arcade compression)', sensitivity: '60%' },
                { name: 'Radial Tunnel Injection Test', technique: 'Inject local anesthetic into radial tunnel', positiveFinding: 'Complete pain relief confirms diagnosis', sensitivity: '90%', specificity: '90%' }
            ]
        },
        keyDistinguishingFindings: [
            'Pain WITHOUT weakness distinguishes radial tunnel from PIN syndrome — both involve the same nerve but different degrees of compression',
            'Point of maximal tenderness is DISTAL to lateral epicondyle, not AT it (distinguishes from lateral epicondylitis)',
            'EMG/NCS is typically NORMAL in radial tunnel syndrome — it is a clinical diagnosis',
            'Diagnosis of exclusion — often confirmed by diagnostic injection',
            'Can coexist with lateral epicondylitis (reported in up to 5% of cases)'
        ]
    },

    pin_syndrome: {
        id: 'pin_syndrome',
        name: 'Posterior Interosseous Neuropathy (PIN)',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Adults 40-60, rheumatoid arthritis (synovitis), lipomas, ganglion cysts, after forearm fractures',
            chiefComplaint: 'Inability to extend fingers and thumb at MCP joints; wrist deviates radially with extension',
            hpiKeyFeatures: [
                'Gradual finger drop — inability to extend fingers at MCP joints',
                'Wrist extension preserved but deviates radially (ECRL/ECRB intact, ECU weak)',
                'NO sensory loss (PIN is a purely motor nerve)',
                'Deep aching forearm pain may precede weakness',
                'History of RA, forearm mass, or Monteggia fracture'
            ],
            associatedSymptoms: ['Deep forearm ache', 'Difficulty releasing grip', 'No numbness or tingling'],
            redFlags: ['Rapid onset (consider posterior cord stroke or mass lesion)', 'Pain out of proportion (consider vasculitis)'],
            commonMisdiagnoses: ['Extensor tendon rupture (RA patients)', 'C7-C8 radiculopathy', 'Radial nerve palsy at spiral groove', 'Wrist drop (PIN spares wrist extension)']
        },
        physicalExam: {
            inspection: [
                'Finger drop at MCP joints (cannot extend fingers)',
                'Thumb extension/abduction weakness',
                'No wrist drop (ECRL/ECRB are intact — innervated PROXIMAL to PIN takeoff)',
                'Wrist deviates radially with extension (ECU paralyzed)'
            ],
            palpation: [
                'Tenderness over proximal dorsal forearm at arcade of Frohse',
                'Palpate for mass in proximal forearm'
            ],
            rom: [
                'Full passive finger extension (rules out tendon rupture)',
                'Limited active finger MCP extension'
            ],
            strength: [
                { muscle: 'Extensor Digitorum', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Finger MCP extension', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Extensor Carpi Ulnaris', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Wrist extension (ulnar deviation)', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Extensor Pollicis Longus', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Thumb IP extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Abductor Pollicis Longus', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Thumb abduction/radial deviation', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Supinator', nerve: 'PIN (Radial)', root: 'C5-C6', action: 'Forearm supination', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'ECRL/ECRB', nerve: 'Radial (proximal to PIN)', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Brachioradialis', nerve: 'Radial (proximal)', root: 'C5-C6', action: 'Forearm flexion in neutral', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Triceps', nerve: 'Radial (proximal)', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Dorsal hand / first web space (superficial radial nerve)', modality: 'Light touch', expectedFinding: 'Normal (PIN is purely motor)' },
                { area: 'Lateral forearm', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Resisted Middle Finger Extension', technique: 'Resist middle finger extension at MCP', positiveFinding: 'Weakness (not just pain, unlike radial tunnel syndrome)', sensitivity: '80%' },
                { name: 'Radial Deviation with Wrist Extension', technique: 'Ask patient to extend wrist — observe deviation', positiveFinding: 'Wrist deviates radially (ECU paralysis, ECRL intact)', sensitivity: '90%' },
                { name: 'Passive vs Active Extension', technique: 'Compare passive finger extension ROM to active', positiveFinding: 'Full passive ROM but absent active extension (rules out tendon rupture in RA patients)' }
            ]
        },
        keyDistinguishingFindings: [
            'Finger drop WITHOUT wrist drop = PIN syndrome (ECRL/ECRB are innervated proximal to the arcade of Frohse)',
            'No sensory loss — PIN is purely motor. Any sensory loss suggests radial nerve at spiral groove or C7 radiculopathy',
            'Radial deviation with wrist extension is pathognomonic (ECU weak, ECRL intact)',
            'In RA patients: MUST distinguish from extensor tendon rupture — passive finger extension is FULL in PIN but limited in tendon rupture',
            'EMG: Denervation in PIN-innervated muscles with sparing of radial-innervated muscles proximal to the PIN takeoff'
        ]
    },

    ain_syndrome: {
        id: 'ain_syndrome',
        name: 'Anterior Interosseous Neuropathy (AIN)',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Adults 30-50, may follow viral illness (Parsonage-Turner variant), fibrous bands, accessory muscles',
            chiefComplaint: 'Inability to pinch — cannot form a circle with thumb and index finger (OK sign)',
            hpiKeyFeatures: [
                'Weakness of thumb IP flexion and index DIP flexion',
                'Cannot make a round "OK" sign — forms a triangle instead',
                'NO sensory loss (AIN is purely motor)',
                'Proximal forearm pain may precede weakness by weeks',
                'May be a partial form of Parsonage-Turner syndrome (neuralgic amyotrophy)'
            ],
            associatedSymptoms: ['Proximal forearm pain (prodromal)', 'Difficulty writing or pinching small objects', 'No numbness or tingling'],
            redFlags: ['Rapid progressive weakness (consider Parsonage-Turner syndrome)', 'Bilateral (very rare, consider systemic cause)'],
            commonMisdiagnoses: ['Flexor tendon rupture', 'Pronator syndrome', 'C8-T1 radiculopathy', 'Parsonage-Turner syndrome (may be same entity)']
        },
        physicalExam: {
            inspection: [
                'No visible atrophy initially (deep forearm muscles)',
                'Abnormal pinch posture — triangle instead of circle with OK sign'
            ],
            palpation: [
                'Tenderness over proximal volar forearm',
                'No Tinel sign (not a compression neuropathy per se)'
            ],
            rom: [
                'Full passive ROM at all joints',
                'Limited active thumb IP and index DIP flexion'
            ],
            strength: [
                { muscle: 'Flexor Pollicis Longus (FPL)', nerve: 'AIN (Median)', root: 'C8-T1', action: 'Thumb IP flexion', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Flexor Digitorum Profundus (index)', nerve: 'AIN (Median)', root: 'C8-T1', action: 'Index finger DIP flexion', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Pronator Quadratus', nerve: 'AIN (Median)', root: 'C8-T1', action: 'Forearm pronation (with elbow flexed)', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Pronator Teres', nerve: 'Median (proximal)', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Flexor Digitorum Superficialis', nerve: 'Median', root: 'C7-T1', action: 'PIP flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median (recurrent)', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Median digits (thumb, index, middle)', modality: 'Light touch', expectedFinding: 'Normal (AIN is purely motor)' },
                { area: 'All other distributions', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Pinch (OK) Sign', technique: 'Ask patient to make a circle with thumb and index finger tip', positiveFinding: 'Forms a triangle/pulp-to-pulp pinch instead of tip-to-tip circle (weak FPL and FDP index)', sensitivity: '90%', specificity: '85%' },
                { name: 'Resisted Pronation (elbow flexed)', technique: 'Resist forearm pronation with elbow fully flexed to isolate pronator quadratus from pronator teres', positiveFinding: 'Weakness of pronation with elbow flexed (PQ), normal with elbow extended (PT)', sensitivity: '70%' },
                { name: 'Kiloh-Nevin Sign', technique: 'Classic eponym — same as pinch sign', positiveFinding: 'Triangle pinch instead of round circle' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely motor syndrome — NO sensory loss. Any numbness suggests more proximal median lesion or radiculopathy',
            'Three muscles affected: FPL, FDP to index, pronator quadratus',
            'Triangle pinch sign is the hallmark — inability to make round OK circle',
            'Normal FDS and normal APB distinguish AIN from pronator syndrome and CTS respectively',
            'Often associated with or a variant of Parsonage-Turner syndrome — look for preceding viral illness or shoulder pain'
        ]
    },

    pronator_syndrome: {
        id: 'pronator_syndrome',
        name: 'Pronator Syndrome',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Adults 40-50, women > men, occupations with repetitive pronation/gripping',
            chiefComplaint: 'Forearm pain and numbness in the thumb, index, and middle fingers — similar to CTS but without nocturnal symptoms',
            hpiKeyFeatures: [
                'Aching forearm pain worsened by repetitive pronation/supination',
                'Median nerve distribution numbness (thumb, index, middle, radial ring)',
                'LACKS classic nocturnal symptoms of CTS',
                'INCLUDES numbness over thenar eminence (palmar cutaneous branch passes through pronator — NOT through carpal tunnel)',
                'Symptoms reproduced by resisted pronation or forearm use'
            ],
            associatedSymptoms: ['Forearm aching', 'Grip weakness', 'Thenar eminence numbness', 'Worsened with carrying heavy objects'],
            redFlags: ['Isolated finger drop (suggests different diagnosis)', 'Rapid onset (consider compartment syndrome)'],
            commonMisdiagnoses: ['Carpal tunnel syndrome (most common confusion)', 'AIN syndrome', 'C6-C7 radiculopathy', 'Medial epicondylitis']
        },
        physicalExam: {
            inspection: [
                'Usually no visible atrophy (unless chronic)',
                'Possible thenar atrophy in severe/chronic cases'
            ],
            palpation: [
                'Tenderness over pronator teres in proximal volar forearm',
                'Tenderness may localize to lacertus fibrosus, pronator teres heads, or FDS arch'
            ],
            rom: [
                'Full passive ROM at elbow and wrist',
                'Pain with active resisted pronation'
            ],
            strength: [
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median (recurrent)', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Pollicis Longus', nerve: 'AIN (Median)', root: 'C8-T1', action: 'Thumb IP flexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor Digitorum Profundus (index)', nerve: 'AIN (Median)', root: 'C8-T1', action: 'Index DIP flexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Pronator Teres', nerve: 'Median', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'NORMAL or painful', mrcGrade: '5/5' },
                { muscle: 'Interossei', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Palmar thumb, index, middle, radial ring finger', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Thenar eminence (palmar cutaneous branch)', modality: 'Light touch', expectedFinding: 'Decreased (KEY distinguishing feature from CTS — thenar skin is affected in pronator syndrome but SPARED in CTS)' },
                { area: 'Ulnar digits', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Resisted Pronation Test', technique: 'Resist forearm pronation with elbow extended', positiveFinding: 'Reproduction of forearm pain and median symptoms (compression at pronator teres heads)', sensitivity: '60-70%' },
                { name: 'Resisted Elbow Flexion with Forearm Supination', technique: 'Resist elbow flexion with forearm supinated', positiveFinding: 'Reproduction of symptoms (lacertus fibrosus compression)', sensitivity: '50%' },
                { name: 'Resisted Middle Finger PIP Flexion', technique: 'Resist isolated PIP flexion of middle finger', positiveFinding: 'Reproduction of symptoms (compression at FDS arch)', sensitivity: '50%' },
                { name: 'Negative Phalen/Tinel at Wrist', technique: 'Standard CTS provocative maneuvers', positiveFinding: 'NEGATIVE Phalen and Tinel at wrist (distinguishes from CTS)' }
            ]
        },
        keyDistinguishingFindings: [
            'Thenar eminence numbness distinguishes from CTS — the palmar cutaneous branch travels THROUGH the pronator region but OVER the carpal tunnel',
            'No nocturnal symptoms (CTS hallmark is absent)',
            'Both APB AND AIN-innervated muscles (FPL, FDP2) may be weak — more extensive than CTS',
            'Negative Phalen and Tinel at wrist',
            'EMG may show denervation in both thenar and AIN-innervated muscles, with conduction slowing at the forearm rather than the wrist'
        ]
    },

    wartenberg: {
        id: 'wartenberg',
        name: "Wartenberg Syndrome",
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Watch band or tight bracelet compression, handcuff neuropathy, post-surgical (radial styloid procedures)',
            chiefComplaint: 'Numbness and burning pain over the dorsal radial hand and thumb web space',
            hpiKeyFeatures: [
                'Burning pain or dysesthesias over dorsal thumb and first web space',
                'NO motor weakness (purely sensory nerve)',
                'History of tight wristband, watch, bracelet, or handcuff compression',
                'Symptoms worsen with forearm pronation and ulnar deviation (stretches nerve)',
                'May follow de Quervain release surgery'
            ],
            associatedSymptoms: ['Hypersensitivity to touch over dorsal radial hand', 'Tingling with wrist movement'],
            redFlags: ['Motor weakness in any distribution (suggests more proximal lesion)'],
            commonMisdiagnoses: ['De Quervain tenosynovitis', 'C6 radiculopathy', 'Lateral antebrachial cutaneous neuropathy', 'Intersection syndrome']
        },
        physicalExam: {
            inspection: [
                'No muscle atrophy (purely sensory nerve)',
                'No visible deformity'
            ],
            palpation: [
                'Tinel sign over superficial radial nerve at radial styloid',
                'Tenderness over distal radial forearm where nerve becomes subcutaneous'
            ],
            rom: ['Full ROM at wrist and fingers', 'Forearm pronation with ulnar deviation may reproduce symptoms'],
            strength: [
                { muscle: 'Extensor Digitorum', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Finger extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Abductor Pollicis Longus', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Thumb abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Extensor Pollicis Longus', nerve: 'PIN (Radial)', root: 'C7-C8', action: 'Thumb extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Dorsal thumb and first web space', modality: 'Light touch, pinprick', expectedFinding: 'Decreased or hyperesthetic' },
                { area: 'Dorsal radial hand (proximal phalanges of thumb, index, middle)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Palmar thumb and digits', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel Sign at Radial Styloid', technique: 'Tap over superficial radial nerve near radial styloid', positiveFinding: 'Tingling/electric sensation over dorsal thumb and web space', sensitivity: '85%' },
                { name: 'Finkelstein Maneuver (Modified)', technique: 'Ulnar deviation of wrist with thumb adducted', positiveFinding: 'Numbness/tingling in superficial radial nerve distribution (distinguish from de Quervain which causes PAIN at radial styloid)', sensitivity: '80%' },
                { name: 'Forearm Pronation/Ulnar Deviation Stretch', technique: 'Maximally pronate forearm with wrist in ulnar deviation', positiveFinding: 'Stretches superficial radial nerve — reproduces paresthesias' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely sensory syndrome — NO motor weakness in any muscle',
            'Dorsal hand numbness only (palmar sensation is normal — median and ulnar territories)',
            'Finkelstein-like maneuver produces NUMBNESS, not just pain (de Quervain produces pain at first dorsal compartment)',
            'Tinel at radial styloid, NOT at elbow or wrist volar surface',
            'EMG: Normal motor studies; sensory NCS may show reduced or absent superficial radial SNAP'
        ]
    },

    suprascapular: {
        id: 'suprascapular',
        name: 'Suprascapular Neuropathy',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Athletes (volleyball, baseball, overhead sports), massive rotator cuff tears, paralabral cysts, direct trauma',
            chiefComplaint: 'Deep posterior shoulder pain and weakness with overhead activities and external rotation',
            hpiKeyFeatures: [
                'Dull deep aching shoulder pain, often poorly localized posteriorly',
                'Weakness of shoulder abduction initiation and/or external rotation',
                'Common in overhead athletes (volleyball players: traction injury at spinoglenoid notch)',
                'May be insidious — athletes attribute to "shoulder fatigue"',
                'Paralabral cyst from labral tear can compress nerve at spinoglenoid notch'
            ],
            associatedSymptoms: ['Posterior shoulder pain', 'Difficulty with overhead activities', 'Scapular muscle wasting'],
            redFlags: ['Rapid bilateral infraspinatus atrophy (consider motor neuron disease)', 'Mass on imaging (tumor)'],
            commonMisdiagnoses: ['Rotator cuff tear', 'C5-C6 radiculopathy', 'Adhesive capsulitis', 'Thoracic outlet syndrome', 'Axillary neuropathy']
        },
        physicalExam: {
            inspection: [
                'Supraspinatus fossa wasting (if suprascapular notch lesion)',
                'Infraspinatus fossa wasting (if suprascapular or spinoglenoid notch lesion)',
                'Compare both sides for asymmetry — easier to see from behind'
            ],
            palpation: [
                'Tenderness over suprascapular notch (superior medial scapula)',
                'No anterior shoulder tenderness (distinguishes from rotator cuff tendinopathy)'
            ],
            rom: [
                'Passive ROM typically full (unless concurrent pathology)',
                'Active shoulder abduction and external rotation limited by weakness'
            ],
            strength: [
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation (first 15 degrees)', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder external rotation', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Rhomboids', nerve: 'Dorsal scapular', root: 'C5', action: 'Scapular retraction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Serratus Anterior', nerve: 'Long thoracic', root: 'C5-C7', action: 'Scapular protraction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Posterior shoulder', modality: 'Light touch', expectedFinding: 'Normal (suprascapular nerve has deep articular branches but NO cutaneous sensory innervation to the skin)' },
                { area: 'Lateral arm (axillary nerve territory)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Cross-Body Adduction Test', technique: 'Arm across chest (horizontal adduction) — stresses suprascapular notch', positiveFinding: 'Deep posterior shoulder pain', sensitivity: '60%' },
                { name: 'Resisted External Rotation', technique: 'Resist external rotation with arm at side, elbow 90 degrees', positiveFinding: 'Weakness (infraspinatus)', sensitivity: '85%' },
                { name: 'Empty Can Test (Jobe)', technique: 'Arms at 90 degrees abduction, 30 degrees forward, thumbs down; resist downward force', positiveFinding: 'Weakness or pain (supraspinatus) — also positive in rotator cuff tear', sensitivity: '70%' },
                { name: 'Infraspinatus Atrophy Assessment', technique: 'View scapula from behind; compare both infraspinatus fossae', positiveFinding: 'Visible asymmetric wasting' }
            ]
        },
        keyDistinguishingFindings: [
            'NO cutaneous sensory loss — suprascapular nerve has no skin sensory branches (unlike C5 radiculopathy which has deltoid patch numbness)',
            'Normal deltoid distinguishes from axillary neuropathy and C5 radiculopathy',
            'Isolated infraspinatus weakness = spinoglenoid notch lesion (supraspinatus spared because its branch is proximal)',
            'Both supraspinatus AND infraspinatus weak = suprascapular notch lesion',
            'EMG: Denervation limited to supraspinatus and/or infraspinatus only — no paraspinal abnormalities'
        ]
    },

    axillary: {
        id: 'axillary',
        name: 'Axillary Neuropathy',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Anterior shoulder dislocations (most common cause), proximal humerus fractures, direct trauma, quadrilateral space syndrome',
            chiefComplaint: 'Shoulder weakness and numbness over the lateral deltoid ("regimental badge area")',
            hpiKeyFeatures: [
                'Usually follows anterior shoulder dislocation or proximal humerus fracture',
                'Weakness of shoulder abduction and external rotation',
                'Numbness over lateral deltoid ("regimental badge" area)',
                'In young patients: often missed in the setting of post-reduction pain',
                'Quadrilateral space syndrome: insidious onset in overhead athletes'
            ],
            associatedSymptoms: ['Shoulder pain', 'Inability to raise arm to side', 'Numbness over lateral shoulder'],
            redFlags: ['Vascular compromise (axillary artery runs with nerve)', 'Massive deltoid atrophy without trauma (consider C5 radiculopathy or motor neuron disease)'],
            commonMisdiagnoses: ['Rotator cuff tear', 'C5 radiculopathy', 'Suprascapular neuropathy', 'Brachial plexopathy']
        },
        physicalExam: {
            inspection: [
                'Deltoid atrophy — "squaring off" of the shoulder',
                'Loss of normal shoulder contour',
                'Compare both sides from front and side views'
            ],
            palpation: [
                'Tenderness in quadrilateral space (posterior, inferior to shoulder)',
                'Check for anterior shoulder instability (apprehension signs)'
            ],
            rom: [
                'Limited active shoulder abduction',
                'Full passive ROM (unless concurrent injury)'
            ],
            strength: [
                { muscle: 'Deltoid (all heads)', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction (anterior, middle, posterior)', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Teres Minor', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder external rotation', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder external rotation', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral deltoid "regimental badge" area (superior lateral cutaneous nerve of arm)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Lateral forearm', modality: 'Light touch', expectedFinding: 'Normal (musculocutaneous territory)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Deltoid Lag Sign', technique: 'Passively abduct arm to 90 degrees; ask patient to hold', positiveFinding: 'Arm drops (deltoid cannot maintain abduction)' },
                { name: 'Quadrilateral Space Tenderness', technique: 'Palpate posterior shoulder inferior to teres minor, lateral to long head triceps', positiveFinding: 'Tenderness and reproduction of symptoms' },
                { name: 'Regimental Badge Sensory Test', technique: 'Test light touch over lateral deltoid patch', positiveFinding: 'Diminished sensation compared to contralateral side' }
            ]
        },
        keyDistinguishingFindings: [
            'Deltoid + teres minor ONLY — normal supraspinatus/infraspinatus distinguishes from suprascapular neuropathy',
            'Regimental badge sensory loss distinguishes from suprascapular neuropathy (which has NO skin sensory loss)',
            'Normal biceps and biceps reflex distinguishes from C5 radiculopathy (which affects multiple C5 muscles)',
            'Always test after shoulder dislocation — prevalence of axillary nerve injury is 5-35% after dislocation',
            'EMG: Denervation confined to deltoid and teres minor; normal paraspinals excludes radiculopathy'
        ]
    },

    long_thoracic: {
        id: 'long_thoracic',
        name: 'Long Thoracic Neuropathy',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Young adults, athletes, post-surgical (thoracotomy, mastectomy), heavy backpack/load carrying, viral illness',
            chiefComplaint: 'Difficulty raising arm overhead and prominent shoulder blade winging',
            hpiKeyFeatures: [
                'Medial scapular winging prominent with forward flexion or wall push-up',
                'Difficulty with overhead reaching and pushing activities',
                'May follow viral illness (Parsonage-Turner variant), surgery, or repetitive overhead activity',
                'Deep aching periscapular pain',
                'Often unilateral'
            ],
            associatedSymptoms: ['Shoulder pain (from altered scapular mechanics)', 'Difficulty with push-ups', 'Visible winging with overhead activity'],
            redFlags: ['Bilateral winging (consider muscular dystrophy)', 'Progressive winging with other weakness (consider motor neuron disease)'],
            commonMisdiagnoses: ['Rotator cuff pathology', 'Spinal accessory neuropathy (trapezius winging)', 'Dorsal scapular neuropathy (rhomboid winging)', 'Scapulothoracic bursitis']
        },
        physicalExam: {
            inspection: [
                'Medial scapular winging — scapula protrudes posteriorly and medially',
                'Best seen with forward flexion of arm or wall push-up',
                'Inferior angle of scapula rotates medially (distinguishes from trapezius winging)'
            ],
            palpation: [
                'Periscapular tenderness',
                'Palpate serratus anterior along lateral chest wall (mid-axillary line)'
            ],
            rom: [
                'Active shoulder forward flexion limited (scapula destabilized)',
                'Passive ROM typically full'
            ],
            strength: [
                { muscle: 'Serratus Anterior', nerve: 'Long thoracic', root: 'C5-C7', action: 'Scapular protraction / wall push-up', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Trapezius', nerve: 'Spinal accessory', root: 'CN XI', action: 'Shoulder shrug', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Rhomboids', nerve: 'Dorsal scapular', root: 'C5', action: 'Scapular retraction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'No cutaneous territory (long thoracic is purely motor)', modality: 'Light touch', expectedFinding: 'Normal everywhere' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Wall Push-Up Test', technique: 'Patient pushes against wall with arms extended', positiveFinding: 'Medial border of scapula wings prominently off chest wall', sensitivity: '95%' },
                { name: 'Forward Flexion Winging Test', technique: 'Forward flex arms to 90 degrees; observe from behind', positiveFinding: 'Medial scapular winging with inferior angle rotating medially' },
                { name: 'Punch-Out Test', technique: 'Patient pushes arm forward as if punching', positiveFinding: 'Scapular winging (serratus anterior fails to protract scapula)' }
            ]
        },
        keyDistinguishingFindings: [
            'MEDIAL winging (inferior angle goes medially) = serratus anterior (long thoracic nerve)',
            'LATERAL winging (inferior angle goes laterally) = trapezius (spinal accessory nerve)',
            'No sensory loss — long thoracic nerve is purely motor',
            'Winging accentuated by forward flexion and push-ups (serratus stabilizes scapula against thorax)',
            'Recovery may take 12-24 months; often associated with Parsonage-Turner syndrome'
        ]
    },

    musculocutaneous: {
        id: 'musculocutaneous',
        name: 'Musculocutaneous Neuropathy',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Rare in isolation — heavy weight lifters, post-surgical (shoulder), stab wounds, coracobrachialis entrapment',
            chiefComplaint: 'Elbow flexion weakness and numbness over the lateral forearm',
            hpiKeyFeatures: [
                'Weakness of elbow flexion (biceps and brachialis)',
                'Numbness over lateral forearm (lateral antebrachial cutaneous nerve is the terminal sensory branch)',
                'May follow heavy biceps exercises, shoulder surgery, or direct trauma',
                'Relatively rare as an isolated lesion',
                'Brachioradialis provides partial elbow flexion compensation'
            ],
            associatedSymptoms: ['Difficulty carrying objects', 'Lateral forearm burning or paresthesias', 'Biceps atrophy'],
            redFlags: ['Upper extremity weakness beyond biceps/brachialis (consider upper trunk or C5-C6 radiculopathy)'],
            commonMisdiagnoses: ['C5-C6 radiculopathy', 'Upper trunk plexopathy', 'Lateral cord plexopathy', 'Biceps tendon rupture']
        },
        physicalExam: {
            inspection: [
                'Biceps atrophy',
                'Brachialis atrophy (difficult to see)',
                'Loss of biceps contour'
            ],
            palpation: [
                'Tenderness over coracobrachialis (anterior shoulder)',
                'Absent or diminished biceps bulk'
            ],
            rom: [
                'Active elbow flexion weak against gravity',
                'Passive ROM normal'
            ],
            strength: [
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion (supinated forearm)', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Brachialis', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion (pronated forearm)', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Coracobrachialis', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Shoulder forward flexion/adduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Brachioradialis', nerve: 'Radial', root: 'C5-C6', action: 'Elbow flexion (neutral forearm)', expectedFinding: 'NORMAL (compensates)', mrcGrade: '5/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral forearm (lateral antebrachial cutaneous nerve)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Lateral arm (deltoid patch — axillary nerve)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal (radial nerve)' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Biceps Squeeze Test', technique: 'Squeeze biceps muscle belly', positiveFinding: 'Absent or diminished forearm supination response' },
                { name: 'Elbow Flexion in Supination vs Pronation', technique: 'Test elbow flexion with forearm supinated (biceps), pronated (brachialis), and neutral (brachioradialis)', positiveFinding: 'Weak in supination and pronation but preserved in neutral (brachioradialis intact)' },
                { name: 'Lateral Forearm Sensory Test', technique: 'Compare light touch on lateral vs medial forearm', positiveFinding: 'Decreased lateral forearm (lateral antebrachial cutaneous nerve territory)' }
            ]
        },
        keyDistinguishingFindings: [
            'Weak biceps + brachialis + lateral forearm numbness = musculocutaneous nerve',
            'Normal deltoid and brachioradialis distinguishes from C5-C6 radiculopathy (which would affect all C5-C6 muscles)',
            'Diminished biceps reflex with normal brachioradialis reflex = peripheral nerve lesion, not root level',
            'Lateral antebrachial cutaneous distribution (lateral forearm) is the sensory territory — NOT the deltoid patch (which is axillary)',
            'EMG: Denervation in biceps and brachialis only; normal deltoid and brachioradialis'
        ]
    },

    dorsal_scapular: {
        id: 'dorsal_scapular',
        name: 'Dorsal Scapular Neuropathy',
        category: 'Entrapment - Upper Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Rare, overhead athletes, repetitive arm elevation, entrapment by middle scalene muscle, C5 root involvement',
            chiefComplaint: 'Medial scapular pain and difficulty with scapular retraction',
            hpiKeyFeatures: [
                'Deep medial scapular/interscapular pain',
                'Weakness of scapular retraction',
                'May be associated with scalene entrapment',
                'Often diagnosed late due to subtlety of findings',
                'Rhomboid winging — scapula sits laterally displaced at rest'
            ],
            associatedSymptoms: ['Interscapular aching', 'Difficulty with rowing or pulling motions', 'Mild scapular asymmetry'],
            redFlags: ['Progressive weakness beyond rhomboids (consider C5 root or plexus pathology)'],
            commonMisdiagnoses: ['Cervical myofascial pain', 'C5 radiculopathy', 'Long thoracic neuropathy', 'Trapezius strain']
        },
        physicalExam: {
            inspection: [
                'Scapula may sit slightly laterally displaced at rest (rhomboid weakness)',
                'Scapular protraction/lateral shift from rhomboid weakness (differs from medial winging of serratus anterior palsy and from lateral winging of trapezius palsy)',
                'Difficult to observe — often subtle findings'
            ],
            palpation: [
                'Medial scapular border tenderness',
                'Middle scalene tenderness (site of potential entrapment)'
            ],
            rom: [
                'Shoulder ROM may be mildly limited by pain',
                'Active scapular retraction weak'
            ],
            strength: [
                { muscle: 'Rhomboid Major/Minor', nerve: 'Dorsal scapular', root: 'C5', action: 'Scapular retraction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Levator Scapulae (partial)', nerve: 'Dorsal scapular + C3-C4', root: 'C3-C5', action: 'Scapular elevation', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Serratus Anterior', nerve: 'Long thoracic', root: 'C5-C7', action: 'Scapular protraction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Trapezius', nerve: 'Spinal accessory', root: 'CN XI', action: 'Shoulder shrug/scapular retraction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'No cutaneous territory (purely motor nerve)', modality: 'Light touch', expectedFinding: 'Normal everywhere' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Resisted Scapular Retraction', technique: 'Patient retracts scapulae against resistance (squeeze shoulder blades together)', positiveFinding: 'Weakness compared to contralateral side' },
                { name: 'Hands-on-Hips Lateral Winging', technique: 'Patient pushes hands into hips; observe scapula from behind', positiveFinding: 'Inferior angle of scapula wings laterally (opposite direction from serratus winging)' },
                { name: 'Scapular Position at Rest', technique: 'Observe bilateral scapular position from behind', positiveFinding: 'Affected scapula sits more laterally on thorax' }
            ]
        },
        keyDistinguishingFindings: [
            'Lateral scapular winging (inferior angle goes laterally) distinguishes from serratus anterior winging (which goes medially)',
            'Normal serratus anterior and normal wall push-up excludes long thoracic neuropathy',
            'Normal trapezius excludes spinal accessory neuropathy',
            'Purely motor nerve — no sensory loss',
            'Often missed diagnosis — consider when patient has chronic medial scapular pain with subtle scapular asymmetry and normal MRI',
            'EMG: Denervation in rhomboids only; normal serratus anterior, trapezius, and deltoid'
        ]
    }
};
