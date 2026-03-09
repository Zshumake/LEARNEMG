class IntroductionContent {
  final HeaderContent header;
  final PhilosophyContent philosophy;
  final BasicsContent basics;
  final EquipmentContent instrumentation;
  final TechnicalContent technical;
  final LocalizationContent localization;
  final TerminologyContent terminology;

  IntroductionContent({
    required this.header,
    required this.philosophy,
    required this.basics,
    required this.instrumentation,
    required this.technical,
    required this.localization,
    required this.terminology,
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
