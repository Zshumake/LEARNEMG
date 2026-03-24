import '../core/widgets/decision_tree.dart';
import 'package:flutter/material.dart';

/// Pre-built clinical decision trees for EDX localization.
class ClinicalDecisionTrees {
  // ── Foot Drop Localization ──────────────────────────────────
  static const footDrop = TreeNode(
    question: 'Patient presents with foot drop. Is ankle INVERSION weak?',
    yesLabel: 'Inversion weak',
    noLabel: 'Inversion intact',
    yesBranch: TreeNode(
      question: 'Are hip abductors (gluteus medius) or extensors weak?',
      yesLabel: 'Hip muscles weak',
      noLabel: 'Hip muscles normal',
      yesBranch: TreeNode(
        question: 'Are paraspinal muscles abnormal on EMG?',
        yesLabel: 'Paraspinals abnormal',
        noLabel: 'Paraspinals normal',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'L5 Radiculopathy',
          diagnosisColor: Color(0xFFDC2626),
          explanation:
              'Tibialis posterior (inversion) + gluteals + paraspinals all share L5 innervation but different peripheral nerves. Abnormal paraspinals confirm the lesion is at or proximal to the root. SNAP should be normal (preganglionic).',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Lumbosacral Plexopathy',
          diagnosisColor: Color(0xFF7C3AED),
          explanation:
              'Multiple nerve territories involved beyond the peroneal nerve, but paraspinals are spared. SNAP will be ABNORMAL (postganglionic lesion). Check for diabetic amyotrophy, retroperitoneal hematoma, or mass lesion.',
        ),
      ),
      noBranch: TreeNode(
        question: 'Is the short head of biceps femoris abnormal on EMG?',
        yesLabel: 'Short head BF abnormal',
        noLabel: 'Short head BF normal',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Sciatic Neuropathy (peroneal division)',
          diagnosisColor: Color(0xFFF59E0B),
          explanation:
              'Short head of biceps femoris is the ONLY peroneal-division muscle above the fibular head. If abnormal, the lesion must be proximal to the knee -- within the sciatic nerve or higher. Sural SNAP will be abnormal.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'L5 Radiculopathy (without paraspinal findings)',
          diagnosisColor: Color(0xFFDC2626),
          explanation:
              'Tibialis posterior involvement points to L5, but short head BF (also peroneal/L5) is normal. This pattern can occur in incomplete L5 radiculopathy. Consider that paraspinals may be normal in up to 50% of radiculopathies.',
        ),
      ),
    ),
    noBranch: TreeNode(
      question: 'Is there conduction block or slowing across the fibular head on NCS?',
      yesLabel: 'Focal slowing at fibular head',
      noLabel: 'No focal change',
      yesBranch: TreeNode(
        question: '',
        diagnosis: 'Common Peroneal (Fibular) Neuropathy at Fibular Head',
        diagnosisColor: Color(0xFF2563EB),
        explanation:
            'Ankle inversion is PRESERVED (tibialis posterior is tibial nerve, not peroneal). Focal conduction block or slowing across the fibular head confirms the most common site of peroneal nerve compression. Excellent prognosis if demyelinating.',
      ),
      noBranch: TreeNode(
        question: 'Is the superficial peroneal SNAP abnormal?',
        yesLabel: 'Superficial peroneal SNAP abnormal',
        noLabel: 'Superficial peroneal SNAP normal',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Peroneal Neuropathy (axonal, at fibular head)',
          diagnosisColor: Color(0xFF2563EB),
          explanation:
              'Axonal peroneal neuropathy may not show focal conduction changes across the fibular head, but the abnormal superficial peroneal SNAP confirms a peripheral nerve lesion distal to the DRG. Recovery depends on degree of axonal loss.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Consider L5 Radiculopathy',
          diagnosisColor: Color(0xFFDC2626),
          explanation:
              'Normal superficial peroneal SNAP with foot drop and no focal peroneal changes raises suspicion for L5 radiculopathy (SNAP normal because lesion is preganglionic). Check tibialis posterior and paraspinals carefully.',
        ),
      ),
    ),
  );

  // ── Hand Weakness Localization ──────────────────────────────
  static const handWeakness = TreeNode(
    question: 'Patient has hand intrinsic muscle weakness. Is the MEDIAN sensory SNAP abnormal?',
    yesLabel: 'Median SNAP abnormal',
    noLabel: 'Median SNAP normal',
    yesBranch: TreeNode(
      question: 'Is the ULNAR sensory SNAP also abnormal?',
      yesLabel: 'Both abnormal',
      noLabel: 'Only median abnormal',
      yesBranch: TreeNode(
        question: 'Are proximal arm muscles (deltoid, biceps) involved on EMG?',
        yesLabel: 'Proximal muscles involved',
        noLabel: 'Only hand/forearm muscles',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Lower Trunk / Medial Cord Plexopathy',
          diagnosisColor: Color(0xFF7C3AED),
          explanation:
              'Both median and ulnar SNAPs abnormal (postganglionic) + proximal weakness suggests plexus involvement. Check medial antebrachial cutaneous SNAP (medial cord marker). Consider Pancoast tumor, TOS, or trauma.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Lower Trunk Plexopathy or Polyneuropathy',
          diagnosisColor: Color(0xFF7C3AED),
          explanation:
              'Multiple SNAPs abnormal with distal-only weakness. Differentiate plexopathy from polyneuropathy by checking symmetry and sural nerve involvement. Asymmetric = plexopathy; symmetric = polyneuropathy.',
        ),
      ),
      noBranch: TreeNode(
        question: 'Is weakness limited to LOAF muscles (lumbricals 1-2, opponens, APB, FPB)?',
        yesLabel: 'LOAF muscles only',
        noLabel: 'Broader weakness',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Severe Carpal Tunnel Syndrome',
          diagnosisColor: Color(0xFFF59E0B),
          explanation:
              'Abnormal median SNAP + weakness restricted to median-innervated thenar muscles (LOAF) = CTS with axonal loss. Check for prolonged median motor distal latency and fibrillations in APB. This represents severe CTS requiring surgical evaluation.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Median Neuropathy (proximal to wrist)',
          diagnosisColor: Color(0xFFF59E0B),
          explanation:
              'If weakness extends beyond LOAF to include FDS, FDP 1-2, PQ, or PT, the lesion is proximal to the carpal tunnel. Consider pronator syndrome, AIN syndrome (pure motor), or ligament of Struthers compression.',
        ),
      ),
    ),
    noBranch: TreeNode(
      question: 'Is the ULNAR sensory SNAP abnormal?',
      yesLabel: 'Ulnar SNAP abnormal',
      noLabel: 'All SNAPs normal',
      yesBranch: TreeNode(
        question: 'Is the dorsal ulnar cutaneous (DUC) SNAP abnormal?',
        yesLabel: 'DUC abnormal',
        noLabel: 'DUC normal',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Ulnar Neuropathy at the Elbow (Cubital Tunnel)',
          diagnosisColor: Color(0xFF2563EB),
          explanation:
              'DUC branches PROXIMAL to the wrist, so an abnormal DUC SNAP localizes the lesion to the elbow or above. Confirm with across-elbow motor conduction studies (CV <50 m/s, amplitude drop >20%). Elbow must be flexed 70-90 degrees for testing.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Ulnar Neuropathy at the Wrist (Guyon Canal)',
          diagnosisColor: Color(0xFF2563EB),
          explanation:
              'DUC is SPARED because it branches before entering Guyon canal. Abnormal ulnar digit 5 SNAP with normal DUC = wrist-level lesion. Use Shea classification: Type I (motor + sensory), Type II (deep motor only), Type III (superficial sensory only).',
        ),
      ),
      noBranch: TreeNode(
        question: 'Are there fibrillations in C8-T1 muscles from multiple peripheral nerves?',
        yesLabel: 'Multiple nerve territories',
        noLabel: 'Single nerve territory',
        yesBranch: TreeNode(
          question: 'Are paraspinals abnormal?',
          yesLabel: 'Paraspinals abnormal',
          noLabel: 'Paraspinals normal',
          yesBranch: TreeNode(
            question: '',
            diagnosis: 'C8-T1 Radiculopathy',
            diagnosisColor: Color(0xFFDC2626),
            explanation:
                'Normal SNAPs (preganglionic) + denervation in multiple C8-T1 muscles across different peripheral nerves + abnormal paraspinals = radiculopathy. Check median and ulnar F-waves for prolongation.',
          ),
          noBranch: TreeNode(
            question: '',
            diagnosis: 'Lower Trunk Plexopathy',
            diagnosisColor: Color(0xFF7C3AED),
            explanation:
                'Normal SNAPs are unusual for plexopathy (expect them to be abnormal). If SNAPs truly normal with multiple nerve territory denervation and normal paraspinals, consider motor neuron disease. Recheck SNAPs carefully.',
          ),
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Isolated Mononeuropathy',
          diagnosisColor: Color(0xFF10B981),
          explanation:
              'Single peripheral nerve territory involvement with normal SNAPs. Could be a pure motor branch lesion (e.g., deep branch of ulnar in Guyon canal Type II, or AIN syndrome for median). Check the specific nerve distribution.',
        ),
      ),
    ),
  );

  // ── Weakness Differential ──────────────────────────────────
  static const weaknessDifferential = TreeNode(
    question: 'Patient presents with weakness. Are there UPPER motor neuron signs (hyperreflexia, Babinski, spasticity)?',
    yesLabel: 'UMN signs present',
    noLabel: 'No UMN signs',
    yesBranch: TreeNode(
      question: 'Are there also LOWER motor neuron signs (atrophy, fasciculations, hyporeflexia)?',
      yesLabel: 'Mixed UMN + LMN',
      noLabel: 'Pure UMN',
      yesBranch: TreeNode(
        question: '',
        diagnosis: 'Motor Neuron Disease (ALS)',
        diagnosisColor: Color(0xFFDC2626),
        explanation:
            'Combined UMN + LMN signs in multiple body regions is the hallmark of ALS. EDX shows widespread denervation with reinnervation, normal sensory studies, and fasciculations. Must meet Gold Coast or Awaji criteria. Rule out cervical myelopathy + polyneuropathy as mimics.',
      ),
      noBranch: TreeNode(
        question: '',
        diagnosis: 'Central Lesion (brain/spinal cord)',
        diagnosisColor: Color(0xFF64748B),
        explanation:
            'Pure UMN pattern points to a central process. EMG is NOT typically indicated -- order brain/spine MRI instead. Consider stroke, MS, myelopathy, PLS. EMG may be useful to exclude coexisting peripheral pathology.',
      ),
    ),
    noBranch: TreeNode(
      question: 'Is the weakness PROXIMAL (shoulders, hips) or DISTAL (hands, feet)?',
      yesLabel: 'Proximal',
      noLabel: 'Distal',
      yesBranch: TreeNode(
        question: 'Are sensory symptoms present?',
        yesLabel: 'Sensory symptoms',
        noLabel: 'Pure motor',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Polyradiculopathy or Plexopathy',
          diagnosisColor: Color(0xFF7C3AED),
          explanation:
              'Proximal weakness + sensory involvement suggests root or plexus level pathology. CIDP can also present this way. Check SNAPs (normal = radiculopathy; abnormal = plexus or CIDP) and paraspinals.',
        ),
        noBranch: TreeNode(
          question: 'Does weakness fluctuate with fatigue or time of day?',
          yesLabel: 'Fluctuating',
          noLabel: 'Progressive/stable',
          yesBranch: TreeNode(
            question: '',
            diagnosis: 'Neuromuscular Junction Disorder',
            diagnosisColor: Color(0xFFF59E0B),
            explanation:
                'Fatigable proximal weakness without sensory involvement suggests MG or LEMS. Order repetitive nerve stimulation (3 Hz, look for >10% decrement). Check AChR and MuSK antibodies. LEMS: check baseline CMAP amplitudes (low = presynaptic).',
          ),
          noBranch: TreeNode(
            question: 'Is CK elevated?',
            yesLabel: 'CK elevated',
            noLabel: 'CK normal',
            yesBranch: TreeNode(
              question: '',
              diagnosis: 'Myopathy',
              diagnosisColor: Color(0xFF8B5CF6),
              explanation:
                  'Proximal weakness + elevated CK + pure motor = myopathy. EMG shows short-duration, low-amplitude, polyphasic MUAPs with early recruitment. Consider inflammatory (PM/DM), dystrophic (LGMD), or metabolic causes. Biopsy may be needed.',
            ),
            noBranch: TreeNode(
              question: '',
              diagnosis: 'Myopathy (possible) or Motor Neuron Disease',
              diagnosisColor: Color(0xFF8B5CF6),
              explanation:
                  'Normal CK does not exclude myopathy (e.g., steroid myopathy, endocrine). Also consider SMA or slowly progressive MND. EMG pattern will differentiate: myopathic (short/small MUAPs, early recruitment) vs neurogenic (long/large MUAPs, reduced recruitment).',
            ),
          ),
        ),
      ),
      noBranch: TreeNode(
        question: 'Are sensory NCS abnormal?',
        yesLabel: 'SNAPs abnormal',
        noLabel: 'SNAPs normal',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Peripheral Polyneuropathy',
          diagnosisColor: Color(0xFF0D9488),
          explanation:
              'Distal weakness + abnormal sensory studies = peripheral polyneuropathy. Classify as axonal vs demyelinating based on NCS pattern. Length-dependent (stocking-glove) is most common. Consider diabetes, alcohol, B12 deficiency, medications.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Distal Motor Neuropathy or MND',
          diagnosisColor: Color(0xFFDC2626),
          explanation:
              'Distal weakness with NORMAL sensory studies is concerning for motor neuron disease (especially if fasciculations present). Also consider multifocal motor neuropathy with conduction block (MMNCB) -- check for motor conduction block with normal sensory across the same segments. Anti-GM1 antibodies support MMNCB.',
        ),
      ),
    ),
  );

  // ── Axonal vs Demyelinating ──────────────────────────────────
  static const axonalVsDemyelinating = TreeNode(
    question: 'NCS shows abnormalities. Is there significant CONDUCTION VELOCITY slowing (motor CV <75% LLN)?',
    yesLabel: 'Significant CV slowing',
    noLabel: 'CV near normal or mildly slow',
    yesBranch: TreeNode(
      question: 'Is the slowing UNIFORM across all nerves, or SEGMENTAL/MULTIFOCAL?',
      yesLabel: 'Uniform (all nerves similar)',
      noLabel: 'Segmental/multifocal',
      yesBranch: TreeNode(
        question: 'Is there conduction block or temporal dispersion?',
        yesLabel: 'CB/TD present',
        noLabel: 'No CB or TD',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Acquired Demyelinating Neuropathy (CIDP)',
          diagnosisColor: Color(0xFF2563EB),
          explanation:
              'Uniform slowing WITH conduction block/temporal dispersion suggests CIDP. However, this combination is unusual -- acquired demyelination is typically non-uniform. Re-examine for segmental features. CIDP responds to IVIG, plasmapheresis, or immunosuppression.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Hereditary Demyelinating Neuropathy (CMT1)',
          diagnosisColor: Color(0xFF059669),
          explanation:
              'Uniform slowing WITHOUT conduction block or temporal dispersion is the hallmark of inherited demyelinating neuropathy (CMT1). Median motor CV typically <38 m/s. Check PMP-22 duplication (chromosome 17p11.2). Family history is key.',
        ),
      ),
      noBranch: TreeNode(
        question: 'Is there conduction block at non-entrapment sites?',
        yesLabel: 'Conduction block present',
        noLabel: 'No conduction block',
        yesBranch: TreeNode(
          question: 'Are sensory NCS normal across the same nerve segments?',
          yesLabel: 'Sensory normal',
          noLabel: 'Sensory also abnormal',
          yesBranch: TreeNode(
            question: '',
            diagnosis: 'Multifocal Motor Neuropathy with CB (MMNCB)',
            diagnosisColor: Color(0xFFF59E0B),
            explanation:
                'Motor conduction block with NORMAL sensory conduction across the same segment is the hallmark of MMNCB. This is a treatable mimic of ALS. Check anti-GM1 antibodies. Responds to IVIG. Does NOT respond to steroids or plasma exchange.',
          ),
          noBranch: TreeNode(
            question: '',
            diagnosis: 'Acquired Demyelinating Neuropathy (GBS/CIDP)',
            diagnosisColor: Color(0xFF2563EB),
            explanation:
                'Segmental demyelination with conduction block and sensory involvement suggests acquired inflammatory demyelinating polyneuropathy. If acute (<4 weeks) = GBS/AIDP; if chronic (>8 weeks) = CIDP. Both are treatable.',
          ),
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Acquired Demyelinating Neuropathy',
          diagnosisColor: Color(0xFF2563EB),
          explanation:
              'Non-uniform slowing without overt conduction block can still be acquired demyelination. Check for prolonged distal latencies (>130% ULN) and prolonged F-waves (>130% ULN). Apply CIDP diagnostic criteria (2021 EAN/PNS).',
        ),
      ),
    ),
    noBranch: TreeNode(
      question: 'Are CMAP and/or SNAP AMPLITUDES significantly reduced?',
      yesLabel: 'Amplitudes reduced',
      noLabel: 'Amplitudes normal',
      yesBranch: TreeNode(
        question: 'Is the pattern length-dependent (legs worse than arms, distal worse than proximal)?',
        yesLabel: 'Length-dependent',
        noLabel: 'Non-length-dependent',
        yesBranch: TreeNode(
          question: '',
          diagnosis: 'Axonal Polyneuropathy',
          diagnosisColor: Color(0xFFDC2626),
          explanation:
              'Reduced amplitudes with near-normal velocities and a length-dependent gradient = axonal polyneuropathy. The most common pattern. Evaluate for diabetes, alcohol, B12, medications, and toxic exposures. EMG shows fibrillations and neurogenic MUAPs in distal muscles.',
        ),
        noBranch: TreeNode(
          question: '',
          diagnosis: 'Mononeuropathy Multiplex or Non-Length-Dependent Process',
          diagnosisColor: Color(0xFF7C3AED),
          explanation:
              'Asymmetric or non-length-dependent amplitude loss suggests mononeuropathy multiplex (vasculitis, diabetes, sarcoidosis) or a non-length-dependent process (ganglionopathy, motor neuron disease). Pattern distribution is the key differentiator.',
        ),
      ),
      noBranch: TreeNode(
        question: '',
        diagnosis: 'Normal or Subclinical -- Correlate Clinically',
        diagnosisColor: Color(0xFF10B981),
        explanation:
            'Near-normal velocities and amplitudes may still be abnormal if compared to the contralateral side or normative data. Consider: (1) very early neuropathy not yet detectable, (2) pure small fiber neuropathy (normal NCS by definition), (3) technical factors. Clinical correlation is essential.',
      ),
    ),
  );
}
