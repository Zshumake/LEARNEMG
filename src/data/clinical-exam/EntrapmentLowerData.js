export const entrapmentLowerData = {

    fibular_neuropathy: {
        id: 'fibular_neuropathy',
        name: 'Common Fibular (Peroneal) Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Habitual leg crossers, recent weight loss, prolonged bed rest/surgery, knee surgery, casts/braces, thin body habitus',
            chiefComplaint: 'Foot drop and numbness over the dorsum of the foot',
            hpiKeyFeatures: [
                'Acute or subacute onset of foot drop (tripping, slapping gait)',
                'Numbness over dorsum of foot and lateral lower leg',
                'History of leg crossing, prolonged squatting, weight loss, or recent surgery with positioning',
                'May follow knee surgery, cast application, or tight leg brace',
                'Compression at fibular head is by far the most common site'
            ],
            associatedSymptoms: ['Tripping on toes', 'Steppage gait', 'Lateral leg numbness', 'Ankle instability'],
            redFlags: ['Bilateral foot drop (consider L5 radiculopathy, motor neuron disease, or CIDP)', 'Progressive without clear precipitant (consider mass lesion)'],
            commonMisdiagnoses: ['L5 radiculopathy (most common confusion)', 'Sciatic neuropathy', 'Lumbosacral plexopathy', 'ALS (if bilateral)']
        },
        physicalExam: {
            inspection: [
                'Foot drop posture — foot plantarflexed and inverted at rest',
                'Steppage gait — high knee lift to clear foot',
                'Tibialis anterior and peroneal muscle atrophy (lateral compartment)',
                'EHL (extensor hallucis longus) visible weakness with great toe extension'
            ],
            palpation: [
                'Tinel sign at fibular head (tap over common peroneal nerve at fibular neck)',
                'Palpate for mass or ganglion at fibular head region',
                'Check for tight cast, brace, or compression source'
            ],
            rom: [
                'Full passive ankle dorsiflexion (rules out Achilles contracture)',
                'Limited active dorsiflexion and eversion'
            ],
            strength: [
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Extensor Hallucis Longus', nerve: 'Deep peroneal', root: 'L5', action: 'Great toe extension', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Extensor Digitorum Longus', nerve: 'Deep peroneal', root: 'L5', action: 'Toe extension', expectedFinding: 'WEAK', mrcGrade: '0-3/5' },
                { muscle: 'Peroneus Longus/Brevis', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'WEAK', mrcGrade: '2-4/5' },
                { muscle: 'Tibialis Posterior', nerve: 'Tibial', root: 'L4-L5', action: 'Ankle inversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius/Soleus', nerve: 'Tibial', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gluteus Medius', nerve: 'Superior gluteal', root: 'L5', action: 'Hip abduction', expectedFinding: 'NORMAL (KEY — weak in L5 radiculopathy)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Dorsum of foot (superficial peroneal territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'First web space (deep peroneal territory)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Lateral lower leg', modality: 'Light touch', expectedFinding: 'Decreased (lateral cutaneous nerve of calf)' },
                { area: 'Sole of foot (tibial territory)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal (tibial nerve — not affected)' }
            ],
            specialTests: [
                { name: 'Tinel at Fibular Head', technique: 'Tap over common peroneal nerve at fibular neck', positiveFinding: 'Tingling radiating to dorsal foot', sensitivity: '60-70%' },
                { name: 'Tibialis Posterior Test', technique: 'Test ankle inversion strength', positiveFinding: 'NORMAL inversion = peroneal neuropathy; WEAK inversion = L5 radiculopathy or sciatic neuropathy', sensitivity: '85%' },
                { name: 'Hip Abduction Test', technique: 'Test gluteus medius strength (side-lying hip abduction)', positiveFinding: 'NORMAL hip abduction = peroneal neuropathy; WEAK = L5 radiculopathy' }
            ]
        },
        keyDistinguishingFindings: [
            'NORMAL tibialis posterior (ankle inversion) is THE key finding — L5 radiculopathy would weaken this tibial-innervated L5 muscle',
            'NORMAL gluteus medius (hip abduction) — L5 radiculopathy would weaken this superior gluteal L5 muscle',
            'Tinel at fibular head localizes to compression site',
            'Both deep AND superficial peroneal territories affected (dorsiflexion + eversion + dorsal foot numbness)',
            'EMG: Conduction block or slowing across fibular head; denervation in peroneal-innervated muscles only; NORMAL tibialis posterior and paraspinals'
        ]
    },

    deep_peroneal_ankle: {
        id: 'deep_peroneal_ankle',
        name: 'Deep Peroneal Neuropathy at Ankle (Anterior Tarsal Tunnel)',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Tight shoes, high heels, soccer players (repetitive dorsiflexion), ski boots, osteophytes at ankle',
            chiefComplaint: 'Numbness in the first web space of the foot and/or EHL weakness',
            hpiKeyFeatures: [
                'Numbness confined to first web space (between great toe and second toe)',
                'May have EDB (extensor digitorum brevis) weakness',
                'History of tight footwear, ski boots, or repetitive ankle dorsiflexion',
                'Osteophytes or ganglion at anterior ankle can compress nerve',
                'Much more focal than common peroneal neuropathy'
            ],
            associatedSymptoms: ['First web space burning', 'Pain worse with tight shoes', 'Tripping less common than with proximal lesion'],
            redFlags: ['Progressive weakness beyond EDB (suggests more proximal lesion)'],
            commonMisdiagnoses: ['Common peroneal neuropathy', 'L5 radiculopathy', "Morton's neuroma"]
        },
        physicalExam: {
            inspection: [
                'EDB atrophy on dorsum of foot (subtle — compare sides)',
                'Look for tight shoe wear pattern, osteophytes at ankle'
            ],
            palpation: [
                'Tinel sign at anterior ankle (beneath extensor retinaculum)',
                'Palpate for osteophytes or mass at ankle'
            ],
            rom: ['Full ankle ROM unless blocked by osteophyte'],
            strength: [
                { muscle: 'Extensor Digitorum Brevis (EDB)', nerve: 'Deep peroneal', root: 'L5-S1', action: 'Toe extension at MTP', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL (innervated proximal to ankle)', mrcGrade: '5/5' },
                { muscle: 'Extensor Hallucis Longus', nerve: 'Deep peroneal', root: 'L5', action: 'Great toe extension', expectedFinding: 'NORMAL (innervated proximal to ankle)', mrcGrade: '5/5' },
                { muscle: 'Peroneus Longus/Brevis', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'First web space (between great and second toe)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Dorsum of foot (superficial peroneal)', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Sole of foot', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel at Anterior Ankle', technique: 'Tap over deep peroneal nerve at anterior ankle under extensor retinaculum', positiveFinding: 'Tingling in first web space' },
                { name: 'EDB Bulk Comparison', technique: 'Compare EDB muscle bulk on both feet (dorsolateral foot)', positiveFinding: 'Asymmetric atrophy of EDB on affected side' }
            ]
        },
        keyDistinguishingFindings: [
            'Very focal: first web space numbness + EDB weakness ONLY',
            'Normal tibialis anterior and EHL distinguishes from common peroneal neuropathy at fibular head',
            'Normal dorsal foot sensation (superficial peroneal territory) distinguishes from proximal lesion',
            'Think of tight footwear as the most common etiology',
            'EMG: Denervation limited to EDB; normal tibialis anterior and peronei'
        ]
    },

    tarsal_tunnel: {
        id: 'tarsal_tunnel',
        name: 'Tarsal Tunnel Syndrome',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Flat feet (pes planus), post-ankle fracture, space-occupying lesion (ganglion, varicosities), RA, diabetes',
            chiefComplaint: 'Burning pain and numbness on the sole of the foot, worse at night or after standing',
            hpiKeyFeatures: [
                'Burning, tingling, or numbness on plantar surface of foot',
                'Worsened by prolonged standing, walking, or at night',
                'Pain radiates from behind medial malleolus to sole of foot',
                'May have Tinel sign behind medial malleolus',
                'Pes planus (flat feet) increases traction on tibial nerve'
            ],
            associatedSymptoms: ['Burning sole pain', 'Night pain', 'Difficulty walking on uneven surfaces', 'Medial ankle swelling'],
            redFlags: ['Bilateral (consider polyneuropathy)', 'Progressive weakness (consider more proximal lesion)'],
            commonMisdiagnoses: ['Plantar fasciitis', 'Peripheral polyneuropathy', 'S1 radiculopathy', "Morton's neuroma", "Baxter's neuropathy"]
        },
        physicalExam: {
            inspection: [
                'Pes planus (flat feet) — increases nerve traction',
                'Medial ankle swelling (if space-occupying lesion)',
                'Intrinsic foot muscle atrophy (difficult to assess)'
            ],
            palpation: [
                'Tinel sign posterior/inferior to medial malleolus',
                'Palpate for varicosities or mass in tarsal tunnel',
                'Tenderness along tarsal tunnel (flexor retinaculum)'
            ],
            rom: [
                'Ankle ROM typically normal',
                'Eversion or dorsiflexion may reproduce symptoms (stretches nerve)'
            ],
            strength: [
                { muscle: 'Abductor Hallucis', nerve: 'Medial plantar (Tibial)', root: 'S1-S2', action: 'Great toe abduction', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Intrinsic foot muscles', nerve: 'Lateral plantar (Tibial)', root: 'S1-S2', action: 'Toe flexion/spreading', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis Posterior', nerve: 'Tibial (proximal)', root: 'L4-L5', action: 'Ankle inversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius/Soleus', nerve: 'Tibial (proximal)', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Sole of foot (medial and lateral plantar distributions)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Medial heel (calcaneal branch)', modality: 'Light touch', expectedFinding: 'May be decreased' },
                { area: 'Dorsum of foot', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal (S1 reflex arc is proximal to tarsal tunnel)' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel Sign at Tarsal Tunnel', technique: 'Tap over posterior tibial nerve behind and below medial malleolus', positiveFinding: 'Tingling/burning radiating to sole of foot', sensitivity: '58%', specificity: '93%' },
                { name: 'Dorsiflexion-Eversion Test', technique: 'Maximally dorsiflex and evert ankle, hold 30 seconds', positiveFinding: 'Reproduction of plantar symptoms', sensitivity: '82%', specificity: '80%' },
                { name: 'Tourniquet Test', technique: 'Apply BP cuff above ankle, inflate above systolic for 60 seconds', positiveFinding: 'Reproduction of plantar paresthesias' }
            ]
        },
        keyDistinguishingFindings: [
            'Plantar (sole) sensory loss with NORMAL dorsal foot sensation',
            'Tinel behind medial malleolus localizes to tarsal tunnel',
            'Normal ankle jerk (reflex arc is proximal to tarsal tunnel compression)',
            'Normal tibialis posterior and gastrocnemius (innervated proximal to tunnel)',
            'EMG: Prolonged distal motor latency to abductor hallucis; may show denervation in intrinsic foot muscles'
        ]
    },

    femoral_neuropathy: {
        id: 'femoral_neuropathy',
        name: 'Femoral Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Diabetes (most common), retroperitoneal hematoma (anticoagulation), pelvic surgery, hip arthroplasty, psoas abscess, lithotomy positioning',
            chiefComplaint: 'Anterior thigh pain, knee buckling (quadriceps weakness), and numbness over anterior thigh/medial leg',
            hpiKeyFeatures: [
                'Sudden onset anterior thigh pain (retroperitoneal hematoma) or gradual onset (diabetic)',
                'Knee buckling and falls — inability to lock knee in extension',
                'Difficulty climbing stairs and rising from chair',
                'Numbness over anterior thigh and medial lower leg (saphenous distribution)',
                'History of anticoagulation, diabetes, or recent pelvic/hip surgery'
            ],
            associatedSymptoms: ['Falls from knee giving way', 'Difficulty with stairs', 'Anterior thigh burning', 'Groin pain'],
            redFlags: ['Acute onset on anticoagulation (retroperitoneal hematoma — surgical emergency)', 'Fever with psoas sign (psoas abscess)', 'Progressive weakness in other distributions'],
            commonMisdiagnoses: ['L3-L4 radiculopathy', 'Lumbar plexopathy', 'Diabetic amyotrophy', 'Hip joint pathology']
        },
        physicalExam: {
            inspection: [
                'Quadriceps atrophy (often dramatic)',
                'Knee held in slight flexion when standing',
                'Unable to lock knee in full extension when walking'
            ],
            palpation: [
                'Inguinal region tenderness (if compression at inguinal ligament)',
                'Check for groin or pelvic mass'
            ],
            rom: [
                'Hip flexion may be weak and painful',
                'Passive knee ROM typically normal'
            ],
            strength: [
                { muscle: 'Quadriceps (Rectus Femoris, Vastus group)', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral + L1-L3 direct branches', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'May be WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Sartorius', nerve: 'Femoral', root: 'L2-L3', action: 'Hip flexion + knee flexion + external rotation', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Hip adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hamstrings', nerve: 'Sciatic (tibial division)', root: 'L5-S1', action: 'Knee flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Anterior thigh (anterior femoral cutaneous nerve)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Medial lower leg to medial ankle (saphenous nerve)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Lateral thigh (lateral femoral cutaneous — different nerve)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Reverse SLR (Femoral Nerve Stretch)', technique: 'Patient prone; extend hip with knee flexed', positiveFinding: 'Anterior thigh pain (stretches femoral nerve)', sensitivity: '84%', specificity: '95%' },
                { name: 'Single Leg Stance Test', technique: 'Stand on affected leg', positiveFinding: 'Knee buckles (quadriceps cannot stabilize knee)' },
                { name: 'Stair Climbing Test', technique: 'Walk up stairs', positiveFinding: 'Unable to push off or knee gives way ascending stairs' }
            ]
        },
        keyDistinguishingFindings: [
            'Quadriceps weakness + absent knee jerk + anterior thigh/saphenous numbness = femoral neuropathy',
            'Normal hip adductors (obturator nerve) distinguishes from lumbar plexopathy',
            'Normal hamstrings and ankle function distinguishes from L3-L4 radiculopathy (which would also affect other L3-L4 muscles)',
            'In anticoagulated patients with acute onset: CT scan to rule out retroperitoneal hematoma is URGENT',
            'EMG: Denervation in quadriceps with sparing of adductors and tibialis anterior; absent H-reflex may be seen'
        ]
    },

    obturator_neuropathy: {
        id: 'obturator_neuropathy',
        name: 'Obturator Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Pelvic surgery (hip replacement, obturator hernia repair), pelvic fracture, pregnancy/labor, athletes (sports hernia)',
            chiefComplaint: 'Medial thigh pain and weakness of hip adduction',
            hpiKeyFeatures: [
                'Medial thigh pain worsened by hip adduction',
                'Difficulty with walking (adductor weakness destabilizes stance phase)',
                'History of pelvic surgery, hip replacement, or pelvic trauma',
                'Athletes: exercise-related medial thigh pain (adductor strain mimic)',
                'Rare in isolation — often part of lumbar plexus involvement'
            ],
            associatedSymptoms: ['Groin pain', 'Medial thigh sensory changes', 'Gait instability'],
            redFlags: ['Pelvic mass (consider obturator hernia or tumor)', 'Progressive weakness beyond adductors'],
            commonMisdiagnoses: ['Adductor strain', 'L3-L4 radiculopathy', 'Sports hernia', 'Hip joint pathology']
        },
        physicalExam: {
            inspection: [
                'Adductor muscle atrophy (chronic cases)',
                'Widened base gait (compensation for adductor weakness)'
            ],
            palpation: [
                'Tenderness in obturator foramen region (deep pelvic — difficult to palpate)',
                'Medial thigh muscle tenderness'
            ],
            rom: ['Full passive hip ROM', 'Active hip adduction limited by weakness'],
            strength: [
                { muscle: 'Adductor Longus', nerve: 'Obturator (anterior division)', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Adductor Magnus (partial)', nerve: 'Obturator (posterior division)', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Gracilis', nerve: 'Obturator', root: 'L2-L3', action: 'Hip adduction + knee flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial thigh (obturator nerve cutaneous branch)', modality: 'Light touch', expectedFinding: 'Decreased (small and variable territory)' },
                { area: 'Anterior thigh (femoral territory)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Resisted Hip Adduction', technique: 'Patient squeezes legs together against resistance', positiveFinding: 'Weakness and/or pain', sensitivity: '85%' },
                { name: 'Howship-Romberg Sign', technique: 'Medial thigh pain worsened by hip extension, abduction, and internal rotation', positiveFinding: 'Classic sign of obturator hernia compressing nerve' }
            ]
        },
        keyDistinguishingFindings: [
            'Isolated hip adductor weakness with normal quadriceps and iliopsoas',
            'Normal knee jerk distinguishes from femoral neuropathy and L3-L4 radiculopathy',
            'Small and variable sensory territory on medial thigh',
            'Howship-Romberg sign suggests obturator hernia as cause',
            'EMG: Denervation in adductors only; normal quadriceps and iliopsoas'
        ]
    },

    meralgia_paresthetica: {
        id: 'meralgia_paresthetica',
        name: 'Meralgia Paresthetica',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Obesity, pregnancy, tight belts/pants, diabetes, police officers (duty belt), construction workers (tool belts)',
            chiefComplaint: 'Burning pain and numbness over the lateral thigh',
            hpiKeyFeatures: [
                'Burning, tingling, or numbness over lateral thigh (anterolateral)',
                'NO motor weakness (purely sensory nerve)',
                'Worsened by standing, walking, hip extension; relieved by sitting',
                'History of weight gain, tight clothing, or belt compression at ASIS',
                'Lateral femoral cutaneous nerve compressed at or near the inguinal ligament'
            ],
            associatedSymptoms: ['Lateral thigh burning', 'Hypersensitivity to touch/clothing', 'Pain with prolonged standing'],
            redFlags: ['Motor weakness (excludes meralgia paresthetica — consider L2-L3 radiculopathy or femoral neuropathy)', 'Bilateral in young patient (consider systemic neuropathy)'],
            commonMisdiagnoses: ['L2-L3 radiculopathy', 'Hip joint pathology', 'Trochanteric bursitis', 'Femoral neuropathy']
        },
        physicalExam: {
            inspection: [
                'No muscle atrophy (purely sensory nerve)',
                'Observe for tight belt, duty belt, or tight waistband',
                'Abdominal obesity increasing inguinal ligament tension'
            ],
            palpation: [
                'Tenderness or Tinel sign at ASIS / inguinal ligament',
                'Pelvic compression test may reproduce symptoms'
            ],
            rom: ['Full hip ROM', 'Hip extension may worsen symptoms (stretches nerve)'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hip adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Anterolateral thigh (lateral femoral cutaneous nerve territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased, hyperesthetic, or allodynic' },
                { area: 'Anterior thigh (femoral territory)', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Medial thigh (obturator territory)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Pelvic Compression Test', technique: 'Patient side-lying; apply downward pressure on pelvis for 45 seconds', positiveFinding: 'Relief of lateral thigh symptoms (reduces inguinal ligament tension)', sensitivity: '95%', specificity: '93%' },
                { name: 'Tinel at ASIS', technique: 'Tap over lateral femoral cutaneous nerve near ASIS', positiveFinding: 'Reproduction of lateral thigh paresthesias' },
                { name: 'Hip Extension Stretch', technique: 'Prone hip extension', positiveFinding: 'Worsening of lateral thigh symptoms' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely sensory — absolutely NO motor weakness. Any weakness points to a different diagnosis',
            'Anterolateral thigh distribution is very specific — NOT anterior (femoral) or medial (obturator)',
            'Normal knee jerk, normal quadriceps, normal hip flexors',
            'Pelvic compression test with high sensitivity/specificity is a key bedside test',
            'EMG/NCS: Motor studies normal; lateral femoral cutaneous SNAP may be technically difficult — diagnosis is primarily clinical'
        ]
    },

    piriformis_sciatic: {
        id: 'piriformis_sciatic',
        name: 'Piriformis Syndrome / Sciatic Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Direct buttock trauma, prolonged sitting on hard surface, runners, anatomic variant (nerve through piriformis muscle)',
            chiefComplaint: 'Deep buttock pain radiating down the posterior thigh with foot weakness',
            hpiKeyFeatures: [
                'Deep buttock pain radiating posteriorly down the leg',
                'Sciatic nerve involvement can cause weakness in hamstrings, ankle, and foot muscles',
                'Worsened by prolonged sitting, driving, or hip internal rotation',
                'May follow injection injury, hip surgery, or direct trauma',
                'Piriformis-specific: pain with forced internal rotation of hip'
            ],
            associatedSymptoms: ['Posterior thigh pain', 'Numbness below the knee', 'Difficulty sitting', 'Foot drop in severe cases'],
            redFlags: ['Bilateral sciatica (consider cauda equina syndrome)', 'Bowel/bladder dysfunction', 'Progressive weakness'],
            commonMisdiagnoses: ['Lumbar radiculopathy (L4-S1)', 'Lumbosacral plexopathy', 'Hip joint pathology', 'Trochanteric bursitis']
        },
        physicalExam: {
            inspection: [
                'Buttock muscle atrophy (chronic cases)',
                'Foot drop if severe (sciatic neuropathy)',
                'Antalgic gait'
            ],
            palpation: [
                'Deep tenderness over piriformis muscle (midpoint between PSIS and greater trochanter)',
                'Sciatic notch tenderness',
                'Trigger point in piriformis reproduces leg symptoms'
            ],
            rom: [
                'Hip internal rotation may be limited and painful',
                'Straight leg raise may be positive'
            ],
            strength: [
                { muscle: 'Hamstrings (Biceps Femoris, Semimembranosus)', nerve: 'Sciatic (tibial division)', root: 'L5-S2', action: 'Knee flexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal (via sciatic)', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK (if peroneal division affected)', mrcGrade: '3-4/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial (via sciatic)', root: 'S1-S2', action: 'Ankle plantarflexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Peronei', nerve: 'Superficial peroneal (via sciatic)', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Gluteus Medius', nerve: 'Superior gluteal', root: 'L5', action: 'Hip abduction', expectedFinding: 'NORMAL (branches off BEFORE piriformis)', mrcGrade: '5/5' },
                { muscle: 'Gluteus Maximus', nerve: 'Inferior gluteal', root: 'L5-S2', action: 'Hip extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral lower leg and dorsum of foot (peroneal)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Sole of foot (tibial)', modality: 'Light touch', expectedFinding: 'May be decreased' },
                { area: 'Posterior thigh', modality: 'Light touch', expectedFinding: 'May be decreased (posterior femoral cutaneous)' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'DIMINISHED (if tibial division involved)' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal (femoral nerve — not sciatic)' }
            ],
            specialTests: [
                { name: 'FAIR Test (Flexion, Adduction, Internal Rotation)', technique: 'Hip flexed 60°, adducted, internally rotated', positiveFinding: 'Reproduction of sciatic symptoms (stretches piriformis over sciatic nerve)', sensitivity: '88%', specificity: '83%' },
                { name: 'Pace Sign', technique: 'Resisted hip abduction and external rotation while seated', positiveFinding: 'Buttock pain and sciatica (piriformis contraction compresses nerve)' },
                { name: 'Seated Piriformis Stretch Test', technique: 'Patient seated; cross affected leg over opposite knee; lean forward', positiveFinding: 'Deep buttock pain with radiation' },
                { name: 'Beatty Test', technique: 'Side-lying; abduct thigh against gravity with knee flexed', positiveFinding: 'Deep buttock pain (piriformis contraction)' }
            ]
        },
        keyDistinguishingFindings: [
            'NORMAL gluteus medius and gluteus maximus distinguishes from lumbosacral plexopathy',
            'Normal paraspinal EMG distinguishes from L5/S1 radiculopathy',
            'Both peroneal AND tibial divisions can be affected (unlike isolated peroneal neuropathy at fibular head)',
            'Peroneal division is more vulnerable — foot drop may occur without significant plantarflexion weakness',
            'FAIR test is most reliable bedside test for piriformis syndrome'
        ]
    },

    baxters: {
        id: 'baxters',
        name: "Baxter's Neuropathy",
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Runners, athletes, plantar fasciitis patients, calcaneal spur, heel pad atrophy',
            chiefComplaint: 'Medial heel pain mimicking plantar fasciitis, often refractory to standard treatment',
            hpiKeyFeatures: [
                'Medial heel pain that may mimic plantar fasciitis',
                'Pain at medial calcaneal tuberosity — may have burning quality',
                'Refractory to standard plantar fasciitis treatment',
                'First branch of lateral plantar nerve (inferior calcaneal nerve) compressed between abductor hallucis and quadratus plantae',
                'Atrophy of abductor digiti quinti (lateral foot) if chronic'
            ],
            associatedSymptoms: ['Burning heel pain', 'Lateral foot weakness', 'Pain with first steps in morning (like plantar fasciitis)'],
            redFlags: ['Progressive foot weakness (consider more proximal lesion)', 'Bilateral (consider systemic neuropathy)'],
            commonMisdiagnoses: ['Plantar fasciitis (most common confusion)', 'Tarsal tunnel syndrome', 'Calcaneal stress fracture', 'Fat pad atrophy']
        },
        physicalExam: {
            inspection: [
                'Abductor digiti quinti atrophy on lateral plantar foot (compare sides)',
                'May have heel pad thinning'
            ],
            palpation: [
                'Tenderness at medial calcaneal tuberosity (like plantar fasciitis)',
                'Tenderness may extend more medially toward abductor hallucis origin',
                'Tinel sign at medial heel'
            ],
            rom: ['Full ankle ROM', 'Toe ROM normal'],
            strength: [
                { muscle: 'Abductor Digiti Quinti (Minimi)', nerve: 'First branch lateral plantar (Baxter nerve)', root: 'S1-S2', action: 'Small toe abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Abductor Hallucis', nerve: 'Medial plantar', root: 'S1-S2', action: 'Great toe abduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Posterior', nerve: 'Tibial', root: 'L4-L5', action: 'Ankle inversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial plantar heel (small area)', modality: 'Light touch', expectedFinding: 'May have subtle decreased sensation' },
                { area: 'Sole of foot (plantar nerves)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'ADQ Atrophy Comparison', technique: 'Compare abductor digiti quinti bulk on both feet (lateral plantar surface)', positiveFinding: 'Asymmetric atrophy on affected side' },
                { name: 'Tinel at Medial Heel', technique: 'Tap at medial calcaneal tuberosity', positiveFinding: 'Burning/tingling over plantar heel' }
            ]
        },
        keyDistinguishingFindings: [
            'ADQ atrophy on lateral foot is pathognomonic for Baxter neuropathy',
            'Distinguishes from plantar fasciitis by: burning quality, Tinel sign, ADQ atrophy, refractory to stretching/orthotics',
            'More focal than tarsal tunnel syndrome (which affects entire plantar surface)',
            'EMG: Denervation limited to ADQ; normal abductor hallucis distinguishes from tarsal tunnel',
            'MRI may show ADQ fatty atrophy and signal changes in abductor hallucis fascia'
        ]
    },

    saphenous: {
        id: 'saphenous',
        name: 'Saphenous Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Post-knee surgery (arthroscopy, TKA, saphenous vein harvesting), Hunter canal entrapment, direct trauma',
            chiefComplaint: 'Numbness and pain over the medial knee, lower leg, and medial ankle',
            hpiKeyFeatures: [
                'Medial knee and lower leg numbness/pain',
                'Purely sensory — NO motor weakness',
                'May follow knee surgery (arthroscopy, TKA, vein graft harvesting)',
                'Hunter canal (adductor canal) entrapment: medial thigh pain with exercise',
                'Infrapatellar branch commonly injured in knee surgery'
            ],
            associatedSymptoms: ['Medial knee numbness', 'Pain with knee movement', 'Burning over medial lower leg'],
            redFlags: ['Motor weakness (suggests femoral neuropathy, not saphenous)', 'Loss of knee jerk (suggests femoral neuropathy)'],
            commonMisdiagnoses: ['Medial meniscus pathology', 'L4 radiculopathy', 'Femoral neuropathy', 'Pes anserine bursitis']
        },
        physicalExam: {
            inspection: ['No muscle atrophy (purely sensory nerve)'],
            palpation: [
                'Tinel sign at Hunter canal (medial thigh, adductor hiatus)',
                'Tinel at infrapatellar branch (medial knee)',
                'No joint effusion or meniscal signs'
            ],
            rom: ['Full knee and ankle ROM'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hip adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Medial lower leg and medial ankle (saphenous nerve)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Infrapatellar region (medial knee — infrapatellar branch)', modality: 'Light touch', expectedFinding: 'Decreased' },
                { area: 'Anterior thigh', modality: 'Light touch', expectedFinding: 'Normal (femoral territory — proximal to saphenous)' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel at Adductor Canal', technique: 'Tap over adductor canal at medial mid-thigh', positiveFinding: 'Paresthesias radiating to medial leg', sensitivity: '50-60%' },
                { name: 'Saphenous Nerve Stretch', technique: 'Knee extended, hip externally rotated and adducted', positiveFinding: 'Medial leg paresthesias' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely sensory — normal quadriceps and normal knee jerk distinguishes from femoral neuropathy',
            'Saphenous is the terminal sensory branch of the femoral nerve',
            'Medial lower leg and ankle distribution (NOT anterior thigh — which is femoral)',
            'Infrapatellar branch injury extremely common after knee surgery (up to 70% post-TKA)',
            'EMG: Motor studies normal; saphenous SNAP may be technically difficult; diagnosis often clinical'
        ]
    },

    sural: {
        id: 'sural',
        name: 'Sural Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Post-surgical (Achilles repair, ankle surgery, sural nerve biopsy), casts, tight boots, Baker cyst',
            chiefComplaint: 'Numbness and pain over the lateral ankle and lateral foot',
            hpiKeyFeatures: [
                'Lateral ankle and foot numbness/burning',
                'Purely sensory — NO motor weakness',
                'May follow ankle/Achilles surgery or sural nerve biopsy',
                'Casts, tight boots, or direct trauma can compress the nerve',
                'Baker cyst can compress in the popliteal fossa'
            ],
            associatedSymptoms: ['Lateral foot burning', 'Pain with shoes', 'Hypersensitivity over lateral ankle'],
            redFlags: ['Motor weakness (suggests S1 radiculopathy or sciatic neuropathy)'],
            commonMisdiagnoses: ['S1 radiculopathy', 'Peroneal neuropathy', 'Lateral ankle sprain sequelae', 'Peripheral polyneuropathy']
        },
        physicalExam: {
            inspection: ['No motor atrophy (purely sensory)'],
            palpation: [
                'Tinel sign over sural nerve (posterior to lateral malleolus)',
                'Tenderness along posterolateral calf where nerve is subcutaneous'
            ],
            rom: ['Full ankle ROM'],
            strength: [
                { muscle: 'Peroneus Longus/Brevis', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Lateral ankle and lateral foot (sural territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased' },
                { area: 'Dorsum of foot (superficial peroneal)', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Sole of foot (tibial/plantar)', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Tinel Posterior to Lateral Malleolus', technique: 'Tap over sural nerve behind lateral malleolus', positiveFinding: 'Tingling/burning over lateral foot' },
                { name: 'Sural Nerve Stretch', technique: 'Ankle dorsiflexion with inversion', positiveFinding: 'Reproduces lateral foot paresthesias' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely sensory — normal ankle jerk and normal motor exam throughout',
            'Lateral ankle/foot distribution is specific (not dorsum = superficial peroneal, not sole = tibial)',
            'Normal ankle jerk distinguishes from S1 radiculopathy',
            'Sural nerve biopsy site is a common iatrogenic cause',
            'EMG/NCS: Absent or reduced sural SNAP; normal motor studies; often the first nerve affected in polyneuropathy'
        ]
    },

    mortons_neuroma: {
        id: 'mortons_neuroma',
        name: "Morton's Neuroma",
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Women > men (8:1), high heel wearers, tight toe box shoes, runners, age 40-60',
            chiefComplaint: 'Sharp burning pain in the ball of the foot between the 3rd and 4th toes',
            hpiKeyFeatures: [
                'Sharp, burning, or shooting pain between 3rd and 4th metatarsal heads (most common location)',
                'Feels like "walking on a marble" or "pebble in shoe"',
                'Relieved by removing shoes and massaging foot',
                'Worsened by tight shoes, high heels, and weight-bearing',
                'Not a true neuroma — perineural fibrosis of common digital nerve'
            ],
            associatedSymptoms: ['Numbness between toes', 'Pain relieved by removing shoes', 'Toe spreading sensation'],
            redFlags: ['Multiple neuromas (consider peripheral polyneuropathy)', 'First web space numbness (deep peroneal neuropathy)'],
            commonMisdiagnoses: ['Metatarsalgia', 'Stress fracture', 'Metatarsophalangeal joint synovitis', 'Plantar plate tear']
        },
        physicalExam: {
            inspection: ['Usually normal appearance', 'Toe splaying may be noted'],
            palpation: [
                'Direct palpation of third web space reproduces pain',
                'Palpable click between metatarsal heads (Mulder sign)'
            ],
            rom: ['Full toe ROM'],
            strength: [
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar nerves', root: 'S1-S2', action: 'Toe flexion/spreading', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Adjacent sides of affected toes (3rd/4th web space typically)', modality: 'Light touch', expectedFinding: 'Decreased in the web space' },
                { area: 'Rest of foot', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Mulder Sign (Web Space Compression)', technique: 'Squeeze metatarsal heads together while palpating web space from plantar side', positiveFinding: 'Palpable click and reproduction of pain/paresthesias', sensitivity: '62%', specificity: '97%' },
                { name: 'Thumb Index Finger Squeeze', technique: 'Compress affected web space between thumb (plantar) and index finger (dorsal)', positiveFinding: 'Sharp radiating pain to toes' },
                { name: 'Gauthier Test', technique: 'Plantarflex toes then squeeze metatarsal heads', positiveFinding: 'Pain and Mulder click more pronounced' }
            ]
        },
        keyDistinguishingFindings: [
            'Pain localized to intermetatarsal space (NOT the metatarsal head — which would be metatarsalgia)',
            'Mulder sign (audible/palpable click) is highly specific',
            'Relief with removing shoes is characteristic',
            'Third web space most common (60-70%), then second web space',
            'EMG/NCS not typically indicated — clinical and ultrasound/MRI diagnosis'
        ]
    },

    ilioinguinal: {
        id: 'ilioinguinal',
        name: 'Ilioinguinal Neuropathy',
        category: 'Entrapment - Lower Extremity',
        isInappropriate: false,
        history: {
            demographics: 'Post-surgical (herniorrhaphy, appendectomy, C-section, pfannenstiel incision), direct trauma, tight clothing',
            chiefComplaint: 'Groin pain and numbness radiating to the medial thigh and genitalia',
            hpiKeyFeatures: [
                'Burning or aching groin pain after inguinal surgery (hernia repair most common cause)',
                'Numbness in inguinal region, medial proximal thigh, or genitalia',
                'Pain worsened by hip extension and walking',
                'May present as chronic post-surgical pain months after herniorrhaphy',
                'Ilioinguinal nerve can be trapped by sutures, mesh, or scar tissue'
            ],
            associatedSymptoms: ['Groin burning', 'Genital numbness', 'Pain with hip extension', 'Difficulty with ambulation due to pain'],
            redFlags: ['Motor weakness of hip flexors or quadriceps (suggests more proximal lesion)', 'Testicular mass'],
            commonMisdiagnoses: ['Inguinal hernia recurrence', 'Hip joint pathology', 'L1-L2 radiculopathy', 'Genitofemoral neuropathy']
        },
        physicalExam: {
            inspection: ['Surgical scar in inguinal region', 'No muscle atrophy'],
            palpation: [
                'Tinel sign at inguinal region (medial to ASIS)',
                'Point tenderness over ilioinguinal nerve course',
                'Check for hernia recurrence'
            ],
            rom: ['Full hip ROM', 'Hip extension may worsen symptoms'],
            strength: [
                { muscle: 'Internal oblique (partial)', nerve: 'Ilioinguinal', root: 'L1', action: 'Trunk rotation', expectedFinding: 'May be subtly WEAK', mrcGrade: '4+/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hip adductors', nerve: 'Obturator', root: 'L2-L4', action: 'Hip adduction', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Iliopsoas', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Inguinal region, medial proximal thigh, root of penis/labia (ilioinguinal territory)', modality: 'Light touch, pinprick', expectedFinding: 'Decreased or hyperesthetic' },
                { area: 'Anterior thigh', modality: 'Light touch', expectedFinding: 'Normal' },
                { area: 'Lateral thigh', modality: 'Light touch', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Cremasteric reflex (L1-L2)', expectedFinding: 'May be ABSENT on affected side' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Ilioinguinal Nerve Block', technique: 'Inject local anesthetic at point of maximum tenderness (medial to ASIS)', positiveFinding: 'Complete pain relief confirms diagnosis', sensitivity: '90%', specificity: '95%' },
                { name: 'Hip Extension Stretch', technique: 'Prone hip extension with knee flexed', positiveFinding: 'Reproduction of inguinal/groin pain' }
            ]
        },
        keyDistinguishingFindings: [
            'Post-surgical groin pain is the most common presentation — always consider after herniorrhaphy',
            'Purely sensory in most cases — groin/genital numbness with normal motor exam',
            'Absent cremasteric reflex on affected side may be present',
            'Normal quadriceps, knee jerk, and hip flexion distinguish from femoral neuropathy and L1-L2 radiculopathy',
            'Diagnostic nerve block is the gold standard for confirmation'
        ]
    }
};
