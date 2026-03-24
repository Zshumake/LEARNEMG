class IntroductionContent {
  final HeaderContent header;
  final PhilosophyContent philosophy;
  final BasicsContent basics;
  final EquipmentContent instrumentation;
  final TechnicalContent technical;
  final LocalizationContent localization;
  final TerminologyContent terminology;
  final List<SunderlandGrade>? sunderlandClassification;
  final List<TemporalTimepoint>? temporalEvolution;
  final MartinGruberContent? martinGruber;
  final List<ExpandedPattern>? expandedPatterns;
  final List<LocalizationScenario>? localizationScenarios;

  IntroductionContent({
    required this.header,
    required this.philosophy,
    required this.basics,
    required this.instrumentation,
    required this.technical,
    required this.localization,
    required this.terminology,
    this.sunderlandClassification,
    this.temporalEvolution,
    this.martinGruber,
    this.expandedPatterns,
    this.localizationScenarios,
  });
}

class HeaderContent {
  final String title;
  final String subtitle;

  HeaderContent({required this.title, required this.subtitle});
}

class PhilosophyContent {
  final CorePhilosophy core;
  final List<PhilosophyStep> encounter;
  final List<CardinalRule> cardinalRules;

  PhilosophyContent({
    required this.core,
    required this.encounter,
    required this.cardinalRules,
  });
}

class CorePhilosophy {
  final String title;
  final String text;
  final String aim;
  final String pearl;

  CorePhilosophy({
    required this.title,
    required this.text,
    required this.aim,
    required this.pearl,
  });
}

class PhilosophyStep {
  final int step;
  final String title;
  final String detail;

  PhilosophyStep({
    required this.step,
    required this.title,
    required this.detail,
  });
}

class CardinalRule {
  final int id;
  final String title;
  final String color;
  final String text;

  CardinalRule({
    required this.id,
    required this.title,
    required this.color,
    required this.text,
  });
}

class BasicsContent {
  final List<AnatomyPhysiologyDetail> anatomy;
  final List<AnatomyPhysiologyDetail> physiology;

  BasicsContent({required this.anatomy, required this.physiology});
}

class AnatomyPhysiologyDetail {
  final String title;
  final String detail;
  final String? image;
  final String? pearl;

  AnatomyPhysiologyDetail({
    required this.title,
    required this.detail,
    this.image,
    this.pearl,
  });
}

class EquipmentContent {
  final String amplifiers;
  final String filters;

  EquipmentContent({required this.amplifiers, required this.filters});
}

class TechnicalContent {
  final List<FactorDetail> physiologic;
  final List<FactorDetail> nonPhysiologic;
  final SafetyContent safety;

  TechnicalContent({
    required this.physiologic,
    required this.nonPhysiologic,
    required this.safety,
  });
}

class FactorDetail {
  final String factor;
  final String effect; // or 'cause' for non-physiologic
  final String? solution; // for non-physiologic

  FactorDetail({required this.factor, required this.effect, this.solution});
}

class SafetyContent {
  final String pacemakers;
  final String anticoagulation;
  final String infection;

  SafetyContent({
    required this.pacemakers,
    required this.anticoagulation,
    required this.infection,
  });
}

class LocalizationContent {
  final List<PathophysiologyDetail> pathophysiology;
  final List<PatternDetail> patterns;

  LocalizationContent({required this.pathophysiology, required this.patterns});
}

class PathophysiologyDetail {
  final String type;
  final String findings;
  final String prognosis;

  PathophysiologyDetail({
    required this.type,
    required this.findings,
    required this.prognosis,
  });
}

class PatternDetail {
  final String site;
  final String snap;
  final String cmap;

  PatternDetail({required this.site, required this.snap, required this.cmap});
}

class TerminologyContent {
  final List<GlossaryTerm> glossary;
  final List<MasteryTerm> masteryTerms;

  TerminologyContent({required this.glossary, required this.masteryTerms});
}

class GlossaryTerm {
  final String term;
  final String category;
  final String definition;

  GlossaryTerm({
    required this.term,
    required this.category,
    required this.definition,
  });
}

class MasteryTerm {
  final String term;
  final String definition;

  MasteryTerm({required this.term, required this.definition});
}

class SunderlandGrade {
  final String grade;
  final String injury;
  final String pathology;
  final String recovery;
  final String edxFindings;

  SunderlandGrade({
    required this.grade,
    required this.injury,
    required this.pathology,
    required this.recovery,
    required this.edxFindings,
  });
}

class TemporalTimepoint {
  final String timepoint;
  final String finding;
  final String explanation;

  TemporalTimepoint({
    required this.timepoint,
    required this.finding,
    required this.explanation,
  });
}

class MartinGruberContent {
  final String title;
  final String prevalence;
  final String description;
  final List<String> clinicalImpact;
  final String source;

  MartinGruberContent({
    required this.title,
    required this.prevalence,
    required this.description,
    required this.clinicalImpact,
    required this.source,
  });
}

class ExpandedPattern {
  final String site;
  final String snap;
  final String cmap;
  final String emg;
  final String keyFeature;

  ExpandedPattern({
    required this.site,
    required this.snap,
    required this.cmap,
    required this.emg,
    required this.keyFeature,
  });
}

class LocalizationScenario {
  final String stem;
  final String question;
  final List<String> options;
  final int correct;
  final String explanation;

  LocalizationScenario({
    required this.stem,
    required this.question,
    required this.options,
    required this.correct,
    required this.explanation,
  });
}
