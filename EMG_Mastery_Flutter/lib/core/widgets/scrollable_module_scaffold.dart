import 'package:flutter/material.dart';

/// Module page scaffold where the hero header (and any optional banner widgets
/// like a podcast trigger) scroll OFF the top while the [TabBar] stays pinned.
///
/// Why this exists: every learning view used to be a fixed `Column` with
/// hero+banners+TabBar locked at the top, which left ~1 inch of usable
/// content on iPhone. Wrapping the same widgets in a [NestedScrollView]
/// gives the hero+banners back to the user as scroll real estate while
/// keeping tab navigation accessible.
///
/// Usage:
/// ```
/// DefaultTabController(
///   length: 5,
///   child: ScrollableModuleScaffold(
///     headerSlivers: [ModuleHeroHeader(...), PodcastTriggerCard(...)],
///     tabBar: TabBar(tabs: [...]),
///     body: TabBarView(children: [...]),
///   ),
/// )
/// ```
class ScrollableModuleScaffold extends StatelessWidget {
  /// Widgets that scroll off the top. Rendered top-to-bottom in order.
  final List<Widget> headerSlivers;

  /// Pinned tab bar. Required because [TabBarView] needs it.
  final TabBar tabBar;

  /// Tab content -- typically a [TabBarView] whose children are scrollables
  /// (e.g. [SingleChildScrollView]). The inner scrolls drive the outer
  /// header collapse via [NestedScrollView].
  final Widget body;

  const ScrollableModuleScaffold({
    super.key,
    required this.headerSlivers,
    required this.tabBar,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    return NestedScrollView(
      headerSliverBuilder: (ctx, innerBoxIsScrolled) => [
        for (final w in headerSlivers) SliverToBoxAdapter(child: w),
        SliverPersistentHeader(
          pinned: true,
          delegate: _PinnedTabBarDelegate(tabBar),
        ),
      ],
      body: body,
    );
  }
}

class _PinnedTabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  _PinnedTabBarDelegate(this.tabBar);

  @override
  double get minExtent => tabBar.preferredSize.height;

  @override
  double get maxExtent => tabBar.preferredSize.height;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Material(
      // Subtle shadow when content scrolls under the tabs so they read as
      // a separate, fixed surface.
      elevation: overlapsContent ? 2 : 0,
      color: Theme.of(context).scaffoldBackgroundColor,
      child: tabBar,
    );
  }

  @override
  bool shouldRebuild(_PinnedTabBarDelegate oldDelegate) =>
      oldDelegate.tabBar != tabBar;
}
