import { clinicalCasesData } from '../../data/ClinicalCorrelationCases.js';
import { getStandardNormalValues } from '../../data/StandardNCSData.js';

export const ClinicalCases = {
    currentCase: null,
    currentStep: 1,
    userDifferential: '',
    userEMGDecision: null,
    caseDatabase: clinicalCasesData,

