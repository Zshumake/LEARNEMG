import { handWristCases } from './HandWristCases.js?v=20260317';
import { ulnarCases } from './UlnarCases.js?v=20260317';
import { medianForearmCases } from './MedianForearmCases.js?v=20260317';
import { radialCases } from './RadialCases.js?v=20260317';
import { shoulderCases } from './ShoulderCases.js?v=20260317';
import { plexopathyCases } from './PlexopathyCases.js?v=20260317';
import { radiculopathyCases } from './RadiculopathyCases.js?v=20260317';
import { lowerExtremityCases } from './LowerExtremityCases.js?v=20260317';
import { nMJCases } from './NMJCases.js?v=20260317';
import { myopathyCases } from './MyopathyCases.js?v=20260317';
import { systemicCases } from './SystemicCases.js?v=20260317';
import { specialCases } from './SpecialCases.js?v=20260317';

export const clinicalCasesData = {
    ...handWristCases,
    ...ulnarCases,
    ...medianForearmCases,
    ...radialCases,
    ...shoulderCases,
    ...plexopathyCases,
    ...radiculopathyCases,
    ...lowerExtremityCases,
    ...nMJCases,
    ...myopathyCases,
    ...systemicCases,
    ...specialCases,
};
