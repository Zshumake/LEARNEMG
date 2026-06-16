import 'evidence_review.dart';

class ClinicalCase {
  final String id;
  final String title;
  final String difficulty;
  final CasePresentation presentation;
  final PhysicalExam physicalExam;
  final List<DifferentialItem> differentialDiagnosis;
  final bool requiresEMG;
  final String emgIndication;
  final String correctDiagnosis;
  final String explanation;
  final Map<String, String>? reviewOfSystems;
  final HumoralData? humoralData;
  final NCSStudies? ncsStudies;
  final List<EMGFinding>? emgStudies;
  final List<String>? teachingPoints;
  final String? educationalNote;

  ClinicalCase({
    required this.id,
    required this.title,
    required this.difficulty,
    required this.presentation,
    required this.physicalExam,
    required this.differentialDiagnosis,
    required this.requiresEMG,
    required this.emgIndication,
    required this.correctDiagnosis,
    required this.explanation,
    this.reviewOfSystems,
    this.humoralData,
    this.ncsStudies,
    this.emgStudies,
    this.teachingPoints,
    this.educationalNote,
  });

  List<EvidencePoint> generateEvidenceReview() {
    return EvidenceReviewGenerator.generate(this);
  }
}

class CasePresentation {
  final double age;
  final String gender;
  final String? occupation;
  final String chiefComplaint;
  final String history;
  final String pmh;
  final String? medications;
  final String? familyHistory;

  CasePresentation({
    required this.age,
    required this.gender,
    this.occupation,
    required this.chiefComplaint,
    required this.history,
    required this.pmh,
    this.medications,
    this.familyHistory,
  });
}

class PhysicalExam {
  final String inspection;
  final String palpation;
  final String rom;
  final String strength;
  final String sensation;
  final String reflexes;
  final String specialTests;

  PhysicalExam({
    required this.inspection,
    required this.palpation,
    required this.rom,
    required this.strength,
    required this.sensation,
    required this.reflexes,
    required this.specialTests,
  });
}

class DifferentialItem {
  final String name;
  final String ruleOut;

  DifferentialItem({required this.name, required this.ruleOut});
}

class HumoralData {
  final List<String>? labs;
  final List<String>? imaging;

  HumoralData({this.labs, this.imaging});
}

class NCSStudies {
  final List<NCSSensoryStudy>? sensory;
  final List<NCSMotorStudy>? motor;
  final List<NCSComparisonStudy>? comparison;

  NCSStudies({this.sensory, this.motor, this.comparison});
}

class NCSSensoryStudy {
  final String name;
  final String? onset;
  final String? peak;
  final String? amp;
  final String? dist;
  final String? velocity;
  final bool abnormal;
  final String? comment;

  NCSSensoryStudy({
    required this.name,
    this.onset,
    this.peak,
    this.amp,
    this.dist,
    this.velocity,
    required this.abnormal,
    this.comment,
  });
}

class NCSMotorStudy {
  final String name;
  final String? latency;
  final String? amp;
  final String? dist;
  final String? velocity;
  final bool abnormal;
  final String? comment;

  NCSMotorStudy({
    required this.name,
    this.latency,
    this.amp,
    this.dist,
    this.velocity,
    required this.abnormal,
    this.comment,
  });
}

class NCSComparisonStudy {
  final String name;
  final String? measureA;
  final String? measureB;
  final String? deltaP;
  final String? velocity;
  final bool abnormal;

  NCSComparisonStudy({
    required this.name,
    this.measureA,
    this.measureB,
    this.deltaP,
    this.velocity,
    required this.abnormal,
  });
}

class EMGFinding {
  final String muscle;
  final String? nerve;
  final String? root;
  final bool abnormal;
  final String? insAct;
  final String? fibs;
  final String? psw;
  final String? fascic;
  final String? motorUnits;
  final String? recruitment;
  final String? comment;
  final String? dur;
  final String? spontaneousActivity;

  EMGFinding({
    required this.muscle,
    this.nerve,
    this.root,
    required this.abnormal,
    this.insAct,
    this.fibs,
    this.psw,
    this.fascic,
    this.motorUnits,
    this.recruitment,
    this.comment,
    this.dur,
    this.spontaneousActivity,
  });
}
