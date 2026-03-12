import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../core/theme/app_theme.dart';
import '../ernest_controller.dart';
import '../../../data/models/ernest_model.dart';
import '../../../core/widgets/ernest_widget.dart';

class ErnestChatOverlay extends StatefulWidget {
  const ErnestChatOverlay({super.key});

  @override
  State<ErnestChatOverlay> createState() => _ErnestChatOverlayState();
}

class _ErnestChatOverlayState extends State<ErnestChatOverlay> {
  final TextEditingController _inputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<ErnestController>();
    final persona = controller.currentPersona!;

    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      decoration: BoxDecoration(
        color: const Color(0xFF1E1F24),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border.all(color: persona.primaryColor.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          // Header
          _buildHeader(context, controller, persona),

          // Chat History
          Expanded(
            child: controller.chatHistory.isEmpty
                ? _buildEmptyState(persona)
                : ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 20,
                    ),
                    itemCount: controller.chatHistory.length,
                    itemBuilder: (context, index) {
                      return _buildMessage(
                        controller.chatHistory[index],
                        persona,
                      );
                    },
                  ),
          ),

          // Thinking Indicator
          if (controller.isThinking)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: _buildThinkingIndicator(persona),
            ),

          // Input Area
          _buildInputArea(context, controller, persona),
        ],
      ),
    );
  }

  Widget _buildHeader(
    BuildContext context,
    ErnestController controller,
    ErnestPersona persona,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
      decoration: BoxDecoration(
        color: persona.primaryColor.withValues(alpha: 0.1),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Row(
        children: [
          AnimatedErnestWidget(
            size: 100,
            showSpeechBubble: false,
            isInteractive: false,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  persona.name,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  persona.id == 'ernest' ? "EMG Specialist" : "Chief Resident",
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.5),
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Icon(
                  Icons.vpn_key_outlined,
                  color: Colors.white70,
                  size: 20,
                ),
                onPressed: () => launchUrl(
                  Uri.parse("https://aistudio.google.com/app/apikey"),
                ),
                tooltip: "Get Gemini API Key",
              ),
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Icon(
                  Icons.settings_outlined,
                  color: Colors.white70,
                  size: 20,
                ),
                onPressed: () => _showApiKeyDialog(context, controller),
                tooltip: "API Settings",
              ),
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Icon(Icons.close, color: Colors.white70, size: 20),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(ErnestPersona persona) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(40.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Opacity(
              opacity: 0.5,
              child: Icon(
                persona.id == 'ernest' ? Icons.rocket_launch : Icons.coffee,
                size: 64,
                color: persona.primaryColor,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              persona.description,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.7),
                height: 1.5,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMessage(ChatMessage message, ErnestPersona persona) {
    final isUser = message.role == ChatRole.user;
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: isUser
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!isUser) ...[
            CircleAvatar(
              radius: 14,
              backgroundColor: persona.primaryColor.withValues(alpha: 0.2),
              child: Icon(
                persona.id == 'ernest' ? Icons.bolt : Icons.terminal,
                size: 14,
                color: persona.primaryColor,
              ),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: isUser ? persona.primaryColor : const Color(0xFF2A2D34),
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16),
                  topRight: const Radius.circular(16),
                  bottomLeft: Radius.circular(isUser ? 16 : 4),
                  bottomRight: Radius.circular(isUser ? 4 : 16),
                ),
              ),
              child: MarkdownBody(
                data: message.text,
                styleSheet: MarkdownStyleSheet(
                  p: const TextStyle(
                    color: Colors.white,
                    fontSize: 13,
                    height: 1.4,
                  ),
                  strong: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                  code: TextStyle(
                    backgroundColor: Colors.black26,
                    color: persona.primaryColor,
                    fontSize: 12,
                  ),
                ),
              ),
            ),
          ),
          if (isUser) ...[
            const SizedBox(width: 8),
            const CircleAvatar(
              radius: 14,
              backgroundColor: Colors.white24,
              child: Icon(Icons.person, size: 14, color: Colors.white),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildThinkingIndicator(ErnestPersona persona) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: 12,
          height: 12,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            valueColor: AlwaysStoppedAnimation<Color>(persona.primaryColor),
          ),
        ),
        const SizedBox(width: 8),
        Flexible(
          child: Text(
            "${persona.id == 'ernest' ? 'Ernest' : 'Earl'} is thinking...",
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(color: Colors.white54, fontSize: 11),
          ),
        ),
      ],
    );
  }

  Widget _buildInputArea(
    BuildContext context,
    ErnestController controller,
    ErnestPersona persona,
  ) {
    return Container(
      padding: EdgeInsets.fromLTRB(
        16,
        8,
        16,
        MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      decoration: const BoxDecoration(
        color: Color(0xFF141517),
        border: Border(top: BorderSide(color: Colors.white10)),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _inputController,
              onSubmitted: (_) {
                controller.sendMessage(_inputController.text);
                _inputController.clear();
                _scrollToBottom();
              },
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: "Ask medical question...",
                hintStyle: const TextStyle(color: Colors.white24),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.white.withValues(alpha: 0.05),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 10,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          IconButton.filled(
            onPressed: controller.isThinking
                ? null
                : () {
                    controller.sendMessage(_inputController.text);
                    _inputController.clear();
                    _scrollToBottom();
                  },
            icon: const Icon(Icons.send),
            style: IconButton.styleFrom(
              backgroundColor: persona.primaryColor,
              disabledBackgroundColor: Colors.grey.shade800,
            ),
          ),
        ],
      ),
    );
  }

  void _showApiKeyDialog(BuildContext context, ErnestController controller) {
    final textController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text(
          "Gemini API Configuration",
          style: TextStyle(color: Colors.white),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Ernest needs a Google Gemini API key to chat. You can get one for free at aistudio.google.com",
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
            const SizedBox(height: 16),
            Center(
              child: ElevatedButton.icon(
                onPressed: () => launchUrl(
                  Uri.parse("https://aistudio.google.com/app/apikey"),
                ),
                icon: const Icon(Icons.open_in_new, size: 16),
                label: const Text("Get Free Gemini Key"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary.withValues(alpha: 0.2),
                  foregroundColor: AppTheme.primary,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: AppTheme.primary),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: textController,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: "AIza...",
                hintStyle: const TextStyle(color: Colors.white24),
                filled: true,
                fillColor: Colors.black26,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primary),
            onPressed: () {
              controller.setApiKey(textController.text);
              Navigator.pop(context);
            },
            child: const Text("Save Key"),
          ),
        ],
      ),
    );
  }
}
