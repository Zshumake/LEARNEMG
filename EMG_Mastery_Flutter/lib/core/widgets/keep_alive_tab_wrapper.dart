import 'package:flutter/material.dart';

/// A universal wrapper that forces the Flutter framework to keep its
/// child alive in memory, even if it is scrolled off screen or swiped
/// away in a TabBarView.
///
/// This resolves the issue where complex text trees are destroyed and
/// rebuilt from scratch when a user swipes between tabs, causing lag.
class KeepAliveTabWrapper extends StatefulWidget {
  final Widget child;

  const KeepAliveTabWrapper({super.key, required this.child});

  @override
  State<KeepAliveTabWrapper> createState() => _KeepAliveTabWrapperState();
}

class _KeepAliveTabWrapperState extends State<KeepAliveTabWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true; // Essential for memory preservation

  @override
  Widget build(BuildContext context) {
    super.build(context); // Required by AutomaticKeepAliveClientMixin
    return widget.child;
  }
}
