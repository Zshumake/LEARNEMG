import { entrapmentUpperData } from './EntrapmentUpperData.js?v=20260317';
import { entrapmentLowerData } from './EntrapmentLowerData.js?v=20260317';
import { cervicalRadiculopathyData } from './CervicalRadiculopathyData.js?v=20260317';
import { lumbosacralRadiculopathyData } from './LumbosacralRadiculopathyData.js?v=20260317';
import { plexopathyData } from './PlexopathyData.js?v=20260317';
import { polyneuropathyData } from './PolyneuropathyData.js?v=20260317';
import { motorNeuronData } from './MotorNeuronData.js?v=20260317';
import { nmjData } from './NMJData.js?v=20260317';
import { myopathyData } from './MyopathyData.js?v=20260317';
import { inappropriateReferralData } from './InappropriateReferralData.js?v=20260317';
import { traumaticData } from './TraumaticData.js?v=20260317';

// All diagnoses merged into a single flat object
export const clinicalExamData = {
    ...entrapmentUpperData,
    ...entrapmentLowerData,
    ...cervicalRadiculopathyData,
    ...lumbosacralRadiculopathyData,
    ...plexopathyData,
    ...polyneuropathyData,
    ...motorNeuronData,
    ...nmjData,
    ...myopathyData,
    ...inappropriateReferralData,
    ...traumaticData,
};

// Category groupings for the sidebar accordion
export const DIAGNOSIS_CATEGORIES = [
    {
        name: 'Entrapment - Upper Extremity',
        ids: Object.keys(entrapmentUpperData)
    },
    {
        name: 'Entrapment - Lower Extremity',
        ids: Object.keys(entrapmentLowerData)
    },
    {
        name: 'Cervical Radiculopathy',
        ids: Object.keys(cervicalRadiculopathyData)
    },
    {
        name: 'Lumbosacral Radiculopathy',
        ids: Object.keys(lumbosacralRadiculopathyData)
    },
    {
        name: 'Plexopathy',
        ids: Object.keys(plexopathyData)
    },
    {
        name: 'Polyneuropathy',
        ids: Object.keys(polyneuropathyData)
    },
    {
        name: 'Motor Neuron Disease',
        ids: Object.keys(motorNeuronData)
    },
    {
        name: 'Neuromuscular Junction',
        ids: Object.keys(nmjData)
    },
    {
        name: 'Myopathy',
        ids: Object.keys(myopathyData)
    },
    {
        name: 'Inappropriate/Non-EMG Referral',
        ids: Object.keys(inappropriateReferralData)
    },
    {
        name: 'Traumatic Nerve Injury',
        ids: Object.keys(traumaticData)
    }
];
