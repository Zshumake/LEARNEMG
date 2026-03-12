import { ClinicalTables } from './components/ClinicalTables.js';
import { ClinicalEvaluator } from './ClinicalEvaluator.js';
import { ClinicalIcons } from './components/ClinicalIcons.js';
import { ClinicalDashboardRenderer } from './components/ClinicalDashboardRenderer.js';
import { ClinicalShellRenderer } from './components/ClinicalShellRenderer.js';
import { ClinicalExamRenderer } from './components/ClinicalExamRenderer.js';
import { ClinicalDiagnosisRenderer } from './components/ClinicalDiagnosisRenderer.js';

export const ClinicalRenderer = {
    getSvgIcon: function (name, color, size) {
        return ClinicalIcons.getSvgIcon(name, color, size);
    },
    renderDashboard: function (pgyLevel, caseDatabase, selectedDifficulty) {
        return ClinicalDashboardRenderer.renderDashboard(pgyLevel, caseDatabase, selectedDifficulty);
    },
    renderInterfaceShell: function () {
        return ClinicalShellRenderer.renderInterfaceShell();
    },
    renderCaseDetails: function (caseData) {
        return ClinicalExamRenderer.renderCaseDetails(caseData);
    },
    renderPhysicalExam: function (exam) {
        return ClinicalExamRenderer.renderPhysicalExam(exam);
    },
    renderDifferentialFeedback: function (results, expected) {
        return ClinicalDiagnosisRenderer.renderDifferentialFeedback(results, expected);
    },
    renderEMGDecisionFeedback: function (evaluation) {
        return ClinicalDiagnosisRenderer.renderEMGDecisionFeedback(evaluation);
    },
    renderFinalDiagnosis: function (isCorrect, currentCase, userDiagnosis) {
        return ClinicalDiagnosisRenderer.renderFinalDiagnosis(isCorrect, currentCase, userDiagnosis);
    },
    generateEvidenceReview: function (caseData, color) {
        return ClinicalDiagnosisRenderer.generateEvidenceReview(caseData, color);
    }
};
