export const polyneuropathyData = {

    diabetic_polyneuropathy: {
        id: 'diabetic_polyneuropathy',
        name: 'Diabetic Sensorimotor Polyneuropathy',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Type 1 or Type 2 diabetes, correlates with duration and glycemic control, up to 50% of diabetics develop polyneuropathy',
            chiefComplaint: 'Gradually progressive numbness and burning in both feet, spreading proximally in a stocking pattern',
            hpiKeyFeatures: [
                'Symmetric, length-dependent — starts in toes/feet, gradually ascends',
                'Burning, tingling, "pins and needles," or painful numbness',
                'Worse at night, may interfere with sleep',
                'Hands become involved when symptoms reach mid-calf ("stocking-glove")',
                'Balance difficulties and falls, especially in dark environments',
                'Painless injuries to feet (neuropathic ulcers) in advanced cases'
            ],
            associatedSymptoms: ['Neuropathic pain (burning, lancinating)', 'Gait instability', 'Autonomic symptoms (orthostatic hypotension, gastroparesis, erectile dysfunction)', 'Foot ulcers'],
            redFlags: ['Rapid onset (consider GBS/CIDP)', 'Asymmetric (consider vasculitic neuropathy)', 'Motor-predominant (consider CIDP or motor neuron disease)', 'Upper extremity onset (atypical for length-dependent)'],
            commonMisdiagnoses: ['Lumbar spinal stenosis', 'B12 deficiency', 'Tarsal tunnel syndrome', 'Peripheral vascular disease']
        },
        physicalExam: {
            inspection: [
                'Foot deformities (Charcot foot, hammer toes, high arch)',
                'Skin changes: dry skin, calluses, hair loss on distal legs',
                'Neuropathic ulcers (plantar surface, pressure points)',
                'Intrinsic foot muscle atrophy'
            ],
            palpation: [
                'Pedal pulses (assess for concurrent PVD)',
                'No focal nerve tenderness or Tinel signs'
            ],
            rom: ['May have ankle/toe stiffness from disuse', 'Charcot foot deformity limits ROM'],
            strength: [
                { muscle: 'Extensor Hallucis Longus', nerve: 'Deep peroneal', root: 'L5', action: 'Great toe extension', expectedFinding: 'May be WEAK (early distal involvement)', mrcGrade: '4/5' },
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar nerves', root: 'S1-S2', action: 'Toe flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'May be WEAK (later)', mrcGrade: '4/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'Usually NORMAL or mildly weak', mrcGrade: '4-5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'NORMAL (unless advanced)', mrcGrade: '5/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Toes and feet (stocking distribution)', modality: 'Vibration (128 Hz tuning fork)', expectedFinding: 'Decreased or absent — often first modality lost' },
                { area: 'Toes and feet', modality: 'Monofilament (10g Semmes-Weinstein)', expectedFinding: 'Decreased — loss of protective sensation' },
                { area: 'Feet and distal legs', modality: 'Pinprick, temperature', expectedFinding: 'Decreased in stocking distribution' },
                { area: 'Hands and fingers', modality: 'Light touch', expectedFinding: 'May be decreased if symptoms at mid-calf level' },
                { area: 'Proximal limbs and trunk', modality: 'All modalities', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'ABSENT (often earliest reflex lost)' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'May be DIMINISHED in advanced cases' },
                { reflex: 'Upper extremity reflexes', expectedFinding: 'Usually Normal' }
            ],
            specialTests: [
                { name: 'Semmes-Weinstein Monofilament (10g)', technique: 'Apply 10g monofilament to plantar surface at 10 standardized sites', positiveFinding: 'Inability to detect at ≥4 sites = loss of protective sensation', sensitivity: '66-91%', specificity: '34-86%' },
                { name: 'Vibration Testing (128 Hz Tuning Fork)', technique: 'Place tuning fork on great toe IP joint; compare to examiner perception', positiveFinding: 'Patient loses vibration before examiner', sensitivity: '80%' },
                { name: 'Romberg Test', technique: 'Stand with feet together, eyes closed', positiveFinding: 'Increased sway or falling (proprioceptive loss)', sensitivity: '60%' },
                { name: 'Tandem Gait', technique: 'Walk heel-to-toe', positiveFinding: 'Unsteady or unable (balance impairment from sensory loss)' }
            ]
        },
        keyDistinguishingFindings: [
            'SYMMETRIC and LENGTH-DEPENDENT — starts distally, ascends symmetrically',
            'Sensory > motor involvement — sensory loss with relatively preserved strength',
            'Ankle jerks lost early; knee jerks preserved until advanced',
            'Axonal pattern on NCS: reduced SNAP amplitudes (sural nerve first), normal or mildly slowed conduction velocities',
            'EMG: Denervation in distal muscles (intrinsic foot muscles) with proximal sparing',
            '10g monofilament testing is standard screening for loss of protective sensation (ulcer risk)'
        ]
    },

    gbs: {
        id: 'gbs',
        name: 'Guillain-Barré Syndrome (AIDP)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'All ages, slight male predominance; 1-2/100,000/year; often follows viral illness, Campylobacter, surgery, vaccination (rare)',
            chiefComplaint: 'Rapidly progressive ascending weakness starting in the legs, with numbness and back pain',
            hpiKeyFeatures: [
                'Rapidly progressive ascending weakness over days to weeks (nadir by 4 weeks)',
                'Starts in legs, ascends to arms, may reach respiratory muscles',
                'Sensory symptoms (paresthesias) often precede weakness',
                'Back pain or radicular pain common early — can mimic disc herniation',
                'Preceding infection in ~60-70% (2-4 weeks before onset)',
                'Areflexia develops early and is a hallmark'
            ],
            associatedSymptoms: ['Back pain', 'Autonomic dysfunction (tachycardia, blood pressure lability, urinary retention)', 'Facial weakness (bilateral in 50%)', 'Dysphagia', 'Respiratory compromise'],
            redFlags: ['Respiratory failure (monitor FVC — intubate if <20 mL/kg)', 'Autonomic instability (cardiac monitoring required)', 'Bowel/bladder dysfunction early (consider alternative diagnosis)', 'Purely motor (consider AMAN variant or motor neuron disease)'],
            commonMisdiagnoses: ['Spinal cord compression', 'Transverse myelitis', 'CIDP (if chronic)', 'Myasthenia gravis', 'Botulism', 'Tick paralysis']
        },
        physicalExam: {
            inspection: [
                'May appear well initially despite significant weakness',
                'Bilateral facial weakness (facial diplegia)',
                'Accessory muscle use (respiratory compromise)',
                'No muscle atrophy initially (too acute)'
            ],
            palpation: [
                'Nerve trunks may be tender',
                'No focal nerve Tinel signs'
            ],
            rom: ['Limited by weakness, not by joint pathology'],
            strength: [
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '2-4/5 (symmetric)' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK', mrcGrade: '2-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '2-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK (as weakness ascends)', mrcGrade: '3-4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Facial muscles', nerve: 'Facial (CN VII)', root: 'Pontine', action: 'Eye closure, smile', expectedFinding: 'WEAK (bilateral in 50%)', mrcGrade: '3-4/5' }
            ],
            sensory: [
                { area: 'Distal extremities (glove-stocking)', modality: 'Light touch, vibration', expectedFinding: 'Decreased (sensory loss is typically mild compared to motor)' },
                { area: 'Proximal limbs', modality: 'All modalities', expectedFinding: 'Usually preserved' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'ABSENT' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'ABSENT' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'ABSENT' },
                { reflex: 'Triceps (C7)', expectedFinding: 'ABSENT' }
            ],
            specialTests: [
                { name: 'Forced Vital Capacity (FVC)', technique: 'Bedside spirometry — serial measurements', positiveFinding: 'FVC <20 mL/kg or declining trend — indicates impending respiratory failure (20/30/40 rule: intubate if FVC <20, MIP <30, MEP <40)' },
                { name: 'Single Breath Count', technique: 'Ask patient to count as high as possible on single breath', positiveFinding: 'Unable to count beyond 20 suggests reduced FVC' },
                { name: 'Neck Flexion Strength', technique: 'Test ability to lift head off bed', positiveFinding: 'Inability to lift head = proximal weakness reaching axial muscles (correlates with respiratory risk)' }
            ]
        },
        keyDistinguishingFindings: [
            'AREFLEXIA is the hallmark — absent or markedly reduced reflexes early',
            'Ascending weakness: legs → arms → face → respiratory (over days to weeks, not hours)',
            'CSF: Albuminocytologic dissociation (high protein, normal cell count) — may be normal in first week',
            'NCS: Demyelinating features (prolonged distal latencies, slow velocities, conduction block, temporal dispersion) — classic AIDP pattern',
            'Autonomic dysfunction is common and dangerous — requires cardiac monitoring',
            'MUST monitor FVC serially — respiratory failure is the primary cause of death',
            'Treatment: IVIg or plasmapheresis — steroids are NOT effective'
        ]
    },

    cidp: {
        id: 'cidp',
        name: 'Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Adults, peak 40-60 years, men > women (2:1); prevalence ~5/100,000',
            chiefComplaint: 'Progressive or relapsing proximal AND distal weakness with numbness over months',
            hpiKeyFeatures: [
                'Progressive weakness over >8 weeks (distinguishes from GBS which peaks by 4 weeks)',
                'BOTH proximal AND distal weakness (unlike typical polyneuropathy which is distal-predominant)',
                'Relapsing-remitting or chronic progressive course',
                'Symmetric involvement of arms and legs',
                'Sensory symptoms: numbness, tingling, unsteady gait',
                'Responds to immunotherapy (IVIg, steroids, plasmapheresis)'
            ],
            associatedSymptoms: ['Gait ataxia', 'Fatigue', 'Tremor', 'Difficulty with stairs and rising from chair'],
            redFlags: ['Purely motor (consider MMN)', 'Asymmetric (consider MMN or vasculitic neuropathy)', 'Rapid respiratory decline (consider GBS)'],
            commonMisdiagnoses: ['GBS (if acute onset)', 'Diabetic polyneuropathy', 'CMT (if family history unclear)', 'Lumbar stenosis']
        },
        physicalExam: {
            inspection: [
                'Diffuse muscle wasting (proximal and distal)',
                'May have enlarged palpable nerves (hypertrophic neuropathy)',
                'Gait ataxia'
            ],
            palpation: [
                'Palpably enlarged nerves in some patients (ulnar at elbow, peroneal at fibular head)',
                'No focal tenderness'
            ],
            rom: ['Limited by weakness'],
            strength: [
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'WEAK (proximal involvement)', mrcGrade: '3-4/5' },
                { muscle: 'Hip Flexors', nerve: 'Femoral', root: 'L1-L3', action: 'Hip flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip/pinch', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'WEAK', mrcGrade: '4/5' }
            ],
            sensory: [
                { area: 'Distal extremities (stocking-glove)', modality: 'Vibration, proprioception', expectedFinding: 'Decreased (large fiber modalities preferentially affected)' },
                { area: 'Distal extremities', modality: 'Pinprick, temperature', expectedFinding: 'May be decreased' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'ABSENT' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'ABSENT or DIMINISHED' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'ABSENT or DIMINISHED' },
                { reflex: 'Triceps (C7)', expectedFinding: 'ABSENT or DIMINISHED' }
            ],
            specialTests: [
                { name: 'Nerve Palpation', technique: 'Palpate ulnar nerve at elbow, great auricular nerve at neck, peroneal at fibular head', positiveFinding: 'Palpably enlarged (hypertrophic) nerves' },
                { name: 'Romberg Test', technique: 'Stand with feet together, eyes closed', positiveFinding: 'Positive (proprioceptive loss)' },
                { name: 'Sit-to-Stand Test', technique: 'Rise from chair without arms', positiveFinding: 'Difficulty (proximal weakness — unusual for most polyneuropathies)' }
            ]
        },
        keyDistinguishingFindings: [
            'PROXIMAL + DISTAL weakness distinguishes from most polyneuropathies (which are distal-predominant)',
            'Progression >8 weeks distinguishes from GBS (which peaks <4 weeks)',
            'Areflexia or hyporeflexia is universal',
            'NCS: Demyelinating features in MULTIPLE nerves — prolonged distal latencies (>150% ULN), slow CV (<70% LLN), temporal dispersion, conduction block',
            'CSF: Elevated protein (like GBS)',
            'RESPONDS to IVIg, steroids, or plasmapheresis — treatment responsiveness is a key diagnostic criterion',
            'Must distinguish from POEMS syndrome, anti-MAG neuropathy, and hereditary neuropathy (CMT)'
        ]
    },

    cmt: {
        id: 'cmt',
        name: 'Charcot-Marie-Tooth Disease (CMT1A)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Hereditary — onset typically in first two decades; most common inherited neuropathy (1/2,500); autosomal dominant (CMT1A = PMP22 duplication)',
            chiefComplaint: 'Lifelong difficulty with running and ankle sprains, slowly progressive foot drop and hand weakness',
            hpiKeyFeatures: [
                'Slowly progressive over years to decades',
                'Childhood onset: difficulty running, frequent ankle sprains, high arches',
                'Distal weakness: foot drop, hand weakness',
                'Family history of "weak ankles," high arches, or similar symptoms',
                'Often well-compensated — patients may not seek care until adulthood',
                'CMT1A (demyelinating) is most common type; CMT2 is axonal'
            ],
            associatedSymptoms: ['Foot deformities (pes cavus, hammer toes)', 'Mild distal sensory loss', 'Rarely painful (unlike acquired neuropathies)', 'Scoliosis in some patients'],
            redFlags: ['Rapid progression (not typical — consider acquired demyelinating neuropathy)', 'Pain-predominant (atypical — consider alternative diagnosis)', 'Proximal weakness (atypical for CMT)'],
            commonMisdiagnoses: ['CIDP (can look similar on NCS)', 'Distal myopathy', 'Chronic L5 radiculopathy', 'Peroneal neuropathy']
        },
        physicalExam: {
            inspection: [
                'Pes cavus (high arches) — hallmark finding',
                'Hammer toes',
                '"Inverted champagne bottle" legs (distal atrophy with normal proximal musculature)',
                'Thenar and intrinsic hand muscle atrophy',
                'Scoliosis may be present'
            ],
            palpation: [
                'Palpably enlarged nerves (great auricular, ulnar at elbow) — classic in CMT1',
                'Firm, non-tender nerve enlargement'
            ],
            rom: ['Ankle dorsiflexion may be limited (contracture)', 'Pes cavus deformity limits foot ROM'],
            strength: [
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Ankle dorsiflexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Peronei', nerve: 'Superficial peroneal', root: 'L5-S1', action: 'Ankle eversion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar', root: 'S1-S2', action: 'Toe function', expectedFinding: 'WEAK', mrcGrade: '2-3/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Grip/fine motor', expectedFinding: 'WEAK', mrcGrade: '4/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'May be mildly WEAK', mrcGrade: '4/5' }
            ],
            sensory: [
                { area: 'Distal legs and feet', modality: 'Vibration, proprioception', expectedFinding: 'Mildly decreased (less prominent than motor findings)' },
                { area: 'Hands', modality: 'Light touch', expectedFinding: 'Mildly decreased in advanced cases' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'ABSENT' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'DIMINISHED' }
            ],
            specialTests: [
                { name: 'Nerve Palpation', technique: 'Palpate great auricular, ulnar at elbow', positiveFinding: 'Enlarged, palpable nerves (especially CMT1)' },
                { name: 'Family Exam', technique: 'Examine first-degree relatives for pes cavus, areflexia, weakness', positiveFinding: 'Similar findings in family members (autosomal dominant)' },
                { name: 'Pes Cavus Assessment', technique: 'Weight-bearing foot exam', positiveFinding: 'High arches, hammer toes, calluses under metatarsal heads' }
            ]
        },
        keyDistinguishingFindings: [
            'Pes cavus + distal wasting + palpable nerves + family history = classic CMT1 triad',
            'NCS: UNIFORM slowing across ALL nerve segments (unlike CIDP which has multifocal/nonuniform slowing)',
            'Conduction velocities typically <38 m/s in CMT1A (median motor) — very slow, uniformly',
            'NO conduction block (unlike CIDP) — uniform demyelination, not segmental',
            'Genetic testing: PMP22 duplication confirms CMT1A (most common type)',
            'Very slowly progressive — decades of course, not months'
        ]
    },

    small_fiber: {
        id: 'small_fiber',
        name: 'Small Fiber Neuropathy',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Diabetes (most common cause), idiopathic (~50%), autoimmune, Fabry disease, amyloidosis; any age but peak 40-60',
            chiefComplaint: 'Burning feet and painful numbness with NORMAL standard nerve conduction studies',
            hpiKeyFeatures: [
                'Burning, stabbing, or lancinating pain in feet',
                'Length-dependent (starts distally)',
                'NORMAL NCS — small fibers (Aδ and C fibers) are not assessed by standard NCS',
                'Autonomic symptoms common (sweating abnormalities, dry eyes/mouth, GI dysmotility)',
                'Standard EMG/NCS is NORMAL — diagnosis requires skin biopsy (IENFD) or autonomic testing',
                'Causes: diabetes, impaired glucose tolerance, autoimmune, idiopathic'
            ],
            associatedSymptoms: ['Burning feet', 'Allodynia (pain from sheets/socks)', 'Autonomic dysfunction', 'Dry eyes/mouth', 'GI symptoms'],
            redFlags: ['Rapid autonomic failure (consider autoimmune autonomic ganglionopathy)', 'Weight loss + neuropathy (consider amyloidosis)', 'Young onset with renal/cardiac disease (consider Fabry disease)'],
            commonMisdiagnoses: ['Plantar fasciitis', 'Peripheral vascular disease', 'Fibromyalgia', 'Psychogenic pain']
        },
        physicalExam: {
            inspection: [
                'Usually normal appearance',
                'Skin may appear dry, shiny, or erythematous on feet',
                'No muscle atrophy (motor fibers spared)'
            ],
            palpation: [
                'No nerve enlargement',
                'Feet may be warm or cool (autonomic dysregulation)',
                'Allodynia to light touch on feet'
            ],
            rom: ['Normal throughout'],
            strength: [
                { muscle: 'All muscles', nerve: 'All', root: 'All', action: 'All motor testing', expectedFinding: 'NORMAL (large motor fibers unaffected)', mrcGrade: '5/5' },
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar', root: 'S1-S2', action: 'Toe flexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Feet (distal)', modality: 'Pinprick, temperature (small fiber modalities)', expectedFinding: 'Decreased — small fiber loss' },
                { area: 'Feet', modality: 'Vibration, proprioception (large fiber modalities)', expectedFinding: 'NORMAL — large fibers preserved' },
                { area: 'Feet', modality: 'Light touch with monofilament', expectedFinding: 'May be normal (monofilament tests large fibers)' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'NORMAL (large fiber reflex arc preserved)' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'Normal' }
            ],
            specialTests: [
                { name: 'Pinprick Gradient Test', technique: 'Test pinprick sensation from toe to knee; identify gradient of loss', positiveFinding: 'Reduced pinprick distally with proximal gradient (small fiber loss)' },
                { name: 'Temperature Discrimination', technique: 'Touch warm and cool objects to feet', positiveFinding: 'Unable to distinguish warm from cool' },
                { name: 'Allodynia Testing', technique: 'Light brush of cotton over feet', positiveFinding: 'Painful response to normally non-painful stimulus' },
                { name: 'Skin Biopsy (Gold Standard)', technique: '3mm punch biopsy from distal leg (10cm above lateral malleolus)', positiveFinding: 'Reduced intraepidermal nerve fiber density (IENFD) — this IS the diagnostic test', sensitivity: '78%', specificity: '80%' }
            ]
        },
        keyDistinguishingFindings: [
            'NORMAL standard NCS (sural SNAP amplitude normal) — this is the defining feature',
            'Normal reflexes (intact large-fiber reflex arc)',
            'Normal strength (motor fibers preserved)',
            'Pinprick and temperature loss with preserved vibration and proprioception = small fiber modality dissociation',
            'Skin biopsy with reduced IENFD is the gold standard diagnostic test',
            'EMG is NOT the diagnostic test — order skin biopsy and/or autonomic testing instead'
        ]
    },

    alcoholic_neuropathy: {
        id: 'alcoholic_neuropathy',
        name: 'Alcoholic/Nutritional Neuropathy',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Chronic heavy alcohol use (>100g/day for years), malnutrition, B vitamin deficiency (B1 thiamine, B12, folate)',
            chiefComplaint: 'Painful burning feet and unsteady gait in the setting of chronic alcohol use',
            hpiKeyFeatures: [
                'Gradual onset burning pain and numbness in feet',
                'Length-dependent pattern (stocking > glove)',
                'Associated with chronic heavy alcohol use',
                'Nutritional deficiency (thiamine, B12, folate) compounds the neuropathy',
                'Painful — may be more painful than diabetic neuropathy',
                'Gait ataxia from combined sensory neuropathy and cerebellar atrophy'
            ],
            associatedSymptoms: ['Burning feet', 'Gait unsteadiness', 'Muscle cramps', 'Autonomic symptoms (erectile dysfunction, orthostatic hypotension)'],
            redFlags: ['Acute onset (consider Wernicke encephalopathy — give thiamine URGENTLY)', 'Ophthalmoplegia/confusion (Wernicke triad)', 'Rapidly progressive (consider GBS or toxic exposure)'],
            commonMisdiagnoses: ['Diabetic polyneuropathy', 'B12 deficiency neuropathy', 'Lumbar spinal stenosis', 'Peripheral vascular disease']
        },
        physicalExam: {
            inspection: [
                'Distal leg muscle atrophy',
                'Signs of chronic liver disease (spider nevi, palmar erythema, gynecomastia)',
                'Glossitis (B vitamin deficiency)',
                'Cerebellar ataxia signs (wide-based gait)'
            ],
            palpation: ['Tender calf muscles (myalgias)', 'No nerve enlargement'],
            rom: ['May have ankle contractures from disuse'],
            strength: [
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar', root: 'S1-S2', action: 'Toe flexion', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Gastrocnemius', nerve: 'Tibial', root: 'S1-S2', action: 'Plantarflexion', expectedFinding: 'May be WEAK', mrcGrade: '4-5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Fine motor', expectedFinding: 'Usually NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Feet and distal legs (stocking)', modality: 'Pinprick, temperature, vibration', expectedFinding: 'Decreased (all modalities)' },
                { area: 'Hands (late)', modality: 'Light touch', expectedFinding: 'May be decreased in advanced cases' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'ABSENT' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'May be DIMINISHED' }
            ],
            specialTests: [
                { name: 'Romberg Test', technique: 'Stand feet together, eyes closed', positiveFinding: 'Positive (proprioceptive loss)' },
                { name: 'Tandem Gait', technique: 'Heel-to-toe walking', positiveFinding: 'Unsteady (combined sensory + cerebellar ataxia)' },
                { name: 'Heel-Shin Test', technique: 'Run heel down opposite shin', positiveFinding: 'May show cerebellar component (alcohol cerebellar degeneration)' }
            ]
        },
        keyDistinguishingFindings: [
            'Painful axonal neuropathy in the setting of chronic alcohol abuse',
            'Combined mechanism: direct alcohol neurotoxicity + nutritional deficiency (thiamine, B12, folate)',
            'Gait ataxia may be "double hit": sensory neuropathy + cerebellar atrophy from alcohol',
            'NCS: Axonal pattern (reduced SNAP amplitudes, relatively preserved velocities) — similar to diabetic neuropathy',
            'Check thiamine, B12, folate, methylmalonic acid levels',
            'Treatment: alcohol cessation + B vitamin supplementation — neuropathy may stabilize or partially improve'
        ]
    },

    chemotherapy_neuropathy: {
        id: 'chemotherapy_neuropathy',
        name: 'Chemotherapy-Induced Peripheral Neuropathy (CIPN)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Cancer patients on neurotoxic chemotherapy: platinum agents (cisplatin, oxaliplatin), taxanes (paclitaxel, docetaxel), vinca alkaloids (vincristine), bortezomib, thalidomide',
            chiefComplaint: 'Numbness and tingling in hands and feet developing during or after chemotherapy',
            hpiKeyFeatures: [
                'Onset during or shortly after neurotoxic chemotherapy',
                'Dose-dependent — worsens with cumulative dose',
                '"Coasting" phenomenon: symptoms may worsen for weeks after stopping chemotherapy',
                'Predominantly sensory (numbness, tingling, pain)',
                'Length-dependent stocking-glove pattern',
                'Agent-specific features: oxaliplatin causes acute cold-triggered symptoms'
            ],
            associatedSymptoms: ['Difficulty with buttons', 'Gait unsteadiness', 'Cold sensitivity (oxaliplatin)', 'Jaw tightness (oxaliplatin)'],
            redFlags: ['Motor-predominant (atypical — consider vincristine-specific or CIDP unmasked by chemo)', 'Rapid onset (consider GBS)', 'Asymmetric (consider alternative cause)'],
            commonMisdiagnoses: ['Diabetic neuropathy (if concurrent diabetes)', 'Paraneoplastic neuropathy', 'CIDP (if demyelinating features)', 'B12 deficiency']
        },
        physicalExam: {
            inspection: ['No specific atrophy initially', 'May have chemotherapy-related changes (alopecia, skin changes)'],
            palpation: ['No nerve enlargement', 'Feet may be tender to touch'],
            rom: ['Normal'],
            strength: [
                { muscle: 'Intrinsic foot muscles', nerve: 'Plantar', root: 'S1-S2', action: 'Toe flexion', expectedFinding: 'May be mildly WEAK', mrcGrade: '4/5' },
                { muscle: 'Tibialis Anterior', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'Usually NORMAL', mrcGrade: '5/5' },
                { muscle: 'Hand intrinsics', nerve: 'Ulnar/Median', root: 'C8-T1', action: 'Fine motor', expectedFinding: 'Usually NORMAL', mrcGrade: '5/5' },
                { muscle: 'Quadriceps', nerve: 'Femoral', root: 'L2-L4', action: 'Knee extension', expectedFinding: 'NORMAL', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Feet and hands (stocking-glove)', modality: 'Vibration, proprioception', expectedFinding: 'Decreased (large fiber sensory neuropathy — especially with cisplatin/taxanes)' },
                { area: 'Feet', modality: 'Pinprick, temperature', expectedFinding: 'Decreased' },
                { area: 'Proximal limbs', modality: 'All', expectedFinding: 'Normal' }
            ],
            reflexes: [
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'DIMINISHED or ABSENT' },
                { reflex: 'Knee jerk (L3-L4)', expectedFinding: 'May be DIMINISHED' }
            ],
            specialTests: [
                { name: 'Vibration Testing', technique: '128 Hz tuning fork at great toe', positiveFinding: 'Reduced vibration perception (large fiber loss)' },
                { name: 'Cold Sensitivity Test (Oxaliplatin)', technique: 'Touch cold object to hand', positiveFinding: 'Severe dysesthesia or paresthesia triggered by cold (acute oxaliplatin toxicity)' },
                { name: 'Total Neuropathy Score (TNS)', technique: 'Standardized composite measure of CIPN severity', positiveFinding: 'Quantifies neuropathy for dose-modification decisions' }
            ]
        },
        keyDistinguishingFindings: [
            'Clear temporal relationship to neurotoxic chemotherapy is diagnostic',
            'Dose-dependent: higher cumulative dose → more severe neuropathy',
            'Agent-specific patterns: Cisplatin = sensory ataxia (dorsal root ganglion); Taxanes = painful sensory; Vincristine = more motor involvement; Oxaliplatin = acute cold-triggered',
            'NCS: Axonal sensory neuropathy (reduced SNAPs, especially sural); cisplatin often shows sensory neuronopathy pattern (non-length-dependent)',
            '"Coasting": symptoms may worsen for 2-6 months after drug cessation before stabilizing',
            'May be partially reversible after chemotherapy cessation, but often leaves permanent deficit'
        ]
    },

    vasculitic_neuropathy: {
        id: 'vasculitic_neuropathy',
        name: 'Vasculitic Neuropathy (Mononeuritis Multiplex)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Systemic vasculitis (PAN, ANCA-associated, RA, SLE, cryoglobulinemia, hepatitis B/C), or nonsystemic vasculitic neuropathy',
            chiefComplaint: 'Sudden onset of pain and weakness/numbness in the distribution of individual named nerves, occurring sequentially',
            hpiKeyFeatures: [
                'ASYMMETRIC involvement of individual nerves (mononeuritis multiplex pattern)',
                'Acute/subacute onset of painful neuropathy in named nerve distributions',
                'Sequential involvement: e.g., peroneal neuropathy → then ulnar neuropathy → then radial neuropathy',
                'Painful — nerve ischemia causes severe pain',
                'May evolve to confluent pattern mimicking polyneuropathy over time',
                'Systemic symptoms: fever, weight loss, rash, renal dysfunction'
            ],
            associatedSymptoms: ['Severe nerve-territory pain', 'Constitutional symptoms (fever, weight loss, fatigue)', 'Skin rash (purpura, livedo reticularis)', 'Joint pain', 'Renal involvement'],
            redFlags: ['Rapid multi-nerve involvement (aggressive vasculitis — urgent treatment needed)', 'Renal failure', 'Pulmonary hemorrhage', 'Digital gangrene'],
            commonMisdiagnoses: ['Multifocal radiculopathy', 'CIDP', 'Compression neuropathies (multiple)', 'Diabetic neuropathy']
        },
        physicalExam: {
            inspection: [
                'Skin: purpura, livedo reticularis, digital ischemia, nail fold infarcts',
                'Asymmetric muscle atrophy in affected nerve territories',
                'Foot drop (peroneal) is most commonly affected single nerve'
            ],
            palpation: [
                'Tender nerves in acute phase',
                'Check for palpable purpura (vasculitis)',
                'Nail fold capillaroscopy (if available)'
            ],
            rom: ['Variable — depends on which nerves affected'],
            strength: [
                { muscle: 'Pattern depends on nerves involved', nerve: 'Variable', root: 'Variable', action: 'Test all major named nerves', expectedFinding: 'ASYMMETRIC WEAKNESS', mrcGrade: 'Variable' },
                { muscle: 'Tibialis Anterior (if peroneal)', nerve: 'Deep peroneal', root: 'L4-L5', action: 'Dorsiflexion', expectedFinding: 'WEAK on one side, NORMAL on other', mrcGrade: '0-3/5' },
                { muscle: 'Wrist extensors (if radial)', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'WEAK (if radial involved)', mrcGrade: '2-3/5' },
                { muscle: 'Hand intrinsics (if ulnar)', nerve: 'Ulnar', root: 'C8-T1', action: 'Finger abduction', expectedFinding: 'WEAK (if ulnar involved)', mrcGrade: '3/5' }
            ],
            sensory: [
                { area: 'Named nerve territories (asymmetric)', modality: 'All modalities', expectedFinding: 'Decreased in specific nerve distributions (NOT stocking-glove initially)' },
                { area: 'Between affected territories', modality: 'All', expectedFinding: 'Normal (patchy, not confluent)' }
            ],
            reflexes: [
                { reflex: 'Varies by nerves involved', expectedFinding: 'Asymmetrically affected' },
                { reflex: 'Ankle jerk (S1)', expectedFinding: 'May be asymmetrically reduced' }
            ],
            specialTests: [
                { name: 'Comprehensive Individual Nerve Exam', technique: 'Systematically test motor/sensory in each named peripheral nerve', positiveFinding: 'Deficits map to individual named nerves (not roots or dermatomal pattern)' },
                { name: 'Skin Examination', technique: 'Full skin survey for vasculitic signs', positiveFinding: 'Palpable purpura, livedo reticularis, nail fold infarcts, digital ischemia' },
                { name: 'Nerve Biopsy', technique: 'Sural nerve biopsy (combined with muscle biopsy of peroneus brevis)', positiveFinding: 'Transmural inflammation and fibrinoid necrosis of vasa nervorum — DIAGNOSTIC' }
            ]
        },
        keyDistinguishingFindings: [
            'MONONEURITIS MULTIPLEX pattern: asymmetric, stepwise involvement of individual named nerves',
            'Painful — nerve ischemia causes more pain than compression neuropathies',
            'NCS: Asymmetric axonal neuropathy (reduced amplitudes in affected nerves, normal in unaffected)',
            'Systemic signs (rash, renal, constitutional) suggest systemic vasculitis',
            'Sural + peroneus brevis nerve/muscle biopsy is diagnostic gold standard',
            'Treatment: immunosuppression (steroids ± cyclophosphamide); delay in treatment leads to irreversible nerve damage'
        ]
    },

    mmn: {
        id: 'mmn',
        name: 'Multifocal Motor Neuropathy (MMN)',
        category: 'Polyneuropathy',
        isInappropriate: false,
        history: {
            demographics: 'Young to middle-aged men (men:women 3:1), age 20-50; rare (0.6/100,000)',
            chiefComplaint: 'Slowly progressive asymmetric distal arm weakness without sensory loss',
            hpiKeyFeatures: [
                'Asymmetric weakness in individual nerve distributions',
                'Upper extremity predominant (wrist/finger extensors, intrinsic hand muscles)',
                'NO sensory loss (purely motor)',
                'Slowly progressive over months to years',
                'Anti-GM1 IgM antibodies in 50-80%',
                'KEY: Must distinguish from ALS — MMN is treatable with IVIg'
            ],
            associatedSymptoms: ['Focal muscle atrophy', 'Fasciculations (can mimic ALS)', 'Cramps', 'NO pain (unlike vasculitic neuropathy)'],
            redFlags: ['Upper motor neuron signs (suggests ALS, not MMN)', 'Bulbar symptoms (ALS)', 'Sensory loss (not typical of MMN — reconsider diagnosis)'],
            commonMisdiagnoses: ['ALS (most critical distinction — MMN is treatable)', 'CIDP', 'Mononeuritis multiplex', 'Entrapment neuropathies (multiple)']
        },
        physicalExam: {
            inspection: [
                'Asymmetric hand/forearm muscle atrophy',
                'May have visible fasciculations',
                'No bulbar involvement (tongue, speech normal)',
                'No upper motor neuron signs'
            ],
            palpation: ['No nerve tenderness', 'No nerve enlargement usually'],
            rom: ['Limited by weakness in affected distributions'],
            strength: [
                { muscle: 'Wrist extensors', nerve: 'Radial', root: 'C6-C7', action: 'Wrist extension', expectedFinding: 'WEAK (asymmetrically)', mrcGrade: '3-4/5' },
                { muscle: 'FDI', nerve: 'Ulnar', root: 'C8-T1', action: 'Index abduction', expectedFinding: 'WEAK', mrcGrade: '3-4/5' },
                { muscle: 'ADM', nerve: 'Ulnar', root: 'C8-T1', action: 'Small finger abduction', expectedFinding: 'May be NORMAL (patchy involvement)', mrcGrade: '5/5' },
                { muscle: 'APB', nerve: 'Median', root: 'C8-T1', action: 'Thumb abduction', expectedFinding: 'May be WEAK', mrcGrade: '4/5' },
                { muscle: 'Deltoid', nerve: 'Axillary', root: 'C5-C6', action: 'Shoulder abduction', expectedFinding: 'Usually NORMAL (distal predominant)', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'All distributions', modality: 'All modalities', expectedFinding: 'NORMAL (purely motor — sensory sparing is a hallmark)' }
            ],
            reflexes: [
                { reflex: 'Varies — may be normal or reduced in weak muscles', expectedFinding: 'Variable' },
                { reflex: 'NO hyperreflexia (distinguishes from ALS)', expectedFinding: 'Normal or reduced, NEVER brisk' }
            ],
            specialTests: [
                { name: 'UMN Sign Assessment', technique: 'Test for Babinski, Hoffmann, clonus, brisk reflexes', positiveFinding: 'ALL NEGATIVE — any UMN signs suggest ALS instead', sensitivity: '100% (for excluding MMN if positive)' },
                { name: 'Tongue Fasciculation Check', technique: 'Observe tongue at rest in mouth', positiveFinding: 'NORMAL tongue (no atrophy or fasciculations — bulbar involvement suggests ALS, not MMN)' },
                { name: 'Anti-GM1 IgM Antibodies', technique: 'Serum blood test', positiveFinding: 'Positive in 50-80% of MMN patients', sensitivity: '50-80%', specificity: '95%' }
            ]
        },
        keyDistinguishingFindings: [
            'Purely motor, asymmetric, distal upper extremity predominant',
            'NO sensory loss — EVER. Sensory loss excludes MMN',
            'NO UMN signs — no Babinski, no hyperreflexia, no clonus. UMN signs = ALS',
            'NCS: CONDUCTION BLOCK in motor nerves (motor amplitude drops >50% across a segment) — THE diagnostic hallmark',
            'Anti-GM1 IgM antibodies support diagnosis (positive in ~60%)',
            'RESPONDS to IVIg — treatment trial is warranted even when diagnosis uncertain vs ALS',
            'CRITICAL: Distinguish from ALS because MMN is treatable and ALS is not'
        ]
    }
};
