import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import '../../data/models/podcast_model.dart';

class PodcastController extends ChangeNotifier {
  final AudioPlayer _player = AudioPlayer();

  PodcastEpisode? _currentEpisode;
  bool _isPlaying = false;
  Duration _position = Duration.zero;
  Duration _duration = Duration.zero;
  double _speed = 1.0;

  PodcastController() {
    _initListeners();
  }

  PodcastEpisode? get currentEpisode => _currentEpisode;
  bool get isPlaying => _isPlaying;
  Duration get position => _position;
  Duration get duration => _duration;
  double get speed => _speed;

  void _initListeners() {
    _player.playerStateStream.listen((state) {
      _isPlaying = state.playing;
      notifyListeners();
    });

    _player.positionStream.listen((pos) {
      _position = pos;
      notifyListeners();
    });

    _player.durationStream.listen((dur) {
      _duration = dur ?? Duration.zero;
      notifyListeners();
    });
  }

  Future<void> playEpisode(PodcastEpisode episode) async {
    if (_currentEpisode?.id == episode.id) {
      if (!_player.playing) {
        await _player.play();
      }
      return;
    }

    _currentEpisode = episode;
    notifyListeners();

    try {
      // Assuming audio files are local assets for now as per web structure
      // If they are remote, use AudioSource.uri
      await _player.setAsset('assets/${episode.audioFile}');
      await _player.play();
    } catch (e) {
      debugPrint("Error playing podcast: $e");
      // Fallback: If asset fails, it might be a missing file or path issue
    }
  }

  Future<void> togglePlayPause() async {
    if (_player.playing) {
      await _player.pause();
    } else {
      await _player.play();
    }
  }

  Future<void> seek(Duration position) async {
    await _player.seek(position);
  }

  Future<void> setSpeed(double speed) async {
    _speed = speed;
    await _player.setSpeed(speed);
    notifyListeners();
  }

  Future<void> stop() async {
    await _player.stop();
    _currentEpisode = null;
    notifyListeners();
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }
}
