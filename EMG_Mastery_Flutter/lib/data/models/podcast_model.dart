class PodcastEpisode {
  final String id;
  final String title;
  final String duration;
  final String audioFile;
  final String description;
  final String? transcript;
  final String? showNotes;
  final String? icon;

  PodcastEpisode({
    required this.id,
    required this.title,
    required this.duration,
    required this.audioFile,
    required this.description,
    this.transcript,
    this.showNotes,
    this.icon,
  });
}

class PodcastSeries {
  final String moduleId;
  final List<PodcastEpisode> episodes;

  PodcastSeries({required this.moduleId, required this.episodes});
}
