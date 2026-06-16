import { handWristCases } from './HandWristCases.js?v=22c4671e';
import { ulnarCases } from './UlnarCases.js?v=1a4938f2';
import { medianForearmCases } from './MedianForearmCases.js?v=0cd45b82';
import { radialCases } from './RadialCases.js?v=75da0b5a';
import { shoulderCases } from './ShoulderCases.js?v=9a9bd08a';
import { plexopathyCases } from './PlexopathyCases.js?v=3f074e50';
import { radiculopathyCases } from './RadiculopathyCases.js?v=f1e3ccb4';
import { lowerExtremityCases } from './LowerExtremityCases.js?v=5d56d04d';
import { nMJCases } from './NMJCases.js?v=9747c4bc';
import { myopathyCases } from './MyopathyCases.js?v=36dc9b58';
import { systemicCases } from './SystemicCases.js?v=944c4df9';
import { specialCases } from './SpecialCases.js?v=2e78cbe2';

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
