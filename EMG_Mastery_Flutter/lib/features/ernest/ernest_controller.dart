import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../data/models/ernest_model.dart';
import '../../core/theme/app_theme.dart';

class ErnestController extends ChangeNotifier {
  static const String _apiKeyPrefsKey = 'ernest_api_key';

  ErnestPersona? _currentPersona;
  final List<ChatMessage> _chatHistory = [];
  bool _isThinking = false;
  String? _apiKey;
  GenerativeModel? _model;
  ChatSession? _chatSession;

  final Map<String, ErnestPersona> _personas = {
    'ernest': ErnestPersona(
      id: 'ernest',
      name: "Ernest (StimTroller Plus™)",
      description:
          "Join Ernest on an interactive adventure through the peripheral nervous system. Master complex anatomy, conquer clinical patterns, and build the skills that will help you become a confident electrodiagnostician. Ready to begin your journey?",
      imagePath: 'assets/icons/emg_intro.png', // Fallback for now
      primaryColor: AppTheme.primary,
      prompt: '''
PERSONA: "THE ENERGETIC NEURO-WIZARD"
- YOU ARE: Ernest, a high-energy, enthusiastic AI tutor specialized in EMG/NCS.
- TONE: Brilliant, supportive, and medically nerdy.
- HIGHLIGHT RESPONSES: When explaining selected text, start with creative variations like "SPARKING NEW KNOWLEDGE!", "AMPLIFYING THE SIGNAL!", etc.
- KNOWLEDGE: Strict adherence to clinical patterns.
- CONSTRAINT: Keep it high-yield and moderate length (1-2 paragraphs).
''',
      highlightResponses: [
        "SPARKING NEW KNOWLEDGE!",
        "AMPLIFYING THE SIGNAL!",
        "NEURAL NETWORKS FIRE!",
        "WAVEFORM DETECTED!",
        "PATHWAY IDENTIFIED!",
        "MAXIMUM RECRUITMENT!",
        "JUMPING INTO ACTION!",
        "ELECTRIFYING DISCOVERY!",
      ],
    ),
    'earl': ErnestPersona(
      id: 'earl',
      name: "Earl",
      description:
          "Oh, you're back? Fine. I suppose I can verify your attempts at 'diagnostics.' Try not to confuse volume conduction with actual pathology this time. Ready to be corrected?",
      imagePath: 'assets/icons/emg_intro.png', // Fallback
      primaryColor: Colors.red.shade700,
      prompt: '''
PERSONA: "THE BITTER CHIEF RESIDENT"
- YOU ARE: Earl, Ernest's grumpy, brilliant twin brother.
- TONE: Sarcastic, demeaning, and technically perfect.
- HIGHLIGHT RESPONSES: Start with variations like "Oh joy, another highlight...", "Scanning for brain cells...", etc.
- KNOWLEDGE: Strict adherence to clinical patterns.
- CONSTRAINT: Be sharp, blunt, and efficient.
''',
      highlightResponses: [
        "Oh joy, another highlight...",
        "Scanning for brain cells... still looking.",
        "Let's get this over with...",
        "I've seen better waveforms in a bowl of soup.",
        "Try to keep up...",
      ],
      idleRoasts: [
        "I'm aging in real-time waiting for you.",
        "Did you stroke out? Or just forget how to type?",
        "Silence. The only thing worse than your questions.",
      ],
    ),
  };

  ErnestController() {
    _currentPersona = _personas['ernest'];
    _loadApiKey();
  }

  ErnestPersona? get currentPersona => _currentPersona;
  List<ChatMessage> get chatHistory => List.unmodifiable(_chatHistory);
  bool get isThinking => _isThinking;
  bool get hasApiKey => _apiKey != null && _apiKey!.isNotEmpty;

  Future<void> _loadApiKey() async {
    final prefs = await SharedPreferences.getInstance();
    _apiKey = prefs.getString(_apiKeyPrefsKey);
    if (hasApiKey) {
      _initializeModel();
    }
    notifyListeners();
  }

  Future<void> setApiKey(String key) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_apiKeyPrefsKey, key);
    _apiKey = key;
    _initializeModel();
    notifyListeners();
  }

  void _initializeModel() {
    if (_apiKey == null) return;
    _model = GenerativeModel(
      model: 'gemini-1.5-flash-latest',
      apiKey: _apiKey!,
      generationConfig: GenerationConfig(
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      ),
    );
    _chatSession = _model!.startChat();
  }

  void switchPersona() {
    if (_currentPersona?.id == 'ernest') {
      _currentPersona = _personas['earl'];
    } else {
      _currentPersona = _personas['ernest'];
    }
    // We keep history but the new responses will respect the new prompt
    _chatSession = _model?.startChat(); // Reset session for new persona focus
    notifyListeners();
  }

  Future<void> sendMessage(String text) async {
    if (text.trim().isEmpty) return;

    _chatHistory.add(ChatMessage(role: ChatRole.user, text: text));
    _isThinking = true;
    notifyListeners();

    if (!hasApiKey || _model == null) {
      _chatHistory.add(
        ChatMessage(
          role: ChatRole.model,
          text:
              "I need an API key to function. Please configure it in settings.",
        ),
      );
      _isThinking = false;
      notifyListeners();
      return;
    }

    try {
      final promptPrefix = "${_currentPersona!.prompt}\n\nUSER QUESTION: ";
      final content = Content.text(promptPrefix + text);
      final response = await _chatSession?.sendMessage(content);

      if (response != null && response.text != null) {
        _chatHistory.add(
          ChatMessage(role: ChatRole.model, text: response.text!),
        );
      } else {
        _chatHistory.add(
          ChatMessage(
            role: ChatRole.model,
            text: "My circuits are scrambled... No response returned.",
          ),
        );
      }
    } catch (e) {
      _chatHistory.add(
        ChatMessage(role: ChatRole.model, text: "System Error: $e"),
      );
    } finally {
      _isThinking = false;
      notifyListeners();
    }
  }

  void clearHistory() {
    _chatHistory.clear();
    _chatSession = _model?.startChat();
    notifyListeners();
  }
}
