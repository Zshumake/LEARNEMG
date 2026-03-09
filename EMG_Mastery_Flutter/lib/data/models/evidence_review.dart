import 'package:flutter/material.dart';
import 'clinical_case_model.dart';

class EvidencePoint {
  final IconData icon;
  final String text;

  EvidencePoint({required this.icon, required this.text});
}

class EvidenceReviewGenerator {
  static List<EvidencePoint> generate(ClinicalCase caseData) {
    List<EvidencePoint> points = [];

    // 1. Physical Exam Special Tests
    final specialTests = caseData.physicalExam.specialTests.toLowerCase();

    if (specialTests.contains('tinel')) {
      points.add(
        EvidencePoint(
          icon: Icons.touch_app_outlined,
          text:
              'Positive Tinel sign suggests focal nerve irritability at the site of compression.',
        ),
      );
    }

    if (specialTests.contains('spurling')) {
      points.add(
        EvidencePoint(
          icon: Icons.accessibility_new_outlined,
          text:
              "Positive Spurling's test strongly suggests cervical nerve root irritation (radiculopathy).",
        ),
      );
    }

    if (specialTests.contains('phalen')) {
      points.add(
        EvidencePoint(
          icon: Icons.back_hand_outlined,
          text:
              "Positive Phalen's maneuver increases carpal tunnel pressure, confirming focal median nerve entrapment.",
        ),
      );
    }

    if (specialTests.contains('froment')) {
      points.add(
        EvidencePoint(
          icon: Icons.pan_tool_outlined,
          text:
              "Positive Froment's sign indicates weakness of the adductor pollicis, characteristic of ulnar neuropathy.",
        ),
      );
    }

    // 2. NCS Results
    if (caseData.ncsStudies != null) {
      final sensory = caseData.ncsStudies!.sensory;
      final motor = caseData.ncsStudies!.motor;
      final comparison = caseData.ncsStudies!.comparison;

      if (sensory != null) {
        for (var s in sensory.where((s) => s.abnormal)) {
          points.add(
            EvidencePoint(
              icon: Icons.flash_on_outlined,
              text:
                  'Abnormal sensory response in ${s.name} suggests ${s.amp == "0" || s.amp == "0.0" ? "severe axonal loss" : "axonal drop or focal demyelination"}.',
            ),
          );
        }
      }

      if (motor != null) {
        for (var m in motor.where((m) => m.abnormal)) {
          points.add(
            EvidencePoint(
              icon: Icons.power_outlined,
              text:
                  'Abnormal motor response in ${m.name} indicates motor axon involvement or conduction failure.',
            ),
          );
        }
      }

      if (comparison != null) {
        for (var c in comparison.where((c) => c.abnormal)) {
          points.add(
            EvidencePoint(
              icon: Icons.linear_scale_outlined,
              text:
                  'Side-to-side or internal comparison (${c.name}) confirms focal pathology${c.deltaP != null ? " with a significant ${c.deltaP} difference" : ""}.',
            ),
          );
        }
      }
    }

    // 3. EMG Findings
    if (caseData.emgStudies != null) {
      for (var f in caseData.emgStudies!.where((f) => f.abnormal)) {
        final hasDenervation =
            (f.fibs != null &&
            f.fibs != '0' &&
            f.fibs != 'None' &&
            f.fibs != 'Nml');
        final chronic =
            (f.motorUnits != null &&
            (f.motorUnits!.toLowerCase().contains('large') ||
                f.motorUnits!.toLowerCase().contains('polyphasic')));

        if (hasDenervation) {
          points.add(
            EvidencePoint(
              icon: Icons.gps_fixed_outlined,
              text:
                  'Active denervation (Fibs/PSWs) in ${f.muscle} confirms ${caseData.title.toLowerCase().contains('myopathy') ? "muscle fiber necrosis" : "acute/ongoing axonal injury"}.',
            ),
          );
        }
        if (chronic) {
          points.add(
            EvidencePoint(
              icon: Icons.build_outlined,
              text:
                  'Motor unit remodeling in ${f.muscle} indicates chronic reinnervation and neuroplasticity.',
            ),
          );
        }
      }
    }

    // Limit to top 5 points for conciseness
    return points.take(5).toList();
  }
}
