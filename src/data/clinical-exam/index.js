import { entrapmentUpperData } from './EntrapmentUpperData.js?v=ae1516a2';
import { entrapmentLowerData } from './EntrapmentLowerData.js?v=f3f2be58';
import { cervicalRadiculopathyData } from './CervicalRadiculopathyData.js?v=061477b3';
import { lumbosacralRadiculopathyData } from './LumbosacralRadiculopathyData.js?v=4e081407';
import { plexopathyData } from './PlexopathyData.js?v=90449792';
import { polyneuropathyData } from './PolyneuropathyData.js?v=982b659c';
import { motorNeuronData } from './MotorNeuronData.js?v=101cc394';
import { nmjData } from './NMJData.js?v=38a0df8d';
import { myopathyData } from './MyopathyData.js?v=87c4e35a';
import { inappropriateReferralData } from './InappropriateReferralData.js?v=0ebfee45';
import { traumaticData } from './TraumaticData.js?v=fb90be8a';

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
