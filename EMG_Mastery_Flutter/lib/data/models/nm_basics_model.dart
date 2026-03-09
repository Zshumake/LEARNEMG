class NMClinicalPoint {
  final String title;
  final String detail;

  const NMClinicalPoint({required this.title, required this.detail});
}

class NMEMGSection {
  final String title;
  final List<String> traits;

  const NMEMGSection({required this.title, required this.traits});
}

class NMDeepDive {
  final String title;
  final String text;
  final List<NMClinicalPoint> causes;
  final List<NMClinicalPoint> symptoms;
  final String emgTitle;
  final NMEMGSection? muap;
  final NMEMGSection? recruitment;
  final NMEMGSection? axonal;
  final NMEMGSection? demyelinating;
  final List<String>? emgTraits;
  final String ncsTitle;
  final String ncsFinding;
  final String ncsDetail;
  final String clinicalPresentation;
  final String clinicalStrategy;
  final String pearlTitle;
  final String pearlText;

  const NMDeepDive({
    required this.title,
    required this.text,
    required this.causes,
    required this.symptoms,
    required this.emgTitle,
    this.muap,
    this.recruitment,
    this.axonal,
    this.demyelinating,
    this.emgTraits,
    required this.ncsTitle,
    required this.ncsFinding,
    required this.ncsDetail,
    required this.clinicalPresentation,
    required this.clinicalStrategy,
    required this.pearlTitle,
    required this.pearlText,
  });
}

class NMComparisonValue {
  final String text;
  final String sub;

  const NMComparisonValue({required this.text, required this.sub});
}

class NMComparisonRow {
  final String? category;
  final String? feature;
  final NMComparisonValue? myopathy;
  final NMComparisonValue? neuropathy;

  const NMComparisonRow({
    this.category,
    this.feature,
    this.myopathy,
    this.neuropathy,
  });
}

class NMGlossaryItem {
  final String term;
  final String def;

  const NMGlossaryItem({required this.term, required this.def});
}

class NMQuizQuestion {
  final String question;
  final List<String> options;
  final int correct;
  final String explanation;

  const NMQuizQuestion({
    required this.question,
    required this.options,
    required this.correct,
    required this.explanation,
  });
}
