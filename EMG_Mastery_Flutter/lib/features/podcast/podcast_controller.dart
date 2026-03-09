import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import '../../data/models/podcast_model.dart';

class PodcastController extends ChangeNotifier {
  final AudioPlayer _player = AudioPlayer();

  PodcastEpisode? _currentEpisode;
  bool _isPlaying = false;
  Duration _position = Duration.zero;
  Duration _lastNotifiedPosition = Duration.zero; // For throttling
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
      // Throttling: only notify listeners if at least 500ms has passed
      // or if it's a significant jump (pause/seek)
      if ((pos - _lastNotifiedPosition).inMilliseconds.abs() > 500) {
        _lastNotifiedPosition = pos;
        notifyListeners();
      }
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
    _lastNotifiedPosition = position;
    notifyListeners();
  }

  Future<void> skipForward() async {
    final newPos = _position + const Duration(seconds: 15);
    await seek(newPos > _duration ? _duration : newPos);
  }

  Future<void> skipBackward() async {
    final newPos = _position - const Duration(seconds: 15);
    await seek(newPos < Duration.zero ? Duration.zero : newPos);
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
