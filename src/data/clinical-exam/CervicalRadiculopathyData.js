export const cervicalRadiculopathyData = {

    c5_radiculopathy: {
        id: 'c5_radiculopathy',
        name: 'C5 Radiculopathy',
        category: 'Cervical Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Adults 40-60 years, degenerative disc disease, trauma (younger patients)',
            chiefComplaint: 'Shoulder pain and weakness with numbness over lateral arm',
            hpiKeyFeatures: [
                'Neck pain radiating to lateral shoulder and arm',
                'Difficulty with overhead activities and lifting',
                'Pain worsened by cervical extension and ipsilateral rotation',
                'May have history of cervical spondylosis or disc herniation at C4-C5',
                'Shoulder abduction and elbow flexion weakness'
            ],
            associatedSymptoms: ['Neck stiffness', 'Headache (referred)', 'Trapezius spasm', 'Numbness over deltoid patch'],
            redFlags: ['Bilateral symptoms (myelopathy)', 'Bowel/bladder dysfunction', 'Progressive weakness', 'Fever (infection)', 'History of cancer (metastasis)'],
            commonMisdiagnoses: ['Rotator cuff tear', 'Suprascapular neuropathy', 'Adhesive capsulitis', 'Axillary neuropathy', 'Brachial plexopathy']
        },
        physicalExam: {
            inspection: [
                'Deltoid atrophy (most visible sign — shoulder "squaring off")',
                'Possible biceps atrophy',
                'Supraspinatus/infraspinatus atrophy',
                'Antalgic head posture (tilted away from affected side)'
            ],
            palpation: [
                'Cervical paraspinal tenderness/spasm at C4-C5 level',
                'Trapezius muscle spasm',
                'No peripheral nerve Tinel signs'
            ],
            rom: [
                'Cervical extension and ipsilateral rotation reproduce radicular symptoms',
                'Shoulder ROM may be limited by pain/weakness',
                'Painful arc with shoulder abduction'
            ],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder external rotation', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Brachioradialis', nerve: 'Radial', root: 'C5-C6', action: 'Forearm flexion in neutral', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Rhomboids', nerve: 'Dorsal scapular', root: 'C5', action: 'Scapular retraction', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Finger abduction/opposition', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral arm (deltoid patch / regimental badge area)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Lateral forearm', modality: 'Light touch', expectedFinding: 'Usually normal (more C6)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Spurling Test', technique: 'Cervical extension + ipsilateral rotation + axial compression', positiveFinding: 'Radicular pain into lateral arm (C5 distribution)', sensitivity: '30-60%', specificity: '90-100%' },
                { name: 'Bakody Sign (Shoulder Abduction Relief)', technique: 'Patient places hand on top of head', positiveFinding: 'Relief of radicular symptoms (reduces foraminal compression)' },
                { name: 'Upper Limb Tension Test (ULTT)', technique: 'Shoulder abduction + extension + forearm supination + wrist/finger extension', positiveFinding: 'Reproduces radicular symptoms in C5 distribution' },
                { name: 'Neck Distraction Test', technique: 'Manual axial traction applied to cervical spine', positiveFinding: 'Relief of radicular symptoms' },
                { name: 'Inverted Brachioradialis Reflex', technique: 'Tap brachioradialis — observe for finger flexion instead of forearm flexion', positiveFinding: 'Finger flexion response suggests concurrent myelopathy (C5-C6 level)' }
            ]
        },
        keyDistinguishingFindings: [
            'Myotomal pattern: weakness in muscles from MULTIPLE peripheral nerves sharing C5 root (deltoid = axillary, biceps = musculocutaneous, supraspinatus = suprascapular)',
            'Biceps AND brachioradialis reflexes diminished together',
            'Distinguish from suprascapular neuropathy: C5 has deltoid weakness; suprascapular does NOT',
            'Distinguish from axillary neuropathy: C5 has biceps and rotator cuff weakness; axillary has only deltoid + teres minor',
            'Paraspinal EMG abnormalities localize to root level (not present in peripheral nerve lesions)'
        ]
    },

    c6_radiculopathy: {
        id: 'c6_radiculopathy',
        name: 'C6 Radiculopathy',
        category: 'Cervical Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Adults 40-60 years, C5-C6 disc herniation (most common cervical disc level)',
            chiefComplaint: 'Neck pain radiating to lateral forearm, thumb, and index finger',
            hpiKeyFeatures: [
                'Pain radiating from neck down lateral forearm to thumb and index finger',
                'Numbness/tingling in thumb (KEY sensory complaint)',
                'Weakness with elbow flexion and wrist extension',
                'Often from C5-C6 disc herniation or spondylosis',
                'Pain worsened by cervical extension and ipsilateral rotation'
            ],
            associatedSymptoms: ['Neck stiffness', 'Interscapular pain', 'Grip weakness (due to wrist extensor weakness)'],
            redFlags: ['Bilateral symptoms', 'Gait disturbance (myelopathy)', 'Bowel/bladder dysfunction', 'Progressive weakness'],
            commonMisdiagnoses: ['Carpal tunnel syndrome', 'Lateral epicondylitis', 'Pronator syndrome', 'De Quervain tenosynovitis']
        },
        physicalExam: {
            inspection: [
                'Biceps atrophy',
                'Brachioradialis atrophy',
                'Wrist extensor atrophy (forearm dorsal aspect)',
                'Less prominent atrophy than C5 deltoid wasting'
            ],
            palpation: [
                'Cervical paraspinal tenderness/spasm at C5-C6 level',
                'Trapezius/levator scapulae tension'
            ],
            rom: [
                'Cervical extension + ipsilateral rotation reproduces symptoms',
                'Elbow flexion and wrist extension may be painful'
            ],
            strength: [
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Brachioradialis', nerve: 'Radial', root: 'C5-C6', action: 'Forearm flexion in neutral', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'ECRL/ECRB (Wrist extensors)', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Pronator teres', nerve: 'Median', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Supinator', nerve: 'Radial (PIN)', root: 'C5-C6', action: 'Forearm supination', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'May have mild weakness', mrcGrade: '4+/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'FDI / Hand intrinsics', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral forearm, thumb, and index finger (thumb tip is KEY testing point)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Dorsal first web space', modality: 'Light touch', expectedFinding: 'May be decreased' }
            ],
            reflexes: [
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'DIMINISHED or ABSENT (most reliable C6 reflex)' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Spurling Test', technique: 'Cervical extension + ipsilateral rotation + axial compression', positiveFinding: 'Radicular pain to lateral forearm/thumb' },
                { name: 'Bakody Sign', technique: 'Hand placed on head', positiveFinding: 'Relief of radicular symptoms' },
                { name: 'Upper Limb Tension Test', technique: 'Shoulder abduction, elbow extension, wrist extension, forearm supination', positiveFinding: 'Reproduces C6 radicular symptoms' },
                { name: 'Neck Distraction Test', technique: 'Manual axial traction', positiveFinding: 'Relieves symptoms' }
            ]
        },
        keyDistinguishingFindings: [
            'Brachioradialis reflex is the MOST RELIABLE C6 reflex',
            'Elbow flexion + wrist extension weakness pattern (across musculocutaneous + radial nerves)',
            'Thumb tip sensory loss is the KEY C6 sensory finding',
            'Distinguish from CTS: C6 has wrist extensor weakness, reflex changes, no nocturnal symptoms, no Phalen/Tinel positive',
            'Distinguish from C5: C6 has wrist extensor weakness and lateral forearm sensory loss extending to thumb',
            'Inverted brachioradialis reflex suggests concurrent myelopathy'
        ]
    },

    c7_radiculopathy: {
        id: 'c7_radiculopathy',
        name: 'C7 Radiculopathy',
        category: 'Cervical Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Most COMMON cervical radiculopathy level. Adults 40-60, C6-C7 disc herniation.',
            chiefComplaint: 'Neck pain radiating to posterior forearm and middle finger',
            hpiKeyFeatures: [
                'Pain from neck radiating down posterior arm/forearm to middle finger',
                'Numbness/tingling in middle finger (KEY)',
                'Weakness pushing objects (triceps), turning doorknobs (wrist flexion/pronation)',
                'C6-C7 disc is the most commonly herniated cervical disc',
                'Pain with cervical extension'
            ],
            associatedSymptoms: ['Interscapular pain', 'Neck stiffness', 'Difficulty with pushing activities'],
            redFlags: ['Lhermitte sign (electric shock with neck flexion = myelopathy)', 'Bilateral hand clumsiness', 'Gait difficulty'],
            commonMisdiagnoses: ['Lateral epicondylitis', 'Triceps tendinopathy', 'Radial tunnel syndrome', 'Posterior interosseous neuropathy']
        },
        physicalExam: {
            inspection: [
                'Triceps atrophy (posterior arm)',
                'Wrist flexor atrophy',
                'Finger extensor atrophy (forearm dorsum)'
            ],
            palpation: [
                'Cervical paraspinal tenderness at C6-C7 level',
                'Midline cervical tenderness possible'
            ],
            rom: [
                'Cervical extension with ipsilateral rotation reproduces symptoms',
                'Elbow extension against resistance may be painful/weak'
            ],
            strength: [
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'WEAK (KEY muscle for C7)', mrcGrade: '4/5' },
                { muscle: 'FCR (Wrist flexors)', nerve: 'Median', root: 'C6-C7', action: 'Wrist flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'EDC (Finger extensors)', nerve: 'Radial (PIN)', root: 'C7-C8', action: 'Finger MCP extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Pronator teres', nerve: 'Median', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Latissimus dorsi', nerve: 'Thoracodorsal', root: 'C6-C8', action: 'Shoulder adduction/extension', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Pectoralis major (sternal head)', nerve: 'Medial/Lateral pectoral', root: 'C7-T1', action: 'Shoulder adduction', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Finger abduction/opposition', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Middle finger (KEY sensory point for C7)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Posterior forearm', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Triceps (C7)', expectedFinding: 'DIMINISHED or ABSENT (KEY reflex for C7)' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Spurling Test', technique: 'Cervical extension + ipsilateral rotation + axial compression', positiveFinding: 'Pain radiating to posterior forearm/middle finger' },
                { name: 'Upper Limb Tension Test (Median Nerve Bias)', technique: 'Shoulder abduction, elbow extension, wrist/finger extension, forearm supination', positiveFinding: 'Reproduces C7 radicular symptoms' },
                { name: 'Neck Distraction Test', technique: 'Manual axial traction', positiveFinding: 'Relieves symptoms' },
                { name: 'Lhermitte Sign', technique: 'Cervical flexion', positiveFinding: 'Electric shock sensation down spine — suggests concurrent myelopathy, NOT specific to C7' }
            ]
        },
        keyDistinguishingFindings: [
            'MOST COMMON cervical radiculopathy level',
            'Triceps reflex is the KEY reflex for C7',
            'Middle finger tip is the most reliable C7 sensory testing point',
            'Elbow extension + wrist flexion + finger extension weakness pattern (across radial + median nerves)',
            'Distinguish from PIN syndrome: C7 has triceps weakness and sensory loss; PIN has no triceps weakness and no sensory loss',
            'Distinguish from C6: C7 has triceps weakness with NORMAL biceps/brachioradialis reflexes'
        ]
    },

    c8_radiculopathy: {
        id: 'c8_radiculopathy',
        name: 'C8 Radiculopathy',
        category: 'Cervical Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Less common than C6/C7. C7-T1 disc herniation or foraminal stenosis. Consider Pancoast tumor.',
            chiefComplaint: 'Hand weakness with numbness in ring and small fingers and medial forearm',
            hpiKeyFeatures: [
                'Medial forearm and hand numbness/tingling',
                'Hand weakness — difficulty with grip, fine motor tasks',
                'Dropping objects, trouble with buttons',
                'Pain along medial arm and forearm',
                'May have associated Horner syndrome (ptosis, miosis, anhidrosis)'
            ],
            associatedSymptoms: ['Neck pain', 'Medial arm pain', 'Grip weakness', 'Clumsiness with fine motor tasks'],
            redFlags: ['Horner syndrome (sympathetic chain proximity)', 'Weight loss/smoking history (Pancoast tumor)', 'Rapidly progressive weakness'],
            commonMisdiagnoses: ['Cubital tunnel syndrome', 'Ulnar neuropathy at elbow', 'Lower trunk brachial plexopathy', 'Thoracic outlet syndrome']
        },
        physicalExam: {
            inspection: [
                'Hand intrinsic atrophy (interossei, hypothenar)',
                'Finger flexor atrophy (forearm volar-ulnar aspect)',
                'May see subtle clawing of ring/small fingers',
                'Check for Horner syndrome: ptosis, miosis, anhidrosis'
            ],
            palpation: [
                'Lower cervical/cervicothoracic paraspinal tenderness',
                'No peripheral nerve Tinel signs (helps exclude entrapment)'
            ],
            rom: [
                'Cervical extension with ipsilateral rotation may reproduce symptoms',
                'Grip weakness limits functional activities'
            ],
            strength: [
                { muscle: 'FDP (all fingers)', nerve: 'Median + Ulnar', root: 'C8-T1', action: 'Finger DIP flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'FDI', nerve: 'Ulnar', root: 'C8-T1', action: 'Index finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'ADM', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Interossei', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger ab/adduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'FPL', nerve: 'Median (AIN)', root: 'C8-T1', action: 'Thumb IP flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'EIP/EDM', nerve: 'Radial (PIN)', root: 'C8', action: 'Index/small finger extension', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'APB', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps/Deltoid', nerve: 'Musculocutaneous/Axillary', root: 'C5-C6', action: 'Elbow flexion/Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm, ring finger (ulnar side), small finger', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Dorsal hand (ulnar side)', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Finger flexor reflex (C8-T1)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' },
                { reflex: 'Biceps/Brachioradialis (C5-C6)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Spurling Test', technique: 'Cervical extension + ipsilateral rotation + axial compression', positiveFinding: 'Pain/paresthesias into medial arm/hand' },
                { name: 'Horner Syndrome Assessment', technique: 'Check pupil size asymmetry, eyelid position, facial sweating', positiveFinding: 'Ptosis + miosis + anhidrosis on affected side (C8-T1 proximity to sympathetic chain)' },
                { name: 'Grip Dynamometry', technique: 'Measure grip strength bilaterally', positiveFinding: 'Reduced on affected side' }
            ]
        },
        keyDistinguishingFindings: [
            'Hand intrinsic weakness spanning BOTH median AND ulnar territories = root/trunk level, NOT single peripheral nerve',
            'FDP weakness to digits 2-3 (median-innervated) distinguishes from pure ulnar neuropathy',
            'APB weakness distinguishes from cubital tunnel (APB is median-innervated)',
            'Check for Horner syndrome — suggests proximity to sympathetic chain at C8-T1',
            'Distinguish from lower trunk plexopathy: similar pattern but plexopathy may spare paraspinals on EMG',
            'Medial antebrachial cutaneous sensory abnormality suggests trunk/root level (normal in ulnar neuropathy)'
        ]
    },

    t1_radiculopathy: {
        id: 't1_radiculopathy',
        name: 'T1 Radiculopathy',
        category: 'Cervical Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Rare. Must rule out Pancoast tumor (apical lung tumor). Cervicothoracic disc pathology.',
            chiefComplaint: 'Hand weakness with numbness along medial forearm and arm',
            hpiKeyFeatures: [
                'Medial arm and forearm numbness',
                'Hand weakness affecting both median and ulnar-innervated muscles',
                'Fine motor difficulty',
                'Must ask about smoking history, weight loss (Pancoast tumor)',
                'Horner syndrome may be present'
            ],
            associatedSymptoms: ['Medial arm pain', 'Horner syndrome (ptosis, miosis, anhidrosis)', 'Shoulder pain (Pancoast)'],
            redFlags: ['Horner syndrome', 'Smoking history/weight loss (Pancoast tumor)', 'Rapidly progressive weakness', 'Shoulder/chest wall pain'],
            commonMisdiagnoses: ['Carpal tunnel syndrome', 'Cubital tunnel syndrome', 'Lower trunk plexopathy', 'C8 radiculopathy']
        },
        physicalExam: {
            inspection: [
                'Thenar atrophy (APB, opponens pollicis)',
                'First dorsal interosseous atrophy',
                'Hypothenar atrophy',
                'Diffuse hand intrinsic atrophy',
                'Check for Horner syndrome: ptosis, miosis, anhidrosis (T1 proximity to stellate ganglion)',
                'Inspect supraclavicular fossa for mass'
            ],
            palpation: [
                'Cervicothoracic junction paraspinal tenderness',
                'Supraclavicular fossa assessment (mass, lymphadenopathy)',
                'No peripheral nerve Tinel signs'
            ],
            rom: [
                'Fine motor function impaired',
                'Grip weakness affects functional activities'
            ],
            strength: [
                { muscle: 'APB', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Opponens pollicis', nerve: 'Median', root: 'C8-T1', action: 'Thumb opposition', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'FDI', nerve: 'Ulnar', root: 'C8-T1', action: 'Index finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'All interossei', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction/adduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'ADM', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Lumbricals 1-4', nerve: 'Median + Ulnar', root: 'C8-T1', action: 'MCP flexion with IP extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'FDP', nerve: 'Median + Ulnar', root: 'C8-T1', action: 'Finger DIP flexion', expectedFinding: 'May have mild weakness', mrcGrade: '4+/5' },
                { muscle: 'All proximal muscles', nerve: 'Various', root: 'C5-C7', action: 'Various', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm (medial antebrachial cutaneous territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Medial arm (medial brachial cutaneous territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Axilla and medial upper arm', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Finger flexor reflex (C8-T1)', expectedFinding: 'DIMINISHED' },
                { reflex: 'All other upper extremity reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Horner Syndrome Assessment', technique: 'Check pupil asymmetry, eyelid position, facial anhidrosis', positiveFinding: 'Ptosis + miosis + anhidrosis on affected side' },
                { name: 'Pancoast Tumor Screening', technique: 'Apical lordotic chest X-ray; assess for shoulder/arm pain + weight loss + smoking history', positiveFinding: 'Apical lung mass (Gilliatt-Sumner hand pattern)' },
                { name: 'Roos Test (EAST)', technique: 'Arms overhead in 90-90 position, open/close fists for 3 minutes', positiveFinding: 'Reproduction of symptoms — also used in TOS evaluation' }
            ]
        },
        keyDistinguishingFindings: [
            'ALL hand intrinsics weak spanning BOTH median AND ulnar territories — KEY to root-level diagnosis',
            'Distinguish from CTS: T1 has ulnar-innervated intrinsic weakness too (CTS only affects median thenar)',
            'Distinguish from cubital tunnel: T1 has APB/opponens weakness (median-innervated)',
            'Horner syndrome (T1 root proximity to stellate ganglion) — must rule out Pancoast tumor',
            'Gilliatt-Sumner hand: T1/lower trunk findings with Pancoast tumor',
            'Medial antebrachial cutaneous sensory abnormality helps localize to trunk/root level (normal in ulnar neuropathy at elbow)'
        ]
    }
};
