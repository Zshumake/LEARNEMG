import 'package:flutter/material.dart';
import 'package:youtube_player_iframe/youtube_player_iframe.dart';

/// YouTube embed with a lightweight thumbnail facade.
///
/// The real iframe player (heavy: its own JS runtime + media pipeline) is
/// only created when the user taps play, and at most ONE player is alive
/// app-wide — activating a video disposes the previous one. Pages that
/// list many videos (Pattern Library has 9) previously instantiated every
/// iframe at once, which exhausted iOS Safari's tab memory and crashed
/// the app mid-scroll.
class AppVideoPlayer extends StatefulWidget {
  final String videoId;
  final double? aspectRatio;

  const AppVideoPlayer({
    super.key,
    required this.videoId,
    this.aspectRatio = 16 / 9,
  });

  @override
  State<AppVideoPlayer> createState() => _AppVideoPlayerState();
}

class _AppVideoPlayerState extends State<AppVideoPlayer> {
  YoutubePlayerController? _controller;

  /// The single currently-active player, so a new activation can shut it down.
  static _AppVideoPlayerState? _active;

  bool get _activated => _controller != null;

  void _activate() {
    if (_activated) return;
    final previous = _active;
    if (previous != null && previous != this && previous.mounted) {
      previous._deactivate();
    }
    _active = this;
    setState(() {
      _controller = YoutubePlayerController.fromVideoId(
        videoId: widget.videoId,
        autoPlay: true,
        params: const YoutubePlayerParams(
          showControls: true,
          showFullscreenButton: true,
          mute: false,
        ),
      );
    });
  }

  void _deactivate() {
    _controller?.close();
    if (mounted) {
      setState(() => _controller = null);
    } else {
      _controller = null;
    }
  }

  @override
  void dispose() {
    _controller?.close();
    if (_active == this) _active = null;
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: AspectRatio(
        aspectRatio: widget.aspectRatio!,
        child: _activated
            ? YoutubePlayer(
                controller: _controller!,
                aspectRatio: widget.aspectRatio!,
              )
            : _buildFacade(),
      ),
    );
  }

  Widget _buildFacade() {
    return InkWell(
      onTap: _activate,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Container(color: const Color(0xFF0F172A)),
          // hqdefault is ~15-25 KB vs several MB for a live player iframe.
          Image.network(
            'https://i.ytimg.com/vi/${widget.videoId}/hqdefault.jpg',
            fit: BoxFit.cover,
            errorBuilder: (context, error, stack) => const Center(
              child: Icon(Icons.ondemand_video_rounded,
                  color: Colors.white24, size: 48),
            ),
          ),
          Center(
            child: Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: Colors.black.withValues(alpha: 0.65),
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white70, width: 2),
              ),
              child:
                  const Icon(Icons.play_arrow_rounded, color: Colors.white, size: 40),
            ),
          ),
        ],
      ),
    );
  }
}
