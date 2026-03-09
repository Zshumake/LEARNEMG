import 'package:flutter/material.dart';
import 'package:youtube_player_iframe/youtube_player_iframe.dart';

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
  late YoutubePlayerController _controller;
  bool _isInteracting = false;

  @override
  void initState() {
    super.initState();
    _controller = YoutubePlayerController.fromVideoId(
      videoId: widget.videoId,
      autoPlay: false,
      params: const YoutubePlayerParams(
        showControls: true,
        showFullscreenButton: true,
        mute: false,
      ),
    );
  }

  @override
  void dispose() {
    _controller.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: AspectRatio(
        aspectRatio: widget.aspectRatio!,
        child: Stack(
          children: [
            YoutubePlayer(
              controller: _controller,
              aspectRatio: widget.aspectRatio!,
            ),
            if (!_isInteracting)
              GestureDetector(
                onTap: () {
                  setState(() {
                    _isInteracting = true;
                  });
                  _controller.playVideo();
                },
                child: Container(
                  color: Colors.transparent,
                  width: double.infinity,
                  height: double.infinity,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
