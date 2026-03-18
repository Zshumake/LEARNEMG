export const plexopathyData = {

    upper_trunk_plexopathy: {
        id: 'upper_trunk_plexopathy',
        name: 'Upper Trunk Brachial Plexopathy (Erb-Duchenne)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Birth injury (shoulder dystocia), motorcycle accidents, contact sports (stingers/burners), traction injuries',
            chiefComplaint: 'Shoulder and elbow weakness with lateral arm numbness — "waiter\'s tip" posture',
            hpiKeyFeatures: [
                'Weakness of shoulder abduction, external rotation, and elbow flexion',
                'Arm held in adduction, internal rotation, pronation ("waiter\'s tip")',
                'Traction mechanism: forced depression of shoulder with lateral neck flexion',
                'In adults: motorcycle accident, contact sports (stingers are transient upper trunk neurapraxia)',
                'In neonates: shoulder dystocia during delivery'
            ],
            associatedSymptoms: ['Lateral arm numbness', 'Shoulder pain', 'Inability to raise arm', 'Forearm supination weakness'],
            redFlags: ['Horner syndrome (suggests T1 root avulsion — more extensive injury)', 'Vascular compromise', 'Progressive worsening after initial injury'],
            commonMisdiagnoses: ['C5-C6 radiculopathy', 'Rotator cuff tear', 'Suprascapular neuropathy', 'Axillary neuropathy']
        },
        physicalExam: {
            inspection: [
                'Arm adducted, internally rotated, forearm pronated ("waiter\'s tip")',
                'Deltoid atrophy',
                'Biceps atrophy',
                'Supraspinatus/infraspinatus atrophy'
            ],
            palpation: [
                'Supraclavicular fossa tenderness (Erb point)',
                'Check for mass in supraclavicular region',
                'Tinel at Erb point (C5-C6 junction)'
            ],
            rom: [
                'Limited active shoulder abduction and external rotation',
                'Limited active elbow flexion and supination',
                'Passive ROM may be full (unless contracture)'
            ],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'External rotation', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Brachioradialis', nerve: 'Radial', root: 'C5-C6', action: 'Forearm flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral arm (axillary / C5)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Lateral forearm (musculocutaneous / C6)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Ulnar hand (C8-T1)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Erb Point Tinel', technique: 'Percuss supraclavicular fossa at Erb point (C5-C6 trunk junction)', positiveFinding: 'Tingling radiating down lateral arm', sensitivity: '60%' },
                { name: 'Traction Test', technique: 'Gentle lateral neck flexion away from affected side with ipsilateral shoulder depression', positiveFinding: 'Reproduction of symptoms (stretches upper trunk)' },
                { name: 'Moro Reflex (Neonates)', technique: 'Startle reflex — infant extends and abducts arms symmetrically', positiveFinding: 'Asymmetric response — affected arm does not abduct/extend' }
            ]
        },
        keyDistinguishingFindings: [
            'Multiple C5-C6 innervated muscles weak across DIFFERENT peripheral nerves (deltoid=axillary, biceps=musculocutaneous, supraspinatus=suprascapular)',
            'This trunk-level pattern distinguishes from individual peripheral nerve injuries',
            'Normal C7-C8-T1 muscles (triceps, hand intrinsics) distinguishes from pan-plexopathy',
            'Distinguishes from C5-C6 radiculopathy by: no paraspinal denervation on EMG',
            'Stingers in athletes are transient upper trunk neurapraxia — resolve in seconds to minutes'
        ]
    },

    lower_trunk_plexopathy: {
        id: 'lower_trunk_plexopathy',
        name: 'Lower Trunk Brachial Plexopathy (Klumpke)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Upward traction on arm (grabbing overhead object during fall), birth injury (breech delivery), Pancoast tumor, thoracic outlet syndrome',
            chiefComplaint: 'Hand weakness and numbness in the ring and small fingers with preserved shoulder/elbow function',
            hpiKeyFeatures: [
                'Intrinsic hand weakness (grip, fine motor)',
                'Numbness in medial forearm and ulnar digits',
                'Mechanism: upward traction on adducted arm (opposite of Erb-Duchenne)',
                'May be caused by Pancoast tumor (lung apex) or thoracic outlet syndrome',
                'Horner syndrome (ptosis, miosis, anhidrosis) if T1 root involved'
            ],
            associatedSymptoms: ['Medial arm/forearm pain', 'Hand clumsiness', 'Horner syndrome (ptosis, miosis)'],
            redFlags: ['Horner syndrome (suggests root avulsion or Pancoast tumor — GET IMAGING)', 'Weight loss/smoking history (Pancoast tumor)', 'Progressive course'],
            commonMisdiagnoses: ['Cubital tunnel syndrome', 'C8-T1 radiculopathy', 'Ulnar neuropathy', 'Thoracic outlet syndrome']
        },
        physicalExam: {
            inspection: [
                'Intrinsic hand muscle atrophy (interossei, thenar, hypothenar)',
                'Claw hand in severe cases',
                'Check for Horner syndrome (ptosis, miosis, anhidrosis)',
                'Normal shoulder contour (deltoid spared)'
            ],
            palpation: [
                'Supraclavicular fossa — check for mass (Pancoast tumor)',
                'Infraclavicular tenderness',
                'No Tinel at elbow or wrist (distinguishes from peripheral entrapments)'
            ],
            rom: ['Full shoulder and elbow ROM', 'Finger ROM limited by weakness'],
            strength: [
                { muscle: 'First Dorsal Interosseous', nerve: 'Ulnar', root: 'C8-T1', action: 'Index abduction', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Abductor Digiti Minimi', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Flexor Digitorum Profundus', nerve: 'Median/Ulnar', root: 'C8-T1', action: 'DIP flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm (medial antebrachial cutaneous — from medial cord/lower trunk)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Ring and small fingers (ulnar distribution)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Lateral arm (C5-C6 territory)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Finger flexors (C8)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Horner Syndrome Check', technique: 'Examine pupils in dim light; check for ptosis, miosis, anhidrosis', positiveFinding: 'Ipsilateral Horner syndrome suggests T1 root avulsion or Pancoast tumor' },
                { name: 'Froment Sign', technique: 'Paper pinch test', positiveFinding: 'Thumb IP flexion substitution (weak adductor pollicis)' },
                { name: 'Roos Test (Elevated Arm Stress Test)', technique: 'Arms abducted 90°, elbows flexed; open/close hands for 3 minutes', positiveFinding: 'Reproduction of hand symptoms (if TOS etiology)' }
            ]
        },
        keyDistinguishingFindings: [
            'BOTH median (APB) AND ulnar (FDI, ADM) innervated hand muscles weak = C8-T1 trunk level (not a single peripheral nerve)',
            'Medial antebrachial cutaneous sensory loss is KEY — this nerve comes directly from the medial cord/lower trunk, not from ulnar or median',
            'Normal shoulder and elbow function distinguishes from pan-plexopathy',
            'Horner syndrome = T1 root involvement — requires urgent imaging to rule out Pancoast tumor',
            'EMG: Denervation in both median and ulnar C8-T1 muscles; medial antebrachial cutaneous SNAP absent; normal paraspinals distinguishes from root'
        ]
    },

    lateral_cord: {
        id: 'lateral_cord',
        name: 'Lateral Cord Plexopathy',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Clavicle fracture, infraclavicular compression, shoulder dislocation, surgical positioning',
            chiefComplaint: 'Combined musculocutaneous and upper median nerve dysfunction — elbow flexion weakness and lateral forearm/thumb numbness',
            hpiKeyFeatures: [
                'Weakness of elbow flexion (musculocutaneous) AND pronation/wrist flexion (lateral head of median)',
                'Lateral forearm and thumb/index sensory loss',
                'Lateral cord gives rise to: musculocutaneous nerve AND lateral contribution to median nerve',
                'May follow clavicle fracture or infraclavicular trauma',
                'Hand intrinsics spared (ulnar and medial head of median from medial cord)'
            ],
            associatedSymptoms: ['Lateral forearm numbness', 'Weak pronation', 'Thumb/index numbness'],
            redFlags: ['Progressive involvement of other cords (expanding lesion)'],
            commonMisdiagnoses: ['Isolated musculocutaneous neuropathy', 'C5-C6 radiculopathy', 'Upper trunk plexopathy']
        },
        physicalExam: {
            inspection: [
                'Biceps atrophy',
                'No intrinsic hand atrophy'
            ],
            palpation: ['Infraclavicular tenderness', 'Check for clavicle fracture or mass'],
            rom: ['Limited active elbow flexion and pronation', 'Shoulder ROM may be normal'],
            strength: [
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Brachialis', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Pronator Teres', nerve: 'Median (lateral head)', root: 'C6-C7', action: 'Forearm pronation', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'FCR', nerve: 'Median (lateral head)', root: 'C6-C7', action: 'Wrist flexion/radial deviation', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary (posterior cord)', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar (medial cord)', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral forearm (lateral antebrachial cutaneous / musculocutaneous)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Thumb and index finger (median sensory — lateral contribution)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Ulnar digits', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal (posterior cord)' }
            ],
            specialTests: [
                { name: 'Elbow Flexion Against Gravity', technique: 'Test elbow flexion in supination and pronation', positiveFinding: 'Weak in both (biceps + brachialis)' },
                { name: 'Pronation Testing', technique: 'Resist pronation', positiveFinding: 'Weakness (lateral head median contribution)' }
            ]
        },
        keyDistinguishingFindings: [
            'Combined musculocutaneous + lateral median deficit = lateral cord',
            'Normal deltoid (posterior cord) and normal hand intrinsics (medial cord) localize specifically',
            'Distinguishes from upper trunk by normal deltoid (axillary comes from posterior cord)',
            'Medial contribution to median (AIN territory — FPL, FDP2) may be spared',
            'EMG: Denervation in biceps/brachialis AND pronator teres/FCR; normal deltoid and intrinsics'
        ]
    },

    posterior_cord: {
        id: 'posterior_cord',
        name: 'Posterior Cord Plexopathy',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Anterior shoulder dislocation, humeral fracture, crutch palsy, surgical positioning',
            chiefComplaint: 'Combined deltoid, wrist/finger extension, and latissimus weakness with lateral arm numbness',
            hpiKeyFeatures: [
                'Combined axillary + radial nerve pattern',
                'Weakness: shoulder abduction (deltoid), wrist/finger extension (wrist drop), elbow extension (triceps)',
                'Numbness over lateral arm (axillary) and dorsal hand (radial)',
                'Posterior cord gives rise to: axillary, radial, thoracodorsal, and subscapular nerves',
                'Classic cause: anterior shoulder dislocation injuring the cord as it wraps behind the humerus'
            ],
            associatedSymptoms: ['Wrist drop', 'Inability to extend fingers', 'Lateral arm numbness', 'Shoulder weakness'],
            redFlags: ['Vascular compromise (axillary artery adjacent)', 'Progressive deficit'],
            commonMisdiagnoses: ['Isolated radial nerve palsy', 'Isolated axillary neuropathy', 'C5-C7 radiculopathy']
        },
        physicalExam: {
            inspection: [
                'Deltoid atrophy',
                'Wrist drop and finger drop',
                'Triceps atrophy (severe cases)'
            ],
            palpation: ['Infraclavicular tenderness', 'Check for humeral fracture or dislocation'],
            rom: ['Limited shoulder abduction', 'Wrist drops into flexion'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Wrist extensors (ECRL, ECU)', nerve: 'Radial/PIN', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Finger extensors', nerve: 'PIN', root: 'C7-C8', action: 'Finger extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Latissimus Dorsi', nerve: 'Thoracodorsal', root: 'C6-C8', action: 'Shoulder extension/adduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous (lateral cord)', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median (medial cord)', root: 'C8-T1', action: 'Grip', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral arm (axillary nerve territory)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Dorsal hand and forearm (radial nerve territory)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Median/ulnar digits', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Triceps (C7)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal (lateral cord)' }
            ],
            specialTests: [
                { name: 'Wrist Drop Assessment', technique: 'Ask patient to extend wrist against gravity', positiveFinding: 'Wrist drops (radial nerve component)' },
                { name: 'Deltoid + Radial Combined Test', technique: 'Test shoulder abduction AND wrist extension together', positiveFinding: 'Both weak = posterior cord pattern (not isolated nerve)' }
            ]
        },
        keyDistinguishingFindings: [
            'Combined axillary (deltoid) + radial (triceps, wrist/finger extensors) deficit = posterior cord',
            'Normal biceps (musculocutaneous = lateral cord) and normal hand intrinsics (ulnar/median = medial cord)',
            'Distinguishes from isolated radial neuropathy at spiral groove: DELTOID is also weak in posterior cord',
            'Distinguishes from C7 radiculopathy: deltoid weakness (C5-C6) would not occur with isolated C7 root',
            'EMG: Denervation across axillary AND radial innervated muscles; normal median/ulnar muscles'
        ]
    },

    medial_cord: {
        id: 'medial_cord',
        name: 'Medial Cord Plexopathy',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Infraclavicular trauma, surgical positioning, sternal retractor injury (cardiac surgery), catheter/line placement',
            chiefComplaint: 'Combined ulnar and medial median nerve dysfunction — hand weakness and medial forearm numbness',
            hpiKeyFeatures: [
                'Hand intrinsic weakness (both ulnar AND median C8-T1 muscles)',
                'Medial forearm and ulnar digit numbness',
                'Medial cord gives rise to: ulnar nerve, medial head of median nerve, medial pectoral, medial brachial/antebrachial cutaneous nerves',
                'May follow cardiac surgery (sternal retraction) or subclavian line placement',
                'Distinguishes from lower trunk by: medial pectoral nerve involvement'
            ],
            associatedSymptoms: ['Hand clumsiness', 'Medial forearm numbness', 'Ring/small finger paresthesias'],
            redFlags: ['Horner syndrome (suggests root avulsion beyond cord level)'],
            commonMisdiagnoses: ['Ulnar neuropathy', 'C8-T1 radiculopathy', 'Lower trunk plexopathy']
        },
        physicalExam: {
            inspection: [
                'Intrinsic hand muscle atrophy (interossei, hypothenar, thenar)',
                'Normal shoulder contour'
            ],
            palpation: ['Infraclavicular tenderness', 'No Tinel at elbow or wrist'],
            rom: ['Full shoulder and elbow ROM', 'Finger motion limited by weakness'],
            strength: [
                { muscle: 'FDI', nerve: 'Ulnar', root: 'C8-T1', action: 'Index abduction', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'ADM', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'APB', nerve: 'Median (medial head)', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'FDP (4th/5th)', nerve: 'Ulnar', root: 'C8-T1', action: 'DIP flexion ring/small', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm (medial antebrachial cutaneous)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Ulnar 1.5 digits', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Lateral arm and forearm', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Finger flexors (C8)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Froment Sign', technique: 'Paper pinch between thumb and index', positiveFinding: 'Thumb IP flexion (weak adductor pollicis)' },
                { name: 'Median + Ulnar Combined Testing', technique: 'Test APB (median) AND FDI (ulnar) — both weak suggests cord/trunk level', positiveFinding: 'Both muscles weak from different named nerves sharing C8-T1 cord origin' }
            ]
        },
        keyDistinguishingFindings: [
            'Combined ulnar + medial median deficit = medial cord',
            'Medial antebrachial cutaneous SNAP absent — this nerve branches directly from medial cord',
            'Very similar to lower trunk plexopathy; cord vs trunk distinction often requires detailed EMG',
            'Normal shoulder and elbow muscles (axillary, musculocutaneous = other cords)',
            'Post-cardiac surgery: sternal retraction can stretch medial cord'
        ]
    },

    parsonage_turner: {
        id: 'parsonage_turner',
        name: 'Parsonage-Turner Syndrome (Neuralgic Amyotrophy)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Young to middle-aged adults, may follow viral illness, vaccination, surgery, strenuous exercise; 2-4/100,000/year',
            chiefComplaint: 'Sudden severe shoulder pain followed days later by profound weakness and atrophy',
            hpiKeyFeatures: [
                'Acute onset of severe, unrelenting shoulder/periscapular pain (often described as 10/10)',
                'Pain lasts days to weeks, then gradually subsides',
                'As pain diminishes, profound weakness and atrophy become apparent ("pain before paralysis")',
                'Patchy distribution — may affect single or multiple nerves in the brachial plexus',
                'Preceding trigger: viral illness, vaccination, surgery, or strenuous activity in ~50%',
                'Predilection for suprascapular, long thoracic, and anterior interosseous nerves'
            ],
            associatedSymptoms: ['Severe pain preceding weakness', 'Rapid muscle atrophy', 'Scapular winging', 'May affect phrenic nerve (diaphragm weakness)'],
            redFlags: ['Bilateral (occurs in ~30%)', 'Recurrent episodes (hereditary form — SEPT9 mutation)', 'Phrenic nerve involvement (dyspnea)'],
            commonMisdiagnoses: ['Rotator cuff tear', 'Cervical radiculopathy', 'Adhesive capsulitis', 'Cervical disc herniation', 'Shoulder impingement']
        },
        physicalExam: {
            inspection: [
                'Rapid onset muscle atrophy (weeks) — supraspinatus, infraspinatus, deltoid, serratus anterior',
                'Scapular winging (if long thoracic or dorsal scapular nerve involved)',
                'Patchy distribution — does not follow single nerve or root territory'
            ],
            palpation: [
                'Periscapular tenderness in acute phase',
                'Atrophic muscles may be tender'
            ],
            rom: [
                'Limited active ROM by weakness',
                'Passive ROM may be preserved early but can develop stiffness'
            ],
            strength: [
                { muscle: 'Supraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'Shoulder abduction initiation', expectedFinding: 'WEAK (commonly affected)', mrcGrade: '2-3/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular', root: 'C5-C6', action: 'External rotation', expectedFinding: 'WEAK (commonly affected)', mrcGrade: '2-3/5' },
                { muscle: 'Serratus Anterior', nerve: 'Long thoracic', root: 'C5-C7', action: 'Scapular protraction', expectedFinding: 'WEAK (commonly affected)', mrcGrade: '2-3/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'May be WEAK', mrcGrade: '3-4/5' },
                { muscle: 'FPL + FDP (index)', nerve: 'AIN (Median)', root: 'C7-T1', action: 'Thumb/index DIP flexion', expectedFinding: 'May be WEAK (AIN variant)', mrcGrade: '3/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'Usually NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Variable — may have patchy sensory loss in affected nerve territories', modality: 'Light touch', expectedFinding: 'Variable — sensory loss is less prominent than motor' },
                { area: 'Lateral arm/forearm (if axillary/musculocutaneous involved)', modality: 'Light touch', expectedFinding: 'May be decreased' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'May be DIMINISHED (variable)' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Usually Normal' }
            ],
            specialTests: [
                { name: 'Wall Push-Up (Serratus Assessment)', technique: 'Push against wall', positiveFinding: 'Scapular winging (if long thoracic nerve affected)' },
                { name: 'Pinch Sign (AIN Assessment)', technique: 'Make OK circle with thumb and index', positiveFinding: 'Triangle pinch (if AIN affected)' },
                { name: 'Phrenic Nerve Screen', technique: 'Observe for diaphragm paradox; check inspiratory force', positiveFinding: 'Dyspnea, paradoxical diaphragm movement (if phrenic nerve involved — occurs in ~5-10%)' }
            ]
        },
        keyDistinguishingFindings: [
            'Classic pattern: SEVERE PAIN FIRST, then WEAKNESS — this temporal sequence is nearly pathognomonic',
            'Patchy distribution not conforming to a single root, trunk, or peripheral nerve',
            'Rapid onset atrophy (days to weeks) — much faster than radiculopathy',
            'Predilection for suprascapular, long thoracic, and AIN — these nerves are affected more than expected by chance',
            'Recovery is slow (months to years) but generally good; 70-80% recover to functional levels by 2-3 years',
            'MRI of shoulder may show denervation edema/atrophy in affected muscles — MRI of spine is typically normal'
        ]
    },

    radiation_plexopathy: {
        id: 'radiation_plexopathy',
        name: 'Radiation-Induced Brachial Plexopathy',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Breast cancer, lung cancer, lymphoma — history of radiation therapy to chest/axilla; onset 6 months to 20+ years post-radiation',
            chiefComplaint: 'Progressive painless arm weakness and numbness developing years after radiation therapy',
            hpiKeyFeatures: [
                'Gradual progressive painless weakness — key distinction from neoplastic plexopathy (which is painful)',
                'Onset typically 1-5 years post-radiation (can be decades later)',
                'Upper plexus preferentially affected (radiation field)',
                'Paresthesias and lymphedema of affected arm',
                'History of radiation dose >60 Gy increases risk significantly'
            ],
            associatedSymptoms: ['Lymphedema of arm', 'Paresthesias', 'Skin changes from radiation', 'Painless progression'],
            redFlags: ['SEVERE PAIN (suggests tumor recurrence, not radiation — must rule out)', 'Rapid onset (tumor more likely)', 'New mass on imaging'],
            commonMisdiagnoses: ['Tumor recurrence/neoplastic plexopathy (critical distinction)', 'Cervical radiculopathy', 'Carpal tunnel syndrome']
        },
        physicalExam: {
            inspection: [
                'Radiation skin changes (fibrosis, telangiectasia, pigmentation)',
                'Lymphedema of affected arm',
                'Muscle atrophy in upper plexus distribution',
                'No palpable mass'
            ],
            palpation: [
                'Fibrotic tissue in radiation field',
                'Check for supraclavicular/infraclavicular mass (tumor recurrence)'
            ],
            rom: ['May be limited by fibrosis and lymphedema'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'May be WEAK (if lower trunk involved)', mrcGrade: '4/5' },
                { muscle: 'Triceps', nerve: 'Radial', root: 'C7-C8', action: 'Elbow extension', expectedFinding: 'Variable', mrcGrade: '4/5' }
            ],
            sensory: [
                { area: 'Upper plexus distribution (lateral arm, forearm)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Variable — may affect multiple territories', modality: 'Light touch', expectedFinding: 'Variable' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Variable' }
            ],
            specialTests: [
                { name: 'Radiation Field Assessment', technique: 'Examine skin in radiation field for fibrosis, telangiectasia', positiveFinding: 'Radiation skin changes confirm prior treatment' },
                { name: 'Lymphedema Assessment', technique: 'Compare arm circumference bilaterally', positiveFinding: 'Ipsilateral arm swelling from lymphatic disruption' }
            ]
        },
        keyDistinguishingFindings: [
            'PAINLESS progressive weakness favors radiation plexopathy; PAINFUL weakness favors tumor recurrence',
            'Upper plexus preferentially affected (radiation field covers supraclavicular region)',
            'EMG: Myokymic discharges are characteristic of radiation plexopathy (present in ~60%) and rare in tumor',
            'MRI: Diffuse T2 signal and enhancement without discrete mass favors radiation; focal enhancing mass favors tumor',
            'Lymphedema and radiation skin changes support the diagnosis',
            'No Horner syndrome (Horner suggests tumor at lung apex)'
        ]
    },

    neoplastic_plexopathy: {
        id: 'neoplastic_plexopathy',
        name: 'Neoplastic Plexopathy (Pancoast Tumor)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Lung cancer (Pancoast/superior sulcus tumor), breast cancer metastasis, lymphoma; smoking history',
            chiefComplaint: 'Severe progressive arm pain with hand weakness — especially medial arm and hand',
            hpiKeyFeatures: [
                'SEVERE PAIN is the hallmark — usually precedes weakness by weeks to months',
                'Lower trunk/medial cord preferentially affected (Pancoast tumor invades from below)',
                'Progressive course without improvement',
                'Horner syndrome common (stellate ganglion involvement)',
                'Smoking history, weight loss, history of cancer'
            ],
            associatedSymptoms: ['Severe arm/shoulder pain', 'Horner syndrome', 'Weight loss', 'Hemoptysis', 'Night sweats'],
            redFlags: ['ALL findings are red flags — cancer until proven otherwise', 'Horner syndrome', 'Weight loss', 'New neurologic deficit in cancer patient'],
            commonMisdiagnoses: ['Cervical radiculopathy', 'Radiation plexopathy (if prior radiation)', 'Thoracic outlet syndrome', 'Cubital tunnel syndrome']
        },
        physicalExam: {
            inspection: [
                'Horner syndrome (ptosis, miosis, anhidrosis) — ipsilateral',
                'Intrinsic hand muscle atrophy',
                'May appear cachetic',
                'Supraclavicular lymphadenopathy'
            ],
            palpation: [
                'Supraclavicular mass may be palpable',
                'Supraclavicular lymphadenopathy',
                'Severe tenderness in supraclavicular fossa'
            ],
            rom: ['Limited by pain'],
            strength: [
                { muscle: 'Hand intrinsics (FDI, ADM)', nerve: 'Ulnar', root: 'C8-T1', action: 'Hand intrinsic function', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'APB', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'FDP (ring/small)', nerve: 'Ulnar', root: 'C8-T1', action: 'DIP flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'Often NORMAL initially', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'Often NORMAL initially', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm (medial antebrachial cutaneous)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Ulnar digits', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Medial arm (medial brachial cutaneous)', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Finger flexors (C8)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal (initially)' }
            ],
            specialTests: [
                { name: 'Horner Syndrome Assessment', technique: 'Pupil exam, eyelid position, facial sweating', positiveFinding: 'Ipsilateral ptosis, miosis, anhidrosis' },
                { name: 'Supraclavicular Mass Palpation', technique: 'Palpate supraclavicular fossa deeply', positiveFinding: 'Firm, fixed mass' }
            ]
        },
        keyDistinguishingFindings: [
            'SEVERE PAIN is the cardinal feature — radiation plexopathy is relatively painless',
            'Lower trunk/medial cord pattern (C8-T1 deficit) — Pancoast tumor invades from lung apex upward',
            'Horner syndrome strongly suggests neoplastic cause (not radiation)',
            'EMG: NO myokymic discharges (myokymia suggests radiation, NOT tumor)',
            'MRI/CT: Discrete enhancing mass in lung apex or supraclavicular region',
            'URGENT: any suspected neoplastic plexopathy requires immediate imaging and oncology referral'
        ]
    },

    lumbosacral_plexopathy: {
        id: 'lumbosacral_plexopathy',
        name: 'Lumbosacral Plexopathy (Diabetic Amyotrophy)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Type 2 diabetes (most common cause), age >50, may occur with well-controlled diabetes, also: retroperitoneal hemorrhage, tumor, radiation',
            chiefComplaint: 'Severe thigh pain followed by proximal leg weakness and wasting — often unilateral initially then bilateral',
            hpiKeyFeatures: [
                'Sudden onset severe thigh/hip pain (often described as worst pain of life)',
                'Pain followed by progressive proximal leg weakness over days to weeks',
                'Significant quadriceps and hip flexor wasting',
                'Often unilateral at onset, becomes bilateral in ~30%',
                'Weight loss (often >10 lbs) accompanies the syndrome',
                'Also called: diabetic amyotrophy, Bruns-Garland syndrome, diabetic lumbosacral radiculoplexus neuropathy'
            ],
            associatedSymptoms: ['Severe thigh pain', 'Significant weight loss', 'Falls from knee buckling', 'May affect contralateral side weeks later'],
            redFlags: ['Non-diabetic (consider neoplastic plexopathy, retroperitoneal hemorrhage)', 'Bowel/bladder dysfunction (consider cauda equina)', 'Bilateral rapidly progressive (consider CIDP)'],
            commonMisdiagnoses: ['Lumbar radiculopathy', 'Femoral neuropathy', 'Spinal stenosis', 'Diabetic polyneuropathy (different entity)']
        },
        physicalExam: {
            inspection: [
                'Dramatic quadriceps atrophy (often visible within weeks)',
                'Hip flexor wasting',
                'May have visible fasciculations in quadriceps',
                'Weight loss appearance'
            ],
            palpation: [
                'Thigh muscle tenderness',
                'No spinal tenderness (distinguishes from radiculopathy)'
            ],
            rom: ['Limited by weakness and pain', 'Passive ROM normal'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral/Lumbar plexus', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Hip Adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Hamstrings', nerve: 'Sciatic', root: 'L5-S1', action: 'Knee flexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'Usually preserved', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'Anterior thigh', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Medial leg (saphenous)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'May extend to lateral leg if sacral plexus involved', modality: 'Light touch', expectedFinding: 'Variable' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'ABSENT or severely DIMINISHED' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'May be diminished (concurrent polyneuropathy)' }
            ],
            specialTests: [
                { name: 'Sit-to-Stand Test', technique: 'Ask patient to rise from chair without using arms', positiveFinding: 'Unable or requires significant effort (quadriceps weakness)' },
                { name: 'Single Leg Stance', technique: 'Stand on affected leg', positiveFinding: 'Knee buckles immediately' },
                { name: 'Reverse SLR', technique: 'Prone hip extension with knee flexed', positiveFinding: 'Anterior thigh pain (femoral nerve stretch)' }
            ]
        },
        keyDistinguishingFindings: [
            'Affects MULTIPLE lumbosacral nerves (femoral + obturator + lateral femoral cutaneous ± sciatic) — more widespread than single nerve or root',
            'Severe pain THEN weakness ("pain before paralysis") — similar temporal pattern to Parsonage-Turner syndrome',
            'Weight loss is characteristic and helps distinguish from radiculopathy',
            'Absent knee jerk with preserved ankle jerk (in early stages) localizes to lumbar plexus',
            'Pathology: microvasculitis of the vasa nervorum (immune-mediated, not ischemic)',
            'Prognosis: gradual improvement over 12-24 months; immunotherapy (IVIg, steroids) may help in acute phase',
            'EMG: Widespread denervation across multiple lumbosacral myotomes; paraspinal involvement suggests root level extension'
        ]
    },

    thoracic_outlet: {
        id: 'thoracic_outlet',
        name: 'Neurogenic Thoracic Outlet Syndrome (True nTOS)',
        category: 'Plexopathy',
        isInappropriate: false,
        history: {
            demographics: 'Young women 20-40, cervical rib or elongated C7 transverse process, repetitive overhead work; TRUE nTOS is RARE',
            chiefComplaint: 'Hand weakness and wasting with medial forearm numbness — insidious onset',
            hpiKeyFeatures: [
                'TRUE neurogenic TOS is very rare — estimated 1/million per year',
                'Insidious hand weakness and thenar atrophy (Gilliatt-Sumner hand)',
                'Lower trunk (C8-T1) pattern: intrinsic hand weakness + medial forearm numbness',
                'Cervical rib or elongated C7 transverse process on imaging',
                'NOT to be confused with "disputed" TOS (which has normal EMG and is primarily a pain syndrome)',
                'Gilliatt-Sumner hand: thenar > hypothenar atrophy (unusual pattern)'
            ],
            associatedSymptoms: ['Hand wasting', 'Medial forearm numbness', 'Pain is NOT prominent (unlike disputed TOS)', 'Cold intolerance'],
            redFlags: ['Vascular TOS signs (arm pallor, Raynaud phenomenon, subclavian bruit)', 'Rapid progression (consider Pancoast tumor)'],
            commonMisdiagnoses: ['CTS (thenar atrophy)', 'Cubital tunnel (ulnar symptoms)', 'C8-T1 radiculopathy', 'ALS (hand wasting)', 'Disputed TOS (different entity — no objective findings)']
        },
        physicalExam: {
            inspection: [
                'Gilliatt-Sumner hand: thenar atrophy (APB > opponens) with lesser hypothenar/interosseous atrophy',
                'Atrophy may be unilateral and subtle initially',
                'Check for supraclavicular fullness (cervical rib)'
            ],
            palpation: [
                'Palpable cervical rib or band in supraclavicular fossa',
                'Scalene tenderness',
                'No Tinel at elbow or wrist'
            ],
            rom: ['Full shoulder and arm ROM'],
            strength: [
                { muscle: 'Abductor Pollicis Brevis', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK (classically the most affected muscle)', mrcGrade: '3/5' },
                { muscle: 'FDI', nerve: 'Ulnar', root: 'C8-T1', action: 'Index abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'ADM', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial forearm (medial antebrachial cutaneous)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Ulnar digits', modality: 'Light touch', expectedFinding: 'May be decreased' },
                { area: 'Lateral arm/forearm', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Finger flexors (C8)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Normal' },
                { reflex: 'Triceps (C7)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Roos Test (Elevated Arm Stress Test)', technique: 'Arms 90° abducted, elbows 90° flexed; open/close hands 3 minutes', positiveFinding: 'Reproduction of hand symptoms and early fatigue', sensitivity: '84%', specificity: '30% (poor specificity)' },
                { name: 'Adson Test', technique: 'Extend neck, rotate toward affected side, deep breath; palpate radial pulse', positiveFinding: 'Diminished pulse (tests vascular component; limited value for neurogenic TOS)', sensitivity: '79%', specificity: '76%' },
                { name: 'Cervical Rib on X-ray', technique: 'Cervical spine X-ray', positiveFinding: 'Cervical rib or elongated C7 transverse process' }
            ]
        },
        keyDistinguishingFindings: [
            'Gilliatt-Sumner hand: APB atrophy GREATER than hypothenar — this unusual "median > ulnar" pattern is characteristic of lower trunk compression from below',
            'Medial antebrachial cutaneous SNAP absent or reduced — KEY electrodiagnostic finding',
            'Low-amplitude median CMAP (APB recording) with relatively preserved ulnar CMAP — unique to nTOS',
            'TRUE nTOS is extremely rare — most TOS referrals have "disputed" TOS with normal EMG',
            'Cervical rib on imaging is necessary but not sufficient (many people have cervical ribs without nTOS)',
            'EMG must show chronic C8-T1 denervation with reduced median CMAP to diagnose TRUE nTOS'
        ]
    }
};
