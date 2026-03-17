export const motorNeuronData = {

    als: {
        id: 'als',
        name: 'Amyotrophic Lateral Sclerosis (ALS)',
        category: 'Motor Neuron Disease',
        isInappropriate: false,
        history: {
            demographics: 'Age 55-75 (peak), men > women, 2/100,000/year; 5-10% familial (SOD1, C9orf72 mutations)',
            chiefComplaint: 'Progressive painless weakness — may start as foot drop, hand weakness, or speech/swallowing difficulty',
            hpiKeyFeatures: [
                'Progressive weakness without sensory loss',
                'Combined upper and lower motor neuron signs in same body region',
                'Limb onset (~70%): asymmetric hand weakness or foot drop',
                'Bulbar onset (~25%): dysarthria and dysphagia',
                'Fasciculations widespread, including in clinically strong muscles',
                'Relentless progression — no remissions or plateaus',
                'Split hand sign: thenar (APB) atrophy > hypothenar — relatively specific for ALS'
            ],
            associatedSymptoms: ['Fasciculations', 'Muscle cramps', 'Weight loss', 'Fatigue', 'Emotional lability (pseudobulbar affect)', 'Dysphagia/dysarthria'],
            redFlags: ['ALL findings are red flags — ALS is itself the emergency', 'Respiratory insufficiency (FVC monitoring critical)', 'Rapid bulbar progression (aspiration risk)'],
            commonMisdiagnoses: ['Cervical myelopathy', 'Multifocal motor neuropathy (treatable mimic!)', 'CIDP', 'Kennedy disease', 'IBM', 'Benign fasciculation syndrome']
        },
        physicalExam: {
            inspection: [
                'Widespread fasciculations (visible in multiple body regions)',
                'Muscle atrophy (hand intrinsics, tongue, proximal or distal)',
                'Split hand: thenar > hypothenar wasting',
                'Tongue atrophy and fasciculations (bulbar involvement)',
                'No sensory changes'
            ],
            palpation: [
                'Fasciculations may be palpable',
                'No nerve tenderness or enlargement'
            ],
            rom: ['ROM limited by weakness, no joint pathology'],
            strength: [
                { muscle: 'First Dorsal Interosseous', nerve: 'Ulnar', root: 'C8-T1', action: 'Index abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'APB (Split hand)', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'WEAK (often more than hypothenar = split hand)', mrcGrade: '3/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Tongue', nerve: 'Hypoglossal (CN XII)', root: 'Brainstem', action: 'Tongue protrusion', expectedFinding: 'WEAK with atrophy and fasciculations (bulbar ALS)', mrcGrade: 'Variable' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'May be WEAK', mrcGrade: '4/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL (sensory sparing is cardinal feature)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'HYPERACTIVE (UMN sign) — even in a weak limb' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'HYPERACTIVE' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'HYPERACTIVE' },
                { reflex: 'Jaw jerk (CN V)', expectedFinding: 'BRISK (bulbar UMN sign)' }
            ],
            specialTests: [
                { name: 'Babinski Sign', technique: 'Stroke lateral sole of foot', positiveFinding: 'Extensor plantar response (UMN sign)', sensitivity: '50%' },
                { name: 'Hoffmann Sign', technique: 'Flick distal phalanx of middle finger', positiveFinding: 'Thumb/index flexion (UMN sign in upper extremity)' },
                { name: 'Jaw Jerk', technique: 'Tap chin with reflex hammer (mouth slightly open)', positiveFinding: 'Brisk jaw closure (bulbar UMN sign)' },
                { name: 'Split Hand Assessment', technique: 'Compare thenar (APB) vs hypothenar (ADM) bulk', positiveFinding: 'APB atrophy disproportionate to ADM = split hand sign (relatively specific for ALS)', sensitivity: '55%', specificity: '97%' },
                { name: 'FVC (Forced Vital Capacity)', technique: 'Bedside spirometry', positiveFinding: 'FVC <80% predicted suggests respiratory muscle involvement' }
            ]
        },
        keyDistinguishingFindings: [
            'UMN + LMN signs in SAME body region is the hallmark: brisk reflexes (UMN) with atrophy and fasciculations (LMN) in the same limb',
            'NO SENSORY LOSS — any sensory finding should prompt reconsideration of diagnosis',
            'Widespread EMG abnormalities across multiple body regions (Awaji criteria): active denervation + chronic reinnervation + fasciculations',
            'Motor NCS amplitudes reduced; sensory NCS NORMAL — motor neuron selectivity',
            'MUST exclude treatable mimics: MMN (anti-GM1, conduction block, responds to IVIg), Kennedy disease (genetic test), cervical myelopathy (MRI)',
            'Revised El Escorial criteria require UMN + LMN signs in multiple body regions for definite diagnosis'
        ]
    },

    pma: {
        id: 'pma',
        name: 'Progressive Muscular Atrophy (PMA)',
        category: 'Motor Neuron Disease',
        isInappropriate: false,
        history: {
            demographics: 'Men > women (4:1), age 50-70; considered an LMN-predominant variant of ALS by many experts',
            chiefComplaint: 'Progressive asymmetric weakness and muscle wasting without upper motor neuron signs',
            hpiKeyFeatures: [
                'Progressive LMN-only weakness (no UMN signs at presentation)',
                'Asymmetric — may start in one hand or foot',
                'Fasciculations and muscle wasting',
                'NO sensory loss',
                'Some patients eventually develop UMN signs and convert to ALS',
                'Generally slower progression than classic ALS'
            ],
            associatedSymptoms: ['Fasciculations', 'Cramps', 'Muscle wasting', 'No spasticity'],
            redFlags: ['Development of UMN signs (conversion to ALS)', 'Respiratory weakness'],
            commonMisdiagnoses: ['Multifocal motor neuropathy', 'CIDP', 'Spinal muscular atrophy', 'Kennedy disease', 'Monomelic amyotrophy']
        },
        physicalExam: {
            inspection: [
                'Asymmetric muscle wasting',
                'Widespread fasciculations',
                'No spasticity'
            ],
            palpation: ['Fasciculations palpable', 'Muscles may feel soft/atrophic'],
            rom: ['Limited by weakness only'],
            strength: [
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Fine motor', expectedFinding: 'WEAK (asymmetric)', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'Variable', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'DIMINISHED or ABSENT (pure LMN pattern)' },
                { reflex: 'Babinski', expectedFinding: 'ABSENT (no UMN signs)' }
            ],
            specialTests: [
                { name: 'UMN Sign Survey', technique: 'Check Babinski, Hoffmann, clonus, jaw jerk', positiveFinding: 'ALL NEGATIVE — defining feature of PMA' },
                { name: 'Fasciculation Assessment', technique: 'Observe multiple body regions at rest', positiveFinding: 'Widespread fasciculations across multiple myotomes' }
            ]
        },
        keyDistinguishingFindings: [
            'Pure LMN syndrome — NO UMN signs (no hyperreflexia, no Babinski, no spasticity)',
            'Widespread EMG denervation across multiple body regions — same as ALS without the UMN component',
            'Normal sensory studies',
            'MUST exclude MMN (conduction block on NCS, anti-GM1 antibodies, IVIg-responsive)',
            'Some PMA patients develop UMN signs over time → reclassified as ALS',
            'Better prognosis than classic ALS but still progressive'
        ]
    },

    kennedy: {
        id: 'kennedy',
        name: 'Kennedy Disease (SBMA)',
        category: 'Motor Neuron Disease',
        isInappropriate: false,
        history: {
            demographics: 'Males only (X-linked recessive — CAG trinucleotide repeat in androgen receptor gene), age 30-60, 1/40,000 males',
            chiefComplaint: 'Slowly progressive proximal weakness with facial fasciculations and gynecomastia',
            hpiKeyFeatures: [
                'X-linked recessive — affects males only (female carriers rarely symptomatic)',
                'Slowly progressive proximal > distal weakness',
                'Prominent PERIORAL fasciculations and TONGUE fasciculations',
                'Gynecomastia (androgen insensitivity from mutant androgen receptor)',
                'Bulbar symptoms: dysarthria, dysphagia, tongue atrophy',
                'Sensory neuropathy (unlike ALS which is purely motor)',
                'Very slow progression — decades-long course'
            ],
            associatedSymptoms: ['Gynecomastia', 'Testicular atrophy', 'Perioral fasciculations', 'Hand tremor', 'Sensory symptoms (tingling)', 'Elevated CK', 'Infertility'],
            redFlags: ['Rapid progression (not typical — reconsider ALS)', 'Female patient (cannot have Kennedy disease unless very rare homozygous)'],
            commonMisdiagnoses: ['ALS (most important distinction)', 'Spinal muscular atrophy', 'CIDP', 'Myopathy']
        },
        physicalExam: {
            inspection: [
                'Gynecomastia — bilateral breast enlargement',
                'Perioral fasciculations (chin and lower face twitching)',
                'Tongue atrophy and fasciculations',
                'Proximal muscle wasting (shoulders, thighs)',
                'Testicular atrophy may be present'
            ],
            palpation: ['Gynecomastia palpable', 'Fasciculations palpable in face and limbs'],
            rom: ['Limited by weakness'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK (proximal predominant)', mrcGrade: '3-4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous', root: 'C5-C6', action: 'Elbow flexion', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Fine motor', expectedFinding: 'Mildly WEAK', mrcGrade: '4/5' },
                { muscle: 'Tongue/Facial', nerve: 'CN VII/XII', root: 'Brainstem', action: 'Speech/swallowing', expectedFinding: 'WEAK', mrcGrade: 'Variable' }
            ],
            sensory: [
                { area: 'Distal extremities', modality: 'Vibration', expectedFinding: 'Decreased (sensory neuropathy — KEY distinction from ALS)' },
                { area: 'Feet', modality: 'Light touch', expectedFinding: 'May be decreased' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'DIMINISHED or ABSENT (pure LMN — NO UMN signs)' },
                { reflex: 'Babinski', expectedFinding: 'ABSENT (no UMN component)' }
            ],
            specialTests: [
                { name: 'Gynecomastia Assessment', technique: 'Inspect and palpate breast tissue', positiveFinding: 'Bilateral breast enlargement (androgen insensitivity)' },
                { name: 'Perioral Fasciculation Check', technique: 'Observe chin and perioral area at rest', positiveFinding: 'Visible chin/perioral twitching — very characteristic of Kennedy disease' },
                { name: 'Genetic Testing (Gold Standard)', technique: 'CAG repeat analysis in androgen receptor gene (Xq11-12)', positiveFinding: '>38 CAG repeats is diagnostic', sensitivity: '100%', specificity: '100%' }
            ]
        },
        keyDistinguishingFindings: [
            'Gynecomastia + perioral fasciculations + slowly progressive weakness = THINK Kennedy disease',
            'Sensory neuropathy present (reduced sural SNAP) — ALS has NORMAL sensory studies',
            'NO UMN signs — purely LMN. ALS has UMN signs',
            'Very slow progression (decades, not months) — ALS progresses much faster',
            'Elevated CK (mild to moderate, 500-1500 IU/L)',
            'Genetic test is definitive: CAG repeat expansion in androgen receptor gene',
            'X-linked: only males affected; female carriers may have mild CK elevation but rarely symptomatic'
        ]
    },

    sma: {
        id: 'sma',
        name: 'Spinal Muscular Atrophy (Adult-Onset SMA Type 3/4)',
        category: 'Motor Neuron Disease',
        isInappropriate: false,
        history: {
            demographics: 'Autosomal recessive — SMN1 gene deletion; Type 3 (Kugelberg-Welander): onset after age 18 months, ambulatory; Type 4: onset >30 years',
            chiefComplaint: 'Slowly progressive proximal weakness, difficulty climbing stairs and rising from floor since childhood or young adulthood',
            hpiKeyFeatures: [
                'Slowly progressive proximal weakness (symmetric)',
                'Type 3: onset in childhood/adolescence — able to walk independently',
                'Type 4: onset in adulthood — mildest form',
                'Difficulty with stairs, running, rising from floor',
                'Tremor of hands (minipolymyoclonus) is characteristic',
                'NO sensory symptoms, NO UMN signs'
            ],
            associatedSymptoms: ['Proximal weakness', 'Fasciculations', 'Hand tremor', 'Exercise intolerance', 'Scoliosis (if childhood onset)'],
            redFlags: ['UMN signs (consider ALS)', 'Rapid progression (atypical for SMA)', 'Sensory loss (atypical)'],
            commonMisdiagnoses: ['Limb-girdle muscular dystrophy', 'Polymyositis', 'ALS', 'Kennedy disease']
        },
        physicalExam: {
            inspection: [
                'Proximal muscle wasting (thighs, shoulders)',
                'Fasciculations may be visible',
                'Hand tremor (minipolymyoclonus)',
                'Scoliosis (if childhood onset)'
            ],
            palpation: ['Fasciculations palpable', 'Muscles may feel soft'],
            rom: ['Scoliosis limits trunk ROM', 'Joint contractures possible in chronic cases'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK (proximal predominant)', mrcGrade: '3-4/5' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'Less WEAK (distal relatively spared)', mrcGrade: '4-5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Fine motor', expectedFinding: 'Relatively preserved', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' }
            ],
            specialTests: [
                { name: 'Gower Sign', technique: 'Rise from floor', positiveFinding: 'Uses hands to "walk up" legs (proximal weakness — also seen in myopathy)' },
                { name: 'Hand Tremor Assessment', technique: 'Observe outstretched hands', positiveFinding: 'Minipolymyoclonus tremor (irregular fine tremor from motor unit instability)' },
                { name: 'Genetic Testing (Definitive)', technique: 'SMN1 gene deletion analysis', positiveFinding: 'Homozygous deletion of SMN1 exon 7 — diagnostic', sensitivity: '95%', specificity: '100%' }
            ]
        },
        keyDistinguishingFindings: [
            'Proximal > distal, symmetric, slowly progressive, NO sensory loss, NO UMN signs',
            'Autosomal recessive — family history or genetic testing (SMN1 deletion) is diagnostic',
            'Minipolymyoclonus hand tremor is characteristic',
            'EMG: Chronic neurogenic changes (large MUPs, reduced recruitment) — may mimic myopathy due to proximal weakness',
            'CK mildly elevated (can overlap with myopathy range)',
            'Now treatable with nusinersen, risdiplam, or onasemnogene — early diagnosis matters'
        ]
    }
};
