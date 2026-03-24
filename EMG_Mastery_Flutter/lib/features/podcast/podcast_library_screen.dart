import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'podcast_controller.dart';
import '../../data/podcast_data.dart';
import '../../data/models/podcast_model.dart';
import 'widgets/podcast_player_overlay.dart';

class PodcastLibraryScreen extends StatelessWidget {
  const PodcastLibraryScreen({super.key});

  static const _categoryColors = <String, Color>{
    'emg-introduction': Color(0xFF0D9488),
    'plexus-anatomy': Color(0xFF7C3AED),
    'radiculopathy': Color(0xFFDC2626),
    'neuropathy-pathophysiology': Color(0xFF2563EB),
    'basic-patterns': Color(0xFFD97706),
    'extra-topics': Color(0xFF059669),
    'edx-series': Color(0xFF4F46E5),
  };

  @override
  Widget build(BuildContext context) {
    final categories = PodcastData.episodes;
    final allEpisodes = PodcastData.allEpisodes;
    final totalMinutes = _totalMinutes(allEpisodes);

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        title: const Text(
          'Podcast Library',
          style: TextStyle(
            fontWeight: FontWeight.w900,
            color: Color(0xFF1E293B),
            fontSize: 18,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        iconTheme: const IconThemeData(color: Color(0xFF1E293B)),
      ),
      body: Consumer<PodcastController>(
        builder: (context, controller, _) {
          return CustomScrollView(
            slivers: [
              _buildHeroHeader(allEpisodes.length, totalMinutes),
              if (controller.hasError)
                SliverToBoxAdapter(child: _buildErrorBanner(controller)),
              ...categories.entries.expand((entry) {
                final color = _categoryColors[entry.key] ??
                    const Color(0xFF64748B);
                final episodes = entry.value;
                return [
                  SliverToBoxAdapter(
                    child: _buildCategoryHeader(
                      _formatCategoryName(entry.key),
                      episodes.length,
                      color,
                    ),
                  ),
                  SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final ep = episodes[index];
                        final globalIndex =
                            _globalIndex(categories, entry.key, index);
                        final isPlaying =
                            controller.currentEpisode?.id == ep.id;
                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: _buildEpisodeCard(
                            context,
                            ep,
                            globalIndex,
                            color,
                            isPlaying,
                            controller.isPlaying && isPlaying,
                            controller.isCompleted(ep.id),
                          ),
                        );
                      },
                      childCount: episodes.length,
                    ),
                  ),
                ];
              }),
              const SliverToBoxAdapter(child: SizedBox(height: 120)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHeroHeader(int count, int totalMinutes) {
    final hours = totalMinutes ~/ 60;
    final mins = totalMinutes % 60;

    return SliverToBoxAdapter(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(24, 32, 24, 28),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1E293B), Color(0xFF334155)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          children: [
            // Waveform decoration
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(7, (i) {
                final heights = [12.0, 20.0, 28.0, 36.0, 28.0, 20.0, 12.0];
                return Container(
                  width: 4,
                  height: heights[i],
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF59E0B),
                    borderRadius: BorderRadius.circular(2),
                  ),
                );
              }),
            ),
            const SizedBox(height: 16),
            const Text(
              "Ernest's EDX Podcast",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Clinical pearls, anatomy, and diagnostic breakthroughs',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                color: Colors.white.withValues(alpha: 0.7),
                height: 1.4,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildStatChip(
                  '$count episodes',
                  const Color(0xFFF59E0B),
                ),
                const SizedBox(width: 12),
                _buildStatChip(
                  '${hours}h ${mins}m total',
                  const Color(0xFF38BDF8),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatChip(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }

  Widget _buildErrorBanner(PodcastController controller) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFFEE2E2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFFCA5A5)),
      ),
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: Color(0xFFDC2626), size: 20),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              controller.errorMessage ?? 'An error occurred',
              style: const TextStyle(
                color: Color(0xFF991B1B),
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          GestureDetector(
            onTap: () => controller.clearError(),
            child: const Icon(Icons.close, color: Color(0xFF991B1B), size: 18),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryHeader(String name, int count, Color color) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 28, 16, 10),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 24,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 10),
          Text(
            name,
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: Color(0xFF1E293B),
              letterSpacing: -0.3,
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              '$count',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: color,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEpisodeCard(
    BuildContext context,
    PodcastEpisode episode,
    int globalIndex,
    Color categoryColor,
    bool isActive,
    bool isActuallyPlaying,
    bool isCompleted,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isActive ? categoryColor.withValues(alpha: 0.05) : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isActive
              ? categoryColor.withValues(alpha: 0.3)
              : const Color(0xFFE2E8F0),
          width: isActive ? 1.5 : 1,
        ),
        boxShadow: [
          if (!isActive)
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
        ],
      ),
      child: InkWell(
        onTap: () {
          final ctrl = context.read<PodcastController>();
          ctrl.playEpisode(episode);
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            builder: (_) => ChangeNotifierProvider.value(
              value: ctrl,
              child: const PodcastPlayerOverlay(),
            ),
          );
        },
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              // Episode number
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  color: isActive
                      ? categoryColor
                      : categoryColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(
                  child: isActuallyPlaying
                      ? Icon(
                          Icons.equalizer_rounded,
                          color: Colors.white,
                          size: 20,
                        )
                      : Text(
                          '${globalIndex + 1}'.padLeft(2, '0'),
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w800,
                            color: isActive
                                ? Colors.white
                                : categoryColor,
                          ),
                        ),
                ),
              ),
              const SizedBox(width: 14),
              // Title + description
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      episode.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: isActive
                            ? categoryColor
                            : const Color(0xFF1E293B),
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      episode.description,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF94A3B8),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              // Duration + completion
              if (isCompleted)
                const Padding(
                  padding: EdgeInsets.only(right: 6),
                  child: Icon(
                    Icons.check_circle,
                    color: Color(0xFF10B981),
                    size: 18,
                  ),
                ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  episode.duration,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF64748B),
                    fontFeatures: [FontFeature.tabularFigures()],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  int _globalIndex(
    Map<String, List<PodcastEpisode>> categories,
    String currentKey,
    int localIndex,
  ) {
    int count = 0;
    for (final entry in categories.entries) {
      if (entry.key == currentKey) return count + localIndex;
      count += entry.value.length;
    }
    return count + localIndex;
  }

  int _totalMinutes(List<PodcastEpisode> episodes) {
    int total = 0;
    for (final ep in episodes) {
      final parts = ep.duration.split(':');
      if (parts.length == 2) {
        total += int.tryParse(parts[0]) ?? 0;
        // Add 1 min for each partial minute
        if ((int.tryParse(parts[1]) ?? 0) > 0) total += 1;
      }
    }
    return total;
  }

  String _formatCategoryName(String key) {
    return key
        .split('-')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');
  }
}
