export const inappropriateReferralData = {

    rotator_cuff: {
        id: 'rotator_cuff',
        name: 'Rotator Cuff Tear / Tendinopathy',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Adults >40, overhead athletes, occupational shoulder use, degenerative tears increase with age',
            chiefComplaint: 'Shoulder pain with overhead activities and difficulty sleeping on the affected side',
            hpiKeyFeatures: [
                'Pain with overhead reaching and lifting',
                'Night pain — difficulty sleeping on affected shoulder',
                'Weakness from pain inhibition (NOT from nerve damage)',
                'History of trauma (acute tear) or repetitive overhead use (chronic/degenerative)',
                'No numbness or tingling (key distinction from nerve pathology)'
            ],
            associatedSymptoms: ['Night pain', 'Painful arc of motion', 'Catching/crepitus', 'Pain with reaching behind back'],
            redFlags: ['True neurologic weakness without pain (suggests suprascapular neuropathy)', 'Deltoid patch numbness (suggests axillary neuropathy or C5 radiculopathy)'],
            commonMisdiagnoses: ['Suprascapular neuropathy', 'C5 radiculopathy', 'Adhesive capsulitis', 'Cervical radiculopathy']
        },
        physicalExam: {
            inspection: ['Supraspinatus/infraspinatus atrophy possible (disuse or chronic tear)', 'No dermatomal sensory loss visible'],
            palpation: ['Tenderness over greater tuberosity', 'Supraspinatus tendon tender with palpation', 'NO cervical paraspinal tenderness'],
            rom: ['Active ROM limited by pain', 'Passive ROM full (unless adhesive capsulitis coexists)', 'Painful arc 60-120 degrees'],
            strength: [
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'WEAK from pain (gives way) — not true neurologic weakness', mrcGrade: '4/5 (pain-limited)' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'External rotation', expectedFinding: 'May be weak from tear or pain', mrcGrade: '4/5 (pain-limited)' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL (not a rotator cuff muscle)', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'All other muscles', nerve: 'Various', root: 'Various', action: 'Full exam', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All dermatomes', modality: 'Light touch, pinprick', expectedFinding: 'NORMAL (rotator cuff tear is musculoskeletal, not neurologic)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Empty Can (Jobe) Test', technique: 'Arm at 90° abduction, 30° forward flexion, thumb down; resist downward force', positiveFinding: 'Pain and/or weakness (supraspinatus)', sensitivity: '69%', specificity: '62%' },
                { name: 'External Rotation Lag Sign', technique: 'Passively externally rotate arm; ask patient to hold', positiveFinding: 'Arm drops into internal rotation (infraspinatus/teres minor tear)', sensitivity: '70%', specificity: '100%' },
                { name: 'Drop Arm Test', technique: 'Passively abduct arm to 90°; ask patient to slowly lower', positiveFinding: 'Arm drops suddenly (large rotator cuff tear)' },
                { name: 'Hawkins-Kennedy Test', technique: 'Flex shoulder and elbow to 90°; internally rotate shoulder', positiveFinding: 'Pain (subacromial impingement)', sensitivity: '80%', specificity: '56%' },
                { name: 'Neer Impingement Sign', technique: 'Passively forward flex shoulder with scapula stabilized', positiveFinding: 'Pain at end range (subacromial impingement)', sensitivity: '75%', specificity: '48%' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated for rotator cuff pathology',
            'Pain-limited weakness (gives way against resistance) vs true neurologic weakness (sustained effort but cannot generate force)',
            'NORMAL neurologic exam: normal sensation, normal reflexes, normal strength in non-painful positions',
            'If EMG is performed, it will be NORMAL unless there is concurrent nerve pathology',
            'Order MRI or ultrasound for rotator cuff evaluation — not EMG',
            'If supraspinatus atrophy is present, MUST distinguish from suprascapular neuropathy: test deltoid (normal in suprascapular neuropathy, may be weak in C5 radiculopathy)'
        ]
    },

    lateral_epicondylitis: {
        id: 'lateral_epicondylitis',
        name: 'Lateral Epicondylitis (Tennis Elbow)',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Age 35-55, manual laborers, racquet sports, repetitive wrist extension/forearm supination',
            chiefComplaint: 'Lateral elbow pain with gripping and wrist extension activities',
            hpiKeyFeatures: [
                'Pain at lateral epicondyle worsened by gripping, wringing, and wrist extension',
                'No numbness or tingling (purely musculoskeletal)',
                'Gradual onset related to repetitive use',
                'Pain may radiate distally along forearm extensor muscles',
                'No weakness pattern following nerve distribution'
            ],
            associatedSymptoms: ['Grip weakness from pain', 'Difficulty turning doorknobs', 'Pain with handshaking'],
            redFlags: ['Finger extension weakness (suggests PIN syndrome — consider EMG)', 'Dorsal hand numbness (suggests radial nerve pathology)'],
            commonMisdiagnoses: ['Radial tunnel syndrome', 'PIN syndrome', 'C6-C7 radiculopathy', 'Lateral collateral ligament injury']
        },
        physicalExam: {
            inspection: ['No visible atrophy', 'No swelling typically'],
            palpation: ['Point tenderness directly over lateral epicondyle', 'Tenderness at ECRB origin'],
            rom: ['Full elbow ROM', 'Wrist ROM normal but extension against resistance is painful'],
            strength: [
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'Pain-limited but NORMAL neurologic strength', mrcGrade: '5/5 (painful)' },
                { muscle: 'Finger extensors', nerve: 'PIN', root: 'C7-C8', action: 'Finger extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Supinator', nerve: 'Radial', root: 'C5-C6', action: 'Supination', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Grip', nerve: 'Median/Ulnar', root: 'C8-T1', action: 'Grip', expectedFinding: 'Pain-limited', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'Light touch', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Cozen Test', technique: 'Resist wrist extension with forearm pronated', positiveFinding: 'Pain at lateral epicondyle', sensitivity: '84%', specificity: '0%' },
                { name: 'Mill Test', technique: 'Passively flex wrist with elbow extended and forearm pronated', positiveFinding: 'Pain at lateral epicondyle (stretches ECRB origin)' },
                { name: 'Maudsley Test (Resisted Middle Finger Extension)', technique: 'Resist middle finger extension at MCP', positiveFinding: 'Pain at lateral epicondyle (also positive in radial tunnel syndrome — location of pain differs)' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — this is a tendinopathy, not a neuropathy',
            'Pain at the lateral epicondyle with resisted wrist extension — purely musculoskeletal',
            'Normal neurologic exam: normal sensation, normal reflexes, no true weakness',
            'If radial tunnel syndrome is suspected (pain 3-4cm DISTAL to epicondyle, not AT it), EMG may be considered but is usually normal',
            'Treatment: activity modification, PT, bracing, corticosteroid injection — not EMG'
        ]
    },

    medial_epicondylitis: {
        id: 'medial_epicondylitis',
        name: 'Medial Epicondylitis (Golfer\'s Elbow)',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Age 40-60, golfers, throwing athletes, manual laborers (gripping/pronation)',
            chiefComplaint: 'Medial elbow pain with gripping and wrist flexion',
            hpiKeyFeatures: [
                'Pain at medial epicondyle with gripping, wrist flexion, and forearm pronation',
                'No ulnar nerve symptoms (numbness in ring/small fingers would suggest cubital tunnel)',
                'Gradual onset related to repetitive activities',
                'May be confused with cubital tunnel syndrome (both cause medial elbow symptoms)'
            ],
            associatedSymptoms: ['Grip weakness from pain', 'Pain with throwing or swinging'],
            redFlags: ['Ring/small finger numbness (cubital tunnel — EMG may be appropriate)', 'Hand weakness (suggests ulnar neuropathy)'],
            commonMisdiagnoses: ['Cubital tunnel syndrome', 'Medial collateral ligament injury', 'C8-T1 radiculopathy']
        },
        physicalExam: {
            inspection: ['No visible atrophy', 'No swelling typically'],
            palpation: ['Point tenderness at medial epicondyle', 'NO Tinel sign at cubital tunnel (distinguishes from ulnar neuropathy)'],
            rom: ['Full elbow ROM', 'Wrist flexion against resistance is painful'],
            strength: [
                { muscle: 'Wrist flexors', nerve: 'Median/Ulnar', root: 'C7-T1', action: 'Wrist flexion', expectedFinding: 'Pain-limited but neurologically NORMAL', mrcGrade: '5/5 (painful)' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Pronator Teres', nerve: 'Median', root: 'C6-C7', action: 'Pronation', expectedFinding: 'NORMAL (may be painful)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions including ulnar digits', modality: 'Light touch', expectedFinding: 'NORMAL (normal ulnar sensation distinguishes from cubital tunnel)' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Resisted Wrist Flexion', technique: 'Resist wrist flexion with forearm supinated', positiveFinding: 'Pain at medial epicondyle' },
                { name: 'Resisted Forearm Pronation', technique: 'Resist pronation', positiveFinding: 'Pain at medial epicondyle' },
                { name: 'Negative Elbow Flexion Test', technique: 'Standard cubital tunnel provocation', positiveFinding: 'NEGATIVE — no ulnar paresthesias (distinguishes from cubital tunnel)' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — this is a tendinopathy',
            'Pain at medial epicondyle with normal ulnar nerve exam',
            'Normal sensation in ulnar digits distinguishes from cubital tunnel',
            'No Tinel at cubital tunnel, no hand intrinsic weakness',
            'If ulnar symptoms coexist, EMG IS appropriate to evaluate for cubital tunnel'
        ]
    },

    de_quervains: {
        id: 'de_quervains',
        name: "De Quervain's Tenosynovitis",
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Women > men (6:1), age 30-50, new mothers (repetitive lifting), repetitive thumb use',
            chiefComplaint: 'Radial-sided wrist pain worsened by thumb use and gripping',
            hpiKeyFeatures: [
                'Pain at radial styloid (first dorsal compartment)',
                'Worsened by thumb movements, gripping, wringing',
                'No numbness or tingling',
                'Common in new mothers (lifting infant) and repetitive thumb use',
                'May be confused with Wartenberg syndrome (superficial radial neuropathy)'
            ],
            associatedSymptoms: ['Swelling at radial styloid', 'Crepitus with thumb movement', 'Difficulty with pinching'],
            redFlags: ['Dorsal hand numbness (suggests Wartenberg syndrome — consider EMG)'],
            commonMisdiagnoses: ['Wartenberg syndrome', 'CMC arthritis', 'Scaphoid fracture', 'Intersection syndrome']
        },
        physicalExam: {
            inspection: ['Swelling over radial styloid', 'No muscle atrophy'],
            palpation: ['Tenderness over first dorsal compartment at radial styloid', 'Thickened/tender APL and EPB tendons'],
            rom: ['Thumb ROM painful but full passively', 'Wrist ulnar deviation reproduces symptoms'],
            strength: [
                { muscle: 'All muscles', nerve: 'Various', root: 'Various', action: 'Full testing', expectedFinding: 'NORMAL (pain-limited only)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Dorsal thumb (superficial radial nerve)', modality: 'Light touch', expectedFinding: 'NORMAL (distinguishes from Wartenberg syndrome)' },
                { area: 'All distributions', modality: 'Light touch', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Finkelstein Test', technique: 'Grasp thumb in fist, ulnar deviate wrist', positiveFinding: 'Pain at radial styloid (tendon PAIN, not numbness)', sensitivity: '89%', specificity: '14%' },
                { name: 'Eichhoff Test', technique: 'Same as Finkelstein — commonly confused terms', positiveFinding: 'Pain at first dorsal compartment' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — this is a tendon sheath inflammation',
            'Finkelstein test produces PAIN, not NUMBNESS — numbness would suggest Wartenberg syndrome',
            'Normal dorsal hand sensation distinguishes from Wartenberg syndrome',
            'Normal neurologic exam throughout',
            'Treatment: splint, NSAIDs, corticosteroid injection, PT'
        ]
    },

    trigger_finger: {
        id: 'trigger_finger',
        name: 'Trigger Finger (Stenosing Tenosynovitis)',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Women > men, age 40-60, diabetes, RA, repetitive gripping, multiple fingers may be affected',
            chiefComplaint: 'Finger catching or locking in a bent position with painful clicking when straightening',
            hpiKeyFeatures: [
                'Finger catches or locks in flexion',
                'Painful clicking when extending the affected finger',
                'Worse in the morning, improves with use during the day',
                'Palpable nodule at A1 pulley (palmar MCP crease)',
                'No numbness or neurologic symptoms'
            ],
            associatedSymptoms: ['Morning stiffness', 'Clicking/popping', 'Locking in flexion'],
            redFlags: ['Numbness in the finger (consider digital nerve issue or CTS)', 'True weakness (not just pain-limited)'],
            commonMisdiagnoses: ['Dupuytren contracture', 'MCP joint pathology', 'Flexor tendon rupture']
        },
        physicalExam: {
            inspection: ['Finger may be locked in flexion', 'Palpable nodule at A1 pulley'],
            palpation: ['Tenderness and nodule at A1 pulley (palmar side at MCP crease)', 'Palpable clicking with finger flexion/extension'],
            rom: ['Active ROM: catching or locking', 'Passive extension may be full'],
            strength: [
                { muscle: 'All hand muscles', nerve: 'Median/Ulnar', root: 'C8-T1', action: 'Grip and fine motor', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All digits', modality: 'Light touch', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Active Finger Flexion/Extension', technique: 'Ask patient to make fist then open hand', positiveFinding: 'Catching, clicking, or locking of affected finger' },
                { name: 'A1 Pulley Palpation', technique: 'Palpate palmar MCP crease during finger flexion/extension', positiveFinding: 'Palpable nodule and click at A1 pulley' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — mechanical tendon problem, not neurologic',
            'Catching/locking with palpable A1 pulley nodule is diagnostic',
            'Normal neurologic exam',
            'Treatment: splinting, corticosteroid injection, surgical release'
        ]
    },

    plantar_fasciitis: {
        id: 'plantar_fasciitis',
        name: 'Plantar Fasciitis',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Age 40-60, runners, obesity, prolonged standing, flat feet or high arches',
            chiefComplaint: 'Heel pain worse with first steps in the morning that improves with walking',
            hpiKeyFeatures: [
                'Sharp/stabbing heel pain with first steps after rest',
                'Pain improves after walking ("warm-up" effect) — then worsens with prolonged activity',
                'Worst in the morning or after prolonged sitting',
                'No numbness or burning (distinguishes from Baxter neuropathy or tarsal tunnel)',
                'Localized to medial calcaneal tuberosity'
            ],
            associatedSymptoms: ['Morning heel pain', 'Pain after prolonged standing', 'Heel pad tenderness'],
            redFlags: ['Burning/tingling quality (consider Baxter neuropathy)', 'Plantar numbness (consider tarsal tunnel)', 'Night pain at rest (consider stress fracture or tumor)'],
            commonMisdiagnoses: ['Baxter neuropathy', 'Tarsal tunnel syndrome', 'Calcaneal stress fracture', 'Fat pad atrophy']
        },
        physicalExam: {
            inspection: ['May have pes planus or pes cavus', 'No visible muscle atrophy'],
            palpation: ['Point tenderness at medial calcaneal tuberosity (plantar fascia origin)', 'NO Tinel sign behind medial malleolus (distinguishes from tarsal tunnel)'],
            rom: ['Ankle dorsiflexion may be limited (tight Achilles)', 'Windlass test may reproduce pain'],
            strength: [
                { muscle: 'All foot/ankle muscles', nerve: 'Various', root: 'Various', action: 'Full testing', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Abductor Digiti Quinti', nerve: 'Lateral plantar', root: 'S1-S2', action: 'Small toe abduction', expectedFinding: 'NORMAL (weak in Baxter neuropathy)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Sole of foot', modality: 'Light touch', expectedFinding: 'NORMAL (decreased in tarsal tunnel or neuropathy)' },
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Windlass Test', technique: 'Dorsiflex great toe with ankle in neutral', positiveFinding: 'Heel pain reproduction (tightens plantar fascia)', sensitivity: '32%', specificity: '100%' },
                { name: 'Plantar Fascia Palpation', technique: 'Palpate medial calcaneal tuberosity', positiveFinding: 'Point tenderness at plantar fascia origin' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — musculoskeletal, not neurologic',
            'First-step pain that improves with walking is classic',
            'Normal neurologic exam — normal sensation, strength, and reflexes',
            'Point tenderness at medial calcaneal tuberosity, NO Tinel behind malleolus',
            'If burning quality or ADQ atrophy present, consider Baxter neuropathy (then EMG IS appropriate)',
            'Treatment: stretching, orthotics, night splints, activity modification'
        ]
    },

    adhesive_capsulitis: {
        id: 'adhesive_capsulitis',
        name: 'Adhesive Capsulitis (Frozen Shoulder)',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Age 40-60, women > men, diabetes (10-36% of diabetics), thyroid disease, post-immobilization',
            chiefComplaint: 'Progressive shoulder stiffness and pain with global loss of both active AND passive range of motion',
            hpiKeyFeatures: [
                'Global restriction of BOTH active AND passive ROM — key distinguishing feature',
                'External rotation most restricted, then abduction, then flexion',
                'Three phases: freezing (painful), frozen (stiff), thawing (gradual recovery)',
                'No numbness or neurologic symptoms',
                'Often follows a period of immobilization or develops insidiously'
            ],
            associatedSymptoms: ['Night pain (freezing phase)', 'Difficulty reaching behind back', 'Difficulty with overhead activities'],
            redFlags: ['True weakness with normal ROM (suggests nerve pathology)', 'Numbness (suggests radiculopathy or neuropathy)'],
            commonMisdiagnoses: ['Rotator cuff tear', 'C5 radiculopathy', 'Suprascapular neuropathy', 'Glenohumeral arthritis']
        },
        physicalExam: {
            inspection: ['Shoulder may appear normal', 'Mild deltoid atrophy from disuse possible'],
            palpation: ['Diffuse shoulder tenderness', 'No focal nerve tenderness'],
            rom: ['PASSIVE ROM restricted in all planes (external rotation > abduction > flexion) — this is the hallmark finding', 'Active ROM similarly restricted'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'Cannot fully test due to ROM limitation, but NORMAL within available range', mrcGrade: '5/5 (in available range)' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'All distal muscles', nerve: 'Various', root: 'Various', action: 'Full testing', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Passive External Rotation', technique: 'With arm at side, elbow at 90°, passively externally rotate', positiveFinding: 'Severely restricted compared to contralateral side (loss of >50% is characteristic)' },
                { name: 'Global ROM Assessment', technique: 'Test all planes: flexion, abduction, external rotation, internal rotation', positiveFinding: 'Global restriction in PASSIVE and ACTIVE ROM (capsular pattern)' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — capsular pathology, not neurologic',
            'Loss of PASSIVE ROM is the hallmark — rotator cuff tears have normal passive ROM',
            'Normal neurologic exam (sensation, reflexes, strength within available range)',
            'External rotation most restricted (capsular pattern)',
            'Treatment: PT, NSAIDs, intra-articular corticosteroid injection, hydrodilatation'
        ]
    },

    trochanteric_bursitis: {
        id: 'trochanteric_bursitis',
        name: 'Greater Trochanteric Bursitis / Gluteal Tendinopathy',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Women > men (4:1), age 40-60, runners, obesity, hip OA, ITB syndrome',
            chiefComplaint: 'Lateral hip pain that worsens with lying on the affected side and walking',
            hpiKeyFeatures: [
                'Lateral hip pain — NOT groin pain (which suggests hip joint pathology)',
                'Pain lying on affected side (sleep disruption)',
                'Pain with climbing stairs, walking, standing from sitting',
                'No numbness, no radiating leg pain below the knee (distinguishes from radiculopathy)',
                'Often called "greater trochanteric pain syndrome" as bursitis is often not the primary pathology — gluteal tendinopathy is more common'
            ],
            associatedSymptoms: ['Lateral hip pain with activity', 'Night pain when lying on affected side', 'Stiffness after sitting'],
            redFlags: ['Numbness down the leg (suggests radiculopathy or meralgia paresthetica)', 'Weakness in specific nerve/root pattern (suggests nerve pathology)'],
            commonMisdiagnoses: ['L5 radiculopathy', 'Meralgia paresthetica', 'Hip OA', 'Piriformis syndrome']
        },
        physicalExam: {
            inspection: ['Normal appearance', 'No muscle atrophy'],
            palpation: ['Point tenderness over greater trochanter', 'Tenderness over gluteus medius/minimus insertion'],
            rom: ['Full hip ROM (may be painful at end-range internal rotation)', 'Normal lumbar ROM'],
            strength: [
                { muscle: 'Hip Abductors (Gluteus Medius)', nerve: 'Superior gluteal', root: 'L5', action: 'Hip abduction', expectedFinding: 'Pain-limited but NORMAL strength', mrcGrade: '5/5 (painful)' },
                { muscle: 'All other muscles', nerve: 'Various', root: 'Various', action: 'Full exam', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral thigh', modality: 'Light touch', expectedFinding: 'NORMAL (decreased in meralgia paresthetica)' },
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Greater Trochanter Palpation', technique: 'Direct palpation over greater trochanter', positiveFinding: 'Point tenderness over trochanter', sensitivity: '73%' },
                { name: 'Resisted Hip Abduction (Side-lying)', technique: 'Side-lying, resist hip abduction', positiveFinding: 'Pain at greater trochanter (not weakness)' },
                { name: 'FABER Test', technique: 'Flexion, abduction, external rotation of hip', positiveFinding: 'Lateral hip pain (trochanteric); groin pain suggests hip joint pathology' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — tendinopathy/bursitis, not neuropathy',
            'Point tenderness over greater trochanter with normal neurologic exam',
            'LATERAL hip pain (not anterior groin = hip joint, not posterior = piriformis/sciatica)',
            'Normal leg sensation (no dermatomal loss)',
            'Treatment: PT (hip strengthening), NSAIDs, corticosteroid injection'
        ]
    },

    fibromyalgia: {
        id: 'fibromyalgia',
        name: 'Fibromyalgia',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Women > men (7:1), age 30-50, often co-occurs with depression, anxiety, IBS, chronic fatigue',
            chiefComplaint: 'Widespread body pain, fatigue, and "brain fog" with no identifiable structural cause',
            hpiKeyFeatures: [
                'Chronic widespread pain (>3 months) involving multiple body regions',
                'Fatigue and non-restorative sleep',
                'Cognitive difficulties ("fibro fog")',
                'Pain is DIFFUSE — not in a dermatomal or peripheral nerve pattern',
                'Tender to palpation diffusely but NO true neurologic deficit',
                'Normal blood work, normal imaging, normal EMG/NCS'
            ],
            associatedSymptoms: ['Fatigue', 'Sleep disturbance', 'Cognitive dysfunction', 'IBS', 'Headaches', 'Depression/anxiety', 'Paresthesias (subjective but exam normal)'],
            redFlags: ['True weakness on exam (suggests actual neuromuscular disease)', 'Objective sensory loss (suggests neuropathy)', 'Elevated CK or inflammatory markers (suggests inflammatory disease)'],
            commonMisdiagnoses: ['Polymyalgia rheumatica', 'Hypothyroidism', 'Small fiber neuropathy', 'Vitamin D deficiency', 'MS']
        },
        physicalExam: {
            inspection: ['Normal appearance', 'No atrophy', 'No rash or joint swelling'],
            palpation: ['Diffuse tender points (though tender point count no longer required for diagnosis)', 'Tenderness is WIDESPREAD, not focal'],
            rom: ['Full ROM in all joints'],
            strength: [
                { muscle: 'All muscles', nerve: 'All', root: 'All', action: 'Complete motor exam', expectedFinding: 'NORMAL (may give way from pain but can generate full force with encouragement)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL (patient may report subjective numbness/tingling but objective exam is normal)' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'NORMAL' }
            ],
            specialTests: [
                { name: 'Widespread Pain Index + Symptom Severity Scale', technique: 'ACR 2010/2016 fibromyalgia criteria questionnaire', positiveFinding: 'WPI ≥7 and SSS ≥5, OR WPI 4-6 and SSS ≥9 (with symptoms >3 months)' },
                { name: 'Complete Neurologic Exam', technique: 'Full motor, sensory, reflex testing', positiveFinding: 'ENTIRELY NORMAL — this is the key point' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated and will be NORMAL — fibromyalgia is a central sensitization syndrome, not a peripheral nerve disease',
            'NORMAL neurologic exam: normal strength, normal sensation, normal reflexes',
            'Patient reports widespread pain and often subjective numbness, but OBJECTIVE testing is normal',
            'If objective neurologic deficit IS found on exam, it is NOT fibromyalgia — pursue appropriate workup',
            'Ordering EMG for fibromyalgia adds cost without diagnostic value',
            'Treatment: exercise, CBT, duloxetine/pregabalin/milnacipran, sleep optimization'
        ]
    },

    cervical_strain: {
        id: 'cervical_strain',
        name: 'Cervical Strain / Myofascial Pain',
        category: 'Inappropriate/Non-EMG Referral',
        isInappropriate: true,
        history: {
            demographics: 'Any age, poor posture (desk workers), whiplash, stress, muscle overuse',
            chiefComplaint: 'Neck pain and stiffness with referred pain to shoulders or head, without radicular symptoms',
            hpiKeyFeatures: [
                'Neck pain and stiffness — may radiate to shoulders, upper back, or head',
                'Pain is muscular/aching (NOT sharp/electric radicular pain)',
                'NO dermatomal numbness or tingling radiating past the shoulder',
                'Trigger points in cervical paraspinals, trapezius, levator scapulae',
                'Often related to posture, stress, or recent strain',
                'No arm weakness or hand clumsiness'
            ],
            associatedSymptoms: ['Neck stiffness', 'Tension headaches', 'Upper back pain', 'Shoulder tightness', 'Trigger points'],
            redFlags: ['Radicular arm pain below elbow (suggests radiculopathy — EMG may be appropriate)', 'Hand weakness or numbness (suggests radiculopathy or myelopathy)', 'Bilateral arm symptoms with gait difficulty (suggests myelopathy)'],
            commonMisdiagnoses: ['Cervical radiculopathy', 'Cervical disc herniation', 'Fibromyalgia', 'Thoracic outlet syndrome']
        },
        physicalExam: {
            inspection: ['Forward head posture', 'Rounded shoulders', 'No atrophy'],
            palpation: ['Cervical paraspinal tenderness and spasm', 'Trapezius trigger points', 'Levator scapulae tenderness', 'NO tenderness along peripheral nerve courses'],
            rom: ['Cervical ROM limited by pain/spasm', 'No radicular symptoms with ROM'],
            strength: [
                { muscle: 'All upper extremity muscles', nerve: 'Various', root: 'C5-T1', action: 'Complete motor exam', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'All lower extremity muscles', nerve: 'Various', root: 'L2-S2', action: 'Complete motor exam', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All dermatomes', modality: 'All modalities', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All upper and lower extremity reflexes', expectedFinding: 'NORMAL' }
            ],
            specialTests: [
                { name: 'Spurling Test', technique: 'Cervical extension + ipsilateral rotation + axial compression', positiveFinding: 'NEGATIVE — no radicular arm pain (positive would suggest radiculopathy)' },
                { name: 'Trigger Point Assessment', technique: 'Palpate cervical paraspinals, trapezius, levator scapulae for trigger points', positiveFinding: 'Tender trigger points with referred pain pattern (muscular, NOT dermatomal)' },
                { name: 'Upper Extremity Neuro Exam', technique: 'Complete motor/sensory/reflex exam of both arms', positiveFinding: 'ENTIRELY NORMAL' }
            ]
        },
        keyDistinguishingFindings: [
            '⚠️ EMG/NCS is NOT indicated — neck pain with normal neuro exam does not warrant EMG',
            'Normal neurologic exam is the KEY finding — normal strength, sensation, and reflexes throughout',
            'Negative Spurling test (no radicular arm pain)',
            'Trigger points with referred pain are muscular, not neurologic',
            'EMG does not diagnose muscle strain or trigger points — it will be normal',
            'If radicular arm symptoms ARE present (pain, numbness, weakness in dermatomal pattern), THEN EMG may be appropriate'
        ]
    }
};
