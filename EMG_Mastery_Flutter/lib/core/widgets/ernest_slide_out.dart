import 'package:flutter/material.dart';
import 'ernest_widget.dart';

/// Ernest tucked behind a tab on the right edge of the screen.
///
/// Tapping the tab slides him in/out. While hidden, the animated Ernest
/// widget is not built at all, so its seven repeating animation
/// controllers cost nothing — important on phones, where the always-on
/// canvas repaints competed with scrolling.
///
/// Place inside a Stack; it positions itself (fills the Stack but only
/// its visible children take hits, so content underneath stays tappable).
class ErnestSlideOut extends StatefulWidget {
  final double size;
  final double bottom;

  const ErnestSlideOut({super.key, this.size = 180, this.bottom = 100});

  @override
  State<ErnestSlideOut> createState() => _ErnestSlideOutState();
}

class _ErnestSlideOutState extends State<ErnestSlideOut> {
  bool _open = false;

  /// Ernest stays built during the slide-out animation, then is torn down.
  bool _ernestAlive = false;

  static const _slideDuration = Duration(milliseconds: 300);

  void _toggle() {
    setState(() {
      _open = !_open;
      if (_open) _ernestAlive = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Height includes the speech bubble strip above the character.
    final panelWidth = widget.size;
    final panelHeight = widget.size + 40;

    return Positioned.fill(
      child: Stack(
        children: [
          // Sliding Ernest panel
          AnimatedPositioned(
            duration: _slideDuration,
            curve: Curves.easeOutCubic,
            right: _open ? 10 : -(panelWidth + 24),
            bottom: widget.bottom,
            onEnd: () {
              if (!_open && mounted) setState(() => _ernestAlive = false);
            },
            child: SizedBox(
              width: panelWidth,
              height: panelHeight,
              child: _ernestAlive
                  ? AnimatedErnestWidget(
                      size: widget.size,
                      showSpeechBubble: true,
                      allowPersonaToggle: false,
                    )
                  : null,
            ),
          ),

          // Pull tab, vertically aligned with Ernest's middle
          AnimatedPositioned(
            duration: _slideDuration,
            curve: Curves.easeOutCubic,
            right: _open ? panelWidth + 14 : 0,
            bottom: widget.bottom + panelHeight / 2 - 36,
            child: GestureDetector(
              onTap: _toggle,
              child: Container(
                width: 34,
                height: 72,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF6B9F78), Color(0xFF5A8A67)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.horizontal(
                    left: Radius.circular(14),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.25),
                      blurRadius: 8,
                      offset: const Offset(-2, 2),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      _open
                          ? Icons.chevron_right_rounded
                          : Icons.chevron_left_rounded,
                      color: Colors.white,
                      size: 20,
                    ),
                    const SizedBox(height: 2),
                    const Icon(
                      Icons.smart_toy_rounded,
                      color: Colors.white,
                      size: 18,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
