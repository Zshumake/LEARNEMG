import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:audio_video_progress_bar/audio_video_progress_bar.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import '../podcast_controller.dart';
import '../../../core/theme/app_theme.dart';

class PodcastPlayerOverlay extends StatelessWidget {
  const PodcastPlayerOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<PodcastController>();
    final episode = controller.currentEpisode;

    if (episode == null) return const SizedBox.shrink();

    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: const BoxDecoration(
        color: Color(0xFF0F172A),
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: SafeArea(
        bottom:
            false, // Handle is at top, we want the bottom to be handled by higher up or ignored if it's a sheet
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
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    // Artwork
                    Container(
                      width: 240,
                      height: 240,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(24),
                        gradient: AppTheme.foundationGradient,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.primary.withValues(alpha: 0.3),
                            blurRadius: 40,
                            offset: const Offset(0, 20),
                          ),
                        ],
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.headphones,
                          size: 100,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Title & Info
                    Text(
                      episode.title,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      "Ernest's EMG Podcast",
                      style: TextStyle(
                        color: AppTheme.primary.withValues(alpha: 0.8),
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Progress Bar
                    ProgressBar(
                      progress: controller.position,
                      total: controller.duration,
                      onSeek: (duration) => controller.seek(duration),
                      baseBarColor: Colors.white.withValues(alpha: 0.1),
                      progressBarColor: AppTheme.primary,
                      bufferedBarColor: Colors.white.withValues(alpha: 0.05),
                      thumbColor: AppTheme.primary,
                      barHeight: 4,
                      thumbRadius: 6,
                      timeLabelTextStyle: const TextStyle(
                        color: Colors.white54,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Controls
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildSpeedButton(context, controller),
                        IconButton(
                          onPressed: () => controller.seek(
                            controller.position - const Duration(seconds: 15),
                          ),
                          icon: const Icon(
                            Icons.replay_10_rounded,
                            color: Colors.white,
                            size: 32,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => controller.togglePlayPause(),
                          child: Container(
                            width: 80,
                            height: 80,
                            decoration: const BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              controller.isPlaying
                                  ? Icons.pause_rounded
                                  : Icons.play_arrow_rounded,
                              size: 48,
                              color: const Color(0xFF0F172A),
                            ),
                          ),
                        ),
                        IconButton(
                          onPressed: () => controller.seek(
                            controller.position + const Duration(seconds: 15),
                          ),
                          icon: const Icon(
                            Icons.forward_10_rounded,
                            color: Colors.white,
                            size: 32,
                          ),
                        ),
                        IconButton(
                          onPressed: () => controller.stop(),
                          icon: const Icon(
                            Icons.stop_rounded,
                            color: Colors.white,
                            size: 32,
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 48),

                    // Show Notes
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        "Show Notes",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    MarkdownBody(
                      data: episode.showNotes ?? '',
                      styleSheet: MarkdownStyleSheet(
                        p: const TextStyle(
                          color: Colors.white70,
                          fontSize: 14,
                          height: 1.5,
                        ),
                        h4: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          height: 2,
                        ),
                        listBullet: const TextStyle(color: AppTheme.primary),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSpeedButton(BuildContext context, PodcastController controller) {
    return GestureDetector(
      onTap: () {
        double nextSpeed = 1.0;
        if (controller.speed == 1.0)
          nextSpeed = 1.25;
        else if (controller.speed == 1.25)
          nextSpeed = 1.5;
        else if (controller.speed == 1.5)
          nextSpeed = 2.0;
        else
          nextSpeed = 1.0;
        controller.setSpeed(nextSpeed);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.white24),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          "${controller.speed}x",
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
