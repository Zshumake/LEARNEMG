import 'package:flutter/material.dart';

/// Keeps a tab's subtree alive when swiped away in a TabBarView — but only
/// when explicitly requested.
///
/// Keep-alive is opt-in (default false): keeping every tab resident pinned
/// each module's full set of tab trees (and their decoded images) in memory
/// for the life of the screen, which is what pushed iPhone Safari tabs
/// toward the memory kill threshold. Pass `keepAlive: true` only for tabs
/// with user state worth preserving (quiz progress, search text).
class KeepAliveTabWrapper extends StatefulWidget {
  final Widget child;
  final bool keepAlive;

  const KeepAliveTabWrapper({
    super.key,
    required this.child,
    this.keepAlive = false,
  });

  @override
  State<KeepAliveTabWrapper> createState() => _KeepAliveTabWrapperState();
}

class _KeepAliveTabWrapperState extends State<KeepAliveTabWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => widget.keepAlive;

  @override
  Widget build(BuildContext context) {
    super.build(context); // Required by AutomaticKeepAliveClientMixin
    return widget.child;
  }
}
