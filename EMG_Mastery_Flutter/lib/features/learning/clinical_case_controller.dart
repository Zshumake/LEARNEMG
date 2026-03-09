import 'package:flutter/material.dart';
import '../../data/clinical_case_data.dart';
import '../../data/models/clinical_case_model.dart';

enum CaseSection {
  presentation,
  physicalExam,
  differential,
  emgDecision,
  results,
  finalDiagnosis,
  complete,
}

class ClinicalCaseController extends ChangeNotifier {
  ClinicalCase? _currentCase;
  CaseSection _currentSection = CaseSection.presentation;

  // Evaluation States
  bool? _isEmgDecisionCorrect;
  String? _emgDecisionFeedback;

  Map<String, List<String>> _synonyms = {
    "cts": [
      "carpal tunnel",
      "carpal tunnel syndrome",
      "median neuropathy at wrist",
    ],
    "une": [
      "ulnar neuropathy at elbow",
      "cubital tunnel",
      "cubital tunnel syndrome",
    ],
    "gbs": [
      "guillain-barre",
      "aidp",
      "acute inflammatory demyelinating polyneuropathy",
    ],
    "cidp": ["chronic inflammatory demyelinating polyneuropathy"],
    "als": ["amyotrophic lateral sclerosis", "lou gehrig"],
    "mg": ["myasthenia gravis", "myasthenia"],
    "md": ["muscular dystrophy"],
    "pn": ["polyneuropathy", "peripheral neuropathy"],
    "radiculopathy": ["root", "radic"],
    "plexopathy": ["plexus"],
  };

  ClinicalCase? get currentCase => _currentCase;
  CaseSection get currentSection => _currentSection;
  bool? get isEmgDecisionCorrect => _isEmgDecisionCorrect;
  String? get emgDecisionFeedback => _emgDecisionFeedback;

  void loadCase(String caseId) {
    if (caseId.isEmpty) {
      _currentCase = null;
      notifyListeners();
      return;
    }
    if (ClinicalCaseData.cases.containsKey(caseId)) {
      _currentCase = ClinicalCaseData.cases[caseId];
      _currentSection = CaseSection.presentation;
      _isEmgDecisionCorrect = null;
      _emgDecisionFeedback = null;
      notifyListeners();
    }
  }

  void nextSection() {
    switch (_currentSection) {
      case CaseSection.presentation:
        _currentSection = CaseSection.physicalExam;
        break;
      case CaseSection.physicalExam:
        _currentSection = CaseSection.differential;
        break;
      case CaseSection.differential:
        _currentSection = CaseSection.emgDecision;
        break;
      case CaseSection.emgDecision:
        if (_currentCase?.requiresEMG == true) {
          _currentSection = CaseSection.results;
        } else {
          _currentSection = CaseSection.finalDiagnosis;
        }
        break;
      case CaseSection.results:
        _currentSection = CaseSection.finalDiagnosis;
        break;
      case CaseSection.finalDiagnosis:
        _currentSection = CaseSection.complete;
        break;
      case CaseSection.complete:
        break;
    }
    notifyListeners();
  }

  bool evaluateEmgDecision(bool isIndicated) {
    if (_currentCase == null) return false;

    bool actuallyIndicated = _currentCase!.emgIndication != "NOT INDICATED";

    if (isIndicated == actuallyIndicated) {
      _isEmgDecisionCorrect = true;
      _emgDecisionFeedback = isIndicated
          ? "Correct! EMG/NCS is indicated for this presentation."
          : "Correct! EMG/NCS is not indicated (Central/Non-peripheral cause).";
      notifyListeners();
      return true;
    } else {
      _isEmgDecisionCorrect = false;
      _emgDecisionFeedback = actuallyIndicated
          ? "Actually, EMG/NCS would be appropriate in this case to localize the peripheral lesion."
          : "Actually, EMG/NCS would not be helpful here as the findings point to a central process.";
      notifyListeners();
      return false;
    }
  }

  bool evaluateFinalDiagnosis(String input) {
    if (_currentCase == null || input.isEmpty) return false;

    String target = _currentCase!.correctDiagnosis.toLowerCase().trim();
    String query = input.toLowerCase().trim();

    // 1. Direct match or inclusion
    if (query == target || target.contains(query) || query.contains(target)) {
      _currentSection = CaseSection.complete;
      notifyListeners();
      return true;
    }

    // 2. Synonym check
    for (var entry in _synonyms.entries) {
      String abbr = entry.key;
      List<String> terms = entry.value;

      bool queryMatchesAny =
          query == abbr || terms.any((t) => t == query || query.contains(t));
      bool targetMatchesAny =
          target == abbr || terms.any((t) => t == target || target.contains(t));

      if (queryMatchesAny && targetMatchesAny) {
        _currentSection = CaseSection.complete;
        notifyListeners();
        return true;
      }
    }

    return false;
  }

  // Helper to check if a section should be "shrunk" (visible as a pill)
  bool isSectionComplete(CaseSection section) {
    return _currentSection.index > section.index;
  }
}
