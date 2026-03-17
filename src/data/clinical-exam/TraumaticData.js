export const traumaticData = {

    traumatic_brachial_plexus: {
        id: 'traumatic_brachial_plexus',
        name: 'Traumatic Brachial Plexus Injury',
        category: 'Traumatic Nerve Injury',
        isInappropriate: false,
        history: {
            demographics: 'Young adults (motorcycle accidents, contact sports); neonates (birth injury — Erb or Klumpke palsy); mechanism determines level',
            chiefComplaint: 'Arm weakness and numbness after trauma — motorcycle accident, fall, or shoulder dislocation',
            hpiKeyFeatures: [
                'High-energy mechanism: motorcycle accident (most common adult cause), fall from height, shoulder dislocation',
                'Upper trunk (C5-C6) — Erb palsy: shoulder abduction/external rotation and elbow flexion lost ("waiter\'s tip")',
                'Lower trunk (C8-T1) — Klumpke palsy: hand intrinsic weakness, finger flexion lost',
                'Pan-plexus: flail arm with complete sensorimotor loss',
                'Horner syndrome (ptosis, miosis, anhidrosis) suggests preganglionic T1 root avulsion — poor prognosis',
                'Timing critical: early referral for surgical exploration if no recovery by 3-6 months',
                'Pain: burning neuropathic pain common, especially with root avulsions'
            ],
            associatedSymptoms: ['Shoulder subluxation (deltoid/rotator cuff paralysis)', 'Winging of scapula', 'Horner syndrome (T1 avulsion)', 'Neuropathic pain', 'Edema of affected limb', 'Trophic skin changes'],
            redFlags: ['Horner syndrome (preganglionic avulsion — cannot regenerate)', 'Vascular injury (subclavian artery — check pulses)', 'Associated fractures (clavicle, humerus, scapula)', 'Expanding hematoma', 'Complete flail arm with no recovery at 3 months'],
            commonMisdiagnoses: ['Rotator cuff tear (co-existing)', 'Cervical radiculopathy', 'Thoracic outlet syndrome', 'Shoulder dislocation only (missing nerve injury)', 'Peripheral nerve injury (single nerve vs plexus)']
        },
        physicalExam: {
            inspection: [
                'Arm posture: "waiter\'s tip" (upper trunk) or claw hand (lower trunk)',
                'Muscle atrophy (develops over weeks — deltoid, biceps, forearm, hand intrinsics depending on level)',
                'Scapular winging (long thoracic nerve involvement)',
                'Horner syndrome: ptosis, miosis, anhidrosis on affected side',
                'Trophic changes: dry skin, hair loss, nail changes in denervated territory',
                'Bruising/swelling over clavicle or axilla acutely'
            ],
            palpation: ['Clavicle fracture (palpate for step-off)', 'Shoulder subluxation (acromion prominence)', 'Supraclavicular mass (neuroma or pseudomeningocele)', 'Tinel sign along plexus (supraclavicular, infraclavicular)'],
            rom: ['Passive ROM full (unless joint injury) — active ROM limited by weakness', 'Shoulder: passive external rotation full but active absent (upper trunk)', 'Elbow: passive flexion/extension full', 'Wrist/hand: passive full, active limited in lower trunk injury'],
            strength: [
                { muscle: 'Deltoid', nerve: 'Axillary (C5-C6)', root: 'Upper trunk', action: 'Shoulder abduction', expectedFinding: 'ABSENT in upper trunk injury', mrcGrade: '0-1/5' },
                { muscle: 'Biceps', nerve: 'Musculocutaneous (C5-C6)', root: 'Upper trunk → lateral cord', action: 'Elbow flexion', expectedFinding: 'ABSENT in upper trunk injury', mrcGrade: '0-1/5' },
                { muscle: 'Infraspinatus', nerve: 'Suprascapular (C5-C6)', root: 'Upper trunk', action: 'Shoulder external rotation', expectedFinding: 'ABSENT in upper trunk injury', mrcGrade: '0-1/5' },
                { muscle: 'Wrist Extensors', nerve: 'Radial (C6-C7)', root: 'Middle/upper trunk → posterior cord', action: 'Wrist extension', expectedFinding: 'Variable — depends on extent', mrcGrade: '0-4/5' },
                { muscle: 'Finger Flexors (FDP)', nerve: 'Median/Ulnar (C8-T1)', root: 'Lower trunk', action: 'Finger flexion', expectedFinding: 'ABSENT in lower trunk injury', mrcGrade: '0-1/5' },
                { muscle: 'Hand Intrinsics', nerve: 'Ulnar/Median (C8-T1)', root: 'Lower trunk → medial cord', action: 'Finger abduction/adduction', expectedFinding: 'ABSENT in lower trunk injury', mrcGrade: '0-1/5' },
                { muscle: 'Serratus Anterior', nerve: 'Long thoracic (C5-C7)', root: 'Proximal — direct from roots', action: 'Scapular protraction', expectedFinding: 'ABSENT if root avulsion C5-C7', mrcGrade: '0/5' },
                { muscle: 'Rhomboids', nerve: 'Dorsal scapular (C5)', root: 'Proximal — direct from C5 root', action: 'Scapular retraction', expectedFinding: 'ABSENT if C5 root avulsion (preganglionic sign)', mrcGrade: '0/5' }
            ],
            sensory: [
                { area: 'Lateral arm (regimental badge)', modality: 'Light touch, pinprick', expectedFinding: 'ABSENT in upper trunk (axillary nerve territory — C5)' },
                { area: 'Lateral forearm', modality: 'Light touch, pinprick', expectedFinding: 'ABSENT in upper trunk (musculocutaneous nerve — C6)' },
                { area: 'Middle finger', modality: 'Light touch, pinprick', expectedFinding: 'ABSENT in middle trunk (C7)' },
                { area: 'Medial forearm', modality: 'Light touch, pinprick', expectedFinding: 'ABSENT in lower trunk (medial antebrachial cutaneous — C8-T1)' },
                { area: 'Medial arm', modality: 'Light touch, pinprick', expectedFinding: 'ABSENT in lower trunk (medial brachial cutaneous — T1)' }
            ],
            reflexes: [
                { reflex: 'Biceps (C5-C6)', expectedFinding: 'ABSENT in upper trunk injury' },
                { reflex: 'Brachioradialis (C5-C6)', expectedFinding: 'ABSENT in upper trunk injury' },
                { reflex: 'Triceps (C7)', expectedFinding: 'ABSENT in middle trunk or pan-plexus injury' },
                { reflex: 'Finger flexors (C8)', expectedFinding: 'ABSENT in lower trunk injury' }
            ],
            specialTests: [
                { name: 'Tinel Sign (Supraclavicular)', technique: 'Percuss over Erb point (supraclavicular fossa, posterior triangle of neck)', positiveFinding: 'Tingling radiating into arm suggests neuroma-in-continuity (postganglionic — better prognosis)', sensitivity: '60-70%' },
                { name: 'Scapular Winging Test', technique: 'Push against wall with outstretched arms', positiveFinding: 'Medial winging (serratus anterior) suggests long thoracic nerve / root-level injury' },
                { name: 'Horner Syndrome Check', technique: 'Examine pupils in dim light; check for ptosis, miosis, anhidrosis', positiveFinding: 'Horner syndrome = preganglionic T1 avulsion (nerve root torn from cord — cannot be repaired directly)' },
                { name: 'Histamine Test (Axon Reflex)', technique: 'Intradermal histamine injection in denervated skin', positiveFinding: 'Flare PRESENT = preganglionic (DRG intact, axon reflex preserved); flare ABSENT = postganglionic', specificity: '85%' },
                { name: 'Serial Tinel Sign', technique: 'Track advancing Tinel over weeks/months along nerve course', positiveFinding: 'Advancing Tinel = nerve regeneration occurring (~1 mm/day); static Tinel = no regeneration' }
            ]
        },
        keyDistinguishingFindings: [
            'Pattern of weakness maps to brachial plexus anatomy (trunk/cord/division level), NOT single nerve or root',
            'Horner syndrome (ptosis, miosis, anhidrosis) = preganglionic T1 root avulsion — surgical nerve transfer needed (cannot directly repair)',
            'Rhomboid and serratus weakness = preganglionic injury (these nerves branch PROXIMAL to plexus)',
            'EMG: Denervation in muscles from MULTIPLE nerves sharing common trunk/cord (e.g., deltoid + biceps + infraspinatus = upper trunk)',
            'SNAP preservation with sensory loss = preganglionic avulsion (DRG intact but root torn from cord — pathognomonic)',
            'MRI myelogram or CT myelogram: pseudomeningocele at root level confirms avulsion',
            'Timing of EMG: wait 2-3 weeks for Wallerian degeneration; repeat at 3-6 months to assess reinnervation'
        ]
    },

    peripheral_nerve_laceration: {
        id: 'peripheral_nerve_laceration',
        name: 'Peripheral Nerve Laceration / Transection',
        category: 'Traumatic Nerve Injury',
        isInappropriate: false,
        history: {
            demographics: 'Any age; sharp trauma (lacerations, surgical injury), fractures (humeral shaft → radial nerve), or penetrating injury',
            chiefComplaint: 'Sudden weakness and numbness in a specific nerve distribution after trauma or surgery',
            hpiKeyFeatures: [
                'Acute onset weakness/numbness immediately following trauma',
                'Sharp laceration (knife, glass, propeller) — clean transection, better surgical prognosis',
                'Fracture-associated: humeral shaft (radial nerve 12-18%), supracondylar humerus (median/AIN), fibular head (common peroneal)',
                'Iatrogenic: post-surgical (hip replacement → sciatic, shoulder surgery → axillary, knee arthroscopy → peroneal)',
                'Complete vs incomplete: partial lacerations may have mixed findings (some muscles spared)',
                'Neurotmesis (complete transection) requires surgical repair — will NOT recover spontaneously',
                'Timeline: no recovery by 3 months in complete lesion → likely needs surgery'
            ],
            associatedSymptoms: ['Complete sensory loss in nerve territory', 'Immediate paralysis of nerve-innervated muscles', 'Causalgia / CRPS (especially partial nerve injuries)', 'Neuroma pain at injury site', 'Autonomic changes: dry skin, temperature changes in affected area'],
            redFlags: ['Vascular injury (compartment syndrome — pain with passive stretch, absent pulses)', 'Expanding hematoma', 'Open fracture with nerve deficit', 'Complete nerve deficit after closed fracture (may need surgical exploration)', 'Worsening deficit after cast/splint application (compartment syndrome)'],
            commonMisdiagnoses: ['Tendon laceration only (missed nerve injury)', 'Radiculopathy', 'Central lesion (stroke)', 'Conversion disorder / functional', 'Compartment syndrome (missed)']
        },
        physicalExam: {
            inspection: [
                'Wound/scar in path of known nerve (lacerations, surgical scars)',
                'Muscle atrophy in nerve territory (develops over 2-3 weeks)',
                'Deformity: wrist drop (radial), claw hand (ulnar), ape hand (median), foot drop (peroneal)',
                'Trophic changes: smooth/shiny skin, hair loss, nail dystrophy in chronic cases',
                'Vasomotor changes: color and temperature difference in denervated territory'
            ],
            palpation: ['Wound/scar over nerve course', 'Tinel sign at injury site (neuroma formation)', 'Advancing Tinel distally suggests regeneration', 'Compartment firmness (if compartment syndrome suspected)'],
            rom: ['Passive ROM: FULL (unless joint injury or contracture in chronic cases)', 'Active ROM: LIMITED only by motor deficit', 'Joint contracture may develop if not range for weeks/months'],
            strength: [
                { muscle: 'Muscles distal to injury', nerve: 'Affected nerve', root: 'Variable', action: 'All actions innervated by injured nerve', expectedFinding: 'ABSENT (0/5) if complete transection; partial weakness if incomplete', mrcGrade: '0/5 (complete) or variable (incomplete)' },
                { muscle: 'Muscles proximal to injury', nerve: 'Affected nerve (proximal branches)', root: 'Variable', action: 'Proximal actions', expectedFinding: 'NORMAL if injury is distal to branch point', mrcGrade: '5/5' },
                { muscle: 'Muscles of adjacent nerves', nerve: 'Uninjured nerves', root: 'Variable', action: 'Various', expectedFinding: 'NORMAL — helps confirm single nerve lesion', mrcGrade: '5/5' }
            ],
            sensory: [
                { area: 'Autonomous zone of injured nerve', modality: 'Light touch, pinprick, temperature', expectedFinding: 'ABSENT (complete anesthesia in autonomous zone — area uniquely innervated by that nerve)' },
                { area: 'Overlap zone', modality: 'Light touch, pinprick', expectedFinding: 'REDUCED (partial overlap from adjacent nerves provides some preserved sensation)' },
                { area: 'Adjacent nerve territory', modality: 'All modalities', expectedFinding: 'NORMAL — confirms single nerve lesion' }
            ],
            reflexes: [
                { reflex: 'Reflex subserved by injured nerve', expectedFinding: 'ABSENT (e.g., ankle jerk absent with tibial nerve transection, biceps absent with musculocutaneous)' },
                { reflex: 'Reflexes from other nerves', expectedFinding: 'NORMAL' }
            ],
            specialTests: [
                { name: 'Tinel Sign (at Injury Site)', technique: 'Percuss over the injury/repair site and along the nerve distally', positiveFinding: 'Tingling at site = neuroma; advancing Tinel distally over time (1 mm/day) = regeneration', sensitivity: '70-80%' },
                { name: 'Wrinkle Test', technique: 'Immerse hand in warm water for 5 minutes (tests sympathetic innervation)', positiveFinding: 'No wrinkling in denervated fingers (sympathetic fibers travel with peripheral nerves)', sensitivity: '90%', specificity: '95%' },
                { name: 'Ninhydrin Sweat Test', technique: 'Apply ninhydrin to fingertips — detects amino acids in sweat', positiveFinding: 'No sweat prints in denervated territory (loss of sudomotor function)', sensitivity: '85%' },
                { name: 'Nerve-Specific Motor Tests', technique: 'Test pathognomonic movements for each nerve (e.g., OK sign for AIN, cross fingers for ulnar)', positiveFinding: 'Inability to perform nerve-specific action confirms which nerve is injured' },
                { name: 'Two-Point Discrimination', technique: 'Test static and moving 2PD in nerve territory (normal finger: 3-5mm static)', positiveFinding: '>10mm or absent 2PD in nerve territory; useful for tracking recovery post-repair' }
            ]
        },
        keyDistinguishingFindings: [
            'Deficit maps EXACTLY to single peripheral nerve territory — all muscles and sensory areas distal to injury affected',
            'Clear temporal relationship: deficit appeared immediately after trauma/surgery',
            'EMG timing: at 2-3 weeks, fibrillations/PSWs appear in denervated muscles (Wallerian degeneration complete)',
            'NCS: absent CMAP and SNAP distal to injury (after Wallerian degeneration) — confirms axonal loss, not just neurapraxia',
            'Neurapraxia (conduction block) vs Axonotmesis (axon loss) vs Neurotmesis (complete transection) — EMG/NCS distinguishes these',
            'If NCS shows conduction block only (preserved distal CMAP, block across lesion) = neurapraxia — excellent prognosis, no surgery needed',
            'Intraoperative nerve stimulation can assess continuity if surgical exploration performed'
        ]
    }
};
