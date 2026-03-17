export const lumbosacralRadiculopathyData = {

    l2_radiculopathy: {
        id: 'l2_radiculopathy',
        name: 'L2 Radiculopathy',
        category: 'Lumbosacral Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Relatively uncommon. Consider retroperitoneal pathology, tumor, infection. Older adults with degenerative changes.',
            chiefComplaint: 'Anterior/upper thigh pain with hip flexion weakness',
            hpiKeyFeatures: [
                'Pain in groin and anterior upper thigh',
                'Difficulty with hip flexion (climbing stairs, getting out of car)',
                'May have back pain radiating to anterior thigh',
                'Consider retroperitoneal pathology (abscess, hematoma, tumor)',
                'Less commonly from disc herniation alone'
            ],
            associatedSymptoms: ['Low back pain', 'Groin pain', 'Difficulty with stair climbing'],
            redFlags: ['Bilateral symptoms', 'Bowel/bladder dysfunction (cauda equina)', 'Fever (abscess)', 'History of anticoagulation (hematoma)', 'Weight loss (tumor)'],
            commonMisdiagnoses: ['Hip joint pathology', 'Femoral neuropathy', 'Lumbar plexopathy', 'Meralgia paresthetica']
        },
        physicalExam: {
            inspection: [
                'Hip flexor atrophy may be subtle',
                'Possible antalgic gait',
                'Thigh circumference may be slightly reduced'
            ],
            palpation: [
                'Lumbar paraspinal tenderness/spasm at L1-L2 level',
                'Inguinal region tenderness possible'
            ],
            rom: [
                'Lumbar extension may reproduce symptoms',
                'Hip flexion may be limited by weakness'
            ],
            strength: [
                { muscle: 'Iliopsoas', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Sartorius', nerve: 'Femoral', root: 'L2-L3', action: 'Hip flexion + external rotation', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'Usually normal or mildly weak', mrcGrade: '4+/5 to 5/5' },
                { muscle: 'Tibialis anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Anterior/upper thigh (L2 dermatome)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Below knee', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Cremasteric reflex (L1-L2)', expectedFinding: 'May be DIMINISHED' },
                { reflex: 'Patellar reflex (L2-L4)', expectedFinding: 'Usually normal (L3-L4 predominant)' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Reverse Straight Leg Raise (Femoral Nerve Stretch)', technique: 'Patient prone, flex knee and extend hip', positiveFinding: 'Anterior thigh pain (more sensitive for upper lumbar roots than SLR)' },
                { name: 'Straight Leg Raise', technique: 'Raise extended leg', positiveFinding: 'Usually NEGATIVE for L2 (more sensitive for L5-S1)' }
            ]
        },
        keyDistinguishingFindings: [
            'Primarily hip flexion weakness with anterior thigh sensory loss',
            'Distinguish from femoral neuropathy: L2 has minimal quadriceps involvement; femoral neuropathy has prominent quad weakness',
            'Distinguish from lumbar plexopathy: plexopathy often involves multiple root levels',
            'Relatively uncommon — always consider retroperitoneal pathology',
            'Paraspinal EMG abnormalities at L2 level localize to root'
        ]
    },

    l3_radiculopathy: {
        id: 'l3_radiculopathy',
        name: 'L3 Radiculopathy',
        category: 'Lumbosacral Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Older adults with degenerative disc/facet disease. L2-L3 or L3-L4 pathology.',
            chiefComplaint: 'Anterior thigh pain with knee buckling and quadriceps weakness',
            hpiKeyFeatures: [
                'Pain from back radiating to anterior thigh to knee',
                'Knee gives way or buckles (quadriceps weakness)',
                'Difficulty with stairs — especially going up',
                'May have difficulty rising from seated position',
                'Often from degenerative disease (less common disc herniation level)'
            ],
            associatedSymptoms: ['Low back pain', 'Anterior knee pain', 'Falls from knee buckling'],
            redFlags: ['Bilateral quad weakness (cauda equina)', 'Bowel/bladder dysfunction', 'Saddle anesthesia'],
            commonMisdiagnoses: ['Femoral neuropathy', 'Diabetic amyotrophy', 'Hip arthritis', 'Knee pathology']
        },
        physicalExam: {
            inspection: [
                'Quadriceps atrophy (may be subtle)',
                'Thigh circumference asymmetry',
                'Antalgic gait',
                'Knee buckling tendency'
            ],
            palpation: [
                'Lumbar paraspinal tenderness at L2-L3 or L3-L4 level',
                'Paraspinal muscle spasm'
            ],
            rom: [
                'Lumbar extension and ipsilateral sidebending may reproduce symptoms',
                'Lumbar flexion may relieve symptoms (opens foramen)'
            ],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Tibialis anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Peroneals', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Anterior thigh to knee (L3 dermatome)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Below knee', modality: 'Light touch', expectedFinding: 'Normal (unless overlap with L4)' }
            ],
            reflexes: [
                { reflex: 'Patellar reflex (L2-L4)', expectedFinding: 'DIMINISHED (L3 is major contributor)' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' },
                { reflex: 'Adductor reflex (L2-L4)', expectedFinding: 'May be diminished' }
            ],
            specialTests: [
                { name: 'Reverse Straight Leg Raise (Femoral Nerve Stretch)', technique: 'Patient prone, flex knee and extend hip', positiveFinding: 'Anterior thigh pain radiating to knee (MORE sensitive for L3 than standard SLR)' },
                { name: 'Straight Leg Raise', technique: 'Raise extended leg', positiveFinding: 'Usually NEGATIVE (more sensitive for L5-S1)' },
                { name: 'Stair Climbing Test', technique: 'Observe ascending stairs', positiveFinding: 'Difficulty/inability due to quadriceps weakness' }
            ]
        },
        keyDistinguishingFindings: [
            'Quadriceps weakness + hip flexor weakness + adductor involvement',
            'Patellar reflex diminished (major L3 contribution)',
            'Distinguish from femoral neuropathy: L3 has adductor weakness (obturator nerve) — femoral neuropathy does not',
            'Distinguish from L4: L3 has less tibialis anterior involvement; L4 has prominent TA weakness',
            'Reverse SLR is more sensitive than standard SLR for upper lumbar roots'
        ]
    },

    l4_radiculopathy: {
        id: 'l4_radiculopathy',
        name: 'L4 Radiculopathy',
        category: 'Lumbosacral Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Adults with L3-L4 disc herniation or foraminal stenosis. More common in older adults.',
            chiefComplaint: 'Knee weakness and medial leg numbness with back pain',
            hpiKeyFeatures: [
                'Low back pain radiating to anterior thigh and medial leg',
                'Knee gives way or buckles (quadriceps weakness)',
                'Numbness over medial leg (shin area)',
                'Difficulty with stairs and rising from chair',
                'L3-L4 disc or foraminal stenosis'
            ],
            associatedSymptoms: ['Low back pain', 'Knee pain', 'Difficulty walking on uneven ground'],
            redFlags: ['Bilateral symptoms', 'Bowel/bladder dysfunction', 'Progressive weakness', 'Saddle anesthesia'],
            commonMisdiagnoses: ['Femoral neuropathy', 'Saphenous neuropathy', 'Knee meniscal pathology', 'Diabetic amyotrophy']
        },
        physicalExam: {
            inspection: [
                'Quadriceps atrophy (especially vastus medialis)',
                'Thigh circumference asymmetry',
                'Antalgic gait',
                'Knee buckling tendency'
            ],
            palpation: [
                'Lumbar paraspinal tenderness/spasm at L3-L4 level',
                'Tenderness over posterior iliac crest'
            ],
            rom: [
                'Lumbar extension and ipsilateral sidebending may reproduce symptoms',
                'Lumbar flexion may relieve symptoms (opens foramen)'
            ],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK (KEY muscle)', mrcGrade: '4/5' },
                { muscle: 'Tibialis anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK (L4 contribution)', mrcGrade: '4/5' },
                { muscle: 'Tibialis posterior', nerve: 'Tibial', root: 'L4-L5', action: 'Ankle inversion', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'May have mild weakness', mrcGrade: '4+/5' },
                { muscle: 'Hip flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'May be mildly weak', mrcGrade: '4+/5' },
                { muscle: 'Peroneals', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'EHL', nerve: 'Deep peroneal', root: 'L5', action: 'Great toe extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gluteus medius', nerve: 'Superior gluteal', root: 'L4-S1', action: 'Hip abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial leg — knee to medial malleolus (L4 dermatome / saphenous territory overlap)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Anterior knee', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Patellar reflex (L2-L4)', expectedFinding: 'DIMINISHED or ABSENT (KEY reflex)' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' },
                { reflex: 'Adductor reflex (L2-L4)', expectedFinding: 'May be diminished' }
            ],
            specialTests: [
                { name: 'Straight Leg Raise', technique: 'Raise extended leg passively', positiveFinding: 'May be POSITIVE but less sensitive for L4 than for L5/S1' },
                { name: 'Reverse Straight Leg Raise (Femoral Nerve Stretch)', technique: 'Patient prone, flex knee and extend hip', positiveFinding: 'Anterior thigh/medial leg pain (MORE sensitive for L4 than standard SLR)' },
                { name: 'Slump Test', technique: 'Seated trunk flexion with knee extension', positiveFinding: 'May reproduce symptoms' }
            ]
        },
        keyDistinguishingFindings: [
            'Knee extension weakness + ankle dorsiflexion weakness across DIFFERENT peripheral nerves (femoral + deep peroneal) = myotomal pattern',
            'Patellar reflex diminished/absent is the KEY reflex finding',
            'Reverse SLR (femoral nerve stretch) is MORE sensitive than standard SLR for L4',
            'Distinguish from femoral neuropathy: L4 has tibialis anterior weakness (deep peroneal nerve) — femoral neuropathy does NOT',
            'Distinguish from L5: L4 has prominent patellar reflex loss and quadriceps weakness; L5 has EHL weakness and hip abduction weakness'
        ]
    },

    l5_radiculopathy: {
        id: 'l5_radiculopathy',
        name: 'L5 Radiculopathy',
        category: 'Lumbosacral Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Very common. L4-L5 disc herniation (most common lumbar herniation level). Adults 30-50.',
            chiefComplaint: 'Foot drop or great toe weakness with lateral leg and dorsal foot numbness',
            hpiKeyFeatures: [
                'Low back pain radiating down posterolateral leg to dorsum of foot and great toe',
                'Foot slapping or difficulty lifting foot (foot drop in severe cases)',
                'Great toe weakness (often earliest motor finding)',
                'Numbness over lateral leg and top of foot',
                'L4-L5 disc is the most commonly herniated lumbar disc'
            ],
            associatedSymptoms: ['Low back pain', 'Sciatica', 'Difficulty walking on heels', 'Tripping/catching toes'],
            redFlags: ['Bilateral foot drop (cauda equina)', 'Bowel/bladder dysfunction', 'Saddle anesthesia', 'Progressive weakness'],
            commonMisdiagnoses: ['Common fibular (peroneal) neuropathy at fibular head', 'Sciatic neuropathy', 'Lumbosacral plexopathy']
        },
        physicalExam: {
            inspection: [
                'Tibialis anterior atrophy (anterior compartment)',
                'EHL wasting visible on dorsum of foot',
                'Peroneal atrophy (lateral compartment)',
                'Gluteal atrophy may be present',
                'Foot drop in severe cases',
                'Antalgic gait, possible steppage gait'
            ],
            palpation: [
                'Lumbar paraspinal tenderness at L4-L5 level',
                'Sciatic notch tenderness may be present',
                'Paraspinal muscle spasm'
            ],
            rom: [
                'Lumbar flexion may be limited and painful',
                'Lumbar extension may reproduce radicular symptoms',
                'Active ankle dorsiflexion limited by weakness'
            ],
            strength: [
                { muscle: 'Tibialis anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Extensor hallucis longus', nerve: 'Deep peroneal', root: 'L5', action: 'Great toe extension', expectedFinding: 'WEAK (very sensitive for L5)', mrcGrade: '3/5 to 4/5' },
                { muscle: 'Extensor digitorum longus', nerve: 'Deep peroneal', root: 'L5', action: 'Toe extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis posterior', nerve: 'Tibial', root: 'L4-L5', action: 'Ankle inversion', expectedFinding: 'WEAK (KEY: NORMAL in fibular neuropathy)', mrcGrade: '4/5' },
                { muscle: 'Peroneus longus/brevis', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Gluteus medius', nerve: 'Superior gluteal', root: 'L4-S1', action: 'Hip abduction', expectedFinding: 'WEAK (KEY: NORMAL in fibular neuropathy)', mrcGrade: '4/5' },
                { muscle: 'Tensor fasciae latae', nerve: 'Superior gluteal', root: 'L4-S1', action: 'Hip flexion/abduction/IR', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Hamstrings (medial)', nerve: 'Sciatic (tibial division)', root: 'L5-S1', action: 'Knee flexion', expectedFinding: 'May be WEAK', mrcGrade: '4+/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius/soleus', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral leg, dorsum of foot, great toe (web space between 1st-2nd toes)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Broader than fibular nerve territory (includes posterolateral calf area)', modality: 'Light touch', expectedFinding: 'May be decreased' }
            ],
            reflexes: [
                { reflex: 'Medial hamstring reflex (L5)', expectedFinding: 'DIMINISHED (difficult to elicit but useful when present)' },
                { reflex: 'Patellar reflex (L2-L4)', expectedFinding: 'Normal' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal (if diminished, consider L5-S1 combined or S1 involvement)' }
            ],
            specialTests: [
                { name: 'Straight Leg Raise (Lasegue)', technique: 'Raise extended leg passively — positive if radicular pain below knee at <60 degrees', positiveFinding: 'Leg pain reproduced (most sensitive for L5 and S1)', sensitivity: '80-97%', specificity: '10-40%' },
                { name: 'Crossed Straight Leg Raise', technique: 'Raise CONTRALATERAL leg — positive if reproduces ipsilateral symptoms', positiveFinding: 'Ipsilateral radicular pain (high specificity for disc herniation)', sensitivity: '25-30%', specificity: '88-98%' },
                { name: 'Slump Test', technique: 'Seated trunk flexion with knee extension and ankle dorsiflexion', positiveFinding: 'Reproduces radicular symptoms' },
                { name: 'Trendelenburg Sign', technique: 'Single-leg stance on affected side', positiveFinding: 'Pelvis drops on CONTRALATERAL side (weak gluteus medius)' },
                { name: 'Heel Walk Test', technique: 'Walk on heels', positiveFinding: 'Inability or difficulty (tibialis anterior weakness)' },
                { name: 'Great Toe Extension Against Resistance', technique: 'Resist great toe extension (EHL)', positiveFinding: 'Weakness (very sensitive for L5 — often earliest motor finding)' }
            ]
        },
        keyDistinguishingFindings: [
            'Weakness across MULTIPLE peripheral nerves (deep peroneal + tibial + superficial peroneal + superior gluteal) = myotomal pattern = ROOT level',
            'KEY vs fibular neuropathy: Tibialis posterior (inversion) WEAK in L5, NORMAL in fibular neuropathy',
            'KEY vs fibular neuropathy: Gluteus medius (hip abduction) WEAK in L5, NORMAL in fibular neuropathy',
            'Back pain and radicular pattern present in radiculopathy, absent in fibular neuropathy',
            'Broader sensory territory than fibular nerve alone',
            'Paraspinal EMG abnormalities in radiculopathy (absent in fibular neuropathy)',
            'Great toe extension (EHL) weakness is often the earliest and most sensitive motor finding'
        ]
    },

    s1_radiculopathy: {
        id: 's1_radiculopathy',
        name: 'S1 Radiculopathy',
        category: 'Lumbosacral Radiculopathy',
        isInappropriate: false,
        history: {
            demographics: 'Very common. L5-S1 disc herniation. Adults 30-50 years.',
            chiefComplaint: 'Calf and posterior leg pain with ankle plantarflexion weakness and absent ankle jerk',
            hpiKeyFeatures: [
                'Low back pain radiating down posterior leg to lateral foot and sole',
                'Calf pain and weakness',
                'Difficulty with toe walking and pushing off during gait',
                'Numbness on lateral foot and sole',
                'L5-S1 disc herniation',
                'Absent ankle jerk is often the most reliable early finding'
            ],
            associatedSymptoms: ['Low back pain', 'Sciatica', 'Calf cramping', 'Difficulty running or climbing stairs'],
            redFlags: ['Bilateral ankle jerk loss (cauda equina)', 'Bowel/bladder dysfunction', 'Saddle anesthesia', 'Progressive weakness'],
            commonMisdiagnoses: ['Achilles tendinopathy', 'Plantar fasciitis', 'Tibial neuropathy', 'Peripheral neuropathy']
        },
        physicalExam: {
            inspection: [
                'Gastrocnemius/soleus atrophy (calf wasting — compare sides)',
                'Gluteus maximus atrophy (flattened buttock)',
                'Difficulty with single-leg heel raise',
                'Antalgic gait'
            ],
            palpation: [
                'Lumbar paraspinal tenderness at L5-S1 level',
                'Sciatic notch tenderness',
                'Calf tenderness/tightness'
            ],
            rom: [
                'Lumbar flexion limited and painful',
                'Lumbar extension may worsen symptoms',
                'Difficulty with deep squatting (plantarflexion + hip extension weakness)'
            ],
            strength: [
                { muscle: 'Gastrocnemius/soleus', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'WEAK (test with single-leg heel raise x10)', mrcGrade: '4/5' },
                { muscle: 'Gluteus maximus', nerve: 'Inferior gluteal', root: 'L5-S2', action: 'Hip extension', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Hamstrings (biceps femoris long head)', nerve: 'Sciatic (tibial division)', root: 'L5-S2', action: 'Knee flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Peroneus longus/brevis', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'WEAK (S1 contribution)', mrcGrade: '4+/5' },
                { muscle: 'Flexor digitorum longus', nerve: 'Tibial', root: 'S1-S2', action: 'Toe DIP flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Flexor hallucis longus', nerve: 'Tibial', root: 'S1-S2', action: 'Great toe IP flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Abductor hallucis', nerve: 'Medial plantar', root: 'S1-S2', action: 'Great toe abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Abductor digiti minimi pedis', nerve: 'Lateral plantar', root: 'S1-S2', action: 'Small toe abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gluteus medius', nerve: 'Superior gluteal', root: 'L4-S1', action: 'Hip abduction', expectedFinding: 'NORMAL (L5 predominant)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Posterior calf, lateral foot, sole of foot, small toe (S1 dermatome)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Lateral malleolus area', modality: 'Light touch', expectedFinding: 'Decreased' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk / Achilles reflex (S1-S2)', expectedFinding: 'DIMINISHED or ABSENT (KEY reflex — most reliable finding in S1 radiculopathy)' },
                { reflex: 'Patellar reflex (L2-L4)', expectedFinding: 'Normal' },
                { reflex: 'Medial hamstring reflex (L5)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Straight Leg Raise (Lasegue)', technique: 'Raise extended leg — positive if radicular pain below knee at <60 degrees', positiveFinding: 'Leg pain reproduced (most common level for positive SLR)', sensitivity: '80-97%', specificity: '10-40%' },
                { name: 'Crossed Straight Leg Raise', technique: 'Raise contralateral leg', positiveFinding: 'Ipsilateral radicular pain (high specificity for disc herniation)' },
                { name: 'Slump Test', technique: 'Seated trunk flexion with knee extension', positiveFinding: 'Reproduces radicular symptoms' },
                { name: 'Single-Leg Heel Raise Test', technique: 'Stand on one leg and perform 10 consecutive heel raises', positiveFinding: 'Cannot complete 10 repetitions on affected side (sensitive for subtle gastroc weakness)' },
                { name: 'Toe Walk Test', technique: 'Walk on tiptoes', positiveFinding: 'Weakness on affected side, difficulty maintaining toe-walk' }
            ]
        },
        keyDistinguishingFindings: [
            'Ankle jerk (Achilles reflex) diminished/absent is the MOST RELIABLE clinical finding',
            'Single-leg heel raise is the most sensitive test for subtle gastrocnemius weakness (should do 10+ reps)',
            'Ankle plantarflexion + hip extension + knee flexion weakness pattern',
            'H-reflex prolonged or absent on electrodiagnostic testing (electrophysiologic equivalent of ankle jerk)',
            'Distinguish from tibial neuropathy at ankle: S1 has gastrocnemius weakness and ankle jerk loss; tarsal tunnel does NOT',
            'Distinguish from L5: S1 has ankle jerk loss and plantarflexion weakness; L5 has dorsiflexion weakness and normal ankle jerk'
        ]
    }
};
