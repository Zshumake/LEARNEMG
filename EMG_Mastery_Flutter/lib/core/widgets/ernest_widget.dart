import 'dart:math';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../features/ernest/widgets/ernest_chat_overlay.dart';
import '../../features/ernest/ernest_controller.dart';

/// Animated Ernest character widget that renders the SVG stimulator mascot
/// with idle bounce, blinking eyes, LED pulse, prong wobble, and zap line
/// animations — matching the web app's CSS animations.
class AnimatedErnestWidget extends StatefulWidget {
  final double size;
  final bool showSpeechBubble;
  final String? speechText;
  final bool isInteractive;
  final bool allowPersonaToggle;
  final bool allowChatOpening;

  const AnimatedErnestWidget({
    super.key,
    this.size = 280,
    this.showSpeechBubble = true,
    this.speechText,
    this.isInteractive = true,
    this.allowPersonaToggle = true,
    this.allowChatOpening = true,
  });

  @override
  State<AnimatedErnestWidget> createState() => _AnimatedErnestWidgetState();
}

class _AnimatedErnestWidgetState extends State<AnimatedErnestWidget>
    with TickerProviderStateMixin {
  // Animation Controllers
  late AnimationController _bounceController;
  late AnimationController _blinkController;
  late AnimationController _ledController;
  late AnimationController _prongLeftController;
  late AnimationController _prongRightController;
  late AnimationController _zapController;
  late AnimationController _eyebrowController;

  // Animations
  late Animation<double> _bounceAnimation;
  late Animation<double> _blinkAnimation;
  late Animation<double> _ledAnimation;
  late Animation<double> _prongLeftAnimation;
  late Animation<double> _prongRightAnimation;
  late Animation<double> _zapAnimation;
  late Animation<double> _eyebrowAnimation;

  // Speech bubble
  String _currentSpeech = '';
  bool _showBubble = false;
  final List<String> _greetings = [
    "Ready to learn? ⚡",
    "Let's master EMG!",
    "Clinical Correlation is King! 👑",
    "Welcome, future neurophysiologist!",
    "STIM is ready! Let's go! 🚀",
  ];

  int _tapCount = 0;
  Timer? _tapTimer;
  Timer? _singleTapTimer;

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _showWelcomeMessage();
  }

  void _setupAnimations() {
    // 1. Idle Bounce (3s cycle, matches CSS ernest-bounce)
    _bounceController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: false);

    _bounceAnimation =
        TweenSequence<double>([
          TweenSequenceItem(tween: Tween(begin: 0, end: 12), weight: 50),
          TweenSequenceItem(tween: Tween(begin: 12, end: 0), weight: 50),
        ]).animate(
          CurvedAnimation(parent: _bounceController, curve: Curves.easeInOut),
        );

    // 2. Blink (4s cycle, matches CSS cartoon-blink)
    _blinkController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();

    // Custom blink: eyes open most of the time, quick blink at 48% and 98%
    _blinkAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: ConstantTween(1.0), weight: 46), // open
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.1), weight: 2), // close
      TweenSequenceItem(tween: Tween(begin: 0.1, end: 1.0), weight: 2), // open
      TweenSequenceItem(tween: ConstantTween(1.0), weight: 46), // open
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.1), weight: 2), // close
      TweenSequenceItem(tween: Tween(begin: 0.1, end: 1.0), weight: 2), // open
    ]).animate(_blinkController);

    // 3. LED Pulse (1s cycle, matches CSS cartoon-led)
    _ledController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat();

    _ledAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: ConstantTween(0.0), weight: 50),
      TweenSequenceItem(tween: ConstantTween(1.0), weight: 50),
    ]).animate(_ledController);

    // 4. Left Prong Wobble (4s cycle, matches CSS prong-wobble-l)
    _prongLeftController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();

    _prongLeftAnimation =
        TweenSequence<double>([
          TweenSequenceItem(tween: Tween(begin: 0, end: -4), weight: 25),
          TweenSequenceItem(tween: Tween(begin: -4, end: 2), weight: 50),
          TweenSequenceItem(tween: Tween(begin: 2, end: 0), weight: 25),
        ]).animate(
          CurvedAnimation(
            parent: _prongLeftController,
            curve: Curves.easeInOut,
          ),
        );

    // 5. Right Prong Wobble (4.5s cycle, matches CSS prong-wobble-r)
    _prongRightController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4500),
    )..repeat();

    _prongRightAnimation =
        TweenSequence<double>([
          TweenSequenceItem(tween: Tween(begin: 0, end: 4), weight: 30),
          TweenSequenceItem(tween: Tween(begin: 4, end: -2), weight: 40),
          TweenSequenceItem(tween: Tween(begin: -2, end: 0), weight: 30),
        ]).animate(
          CurvedAnimation(
            parent: _prongRightController,
            curve: Curves.easeInOut,
          ),
        );

    // 6. Zap Lines (3s cycle, matches CSS cartoon-zap)
    _zapController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat();

    _zapAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0.0, end: 0.0), weight: 5),
      TweenSequenceItem(tween: Tween(begin: 0.0, end: 1.0), weight: 10),
      TweenSequenceItem(tween: ConstantTween(1.0), weight: 10),
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.0), weight: 10),
      TweenSequenceItem(tween: ConstantTween(0.0), weight: 65),
    ]).animate(_zapController);

    // 7. Eyebrow Bop (4s cycle, matches CSS eyebrow-bop)
    _eyebrowController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();

    _eyebrowAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: ConstantTween(0.0), weight: 90),
      TweenSequenceItem(tween: Tween(begin: 0.0, end: -4.0), weight: 5),
      TweenSequenceItem(tween: Tween(begin: -4.0, end: 0.0), weight: 5),
    ]).animate(_eyebrowController);
  }

  void _showWelcomeMessage() {
    if (!widget.showSpeechBubble) return;

    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      final text =
          widget.speechText ?? _greetings[Random().nextInt(_greetings.length)];
      setState(() {
        _currentSpeech = text;
        _showBubble = true;
      });
      // Auto-hide after 4 seconds
      Future.delayed(const Duration(seconds: 4), () {
        if (!mounted) return;
        setState(() => _showBubble = false);
      });
    });
  }

  @override
  void dispose() {
    _bounceController.dispose();
    _blinkController.dispose();
    _ledController.dispose();
    _prongLeftController.dispose();
    _prongRightController.dispose();
    _zapController.dispose();
    _eyebrowController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ErnestController>(
      builder: (context, controller, child) {
        final isEarl = controller.currentPersona?.id == 'earl';

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {
            _tapCount++;
            _tapTimer?.cancel();
            _singleTapTimer?.cancel(); // Cancel any pending single-tap action

            _tapTimer = Timer(const Duration(milliseconds: 1500), () {
              if (mounted) {
                _tapCount = 0;
              }
            });

            if (widget.allowPersonaToggle && _tapCount >= 7) {
              _tapCount = 0;
              _tapTimer?.cancel();
              _singleTapTimer?.cancel();
              controller.switchPersona();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    isEarl
                        ? "System Override: Restoring Ernest..."
                        : "System Override: Booting Earl...",
                  ),
                  backgroundColor: isEarl ? const Color(0xFF6B9F78) : Colors.red,
                  duration: const Duration(seconds: 2),
                ),
              );
              return;
            }

            if (widget.isInteractive && widget.allowChatOpening && _tapCount == 1) {
              if (widget.allowPersonaToggle) {
                // Delay the chat opening only if toggle is allowed
                _singleTapTimer = Timer(const Duration(milliseconds: 400), () {
                  if (mounted) {
                    _showChat(context);
                  }
                });
              } else {
                // Open immediately if no toggle conflict
                _showChat(context);
              }
            }
          },
          child: SizedBox(
            width: widget.size,
            height: widget.size + (widget.showSpeechBubble ? 40 : 0),
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                // Speech Bubble (positioned above Ernest)
                if (widget.showSpeechBubble)
                  Positioned(
                    top: -10,
                    left: 0,
                    right: 0,
                    child: AnimatedOpacity(
                      opacity: _showBubble ? 1.0 : 0.0,
                      duration: const Duration(milliseconds: 300),
                      child: AnimatedSlide(
                        offset: _showBubble ? Offset.zero : const Offset(0, 0.2),
                        duration: const Duration(milliseconds: 300),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 8,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF6B9F78).withValues(alpha: 0.3),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                            border: Border.all(
                              color: const Color(0xFF6B9F78).withValues(alpha: 0.3),
                            ),
                          ),
                          child: Text(
                            _currentSpeech,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 13,
                              color: Color(0xFF334155),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),

                // Character (animated)
                Positioned(
                  top: widget.showSpeechBubble ? 40 : 0,
                  left: 0,
                  right: 0,
                  child: AnimatedBuilder(
                    animation: Listenable.merge([
                      _bounceController,
                      _blinkController,
                      _ledController,
                      _prongLeftController,
                      _prongRightController,
                      _zapController,
                      _eyebrowController,
                    ]),
                    builder: (context, child) {
                      return isEarl ? _buildAnimatedEarl() : _buildAnimatedErnest();
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showChat(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const ErnestChatOverlay(),
    );
  }

  Widget _buildAnimatedErnest() {
    return Transform.translate(
      offset: Offset(0, _bounceAnimation.value),
      child: SizedBox(
        width: widget.size,
        height: widget.size,
        child: CustomPaint(
          painter: _ErnestPainter(
            blinkValue: _blinkAnimation.value,
            ledValue: _ledAnimation.value,
            prongLeftAngle: _prongLeftAnimation.value,
            prongRightAngle: _prongRightAnimation.value,
            zapOpacity: _zapAnimation.value,
            eyebrowOffset: _eyebrowAnimation.value,
          ),
        ),
      ),
    );
  }

  Widget _buildAnimatedEarl() {
    return Transform.translate(
      offset: Offset(0, _bounceAnimation.value),
      child: SizedBox(
        width: widget.size,
        height: widget.size,
        child: CustomPaint(
          painter: _EarlPainter(
            blinkValue: _blinkAnimation.value,
            ledValue: _ledAnimation.value,
            prongLeftAngle: _prongLeftAnimation.value,
            prongRightAngle: _prongRightAnimation.value,
            zapOpacity: _zapAnimation.value,
            eyebrowOffset: _eyebrowAnimation.value,
          ),
        ),
      ),
    );
  }
}

/// Custom painter that renders the full Ernest character with animation params
class _ErnestPainter extends CustomPainter {
  final double blinkValue;
  final double ledValue;
  final double prongLeftAngle;
  final double prongRightAngle;
  final double zapOpacity;
  final double eyebrowOffset;

  _ErnestPainter({
    required this.blinkValue,
    required this.ledValue,
    required this.prongLeftAngle,
    required this.prongRightAngle,
    required this.zapOpacity,
    required this.eyebrowOffset,
  });

  // Scale factor from SVG viewBox (500x500) to widget size
  double _s(double v, double size) => v * size / 500;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width;

    // Colors from the SVG
    const outlineColor = Color(0xFF2A2D34);
    const bodyColor = Color(0xFF55595F);
    const panelColor = Color(0xFF80858B);
    const screenColor = Color(0xFF2A2D34);
    const prongColor = Color(0xFFB0B5BA);
    const prongBaseColor = Color(0xFF666666);
    const nubColor = Color(0xFF606469);
    const capColor = Color(0xFF606469);
    const noseColor = Color(0xFF606469);
    const cyanColor = Color(0xFF88DDED);
    const greenLedDim = Color(0xFF008F25);
    const greenLedBright = Color(0xFF00FF4C);
    const mouthColor = Color(0xFF141517);
    const tongueColor = Color(0xFFFF7675);

    final outlinePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(7, s)
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.round
      ..strokeCap = StrokeCap.round;

    final thickOutlinePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(9, s)
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.round
      ..strokeCap = StrokeCap.round;

    // Transform offset to match SVG's translate(45, 10)
    canvas.save();
    canvas.translate(_s(45, s), _s(10, s));

    // ── LEFT PRONG ──
    canvas.save();
    canvas.translate(_s(156, s), _s(135, s)); // pivot at base
    canvas.rotate(prongLeftAngle * pi / 180);
    canvas.translate(-_s(156, s), -_s(135, s));
    _drawProng(
      canvas,
      s,
      _s(145, s),
      _s(45, s),
      _s(156, s),
      prongColor,
      prongBaseColor,
      outlinePaint,
    );
    canvas.restore();

    // ── RIGHT PRONG ──
    canvas.save();
    canvas.translate(_s(266, s), _s(135, s)); // pivot at base
    canvas.rotate(prongRightAngle * pi / 180);
    canvas.translate(-_s(266, s), -_s(135, s));
    _drawProng(
      canvas,
      s,
      _s(255, s),
      _s(45, s),
      _s(266, s),
      prongColor,
      prongBaseColor,
      outlinePaint,
    );
    canvas.restore();

    // ── BODY ──
    final bodyPath = Path()
      ..moveTo(_s(100, s), _s(130, s))
      ..cubicTo(
        _s(80, s),
        _s(130, s),
        _s(70, s),
        _s(145, s),
        _s(70, s),
        _s(160, s),
      )
      ..lineTo(_s(70, s), _s(200, s))
      ..cubicTo(
        _s(70, s),
        _s(230, s),
        _s(140, s),
        _s(250, s),
        _s(140, s),
        _s(280, s),
      )
      ..lineTo(_s(140, s), _s(450, s))
      ..cubicTo(
        _s(140, s),
        _s(500, s),
        _s(280, s),
        _s(500, s),
        _s(280, s),
        _s(450, s),
      )
      ..lineTo(_s(280, s), _s(280, s))
      ..cubicTo(
        _s(280, s),
        _s(250, s),
        _s(350, s),
        _s(230, s),
        _s(350, s),
        _s(200, s),
      )
      ..lineTo(_s(350, s), _s(160, s))
      ..cubicTo(
        _s(350, s),
        _s(145, s),
        _s(340, s),
        _s(130, s),
        _s(320, s),
        _s(130, s),
      )
      ..close();

    canvas.drawPath(bodyPath, Paint()..color = bodyColor);
    canvas.drawPath(bodyPath, thickOutlinePaint);

    // Left side nub
    final nubRect = Rect.fromLTWH(_s(60, s), _s(165, s), _s(10, s), _s(30, s));
    canvas.drawRect(nubRect, Paint()..color = nubColor);
    canvas.drawRect(nubRect, outlinePaint);

    // Top screen panel fill
    final panelPath = Path()
      ..moveTo(_s(100, s), _s(130, s))
      ..lineTo(_s(320, s), _s(130, s))
      ..cubicTo(
        _s(340, s),
        _s(130, s),
        _s(350, s),
        _s(145, s),
        _s(350, s),
        _s(160, s),
      )
      ..lineTo(_s(350, s), _s(185, s))
      ..cubicTo(
        _s(350, s),
        _s(210, s),
        _s(270, s),
        _s(230, s),
        _s(210, s),
        _s(230, s),
      )
      ..cubicTo(
        _s(150, s),
        _s(230, s),
        _s(70, s),
        _s(210, s),
        _s(70, s),
        _s(185, s),
      )
      ..lineTo(_s(70, s), _s(160, s))
      ..cubicTo(
        _s(70, s),
        _s(145, s),
        _s(80, s),
        _s(130, s),
        _s(100, s),
        _s(130, s),
      )
      ..close();
    canvas.drawPath(panelPath, Paint()..color = panelColor);
    canvas.drawPath(panelPath, outlinePaint);

    // Bottom dark cap
    final capPath = Path()
      ..moveTo(_s(140, s), _s(435, s))
      ..quadraticBezierTo(_s(210, s), _s(445, s), _s(280, s), _s(435, s))
      ..lineTo(_s(280, s), _s(450, s))
      ..cubicTo(
        _s(280, s),
        _s(500, s),
        _s(140, s),
        _s(500, s),
        _s(140, s),
        _s(450, s),
      )
      ..close();
    canvas.drawPath(capPath, Paint()..color = capColor);
    canvas.drawPath(capPath, outlinePaint);

    // ── INNER DARK SCREEN ──
    final screenPath = Path()
      ..moveTo(_s(125, s), _s(145, s))
      ..lineTo(_s(295, s), _s(145, s))
      ..cubicTo(
        _s(315, s),
        _s(145, s),
        _s(325, s),
        _s(152, s),
        _s(325, s),
        _s(165, s),
      )
      ..lineTo(_s(325, s), _s(180, s))
      ..cubicTo(
        _s(325, s),
        _s(205, s),
        _s(260, s),
        _s(220, s),
        _s(210, s),
        _s(220, s),
      )
      ..cubicTo(
        _s(160, s),
        _s(220, s),
        _s(95, s),
        _s(205, s),
        _s(95, s),
        _s(180, s),
      )
      ..lineTo(_s(95, s), _s(165, s))
      ..cubicTo(
        _s(95, s),
        _s(152, s),
        _s(105, s),
        _s(145, s),
        _s(125, s),
        _s(145, s),
      )
      ..close();
    canvas.drawPath(screenPath, Paint()..color = screenColor);
    canvas.drawPath(screenPath, outlinePaint);

    // ── LED (animated) ──
    final ledColor = Color.lerp(greenLedDim, greenLedBright, ledValue)!;
    canvas.drawCircle(
      Offset(_s(278, s), _s(162, s)),
      _s(7, s),
      Paint()..color = ledColor,
    );
    canvas.drawCircle(Offset(_s(278, s), _s(162, s)), _s(7, s), outlinePaint);
    // LED glare
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(_s(278, s), _s(160, s)),
        width: _s(6, s),
        height: _s(3, s),
      ),
      Paint()..color = Colors.white.withValues(alpha: 0.6),
    );

    // ── TEXTS ──
    _drawText(canvas, 'STIM', _s(210, s), _s(212, s), _s(28, s), cyanColor, s);
    _drawText(canvas, 'STORE', _s(210, s), _s(375, s), _s(28, s), cyanColor, s);
    _drawText(canvas, '1', _s(210, s), _s(405, s), _s(24, s), cyanColor, s);
    _drawText(canvas, '2', _s(210, s), _s(435, s), _s(24, s), cyanColor, s);
    _drawText(canvas, '3', _s(135, s), _s(172, s), _s(28, s), Colors.white, s);
    _drawText(
      canvas,
      '+/-',
      _s(245, s),
      _s(170, s),
      _s(18, s),
      Colors.white,
      s,
    );

    // ── BOTTOM LOGO (heartbeat symbol) ──
    canvas.drawCircle(Offset(_s(210, s), _s(465, s)), _s(18, s), outlinePaint);
    final heartbeatPath = Path()
      ..moveTo(_s(190, s), _s(465, s))
      ..lineTo(_s(202, s), _s(465, s))
      ..lineTo(_s(206, s), _s(452, s))
      ..lineTo(_s(214, s), _s(478, s))
      ..lineTo(_s(218, s), _s(465, s))
      ..lineTo(_s(230, s), _s(465, s));
    canvas.drawPath(
      heartbeatPath,
      Paint()
        ..color = outlineColor
        ..strokeWidth = _s(5, s)
        ..style = PaintingStyle.stroke
        ..strokeJoin = StrokeJoin.round,
    );

    // ── FACE ──
    // Eyebrows (with animation)
    canvas.save();
    canvas.translate(0, _s(eyebrowOffset, s));
    final browPaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(7, s)
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final leftBrow = Path()
      ..moveTo(_s(165, s), _s(260, s))
      ..quadraticBezierTo(_s(180, s), _s(245, s), _s(195, s), _s(250, s));
    final rightBrow = Path()
      ..moveTo(_s(255, s), _s(260, s))
      ..quadraticBezierTo(_s(240, s), _s(245, s), _s(225, s), _s(250, s));
    canvas.drawPath(leftBrow, browPaint);
    canvas.drawPath(rightBrow, browPaint);
    canvas.restore();

    // Eyes (with blink animation)
    canvas.save();
    // Scale Y for blink effect - pivot around eye center
    final eyeCenterY = _s(285, s);
    canvas.translate(0, eyeCenterY);
    canvas.scale(1.0, blinkValue);
    canvas.translate(0, -eyeCenterY);

    // Left eye
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(_s(180, s), _s(285, s)),
        width: _s(24, s),
        height: _s(36, s),
      ),
      Paint()..color = const Color(0xFF1E1F24),
    );
    canvas.drawCircle(
      Offset(_s(183, s), _s(278, s)),
      _s(4, s),
      Paint()..color = Colors.white,
    );

    // Right eye
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(_s(240, s), _s(285, s)),
        width: _s(24, s),
        height: _s(36, s),
      ),
      Paint()..color = const Color(0xFF1E1F24),
    );
    canvas.drawCircle(
      Offset(_s(243, s), _s(278, s)),
      _s(4, s),
      Paint()..color = Colors.white,
    );
    canvas.restore();

    // Nose
    final noseRect = RRect.fromRectAndRadius(
      Rect.fromLTWH(_s(203, s), _s(283, s), _s(14, s), _s(24, s)),
      Radius.circular(_s(7, s)),
    );
    canvas.drawRRect(noseRect, Paint()..color = noseColor);
    canvas.drawRRect(noseRect, outlinePaint);

    // Nose ridges
    final ridgePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(4, s)
      ..strokeCap = StrokeCap.round;
    for (final y in [289.0, 295.0, 301.0]) {
      canvas.drawLine(
        Offset(_s(205, s), _s(y, s)),
        Offset(_s(215, s), _s(y, s)),
        ridgePaint,
      );
    }

    // Mouth (open - smiling)
    canvas.save();
    canvas.translate(_s(78.5, s), _s(108.75, s));
    canvas.scale(0.65);
    // Outer mouth
    final mouthPath = Path()
      ..moveTo(_s(175, s), _s(315, s))
      ..cubicTo(
        _s(175, s),
        _s(315, s),
        _s(210, s),
        _s(325, s),
        _s(245, s),
        _s(315, s),
      )
      ..cubicTo(
        _s(245, s),
        _s(355, s),
        _s(175, s),
        _s(355, s),
        _s(175, s),
        _s(315, s),
      );
    canvas.drawPath(mouthPath, Paint()..color = mouthColor);
    canvas.drawPath(
      mouthPath,
      Paint()
        ..color = outlineColor
        ..strokeWidth = _s(7, s)
        ..style = PaintingStyle.stroke
        ..strokeJoin = StrokeJoin.round,
    );

    // Tongue
    final tonguePath = Path()
      ..moveTo(_s(185, s), _s(340, s))
      ..quadraticBezierTo(_s(210, s), _s(315, s), _s(235, s), _s(340, s))
      ..cubicTo(
        _s(235, s),
        _s(365, s),
        _s(185, s),
        _s(365, s),
        _s(185, s),
        _s(340, s),
      );
    // Clip tongue within mouth
    canvas.save();
    canvas.clipPath(mouthPath);
    canvas.drawPath(tonguePath, Paint()..color = tongueColor);
    canvas.drawPath(
      tonguePath,
      Paint()
        ..color = outlineColor
        ..strokeWidth = _s(2, s)
        ..style = PaintingStyle.stroke,
    );
    canvas.restore();

    // Mouth corner dimples
    final dimplePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(7, s)
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final leftDimple = Path()
      ..moveTo(_s(168, s), _s(310, s))
      ..quadraticBezierTo(_s(172, s), _s(312, s), _s(175, s), _s(315, s));
    final rightDimple = Path()
      ..moveTo(_s(252, s), _s(310, s))
      ..quadraticBezierTo(_s(248, s), _s(312, s), _s(245, s), _s(315, s));
    canvas.drawPath(leftDimple, dimplePaint);
    canvas.drawPath(rightDimple, dimplePaint);

    canvas.restore(); // mouth transform

    // ── ZAP LINES (animated) ──
    if (zapOpacity > 0.01) {
      final zapPaint = Paint()
        ..color = cyanColor.withValues(alpha: zapOpacity)
        ..strokeWidth = _s(5, s)
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;

      final leftZap = Path()
        ..moveTo(_s(155, s), _s(10, s))
        ..lineTo(_s(140, s), _s(-20, s))
        ..lineTo(_s(160, s), _s(-35, s))
        ..lineTo(_s(145, s), _s(-60, s));

      final rightZap = Path()
        ..moveTo(_s(265, s), _s(10, s))
        ..lineTo(_s(280, s), _s(-20, s))
        ..lineTo(_s(260, s), _s(-35, s))
        ..lineTo(_s(275, s), _s(-60, s));

      canvas.drawPath(leftZap, zapPaint);
      canvas.drawPath(rightZap, zapPaint);
    }

    canvas.restore(); // main translate
  }

  void _drawProng(
    Canvas canvas,
    double s,
    double x,
    double y,
    double cx,
    Color color,
    Color baseColor,
    Paint outlinePaint,
  ) {
    // Prong shaft
    canvas.drawRect(
      Rect.fromLTWH(x, y, _s(22, s), _s(90, s)),
      Paint()..color = color,
    );
    canvas.drawRect(Rect.fromLTWH(x, y, _s(22, s), _s(90, s)), outlinePaint);

    // Shading strip
    canvas.drawRect(
      Rect.fromLTWH(x + _s(15, s), y, _s(7, s), _s(90, s)),
      Paint()..color = Colors.black.withValues(alpha: 0.15),
    );

    // Base connector
    canvas.drawRect(
      Rect.fromLTWH(x - _s(5, s), _s(105, s), _s(32, s), _s(15, s)),
      Paint()..color = baseColor,
    );
    canvas.drawRect(
      Rect.fromLTWH(x - _s(5, s), _s(105, s), _s(32, s), _s(15, s)),
      outlinePaint,
    );

    // Tip ball
    canvas.drawCircle(Offset(cx, y), _s(11, s), Paint()..color = color);
    canvas.drawCircle(Offset(cx, y), _s(11, s), outlinePaint);
  }

  void _drawText(
    Canvas canvas,
    String text,
    double x,
    double y,
    double fontSize,
    Color color,
    double s,
  ) {
    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: color,
          fontSize: fontSize,
          fontWeight: FontWeight.w900,
          fontFamily: 'monospace',
          letterSpacing: 2,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(x - textPainter.width / 2, y - textPainter.height),
    );
  }

  @override
  bool shouldRepaint(covariant _ErnestPainter oldDelegate) {
    return oldDelegate.blinkValue != blinkValue ||
        oldDelegate.ledValue != ledValue ||
        oldDelegate.prongLeftAngle != prongLeftAngle ||
        oldDelegate.prongRightAngle != prongRightAngle ||
        oldDelegate.zapOpacity != zapOpacity ||
        oldDelegate.eyebrowOffset != eyebrowOffset;
  }
}

class _EarlPainter extends CustomPainter {
  final double blinkValue;
  final double ledValue;
  final double prongLeftAngle;
  final double prongRightAngle;
  final double zapOpacity;
  final double eyebrowOffset;

  _EarlPainter({
    required this.blinkValue,
    required this.ledValue,
    required this.prongLeftAngle,
    required this.prongRightAngle,
    required this.zapOpacity,
    required this.eyebrowOffset,
  });

  double _s(double v, double size) => v * size / 500;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width;

    // Colors for Earl
    const bodyGradStart = Color(0xFF6A736E);
    const bodyGradMid = Color(0xFF555D59);
    const bodyGradEnd = Color(0xFF3B423F);
    const screenGradTop = Color(0xFF4C5C44);
    const screenGradBottom = Color(0xFF3A4734);
    const ledColorOff = Color(0xFF787D7A);
    const ledColorOn = Color(0xFF88DDED);
    const outlineColor = Color(0xFF1A1C1A);

    final outlinePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(6, s)
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.round;

    final thickOutlinePaint = Paint()
      ..color = outlineColor
      ..strokeWidth = _s(8, s)
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.round;

    // Body Chassis Path
    final bodyPath = Path()
      ..moveTo(_s(110, s), _s(160, s))
      ..cubicTo(
        _s(110, s),
        _s(110, s),
        _s(140, s),
        _s(100, s),
        _s(180, s),
        _s(100, s),
      )
      ..lineTo(_s(320, s), _s(100, s))
      ..cubicTo(
        _s(360, s),
        _s(100, s),
        _s(390, s),
        _s(110, s),
        _s(390, s),
        _s(160, s),
      )
      ..cubicTo(
        _s(390, s),
        _s(200, s),
        _s(350, s),
        _s(210, s),
        _s(330, s),
        _s(240, s),
      )
      ..cubicTo(
        _s(320, s),
        _s(255, s),
        _s(320, s),
        _s(280, s),
        _s(320, s),
        _s(300, s),
      )
      ..lineTo(_s(320, s), _s(480, s))
      ..cubicTo(
        _s(320, s),
        _s(530, s),
        _s(280, s),
        _s(540, s),
        _s(250, s),
        _s(540, s),
      )
      ..cubicTo(
        _s(220, s),
        _s(540, s),
        _s(180, s),
        _s(530, s),
        _s(180, s),
        _s(480, s),
      )
      ..lineTo(_s(180, s), _s(300, s))
      ..cubicTo(
        _s(180, s),
        _s(280, s),
        _s(180, s),
        _s(255, s),
        _s(170, s),
        _s(240, s),
      )
      ..cubicTo(
        _s(150, s),
        _s(210, s),
        _s(110, s),
        _s(200, s),
        _s(110, s),
        _s(160, s),
      )
      ..close();

    // Fill Body Graduate
    final bodyRect = Rect.fromLTWH(
      _s(110, s),
      _s(100, s),
      _s(280, s),
      _s(440, s),
    );
    final bodyPaint = Paint()
      ..shader = LinearGradient(
        colors: [bodyGradStart, bodyGradMid, bodyGradEnd],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bodyRect);

    canvas.drawPath(bodyPath, bodyPaint);

    // Body Highlights/Shadows
    final highlightPaint = Paint()
      ..color = Colors.white.withOpacity(0.2)
      ..strokeWidth = _s(6, s)
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final highlightPath = Path()
      ..moveTo(_s(120, s), _s(160, s))
      ..cubicTo(
        _s(120, s),
        _s(120, s),
        _s(145, s),
        _s(110, s),
        _s(180, s),
        _s(110, s),
      )
      ..lineTo(_s(320, s), _s(110, s));
    canvas.drawPath(highlightPath, highlightPaint);

    canvas.drawPath(bodyPath, thickOutlinePaint);

    // Prongs
    _drawProng(
      canvas,
      s,
      _s(180, s),
      _s(40, s),
      _s(188, s),
      prongLeftAngle,
      outlinePaint,
    );
    _drawProng(
      canvas,
      s,
      _s(304, s),
      _s(40, s),
      _s(312, s),
      prongRightAngle,
      outlinePaint,
    );

    // Text decorations on body
    _drawBodyText(canvas, s);

    // Screen area
    final screenPath = Path()
      ..moveTo(_s(125, s), _s(130, s))
      ..lineTo(_s(375, s), _s(130, s))
      ..cubicTo(
        _s(385, s),
        _s(130, s),
        _s(385, s),
        _s(180, s),
        _s(375, s),
        _s(180, s),
      )
      ..lineTo(_s(125, s), _s(180, s))
      ..cubicTo(
        _s(115, s),
        _s(180, s),
        _s(115, s),
        _s(130, s),
        _s(125, s),
        _s(130, s),
      )
      ..close();

    final screenRect = Rect.fromLTWH(
      _s(115, s),
      _s(130, s),
      _s(270, s),
      _s(50, s),
    );
    final screenPaint = Paint()
      ..shader = LinearGradient(
        colors: [screenGradTop, screenGradBottom],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(screenRect);

    canvas.drawPath(screenPath, screenPaint);

    // Gloss effect on screen
    final glossPaint = Paint()
      ..shader = LinearGradient(
        colors: [Colors.white.withOpacity(0.25), Colors.white.withOpacity(0)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(screenRect);
    canvas.drawPath(screenPath, glossPaint);

    canvas.drawPath(screenPath, outlinePaint);

    // ERROR Text
    _drawText(
      canvas,
      'ERROR',
      _s(250, s),
      _s(170, s),
      _s(36, s),
      const Color(0xFF222B1C).withOpacity(0.9),
      s,
    );

    // LED
    final ledColor = Color.lerp(ledColorOff, ledColorOn, ledValue)!;
    canvas.drawCircle(
      Offset(_s(365, s), _s(155, s)),
      _s(7, s),
      Paint()..color = ledColor,
    );
    canvas.drawCircle(Offset(_s(365, s), _s(155, s)), _s(7, s), outlinePaint);

    // Face Area (Earl's face is the ERROR screen, so we don't draw the standard face)
    // _drawFace(canvas, s, outlinePaint);

    // Zap lines (if any)
    if (zapOpacity > 0.01) {
      final zapPaint = Paint()
        ..color = const Color(0xFF88DDED).withOpacity(zapOpacity)
        ..strokeWidth = _s(5, s)
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;

      final zapPath = Path()
        ..moveTo(_s(155, s), _s(10, s))
        ..lineTo(_s(140, s), _s(-20, s))
        ..lineTo(_s(160, s), _s(-35, s))
        ..lineTo(_s(145, s), _s(-60, s));
      canvas.drawPath(zapPath, zapPaint);
    }
  }

  void _drawProng(
    Canvas canvas,
    double s,
    double x,
    double y,
    double cx,
    double angle,
    Paint outlinePaint,
  ) {
    canvas.save();
    canvas.translate(cx, y + _s(80, s));
    canvas.rotate(angle * pi / 180);
    canvas.translate(-cx, -(y + _s(80, s)));

    canvas.drawRect(
      Rect.fromLTWH(x, y, _s(16, s), _s(80, s)),
      Paint()..color = const Color(0xFF787D7A),
    );
    canvas.drawRect(Rect.fromLTWH(x, y, _s(16, s), _s(80, s)), outlinePaint);
    canvas.drawCircle(
      Offset(cx, y),
      _s(12, s),
      Paint()..color = const Color(0xFF787D7A),
    );
    canvas.drawCircle(Offset(cx, y), _s(12, s), outlinePaint);

    canvas.restore();
  }


  void _drawBodyText(Canvas canvas, double s) {
    const textColor = Color(0xFF2A302D);
    const opacity = 0.4;

    _drawText(
      canvas,
      'STIM',
      _s(250, s),
      _s(235, s),
      _s(44, s),
      textColor.withOpacity(opacity),
      s,
    );
    _drawText(
      canvas,
      'STORE',
      _s(250, s),
      _s(390, s),
      _s(38, s),
      textColor.withOpacity(opacity),
      s,
    );
    _drawText(
      canvas,
      '1',
      _s(250, s),
      _s(430, s),
      _s(34, s),
      textColor.withOpacity(opacity),
      s,
    );
    _drawText(
      canvas,
      '2',
      _s(250, s),
      _s(470, s),
      _s(34, s),
      textColor.withOpacity(opacity),
      s,
    );

    // Heartbeat line at bottom
    final stimBasePaint = Paint()
      ..color = const Color(0xFF1A1C1A)
      ..strokeWidth = _s(5, s)
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.miter;

    canvas.drawCircle(
      Offset(_s(250, s), _s(515, s)),
      _s(22, s),
      Paint()..color = const Color(0xFF4A524E).withOpacity(0.5),
    );
    canvas.drawCircle(Offset(_s(250, s), _s(515, s)), _s(22, s), stimBasePaint);

    final heartbeat = Path()
      ..moveTo(_s(228, s), _s(515, s))
      ..lineTo(_s(240, s), _s(515, s))
      ..lineTo(_s(245, s), _s(498, s))
      ..lineTo(_s(255, s), _s(532, s))
      ..lineTo(_s(260, s), _s(515, s))
      ..lineTo(_s(272, s), _s(515, s));
    canvas.drawPath(heartbeat, stimBasePaint);
  }

  void _drawText(
    Canvas canvas,
    String text,
    double x,
    double y,
    double fontSize,
    Color color,
    double s,
  ) {
    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: color,
          fontSize: _s(fontSize, s),
          fontWeight: FontWeight.w900,
          fontFamily: 'monospace',
          letterSpacing: 2,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(x - textPainter.width / 2, y - textPainter.height / 2),
    );
  }

  @override
  bool shouldRepaint(covariant _EarlPainter oldDelegate) {
    return oldDelegate.blinkValue != blinkValue ||
        oldDelegate.ledValue != ledValue ||
        oldDelegate.prongLeftAngle != prongLeftAngle ||
        oldDelegate.prongRightAngle != prongRightAngle ||
        oldDelegate.zapOpacity != zapOpacity ||
        oldDelegate.eyebrowOffset != eyebrowOffset;
  }
}
