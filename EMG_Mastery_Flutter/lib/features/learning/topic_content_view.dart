import 'package:flutter/material.dart';
import '../../data/models/topic_content_model.dart';

// Import any specific widgets needed for custom blocks, or define them here.
// For now, I'll inline the generic block renderers.

class TopicContentView extends StatelessWidget {
  final TopicData data;

  const TopicContentView({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: data.tabs.length,
      child: Scaffold(
        appBar: AppBar(
          title: Text(data.title),
          actions: [
            IconButton(
              icon: const Icon(Icons.headset),
              onPressed: () {
                // TODO: Trigger Podcast
              },
            ),
          ],
          bottom: TabBar(
            isScrollable: true,
            indicatorColor: const Color(0xFF3B82F6),
            indicatorWeight: 3,
            labelColor: const Color(0xFF3B82F6),
            unselectedLabelColor: const Color(0xFF94A3B8),
            labelStyle: const TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 13,
            ),
            tabs: data.tabs.map((tab) => Tab(text: tab.title)).toList(),
          ),
        ),
        body: TabBarView(
          children: data.tabs.map((tab) => _TopicTabContent(tab: tab)).toList(),
        ),
      ),
    );
  }
}

/// This widget uses AutomaticKeepAliveClientMixin to perfectly preserve the state
/// and scroll position of each tab when the user swipes away and back.
class _TopicTabContent extends StatefulWidget {
  final TopicTab tab;

  const _TopicTabContent({required this.tab});

  @override
  State<_TopicTabContent> createState() => _TopicTabContentState();
}

class _TopicTabContentState extends State<_TopicTabContent>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true; // Essential for mobile performance

  @override
  Widget build(BuildContext context) {
    super.build(context); // Required by AutomaticKeepAliveClientMixin

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: widget.tab.blocks.length + 1, // +1 for trailing padding
      itemBuilder: (context, index) {
        if (index == widget.tab.blocks.length) {
          return const SizedBox(height: 60); // Trailing space at bottom of list
        }

        final block = widget.tab.blocks[index];
        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: _renderBlock(block),
        );
      },
    );
  }

  Widget _renderBlock(ContentBlock block) {
    if (block is HeaderBlock) {
      return Text(
        block.title,
        style: const TextStyle(
          fontSize: 22,
          fontWeight: FontWeight.w900,
          color: Color(0xFF0F172A),
          letterSpacing: -0.5,
        ),
      );
    } else if (block is TextBlock) {
      return Text(
        block.text,
        style: TextStyle(
          fontSize: block.isIntro ? 15 : 14,
          color: block.isIntro
              ? const Color(0xFF475569)
              : const Color(0xFF334155),
          height: 1.6,
        ),
      );
    } else if (block is PearlBlock) {
      return Container(
        margin: const EdgeInsets.only(top: 14, bottom: 4),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFFEFF6FF), Color(0xFFDBEAFE)],
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFBFDBFE)),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF3B82F6).withValues(alpha: 0.1),
              blurRadius: 15,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              block.title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1D4ED8),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              block.text,
              style: const TextStyle(
                fontSize: 15,
                color: Color(0xFF1E3A8A),
                height: 1.6,
              ),
            ),
          ],
        ),
      );
    } else if (block is BulletCardBlock) {
      return Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: block.backgroundColor,
          borderRadius: BorderRadius.circular(16),
          border: Border(left: BorderSide(color: block.themeColor, width: 6)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 5,
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              block.title,
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 16,
                color: block.themeColor,
              ),
            ),
            const SizedBox(height: 12),
            ...block.points.map(
              (pt) => Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "• ",
                      style: TextStyle(
                        color: block.themeColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Expanded(
                      child: Text(
                        pt,
                        style: const TextStyle(
                          fontSize: 13,
                          color: Color(0xFF334155),
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      );
    } else if (block is MechanismCardBlock) {
      return Container(
        margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: block.themeColor.withValues(alpha: 0.05),
              blurRadius: 15,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: block.backgroundColor,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: block.themeColor.withValues(alpha: 0.2),
                          blurRadius: 8,
                        ),
                      ],
                    ),
                    child: Icon(block.icon, color: block.themeColor, size: 24),
                  ),
                  const SizedBox(width: 15),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          block.type,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            color: block.themeColor,
                          ),
                        ),
                        Text(
                          block.subtitle,
                          style: const TextStyle(
                            fontSize: 13,
                            color: Color(0xFF64748B),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Body rows
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _mechRow("MECHANISM", block.mechanism, Colors.blueGrey),
                  const Divider(height: 24),
                  _mechRow(
                    "EDX FINDINGS",
                    block.findings,
                    const Color(0xFF16A34A),
                  ),
                  const Divider(height: 24),
                  _mechRow(
                    "PROGNOSIS",
                    block.prognosis,
                    const Color(0xFFD97706),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    } else if (block is NumberedListBlock) {
      return Column(
        children: block.items
            .map(
              (entry) => Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 24,
                      height: 24,
                      margin: const EdgeInsets.only(right: 12),
                      decoration: const BoxDecoration(
                        color: Color(0xFFE0E7FF),
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          entry.key,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF4F46E5),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        entry.value,
                        style: const TextStyle(
                          fontSize: 14,
                          color: Color(0xFF334155),
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
            .toList(),
      );
    } else if (block is CustomWidgetBlock) {
      // Temporary placeholders for highly bespoke legacy tables.
      // We will render these natively if needed in future refactors.
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: const Color(0xFFF1F5F9),
          border: Border.all(color: const Color(0xFFCBD5E1)),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            "[ Legacy Custom Widget: ${block.type.name} ]\nThis block will be replaced with its native Flutter Table/Grid equivalent.",
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Color(0xFF64748B),
              fontStyle: FontStyle.italic,
            ),
          ),
        ),
      );
    }

    return Text("Unknown Block Type: ${block.runtimeType}");
  }

  Widget _mechRow(String label, String text, Color color) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 90,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w900,
              color: color,
              letterSpacing: 0.5,
            ),
          ),
        ),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(
              fontSize: 13,
              color: Color(0xFF475569),
              height: 1.5,
            ),
          ),
        ),
      ],
    );
  }
}
