export const myopathyData = {

    polymyositis: {
        id: 'polymyositis',
        name: 'Polymyositis',
        category: 'Myopathy',
        isInappropriate: false,
        history: {
            demographics: 'Adults 30-60, women > men (2:1), may be associated with interstitial lung disease and anti-synthetase antibodies',
            chiefComplaint: 'Progressive symmetric proximal weakness — difficulty rising from chair and lifting arms overhead',
            hpiKeyFeatures: [
                'Symmetric proximal weakness (shoulders and hips) developing over weeks to months',
                'Difficulty with stairs, rising from chair, lifting overhead',
                'NO RASH (distinguishes from dermatomyositis)',
                'Elevated CK (often 5-50x normal)',
                'May have myalgias but weakness is the dominant feature',
                'Associated with interstitial lung disease (anti-Jo-1 and anti-synthetase antibodies)'
            ],
            associatedSymptoms: ['Myalgias', 'Fatigue', 'Dysphagia (esophageal involvement)', 'Dyspnea (ILD)', 'Arthritis', 'Raynaud phenomenon'],
            redFlags: ['Rapidly progressive (consider necrotizing myopathy)', 'Dyspnea (ILD screen)', 'Associated malignancy (screen in patients >40)', 'Distal or asymmetric weakness (consider IBM)'],
            commonMisdiagnoses: ['Hypothyroid myopathy', 'Statin myopathy', 'Muscular dystrophy', 'Polymyalgia rheumatica (PMR — NO weakness in PMR)', 'IBM']
        },
        physicalExam: {
            inspection: [
                'No rash (distinguishes from dermatomyositis)',
                'Proximal muscle wasting in chronic cases',
                'Normal skin'
            ],
            palpation: ['Muscles may be tender', 'No joint swelling (unless overlap syndrome)'],
            rom: ['Limited active ROM by weakness', 'Full passive ROM'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Hip Flexors (Iliopsoas)', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Neck Flexors', nerve: 'Cervical', root: 'C1-C4', action: 'Head lift from supine', expectedFinding: 'WEAK (head drop in severe cases)', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'Relatively NORMAL (distal sparing)', mrcGrade: '4-5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL (myopathy does not affect sensory nerves)' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'NORMAL (may be reduced late due to atrophy, but NOT brisk)' }
            ],
            specialTests: [
                { name: 'Sit-to-Stand Test', technique: 'Rise from chair without using arms', positiveFinding: 'Unable or requires multiple attempts (proximal weakness)' },
                { name: 'Arm Elevation Endurance', technique: 'Hold arms overhead as long as possible', positiveFinding: 'Unable to maintain beyond 30-60 seconds' },
                { name: 'Neck Flexion Test', technique: 'Lift head off bed while supine, hold for 60 seconds', positiveFinding: 'Unable to maintain — head drops (weak neck flexors)' },
                { name: 'Gower Sign', technique: 'Rise from floor', positiveFinding: 'Uses hands to "walk up" legs' }
            ]
        },
        keyDistinguishingFindings: [
            'Proximal > distal, symmetric, no rash, elevated CK',
            'NO RASH distinguishes from dermatomyositis',
            'Reflexes preserved (not brisk as in UMN, not absent as in neuropathy)',
            'EMG: MYOPATHIC pattern — short-duration, low-amplitude, polyphasic MUPs with early recruitment + fibrillations (irritable myopathy)',
            'NCS: NORMAL (motor and sensory) — distinguishes from neuropathy',
            'Muscle biopsy: endomysial inflammation with CD8+ T-cell invasion of non-necrotic fibers',
            'Treatment: immunosuppression (steroids first-line, methotrexate/azathioprine as steroid-sparing)'
        ]
    },

    dermatomyositis: {
        id: 'dermatomyositis',
        name: 'Dermatomyositis',
        category: 'Myopathy',
        isInappropriate: false,
        history: {
            demographics: 'Bimodal: children (5-15) and adults (40-60); women > men; associated with malignancy in 15-30% of adult-onset cases',
            chiefComplaint: 'Proximal weakness AND characteristic skin rash — heliotrope rash around eyes and Gottron papules on knuckles',
            hpiKeyFeatures: [
                'Symmetric proximal weakness PLUS characteristic skin findings',
                'Skin findings may precede, accompany, or follow weakness',
                'Heliotrope rash (violaceous discoloration around eyelids)',
                'Gottron papules (erythematous papules over MCP/PIP/DIP joints)',
                'V-sign (rash over anterior chest), Shawl sign (rash over upper back/shoulders)',
                'Mechanic\'s hands (cracked, roughened skin on lateral fingers)',
                'MUST screen for malignancy in adults (ovarian, lung, GI, breast, lymphoma)'
            ],
            associatedSymptoms: ['Skin rash (heliotrope, Gottron)', 'Periungual telangiectasia', 'Dysphagia', 'ILD', 'Calcinosis (especially in children)', 'Arthralgia'],
            redFlags: ['Adult onset (screen for malignancy — 15-30% have underlying cancer)', 'Dysphagia (aspiration risk)', 'ILD (anti-MDA5 antibodies)'],
            commonMisdiagnoses: ['Polymyositis (DM has rash)', 'SLE (rash distribution differs)', 'Psoriatic arthritis', 'Drug reaction']
        },
        physicalExam: {
            inspection: [
                'Heliotrope rash: violaceous/purple discoloration of eyelids ± periorbital edema',
                'Gottron papules: erythematous, scaly papules over MCP, PIP, DIP joints',
                'V-sign: erythematous rash on anterior neck and upper chest',
                'Shawl sign: rash over upper back and shoulders',
                'Mechanic\'s hands: roughened, cracked skin on lateral fingers',
                'Periungual telangiectasia (dilated capillaries at nail folds)',
                'Calcinosis cutis (calcium deposits in skin — especially in juvenile DM)'
            ],
            palpation: ['Muscles may be tender', 'Periungual capillary changes visible'],
            rom: ['Limited by weakness', 'Full passive ROM'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Neck Flexors', nerve: 'Cervical', root: 'C1-C4', action: 'Head lift', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'NORMAL' }
            ],
            specialTests: [
                { name: 'Heliotrope Rash Assessment', technique: 'Inspect periorbital skin in good lighting', positiveFinding: 'Violaceous/purple discoloration of eyelids — pathognomonic for DM' },
                { name: 'Gottron Papule Assessment', technique: 'Inspect dorsal surface of MCP, PIP, DIP joints', positiveFinding: 'Erythematous, scaly, slightly raised papules over joint surfaces' },
                { name: 'Nail Fold Capillaroscopy', technique: 'Apply immersion oil to nail fold; view with ophthalmoscope or dermoscope', positiveFinding: 'Dilated, tortuous capillary loops with avascular areas' },
                { name: 'Sit-to-Stand Test', technique: 'Rise from chair without arms', positiveFinding: 'Difficulty due to proximal weakness' }
            ]
        },
        keyDistinguishingFindings: [
            'Proximal weakness + characteristic rash = dermatomyositis (skin findings are pathognomonic)',
            'Gottron papules are over the JOINTS (SLE rash spares the joints)',
            'Malignancy screening is MANDATORY in adult-onset DM — cancer may present before, with, or after DM',
            'EMG: Myopathic with irritability (same as polymyositis)',
            'Muscle biopsy: perifascicular atrophy (pathognomonic), complement-mediated perimysial inflammation',
            'Amyopathic DM: classic rash WITHOUT weakness (still requires malignancy screening)',
            'Anti-Mi-2, anti-TIF1-gamma (cancer risk), anti-MDA5 (ILD risk), anti-NXP2 (calcinosis risk) antibodies help subclassify'
        ]
    },

    ibm: {
        id: 'ibm',
        name: 'Inclusion Body Myositis (IBM)',
        category: 'Myopathy',
        isInappropriate: false,
        history: {
            demographics: 'Men > women (3:1), age >50 (most common acquired myopathy in patients >50), insidious onset over years',
            chiefComplaint: 'Insidious weakness of grip and knee extensors — difficulty opening jars and frequent falls from knee buckling',
            hpiKeyFeatures: [
                'ASYMMETRIC weakness — unusual for inflammatory myopathy',
                'Characteristic pattern: wrist/finger FLEXORS and knee EXTENSORS preferentially affected',
                'Gradual onset over years (often 5+ years before diagnosis)',
                'Difficulty opening jars (finger flexor weakness)',
                'Knee buckling and falls (quadriceps weakness)',
                'Dysphagia common (up to 60%)',
                'DOES NOT respond to immunosuppression (unlike polymyositis and DM)'
            ],
            associatedSymptoms: ['Difficulty with grip', 'Falls from knee giving way', 'Dysphagia', 'Foot drop may develop'],
            redFlags: ['Dysphagia (aspiration risk — may need modified diet)', 'Falls (injury prevention)'],
            commonMisdiagnoses: ['Polymyositis (most common misdiagnosis — IBM does not respond to steroids)', 'Motor neuron disease', 'Muscular dystrophy', 'Neuropathy']
        },
        physicalExam: {
            inspection: [
                'Forearm flexor atrophy (wrist flexor compartment — visible on volar forearm)',
                'Quadriceps atrophy (often asymmetric)',
                'May have tibialis anterior atrophy',
                'Finger flexor posturing'
            ],
            palpation: ['Forearm muscles may feel firm/fibrotic', 'No joint swelling'],
            rom: ['Limited active ROM in affected muscles', 'May develop finger flexion contractures'],
            strength: [
                { muscle: 'Wrist/Finger Flexors (FDP, FDS)', nerve: 'Median/Ulnar', root: 'C7-T1', action: 'Finger/wrist flexion', expectedFinding: 'WEAK (hallmark — finger flexors weaker than extensors)', mrcGrade: '3/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK (hallmark — may be asymmetric)', mrcGrade: '3/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'Less WEAK than in PM/DM', mrcGrade: '4/5' },
                { muscle: 'Wrist Extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'Relatively NORMAL (flexors > extensors weakness)', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED (from severe quadriceps atrophy)' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'Usually Normal' }
            ],
            specialTests: [
                { name: 'Finger Flexor vs Extensor Comparison', technique: 'Compare finger flexor and extensor strength', positiveFinding: 'Finger FLEXORS weaker than extensors — this unusual pattern is characteristic of IBM (most myopathies affect extensors more)' },
                { name: 'Quadriceps Atrophy Assessment', technique: 'Compare thigh circumference bilaterally and visual inspection', positiveFinding: 'Asymmetric quadriceps wasting' },
                { name: 'Grip Strength Test', technique: 'Test grip dynamometry or ask about opening jars', positiveFinding: 'Markedly reduced grip strength (finger flexor weakness)' }
            ]
        },
        keyDistinguishingFindings: [
            'Finger FLEXORS weaker than extensors + knee EXTENSORS weaker than flexors = IBM pattern (opposite of most myopathies)',
            'ASYMMETRIC weakness is unusual for inflammatory myopathy and should prompt IBM consideration',
            'Age >50, male predominant',
            'CK mildly elevated (typically <10x normal — less than PM/DM)',
            'EMG: Mixed myopathic + neurogenic features (long-duration and short-duration MUPs coexist)',
            'Muscle biopsy: rimmed vacuoles, endomysial inflammation, amyloid deposits, 15-18nm tubulofilamentous inclusions',
            'DOES NOT RESPOND TO IMMUNOSUPPRESSION — this is the most important clinical distinction from polymyositis'
        ]
    },

    muscular_dystrophy: {
        id: 'muscular_dystrophy',
        name: 'Muscular Dystrophy (Duchenne/Becker Pattern)',
        category: 'Myopathy',
        isInappropriate: false,
        history: {
            demographics: 'X-linked recessive (dystrophin gene); DMD: onset 2-5 years, wheelchair by 12; BMD: onset 5-15 years, milder course',
            chiefComplaint: 'Progressive proximal weakness from childhood — difficulty running, climbing stairs, Gower sign from floor',
            hpiKeyFeatures: [
                'X-linked recessive — primarily affects males',
                'DMD: severe, onset age 2-5, loss of ambulation by age 12, cardiac/respiratory failure by 20-30',
                'BMD: milder, later onset (5-25 years), ambulation preserved into 20s-40s',
                'Calf pseudohypertrophy (fatty/fibrous infiltration)',
                'Gower sign: rising from floor using hands on thighs',
                'CK very elevated (DMD: 10,000-200,000 IU/L)',
                'Cardiac involvement: dilated cardiomyopathy'
            ],
            associatedSymptoms: ['Pseudohypertrophy of calves', 'Waddling gait', 'Toe walking', 'Lordosis', 'Learning difficulties (DMD — ~30%)'],
            redFlags: ['Cardiac symptoms (cardiomyopathy)', 'Respiratory decline (progressive restriction)', 'Scoliosis (after wheelchair confinement)'],
            commonMisdiagnoses: ['Polymyositis', 'Spinal muscular atrophy', 'Limb-girdle muscular dystrophy', 'Hypothyroid myopathy']
        },
        physicalExam: {
            inspection: [
                'Calf pseudohypertrophy (enlarged but weak calves)',
                'Lumbar lordosis (hip extensor weakness)',
                'Waddling (Trendelenburg) gait',
                'Scapular winging',
                'Toe walking'
            ],
            palpation: ['Calves feel firm/rubbery (fibrous tissue)', 'No joint swelling'],
            rom: ['Heel cord contractures common', 'Hip flexion contractures', 'IT band tightness'],
            strength: [
                { muscle: 'Hip Extensors (Gluteus Maximus)', nerve: 'Inferior gluteal', root: 'L5-S2', action: 'Hip extension', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Neck Flexors', nerve: 'Cervical', root: 'C1-C4', action: 'Head lift', expectedFinding: 'WEAK', mrcGrade: '3/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'Relatively preserved', mrcGrade: '4-5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED (late — from atrophy)' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'May be DIMINISHED' }
            ],
            specialTests: [
                { name: 'Gower Sign', technique: 'Ask patient to rise from floor', positiveFinding: 'Uses hands to "walk up" legs due to hip and knee extensor weakness — classic for dystrophinopathy', sensitivity: '90%' },
                { name: 'Calf Pseudohypertrophy', technique: 'Compare calf size and consistency', positiveFinding: 'Enlarged, firm calves (fatty/fibrous replacement)' },
                { name: 'Trendelenburg Test', technique: 'Single leg stance', positiveFinding: 'Pelvis drops on unsupported side (hip abductor weakness)' }
            ]
        },
        keyDistinguishingFindings: [
            'Childhood onset + X-linked + calf pseudohypertrophy + very high CK = dystrophinopathy',
            'CK extremely elevated (10,000-200,000) — much higher than inflammatory myopathy',
            'EMG: Myopathic (short, small, polyphasic MUPs with early recruitment)',
            'Genetic testing for dystrophin gene mutations is definitive',
            'Cardiac involvement is universal — echocardiogram monitoring required',
            'Respiratory monitoring (FVC) needed as disease progresses'
        ]
    },

    steroid_myopathy: {
        id: 'steroid_myopathy',
        name: 'Steroid Myopathy',
        category: 'Myopathy',
        isInappropriate: false,
        history: {
            demographics: 'Patients on chronic corticosteroids (prednisone ≥10mg/day for weeks to months), fluorinated steroids (dexamethasone) more myotoxic',
            chiefComplaint: 'Progressive proximal weakness developing during chronic corticosteroid use',
            hpiKeyFeatures: [
                'Proximal weakness developing during chronic steroid use',
                'CK is NORMAL — key distinguishing feature from inflammatory myopathy',
                'No pain (non-inflammatory)',
                'Dose-dependent: higher doses and fluorinated steroids are more myotoxic',
                'Difficult diagnostic dilemma when treating inflammatory myopathy with steroids — is weakness from the disease or the treatment?',
                'Improves with dose reduction'
            ],
            associatedSymptoms: ['Cushing features (moon face, buffalo hump, striae, thin skin)', 'Proximal weakness', 'No myalgias'],
            redFlags: ['Rising CK (suggests inflammatory flare, NOT steroid myopathy)', 'Rapid weakness (consider critical illness myopathy if ICU setting)'],
            commonMisdiagnoses: ['Inflammatory myopathy flare', 'Deconditioning', 'Diabetic myopathy', 'Hypothyroid myopathy']
        },
        physicalExam: {
            inspection: [
                'Cushingoid features (moon face, central obesity, buffalo hump, skin striae)',
                'Proximal muscle atrophy (hip girdle > shoulder girdle)',
                'Thin skin with easy bruising'
            ],
            palpation: ['No muscle tenderness (non-inflammatory)', 'No joint swelling'],
            rom: ['Limited by weakness only'],
            strength: [
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK (hip girdle most affected)', mrcGrade: '3-4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK (less than hips)', mrcGrade: '4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'NORMAL (distal sparing)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'NORMAL' }
            ],
            specialTests: [
                { name: 'CK Level (Key Test)', technique: 'Serum CK measurement', positiveFinding: 'NORMAL CK — critical distinction from inflammatory myopathy (which has elevated CK)' },
                { name: 'Cushingoid Feature Assessment', technique: 'Examine for moon face, buffalo hump, striae, skin thinning', positiveFinding: 'Cushingoid features confirm chronic steroid exposure' },
                { name: 'Steroid Dose Reduction Trial', technique: 'Reduce steroid dose and monitor strength over 4-8 weeks', positiveFinding: 'Strength improves with dose reduction — confirms steroid myopathy' }
            ]
        },
        keyDistinguishingFindings: [
            'NORMAL CK is the KEY finding — inflammatory myopathy has elevated CK',
            'Proximal weakness in the setting of chronic corticosteroid use',
            'No fibrillations on EMG — may show myopathic MUPs but no irritability',
            'NCS: Normal',
            'EMG: May be normal or show mild myopathic changes; NO fibrillations or positive sharp waves (non-irritable myopathy)',
            'Diagnostic dilemma: in patients being treated for polymyositis with steroids, a NORMAL CK with worsening weakness suggests steroid myopathy rather than disease flare',
            'Treatment: reduce or switch steroids; add steroid-sparing agent for underlying disease'
        ]
    }
};
