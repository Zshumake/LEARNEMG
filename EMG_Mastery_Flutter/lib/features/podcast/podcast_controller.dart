import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../data/models/podcast_model.dart';

class PodcastController extends ChangeNotifier {
  final AudioPlayer _player = AudioPlayer();

  PodcastEpisode? _currentEpisode;
  bool _isPlaying = false;
  Duration _position = Duration.zero;
  Duration _lastNotifiedPosition = Duration.zero;
  Duration _lastSavedPosition = Duration.zero;
  Duration _duration = Duration.zero;
  double _speed = 1.0;
  String? _errorMessage;

  // Queue
  List<PodcastEpisode> _queue = [];
  int _queueIndex = -1;

  // Persistence
  SharedPreferences? _prefs;
  final Set<String> _completedEpisodes = {};
  static const _completedKey = 'podcast_completed';
  static const _positionPrefix = 'podcast_pos_';

  static const List<double> speedOptions = [1.0, 1.25, 1.5, 2.0];

  PodcastController() {
    _initListeners();
    _loadPrefs();
  }

  PodcastEpisode? get currentEpisode => _currentEpisode;
  bool get isPlaying => _isPlaying;
  Duration get position => _position;
  Duration get duration => _duration;
  double get speed => _speed;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;
  List<PodcastEpisode> get queue => _queue;
  int get queueIndex => _queueIndex;
  bool get hasNext => _queueIndex >= 0 && _queueIndex < _queue.length - 1;
  bool get hasPrevious => _queueIndex > 0;

  bool isCompleted(String episodeId) => _completedEpisodes.contains(episodeId);

  Future<void> _loadPrefs() async {
    _prefs = await SharedPreferences.getInstance();
    final completed = _prefs?.getStringList(_completedKey) ?? [];
    _completedEpisodes.addAll(completed);
    notifyListeners();
  }

  void _initListeners() {
    _player.playerStateStream.listen((state) {
      _isPlaying = state.playing;
      notifyListeners();
    });

    _player.positionStream.listen((pos) {
      _position = pos;
      if ((pos - _lastNotifiedPosition).inMilliseconds.abs() > 500) {
        _lastNotifiedPosition = pos;
        notifyListeners();

        // Save position every 5 seconds
        if ((pos - _lastSavedPosition).inSeconds.abs() > 5 &&
            _currentEpisode != null) {
          _lastSavedPosition = pos;
          _savePosition(_currentEpisode!.id, pos);
        }

        // Check completion (within 2 seconds of end)
        if (_duration.inSeconds > 0 &&
            pos.inSeconds >= _duration.inSeconds - 2 &&
            _currentEpisode != null) {
          _markCompleted(_currentEpisode!.id);
          // Auto-advance to next in queue
          if (hasNext) {
            Future.delayed(const Duration(milliseconds: 500), () => playNext());
          }
        }
      }
    });

    _player.durationStream.listen((dur) {
      _duration = dur ?? Duration.zero;
      notifyListeners();
    });
  }

  // --- Queue management ---

  void setQueue(List<PodcastEpisode> episodes, int startIndex) {
    _queue = List.from(episodes);
    _queueIndex = startIndex.clamp(0, episodes.length - 1);
  }

  Future<void> playNext() async {
    if (hasNext) {
      _queueIndex++;
      await playEpisode(_queue[_queueIndex]);
    }
  }

  Future<void> playPrevious() async {
    if (hasPrevious) {
      _queueIndex--;
      await playEpisode(_queue[_queueIndex]);
    }
  }

  // --- Playback ---

  Future<void> playEpisode(PodcastEpisode episode) async {
    if (_currentEpisode?.id == episode.id) {
      if (!_player.playing) {
        await _player.play();
      }
      return;
    }

    _currentEpisode = episode;
    _errorMessage = null;
    notifyListeners();

    // Sync queue index if episode is in current queue
    final idx = _queue.indexWhere((e) => e.id == episode.id);
    if (idx >= 0) _queueIndex = idx;

    try {
      await _player.setAsset('assets/${episode.audioFile}');

      // Resume from saved position
      final savedPos = _getSavedPosition(episode.id);
      if (savedPos != null && savedPos.inSeconds > 5) {
        await _player.seek(savedPos);
      }

      await _player.play();
    } catch (e) {
      debugPrint("Error playing podcast: $e");
      final err = e.toString().toLowerCase();
      String msg;
      if (err.contains('unable to load') || err.contains('not found') || err.contains('asset')) {
        msg = 'Audio file not found: ${episode.audioFile}';
      } else if (err.contains('format') || err.contains('codec')) {
        msg = 'Unsupported audio format.';
      } else if (err.contains('permission')) {
        msg = 'Storage permission required.';
      } else {
        msg = 'Could not load audio: ${e.runtimeType}';
      }
      _errorMessage = msg;
      notifyListeners();
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

  void cycleSpeed() {
    final idx = speedOptions.indexOf(_speed);
    final next = idx < 0 || idx >= speedOptions.length - 1
        ? speedOptions[0]
        : speedOptions[idx + 1];
    setSpeed(next);
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  Future<void> stop() async {
    if (_currentEpisode != null) {
      _savePosition(_currentEpisode!.id, _position);
    }
    await _player.stop();
    _currentEpisode = null;
    _queue = [];
    _queueIndex = -1;
    notifyListeners();
  }

  // --- Persistence helpers ---

  void _savePosition(String episodeId, Duration pos) {
    _prefs?.setInt('$_positionPrefix$episodeId', pos.inMilliseconds);
  }

  Duration? _getSavedPosition(String episodeId) {
    final ms = _prefs?.getInt('$_positionPrefix$episodeId');
    return ms != null ? Duration(milliseconds: ms) : null;
  }

  void _markCompleted(String episodeId) {
    if (_completedEpisodes.add(episodeId)) {
      _prefs?.setStringList(_completedKey, _completedEpisodes.toList());
      // Clear saved position for completed episodes
      _prefs?.remove('$_positionPrefix$episodeId');
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }
}
