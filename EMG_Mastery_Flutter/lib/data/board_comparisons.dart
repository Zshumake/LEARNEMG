import '../core/widgets/comparison_card.dart';
import 'package:flutter/material.dart';

/// Board-critical comparison tables for EMG/NCS education.
/// These are the highest-yield differentials tested on PM&R boards.
class BoardComparisons {
  BoardComparisons._();

  // ─── 1. Neuropathic vs Myopathic EMG Pattern ───────────────────

  static const neuropathicVsMyopathic = (
    title: 'Neuropathic vs Myopathic EMG Pattern',
    columns: [
      ComparisonColumn(label: 'Neuropathic', color: Color(0xFFDC2626)),
      ComparisonColumn(label: 'Myopathic', color: Color(0xFF2563EB)),
    ],
    rows: [
      ComparisonRow(
        feature: 'MUAP Duration',
        values: ['Long (increased)', 'Short (decreased)'],
      ),
      ComparisonRow(
        feature: 'MUAP Amplitude',
        values: ['Large (increased)', 'Small (decreased)'],
      ),
      ComparisonRow(
        feature: 'Phases',
        values: ['Polyphasic', 'Polyphasic'],
      ),
      ComparisonRow(
        feature: 'Recruitment',
        values: ['Reduced (fewer MUs, firing fast)', 'Early (many MUs, low force)'],
      ),
      ComparisonRow(
        feature: 'Fibs/PSWs',
        values: ['Present (denervation)', 'Present in inflammatory/dystrophic'],
      ),
      ComparisonRow(
        feature: 'Fasciculations',
        values: ['May be present', 'Absent'],
      ),
      ComparisonRow(
        feature: 'CK',
        values: ['Normal or mildly elevated', 'Often markedly elevated'],
      ),
      ComparisonRow(
        feature: 'SNAP',
        values: ['Abnormal (if postganglionic)', 'Normal'],
      ),
    ],
    footnote:
        'Most reliable EMG finding: MUAP duration (long = neuropathic, short = myopathic)',
  );

  // ─── 2. MG vs LEMS vs Botulism ────────────────────────────────

  static const mgVsLemsVsBotulism = (
    title: 'MG vs LEMS vs Botulism',
    columns: [
      ComparisonColumn(label: 'MG', color: Color(0xFF2563EB)),
      ComparisonColumn(label: 'LEMS', color: Color(0xFF7C3AED)),
      ComparisonColumn(label: 'Botulism', color: Color(0xFFDC2626)),
    ],
    rows: [
      ComparisonRow(
        feature: 'Site',
        values: ['Postsynaptic', 'Presynaptic', 'Presynaptic'],
      ),
      ComparisonRow(
        feature: 'Antibody',
        values: ['AChR (80-90%)', 'VGCC (85-95%)', 'None (toxin)'],
      ),
      ComparisonRow(
        feature: 'Resting CMAP',
        values: ['Normal', 'LOW', 'LOW'],
      ),
      ComparisonRow(
        feature: '3 Hz RNS',
        values: ['>10% decrement', '>10% decrement', '>10% decrement'],
      ),
      ComparisonRow(
        feature: 'Post-exercise',
        values: ['Repairs decrement', '>100% INCREMENT', 'Variable increment'],
      ),
      ComparisonRow(
        feature: 'Weakness Pattern',
        values: ['Ocular/bulbar first', 'Proximal legs first', 'Descending (cranial first)'],
      ),
      ComparisonRow(
        feature: 'Reflexes',
        values: ['Normal', 'Reduced/absent', 'Reduced/absent'],
      ),
      ComparisonRow(
        feature: 'Association',
        values: ['Thymoma (10-15%)', 'SCLC (50-60%)', 'Food/wound'],
      ),
    ],
    footnote:
        'Key differentiator: LEMS shows >100% increment with brief exercise or 50 Hz RNS',
  );

  // ─── 3. Axonal vs Demyelinating Neuropathy ─────────────────────

  static const axonalVsDemyelinating = (
    title: 'Axonal vs Demyelinating Neuropathy',
    columns: [
      ComparisonColumn(label: 'Axonal', color: Color(0xFFDC2626)),
      ComparisonColumn(label: 'Demyelinating', color: Color(0xFF2563EB)),
    ],
    rows: [
      ComparisonRow(
        feature: 'Amplitude',
        values: ['Decreased (primary finding)', 'Normal or mildly decreased'],
      ),
      ComparisonRow(
        feature: 'Distal Latency',
        values: ['Normal or mildly prolonged', 'Prolonged (>130% ULN)'],
      ),
      ComparisonRow(
        feature: 'CV',
        values: ['Normal or mildly slow', 'Markedly slow (<75% LLN)'],
      ),
      ComparisonRow(
        feature: 'Temporal Dispersion',
        values: ['Absent', 'Present (acquired)'],
      ),
      ComparisonRow(
        feature: 'Conduction Block',
        values: ['Absent', 'Present (acquired)'],
      ),
      ComparisonRow(
        feature: 'Fibs/PSWs',
        values: ['Present', 'Absent (unless secondary axon loss)'],
      ),
      ComparisonRow(
        feature: 'MUAPs',
        values: ['Large, long, polyphasic', 'Normal or mildly abnormal'],
      ),
      ComparisonRow(
        feature: 'Examples',
        values: ['DM, alcohol, drugs, CMT2', 'GBS, CIDP, CMT1, MMNCB'],
      ),
    ],
    footnote:
        'Conduction block + temporal dispersion at non-entrapment sites = acquired demyelination',
  );

  // ─── 4. Radiation vs Tumor Plexopathy ──────────────────────────

  static const radiationVsTumor = (
    title: 'Radiation vs Tumor Plexopathy',
    columns: [
      ComparisonColumn(label: 'Radiation', color: Color(0xFF059669)),
      ComparisonColumn(label: 'Tumor', color: Color(0xFFDC2626)),
    ],
    rows: [
      ComparisonRow(
        feature: 'Trunk',
        values: ['Upper trunk (C5-C6)', 'Lower trunk (C8-T1)'],
      ),
      ComparisonRow(
        feature: 'Pain',
        values: ['Painless (paresthesias)', 'Painful'],
      ),
      ComparisonRow(
        feature: 'Key EMG Finding',
        values: ['Myokymic discharges (50-70%)', 'Fibs/PSWs only (myokymia in ~4%)'],
      ),
      ComparisonRow(
        feature: 'Horner Syndrome',
        values: ['Rare', 'Common'],
      ),
      ComparisonRow(
        feature: 'Onset',
        values: ['Months to years post-RT', 'Progressive'],
      ),
      ComparisonRow(
        feature: 'Imaging',
        values: ['Diffuse enhancement', 'Discrete mass'],
      ),
    ],
    footnote:
        'Myokymic discharges on EMG strongly favor radiation plexopathy over tumor invasion',
  );

  // ─── 5. Seddon vs Sunderland Classification ────────────────────

  static const seddonVsSunderland = (
    title: 'Nerve Injury Classification',
    columns: [
      ComparisonColumn(label: 'Seddon', color: Color(0xFF2563EB)),
      ComparisonColumn(label: 'Sunderland', color: Color(0xFF7C3AED)),
    ],
    rows: [
      ComparisonRow(
        feature: 'Mild',
        values: ['Neurapraxia', 'Type I (myelin only)'],
      ),
      ComparisonRow(
        feature: 'Moderate',
        values: ['Axonotmesis', 'Type II (axon loss, endoneurium intact)'],
      ),
      ComparisonRow(
        feature: 'Moderate+',
        values: ['Axonotmesis', 'Type III (+ endoneurium disrupted)'],
      ),
      ComparisonRow(
        feature: 'Severe',
        values: ['Axonotmesis', 'Type IV (+ perineurium disrupted)'],
      ),
      ComparisonRow(
        feature: 'Complete',
        values: ['Neurotmesis', 'Type V (all layers disrupted)'],
      ),
      ComparisonRow(
        feature: 'Recovery',
        values: [
          'Neuropraxia: days-12 wks\nAxonotmesis: months\nNeurotmesis: poor',
          'I: complete\nII: good\nIII: partial\nIV-V: surgical',
        ],
      ),
    ],
    footnote:
        'Neurapraxia = conduction block, no Wallerian degeneration, no fibs/PSWs on EMG',
  );

  // ─── 6. UMN vs LMN Lesions ──────────────────────────────────

  static const umnVsLmn = (
    title: 'UMN vs LMN Lesions',
    columns: [
      ComparisonColumn(label: 'UMN', color: Color(0xFF7C3AED)),
      ComparisonColumn(label: 'LMN', color: Color(0xFFDC2626)),
    ],
    rows: [
      ComparisonRow(
        feature: 'Tone',
        values: ['Spastic (velocity-dependent)', 'Flaccid (decreased)'],
      ),
      ComparisonRow(
        feature: 'Reflexes',
        values: ['Hyperreflexia', 'Hyporeflexia/areflexia'],
      ),
      ComparisonRow(
        feature: 'Babinski',
        values: ['Present (upgoing toes)', 'Absent (downgoing)'],
      ),
      ComparisonRow(
        feature: 'Atrophy',
        values: ['Minimal (disuse)', 'Significant (denervation)'],
      ),
      ComparisonRow(
        feature: 'Fasciculations',
        values: ['Absent', 'May be present'],
      ),
      ComparisonRow(
        feature: 'Weakness Pattern',
        values: ['Pyramidal (extensors > flexors in UE)', 'Follows myotome/peripheral nerve'],
      ),
      ComparisonRow(
        feature: 'EMG Findings',
        values: ['Normal (EMG tests LMN only)', 'Fibs/PSWs, large MUAPs, reduced recruitment'],
      ),
      ComparisonRow(
        feature: 'NCS',
        values: ['Normal', 'Reduced CMAP amplitude'],
      ),
      ComparisonRow(
        feature: 'Examples',
        values: ['Stroke, MS, SCI above conus', 'Radiculopathy, neuropathy, AHC disease'],
      ),
    ],
    footnote:
        'EMG/NCS only detects LMN pathology. Normal EMG does NOT rule out UMN disease.',
  );
}
