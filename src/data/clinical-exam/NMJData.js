export const nmjData = {

    myasthenia_gravis: {
        id: 'myasthenia_gravis',
        name: 'Myasthenia Gravis',
        category: 'Neuromuscular Junction',
        isInappropriate: false,
        history: {
            demographics: 'Bimodal: young women (20-30) and older men (60-70); anti-AChR antibodies in 85%, anti-MuSK in 5-8%',
            chiefComplaint: 'Fatigable weakness — ptosis and double vision that worsens throughout the day',
            hpiKeyFeatures: [
                'FATIGABLE weakness — worsens with sustained or repetitive use, improves with rest',
                'Ocular onset in ~65%: ptosis and diplopia (first symptoms)',
                'Generalized: proximal limb weakness, neck flexor weakness, dysarthria, dysphagia',
                'Diurnal variation: worse in evening, better in morning after rest',
                'Exacerbating factors: heat, infection, stress, surgery, certain medications (aminoglycosides, beta-blockers)',
                'Myasthenic crisis: respiratory failure requiring intubation'
            ],
            associatedSymptoms: ['Ptosis', 'Diplopia', 'Dysphagia', 'Dysarthria (nasal voice)', 'Neck weakness (head drop)', 'Respiratory compromise'],
            redFlags: ['Dyspnea/orthopnea (impending crisis — monitor FVC)', 'Rapid generalization from ocular', 'New weakness after starting medication (check MG contraindicated drugs)'],
            commonMisdiagnoses: ['Stroke (acute ptosis)', 'MS', 'Lambert-Eaton (similar but different pattern)', 'Chronic fatigue syndrome', 'Oculopharyngeal dystrophy']
        },
        physicalExam: {
            inspection: [
                'Ptosis (unilateral or bilateral, asymmetric)',
                'Curtain sign: lifting one ptotic lid causes other to droop further',
                'Expressionless face ("myasthenic snarl" when attempting to smile)',
                'Head drop (severe cases — weak neck extensors)',
                'No muscle atrophy (typically)'
            ],
            palpation: ['No muscle tenderness', 'No nerve enlargement'],
            rom: ['Full passive ROM — weakness is the limitation, not joint pathology'],
            strength: [
                { muscle: 'Orbicularis Oculi', nerve: 'Facial (CN VII)', root: 'Pontine', action: 'Eyelid closure', expectedFinding: 'WEAK (cannot resist forced opening)', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction (sustained)', expectedFinding: 'WEAK with fatigue — test with sustained arm elevation', mrcGrade: '4/5 → 3/5 with fatigue' },
                { muscle: 'Neck Flexors', nerve: 'C1-C4', root: 'Cervical', action: 'Head lifting from supine', expectedFinding: 'WEAK (head drop)', mrcGrade: '3-4/5' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'Usually NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL (NMJ disease does not affect sensory nerves)' }
            ],
            reflexes: [
                { reflex: 'All reflexes', expectedFinding: 'NORMAL (reflexes preserved in NMJ disease)' }
            ],
            specialTests: [
                { name: 'Ice Pack Test (Ptosis)', technique: 'Apply ice pack to closed ptotic eyelid for 2 minutes', positiveFinding: 'Improvement of ptosis ≥2mm (cold improves NMJ transmission)', sensitivity: '80-92%', specificity: '97%' },
                { name: 'Sustained Upgaze Test', technique: 'Patient looks up at ceiling for 60-120 seconds', positiveFinding: 'Progressive ptosis develops or worsens (fatigable weakness)', sensitivity: '85-95%' },
                { name: 'Repeated Arm Abduction Test', technique: 'Patient abducts arm to 90° repeatedly (10-15 times)', positiveFinding: 'Progressive weakening — arm drops lower with each repetition' },
                { name: 'Cogan Lid Twitch', technique: 'Patient looks down for 15 seconds, then quickly looks up', positiveFinding: 'Brief overshoot of lid (lid twitch upward then drifts to ptotic position)', sensitivity: '75%' },
                { name: 'Peek Sign', technique: 'Patient forcefully closes eyes, then tries to keep them closed', positiveFinding: 'Sclera becomes visible (orbicularis fatigue) after 30 seconds of forced closure' }
            ]
        },
        keyDistinguishingFindings: [
            'FATIGABLE weakness is the hallmark — strength decreases with repetitive testing and improves with rest',
            'Reflexes and sensation NORMAL — pure NMJ disease',
            'Ocular muscles affected out of proportion (ptosis, diplopia) — ocular muscles have fewer NMJs per fiber',
            'EMG: Repetitive nerve stimulation shows DECREMENTAL response (>10% drop at 3 Hz) — decrement',
            'Single-fiber EMG: Increased jitter (most sensitive test — 95-99% sensitive)',
            'Serology: Anti-AChR Ab (85%), Anti-MuSK Ab (5-8%), seronegative (5-10%)',
            'Distinguishes from LEMS: MG has decremental response; LEMS has incremental response with rapid stimulation'
        ]
    },

    lems: {
        id: 'lems',
        name: 'Lambert-Eaton Myasthenic Syndrome (LEMS)',
        category: 'Neuromuscular Junction',
        isInappropriate: false,
        history: {
            demographics: '50-60% paraneoplastic (small cell lung cancer), 40-50% autoimmune; anti-VGCC antibodies; age 40-70',
            chiefComplaint: 'Proximal leg weakness, dry mouth, and difficulty rising from a chair — strength IMPROVES with repeated use',
            hpiKeyFeatures: [
                'Proximal leg weakness (difficulty rising from chair, climbing stairs)',
                'FACILITATION: strength improves briefly with sustained maximal effort (opposite of MG)',
                'Autonomic dysfunction prominent: dry mouth, constipation, erectile dysfunction, orthostatic hypotension',
                'Ocular symptoms less prominent than MG (ptosis/diplopia mild if present)',
                'MUST screen for underlying malignancy — 50-60% have small cell lung cancer',
                'Anti-VGCC (P/Q-type voltage-gated calcium channel) antibodies'
            ],
            associatedSymptoms: ['Dry mouth (often first symptom)', 'Constipation', 'Erectile dysfunction', 'Orthostatic hypotension', 'Metallic taste', 'Difficulty rising from chair'],
            redFlags: ['ANY cancer warning signs (weight loss, smoking, cough) — screen for SCLC', 'Rapid progression (paraneoplastic more likely)'],
            commonMisdiagnoses: ['Myasthenia gravis (similar but opposite pattern)', 'Polymyositis', 'Diabetic neuropathy', 'Deconditioning', 'Cancer fatigue']
        },
        physicalExam: {
            inspection: [
                'Proximal lower extremity weakness (difficulty rising from chair)',
                'Ptosis less severe than MG (if present)',
                'May appear generally weak but improve with activity',
                'Dry oral mucosa'
            ],
            palpation: ['Dry mouth (reduced saliva)', 'No muscle tenderness'],
            rom: ['Full passive ROM'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK initially but IMPROVES with sustained effort', mrcGrade: '3/5 → 4/5 after 10 seconds of maximal effort' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK with facilitation', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Grip', nerve: 'Median/Ulnar', root: 'C8-T1', action: 'Grip strength', expectedFinding: 'WEAK but improves with repeated testing', mrcGrade: '4/5' },
                { muscle: 'Orbicularis Oculi', nerve: 'Facial', root: 'Pontine', action: 'Eye closure', expectedFinding: 'Usually NORMAL (unlike MG)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL' }
            ],
            reflexes: [
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED or ABSENT at rest — may AUGMENT after sustained quadriceps contraction (post-tetanic facilitation)' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' }
            ],
            specialTests: [
                { name: 'Post-Tetanic Reflex Facilitation', technique: 'Test knee jerk (reduced); then have patient isometrically contract quadriceps for 10 seconds; immediately re-test knee jerk', positiveFinding: 'Knee jerk becomes brisker after exercise (calcium accumulation facilitates ACh release)', sensitivity: '85%' },
                { name: 'Repeated Grip Test', technique: 'Test grip strength; then have patient rapidly open/close hand 10 times; re-test grip', positiveFinding: 'Grip IMPROVES after exercise (facilitation)', sensitivity: '80%' },
                { name: 'Dry Mouth Assessment', technique: 'Ask about dry mouth; inspect oral mucosa', positiveFinding: 'Dry mucosa (autonomic cholinergic dysfunction)' },
                { name: 'Chair Rise Test', technique: 'Rise from chair without using arms', positiveFinding: 'Difficulty initially; may improve with repeated attempts' }
            ]
        },
        keyDistinguishingFindings: [
            'FACILITATION — strength improves with exercise (opposite of MG which fatigues with exercise)',
            'Autonomic dysfunction (dry mouth, constipation, orthostatic) is prominent — absent in MG',
            'Hyporeflexia that FACILITATES (reflexes improve after exercise) is pathognomonic',
            'EMG: Low CMAP amplitudes at rest; INCREMENT (>100% increase) with rapid repetitive stimulation (50 Hz) or after brief maximal exercise',
            'Slow repetitive stimulation (3 Hz): decrement (like MG) — must do RAPID stimulation to see increment',
            'Anti-VGCC (P/Q-type) antibodies in ~85-90%',
            '50-60% have underlying SCLC — CT chest is MANDATORY; if negative, repeat every 6 months for 2 years (DELTA-P score helps risk stratify)'
        ]
    }
};
