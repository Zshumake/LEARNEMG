import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:audio_video_progress_bar/audio_video_progress_bar.dart';
import '../podcast_controller.dart';

class PodcastPlayerOverlay extends StatelessWidget {
  const PodcastPlayerOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<PodcastController>();
    final episode = controller.currentEpisode;

    if (episode == null) return const SizedBox.shrink();

    return Container(
      height: MediaQuery.of(context).size.height * 0.82,
      decoration: const BoxDecoration(
        color: Color(0xFF0F172A),
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Drag handle
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.white24,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
              child: Column(
                children: [
                  // Artwork area - waveform + gradient
                  Container(
                    width: 160,
                    height: 160,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(24),
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1E293B), Color(0xFF334155)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      border: Border.all(
                        color: Colors.white.withValues(alpha: 0.08),
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF59E0B).withValues(alpha: 0.15),
                          blurRadius: 40,
                          offset: const Offset(0, 20),
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Waveform bars
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(5, (i) {
                            final heights = [16.0, 28.0, 40.0, 28.0, 16.0];
                            return AnimatedContainer(
                              duration: Duration(milliseconds: 300 + i * 100),
                              width: 5,
                              height: controller.isPlaying
                                  ? heights[i]
                                  : heights[i] * 0.5,
                              margin: const EdgeInsets.symmetric(horizontal: 3),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF59E0B),
                                borderRadius: BorderRadius.circular(3),
                              ),
                            );
                          }),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'EPISODE',
                          style: TextStyle(
                            color: Colors.white.withValues(alpha: 0.4),
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 2,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),

                  // Title
                  Text(
                    episode.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 22,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    "Ernest's EMG Podcast",
                    style: TextStyle(
                      color: const Color(0xFFF59E0B).withValues(alpha: 0.8),
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    episode.description,
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.5),
                      fontSize: 13,
                      height: 1.4,
                    ),
                  ),

                  // Error message
                  if (controller.hasError) ...[
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 10),
                      decoration: BoxDecoration(
                        color: const Color(0xFFDC2626).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        controller.errorMessage ?? 'Error loading audio',
                        style: const TextStyle(
                          color: Color(0xFFFCA5A5),
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],

                  const SizedBox(height: 28),

                  // Progress Bar
                  ProgressBar(
                    progress: controller.position,
                    total: controller.duration,
                    onSeek: (duration) => controller.seek(duration),
                    baseBarColor: Colors.white.withValues(alpha: 0.08),
                    progressBarColor: const Color(0xFFF59E0B),
                    bufferedBarColor: Colors.white.withValues(alpha: 0.04),
                    thumbColor: const Color(0xFFF59E0B),
                    barHeight: 4,
                    thumbRadius: 7,
                    timeLabelTextStyle: TextStyle(
                      color: Colors.white.withValues(alpha: 0.5),
                      fontSize: 12,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Controls
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildSpeedButton(controller),
                      _controlButton(
                        Icons.replay_10_rounded,
                        32,
                        () => controller.seek(
                          controller.position -
                              const Duration(seconds: 15),
                        ),
                      ),
                      // Play/Pause
                      GestureDetector(
                        onTap: () => controller.togglePlayPause(),
                        child: Container(
                          width: 72,
                          height: 72,
                          decoration: const BoxDecoration(
                            color: Color(0xFFF59E0B),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            controller.isPlaying
                                ? Icons.pause_rounded
                                : Icons.play_arrow_rounded,
                            size: 40,
                            color: const Color(0xFF0F172A),
                          ),
                        ),
                      ),
                      _controlButton(
                        Icons.forward_10_rounded,
                        32,
                        () => controller.seek(
                          controller.position +
                              const Duration(seconds: 15),
                        ),
                      ),
                      _controlButton(
                        Icons.stop_rounded,
                        28,
                        () {
                          controller.stop();
                          Navigator.of(context).pop();
                        },
                      ),
                    ],
                  ),

                  const SizedBox(height: 36),

                  // Show Notes
                  if (episode.showNotes != null &&
                      episode.showNotes!.isNotEmpty) ...[
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'SHOW NOTES',
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.4),
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.5,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.05),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.08),
                        ),
                      ),
                      child: Text(
                        episode.showNotes!,
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.7),
                          fontSize: 14,
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _controlButton(IconData icon, double size, VoidCallback onTap) {
    return IconButton(
      onPressed: onTap,
      icon: Icon(icon, color: Colors.white, size: size),
    );
  }

  Widget _buildSpeedButton(PodcastController controller) {
    return GestureDetector(
      onTap: () => controller.cycleSpeed(),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.white24),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          '${controller.speed}x',
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}
