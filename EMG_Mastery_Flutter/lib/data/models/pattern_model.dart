class AnalysisSection {
  final String title;
  final List<AnalysisItem> items;

  const AnalysisSection({required this.title, required this.items});
}

class AnalysisItem {
  final String label;
  final String desc;

  const AnalysisItem({required this.label, required this.desc});
}

class PatternDetail {
  final String id;
  final String title;
  final String description;
  final String videoId;
  final List<ClinicalPearl> clinicalPearls;

  const PatternDetail({
    required this.id,
    required this.title,
    required this.description,
    required this.videoId,
    required this.clinicalPearls,
  });
}

class ClinicalPearl {
  final String label;
  final String value;

  const ClinicalPearl({required this.label, required this.value});
}

class CaseScenario {
  final String id;
  final String title;
  final String clinical;
  final String findings;
  final List<String> features;

  const CaseScenario({
    required this.id,
    required this.title,
    required this.clinical,
    required this.findings,
    required this.features,
  });
}

class ReferencePattern {
  final String pattern;
  final String source;
  final String sound;
  final String rate;
  final String stable;
  final String sig;

  const ReferencePattern({
    required this.pattern,
    required this.source,
    required this.sound,
    required this.rate,
    required this.stable,
    required this.sig,
  });
}
