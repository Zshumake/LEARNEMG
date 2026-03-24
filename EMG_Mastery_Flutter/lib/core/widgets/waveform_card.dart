import 'dart:math';
import 'package:flutter/material.dart';

/// Types of EMG waveforms that can be rendered.
enum WaveformType {
  fibrillation,
  psw,
  crd,
  myotonic,
  fasciculation,
  normalMuap,
  neuropathicMuap,
  myopathicMuap,
  endplateNoise,
  endplateSpike,
  decrementalResponse,
  incrementalResponse,
}

/// Metadata for each waveform type.
class _WaveformMeta {
  final String title;
  final String sound;
  final String description;
  final Color traceColor;

  const _WaveformMeta({
    required this.title,
    required this.sound,
    required this.description,
    this.traceColor = const Color(0xFF22C55E),
  });
}

const _meta = <WaveformType, _WaveformMeta>{
  WaveformType.fibrillation: _WaveformMeta(
    title: 'Fibrillation Potential',
    sound: 'Rain on a tin roof',
    description:
        'Biphasic with positive initial deflection. 1-5 ms duration, <300 uV amplitude. Regular firing at 1-10 Hz. Indicates active denervation -- a single muscle fiber spontaneously discharging after losing its nerve supply.',
  ),
  WaveformType.psw: _WaveformMeta(
    title: 'Positive Sharp Wave',
    sound: 'Dull thud',
    description:
        'Positive initial deflection followed by slow negative phase. 10-30 ms duration, <1 mV amplitude. Regular at 1-20 Hz. Same clinical significance as fibrillations -- active denervation.',
  ),
  WaveformType.crd: _WaveformMeta(
    title: 'Complex Repetitive Discharge',
    sound: 'Motor boat',
    description:
        'Repeating complex waveform with abrupt onset and cessation. 10-100 Hz, uniform morphology. Spreads by ephaptic transmission between adjacent muscle fibers. Seen in chronic denervation and some myopathies.',
  ),
  WaveformType.myotonic: _WaveformMeta(
    title: 'Myotonic Discharge',
    sound: 'Dive bomber',
    description:
        'Waxing and waning amplitude and frequency (20-100 Hz). Due to abnormal muscle membrane ion channel function. Seen in myotonic dystrophy, myotonia congenita, paramyotonia, acid maltase deficiency.',
    traceColor: Color(0xFFF59E0B),
  ),
  WaveformType.fasciculation: _WaveformMeta(
    title: 'Fasciculation Potential',
    sound: 'Corn popping',
    description:
        'MUAP-like morphology firing at irregular intervals (<1-2 Hz). Originates from the motor neuron. Pathologic when accompanied by fibrillations/PSWs. Cannot distinguish benign from pathologic on EMG alone.',
  ),
  WaveformType.normalMuap: _WaveformMeta(
    title: 'Normal MUAP',
    sound: 'Crisp thud',
    description:
        'Triphasic morphology, 5-15 ms duration, 0.1-2 mV amplitude, 2-4 phases. Represents synchronized firing of all muscle fibers in one motor unit. Rise time <500 us indicates electrode is close to the discharging fibers.',
    traceColor: Color(0xFF3B82F6),
  ),
  WaveformType.neuropathicMuap: _WaveformMeta(
    title: 'Neuropathic MUAP',
    sound: 'Thick thud',
    description:
        'Long duration (>15 ms), high amplitude (>2 mV), polyphasic (>4 phases). Represents collateral sprouting -- surviving motor neurons adopt orphaned muscle fibers, enlarging the motor unit territory.',
    traceColor: Color(0xFFEF4444),
  ),
  WaveformType.myopathicMuap: _WaveformMeta(
    title: 'Myopathic MUAP',
    sound: 'Soft crackle',
    description:
        'Short duration (<5 ms), low amplitude (<0.5 mV), polyphasic. Motor unit has fewer functioning muscle fibers due to necrosis or splitting. Early recruitment -- more MUAPs needed to generate force.',
    traceColor: Color(0xFF8B5CF6),
  ),
  WaveformType.endplateNoise: _WaveformMeta(
    title: 'Endplate Noise (MEPPs)',
    sound: 'Sea shell murmur',
    description:
        'Irregular, low-amplitude baseline undulation at ~150 Hz. Monophasic negative deflections, 10-50 uV. Normal finding -- indicates needle tip is at the motor endplate zone. This area is painful for the patient.',
  ),
  WaveformType.endplateSpike: _WaveformMeta(
    title: 'Endplate Spike',
    sound: 'Sputtering fat in frying pan',
    description:
        'Biphasic with NEGATIVE initial deflection, 50-100 Hz, irregular. 2-4 ms duration, <1 mV. Provoked by needle irritation at the endplate. The negative initial deflection distinguishes it from fibrillation potentials.',
  ),
  WaveformType.decrementalResponse: _WaveformMeta(
    title: 'Decremental Response (RNS)',
    sound: 'N/A',
    description:
        'Progressive drop in CMAP amplitude with slow-rate (2-3 Hz) repetitive stimulation. >10% decrement from 1st to 4th/5th response is abnormal. Classic U-shaped pattern in myasthenia gravis.',
    traceColor: Color(0xFFDC2626),
  ),
  WaveformType.incrementalResponse: _WaveformMeta(
    title: 'Incremental Response (RNS)',
    sound: 'N/A',
    description:
        '>100% increase in CMAP amplitude after brief exercise or high-rate stimulation. Hallmark of Lambert-Eaton myasthenic syndrome (presynaptic NMJ disorder).',
    traceColor: Color(0xFF10B981),
  ),
};

/// A card that displays an EMG waveform pattern with explanation.
class WaveformCard extends StatefulWidget {
  final WaveformType type;
  final bool initiallyExpanded;

  const WaveformCard({
    super.key,
    required this.type,
    this.initiallyExpanded = false,
  });

  @override
  State<WaveformCard> createState() => _WaveformCardState();
}

class _WaveformCardState extends State<WaveformCard> {
  late bool _expanded;

  @override
  void initState() {
    super.initState();
    _expanded = widget.initiallyExpanded;
  }

  @override
  Widget build(BuildContext context) {
    final m = _meta[widget.type]!;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: m.traceColor.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Waveform display
          GestureDetector(
            onTap: () => setState(() => _expanded = !_expanded),
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(15),
              ),
              child: SizedBox(
                height: 140,
                width: double.infinity,
                child: CustomPaint(
                  painter: _WaveformPainter(
                    type: widget.type,
                    traceColor: m.traceColor,
                  ),
                ),
              ),
            ),
          ),

          // Title bar
          GestureDetector(
            onTap: () => setState(() => _expanded = !_expanded),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      m.title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  if (m.sound != 'N/A')
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        m.sound,
                        style: TextStyle(
                          color: m.traceColor,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                  const SizedBox(width: 8),
                  Icon(
                    _expanded
                        ? Icons.keyboard_arrow_up
                        : Icons.keyboard_arrow_down,
                    color: Colors.white38,
                    size: 20,
                  ),
                ],
              ),
            ),
          ),

          // Expandable description
          AnimatedCrossFade(
            firstChild: const SizedBox.shrink(),
            secondChild: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Text(
                m.description,
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.7),
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
            ),
            crossFadeState:
                _expanded ? CrossFadeState.showSecond : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 200),
          ),
        ],
      ),
    );
  }
}

/// CustomPainter that renders EMG waveform patterns.
class _WaveformPainter extends CustomPainter {
  final WaveformType type;
  final Color traceColor;

  _WaveformPainter({required this.type, required this.traceColor});

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final midY = h * 0.5;

    // Background grid
    _drawGrid(canvas, size);

    // Baseline
    final basePaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.15)
      ..strokeWidth = 1;
    canvas.drawLine(Offset(0, midY), Offset(w, midY), basePaint);

    // Trace
    final tracePaint = Paint()
      ..color = traceColor
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final path = _buildPath(size);
    canvas.drawPath(path, tracePaint);

    // Glow effect
    final glowPaint = Paint()
      ..color = traceColor.withValues(alpha: 0.15)
      ..strokeWidth = 6.0
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4);
    canvas.drawPath(path, glowPaint);

    // Calibration markers
    _drawCalibration(canvas, size);
  }

  void _drawGrid(Canvas canvas, Size size) {
    final gridPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.04)
      ..strokeWidth = 0.5;

    // Vertical lines
    for (double x = 0; x < size.width; x += size.width / 10) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), gridPaint);
    }
    // Horizontal lines
    for (double y = 0; y < size.height; y += size.height / 6) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), gridPaint);
    }
  }

  void _drawCalibration(Canvas canvas, Size size) {
    final calPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.3)
      ..strokeWidth = 1.5;

    // Vertical bar (amplitude)
    final calX = size.width - 40;
    final calY = size.height - 30;
    canvas.drawLine(Offset(calX, calY), Offset(calX, calY - 20), calPaint);
    // Horizontal bar (time)
    canvas.drawLine(Offset(calX, calY), Offset(calX + 20, calY), calPaint);
  }

  Path _buildPath(Size size) {
    switch (type) {
      case WaveformType.fibrillation:
        return _fibrillationPath(size);
      case WaveformType.psw:
        return _pswPath(size);
      case WaveformType.crd:
        return _crdPath(size);
      case WaveformType.myotonic:
        return _myotonicPath(size);
      case WaveformType.fasciculation:
        return _fasciculationPath(size);
      case WaveformType.normalMuap:
        return _normalMuapPath(size);
      case WaveformType.neuropathicMuap:
        return _neuropathicMuapPath(size);
      case WaveformType.myopathicMuap:
        return _myopathicMuapPath(size);
      case WaveformType.endplateNoise:
        return _endplateNoisePath(size);
      case WaveformType.endplateSpike:
        return _endplateSpikePath(size);
      case WaveformType.decrementalResponse:
        return _decrementalPath(size);
      case WaveformType.incrementalResponse:
        return _incrementalPath(size);
    }
  }

  // Helper: scale value relative to size
  double _s(double val, double ref) => val * ref / 100;

  Path _fibrillationPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);

    // 4 regular fibrillation potentials
    for (int i = 0; i < 4; i++) {
      final x0 = _s(10 + i * 22, w);
      // Baseline approach
      path.lineTo(x0, midY);
      // Positive (downward) initial deflection
      path.lineTo(x0 + _s(1, w), midY + _s(12, size.height));
      // Negative (upward) phase
      path.lineTo(x0 + _s(3, w), midY - _s(18, size.height));
      // Return to baseline
      path.lineTo(x0 + _s(5, w), midY);
    }
    path.lineTo(w, midY);
    return path;
  }

  Path _pswPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);

    for (int i = 0; i < 3; i++) {
      final x0 = _s(12 + i * 28, w);
      path.lineTo(x0, midY);
      // Sharp positive (down) deflection
      path.lineTo(x0 + _s(1.5, w), midY + _s(25, size.height));
      // Slow negative return
      path.cubicTo(
        x0 + _s(6, w), midY - _s(8, size.height),
        x0 + _s(14, w), midY - _s(3, size.height),
        x0 + _s(18, w), midY,
      );
    }
    path.lineTo(w, midY);
    return path;
  }

  Path _crdPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);
    path.lineTo(_s(8, w), midY);

    // Abrupt onset of repeating complex
    for (int i = 0; i < 8; i++) {
      final x0 = _s(8 + i * 10, w);
      final amp = _s(20, size.height);
      path.lineTo(x0, midY);
      path.lineTo(x0 + _s(1, w), midY - amp);
      path.lineTo(x0 + _s(2.5, w), midY + amp * 0.7);
      path.lineTo(x0 + _s(4, w), midY - amp * 0.5);
      path.lineTo(x0 + _s(5.5, w), midY + amp * 0.3);
      path.lineTo(x0 + _s(7, w), midY);
    }
    // Abrupt cessation
    path.lineTo(w, midY);
    return path;
  }

  Path _myotonicPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);

    // Waxing and waning -- amplitude grows then shrinks
    final totalSpikes = 20;
    for (int i = 0; i < totalSpikes; i++) {
      final x0 = _s(5 + i * 4.5, w);
      // Envelope: grows to peak at 40%, then decays
      final t = i / totalSpikes;
      final envelope = t < 0.4
          ? t / 0.4
          : 1.0 - ((t - 0.4) / 0.6);
      final amp = _s(28, size.height) * envelope.clamp(0.05, 1.0);

      path.lineTo(x0, midY);
      path.lineTo(x0 + _s(1, w), midY - amp);
      path.lineTo(x0 + _s(2, w), midY + amp * 0.6);
      path.lineTo(x0 + _s(3, w), midY);
    }
    path.lineTo(w, midY);
    return path;
  }

  Path _fasciculationPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);

    // One isolated MUAP-like discharge with long quiet baseline
    path.lineTo(_s(35, w), midY);
    // MUAP shape
    path.lineTo(_s(36, w), midY + _s(5, size.height));
    path.lineTo(_s(37, w), midY - _s(30, size.height));
    path.lineTo(_s(39, w), midY + _s(20, size.height));
    path.lineTo(_s(40.5, w), midY - _s(8, size.height));
    path.lineTo(_s(42, w), midY);
    // Long quiet period
    path.lineTo(w, midY);
    return path;
  }

  Path _normalMuapPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);
    path.lineTo(_s(25, w), midY);

    // Classic triphasic: small positive, large negative, moderate positive
    final x0 = _s(25, w);
    path.lineTo(x0, midY);
    path.lineTo(x0 + _s(2, w), midY + _s(8, size.height)); // small positive
    path.lineTo(x0 + _s(5, w), midY - _s(30, size.height)); // large negative
    path.lineTo(x0 + _s(10, w), midY + _s(15, size.height)); // moderate positive
    path.lineTo(x0 + _s(14, w), midY); // return

    path.lineTo(w, midY);
    return path;
  }

  Path _neuropathicMuapPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);
    path.lineTo(_s(10, w), midY);

    // Large, long, polyphasic (>4 phases)
    final x0 = _s(10, w);
    path.lineTo(x0, midY);
    path.lineTo(x0 + _s(3, w), midY + _s(10, size.height));
    path.lineTo(x0 + _s(7, w), midY - _s(38, size.height)); // high amplitude
    path.lineTo(x0 + _s(12, w), midY + _s(25, size.height));
    path.lineTo(x0 + _s(17, w), midY - _s(20, size.height));
    path.lineTo(x0 + _s(22, w), midY + _s(15, size.height));
    path.lineTo(x0 + _s(27, w), midY - _s(10, size.height));
    path.lineTo(x0 + _s(32, w), midY + _s(5, size.height));
    path.lineTo(x0 + _s(36, w), midY); // long duration

    // Satellite potential
    path.lineTo(x0 + _s(44, w), midY);
    path.lineTo(x0 + _s(45, w), midY - _s(6, size.height));
    path.lineTo(x0 + _s(47, w), midY + _s(4, size.height));
    path.lineTo(x0 + _s(48, w), midY);

    path.lineTo(w, midY);
    return path;
  }

  Path _myopathicMuapPath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    path.moveTo(0, midY);

    // Multiple small, short, polyphasic MUAPs (early recruitment)
    for (int i = 0; i < 4; i++) {
      final x0 = _s(8 + i * 22, w);
      final amp = _s(12, size.height); // low amplitude
      path.lineTo(x0, midY);
      path.lineTo(x0 + _s(1, w), midY + amp * 0.3);
      path.lineTo(x0 + _s(2, w), midY - amp);
      path.lineTo(x0 + _s(3, w), midY + amp * 0.8);
      path.lineTo(x0 + _s(4, w), midY - amp * 0.5);
      path.lineTo(x0 + _s(5, w), midY + amp * 0.3);
      path.lineTo(x0 + _s(6, w), midY); // short duration
    }
    path.lineTo(w, midY);
    return path;
  }

  Path _endplateNoisePath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    final rng = Random(42); // deterministic randomness
    path.moveTo(0, midY);

    // Irregular low-amplitude undulation
    for (double x = 0; x < w; x += 2) {
      final noise = (rng.nextDouble() - 0.5) * _s(6, size.height);
      path.lineTo(x, midY + noise);
    }
    return path;
  }

  Path _endplateSpikePath(Size size) {
    final path = Path();
    final midY = size.height * 0.5;
    final w = size.width;
    final rng = Random(42);
    path.moveTo(0, midY);

    // Background noise + irregular negative-initial spikes
    for (double x = 0; x < w; x += 2) {
      final noise = (rng.nextDouble() - 0.5) * _s(4, size.height);
      path.lineTo(x, midY + noise);

      // Random spike (negative initial = upward)
      if (rng.nextDouble() > 0.92) {
        path.lineTo(x + 1, midY - _s(18, size.height)); // negative initial
        path.lineTo(x + 3, midY + _s(8, size.height));
        path.lineTo(x + 4, midY);
      }
    }
    return path;
  }

  Path _decrementalPath(Size size) {
    final path = Path();
    final midY = size.height * 0.65;
    final w = size.width;

    // 5 CMAP responses with progressive amplitude drop (U-shape)
    final amplitudes = [1.0, 0.82, 0.75, 0.72, 0.74]; // U-shaped decrement
    for (int i = 0; i < 5; i++) {
      final x0 = _s(8 + i * 18, w);
      final amp = _s(35, size.height) * amplitudes[i];
      path.moveTo(x0, midY);
      path.lineTo(x0 + _s(1, w), midY - amp);
      path.cubicTo(
        x0 + _s(4, w), midY - amp * 0.3,
        x0 + _s(6, w), midY + amp * 0.2,
        x0 + _s(10, w), midY,
      );
    }
    return path;
  }

  Path _incrementalPath(Size size) {
    final path = Path();
    final midY = size.height * 0.65;
    final w = size.width;

    // 5 CMAP responses with progressive amplitude INCREASE (>100%)
    final amplitudes = [0.3, 0.5, 0.7, 0.9, 1.0]; // marked increment
    for (int i = 0; i < 5; i++) {
      final x0 = _s(8 + i * 18, w);
      final amp = _s(40, size.height) * amplitudes[i];
      path.moveTo(x0, midY);
      path.lineTo(x0 + _s(1, w), midY - amp);
      path.cubicTo(
        x0 + _s(4, w), midY - amp * 0.3,
        x0 + _s(6, w), midY + amp * 0.2,
        x0 + _s(10, w), midY,
      );
    }
    return path;
  }

  @override
  bool shouldRepaint(covariant _WaveformPainter oldDelegate) =>
      type != oldDelegate.type || traceColor != oldDelegate.traceColor;
}
