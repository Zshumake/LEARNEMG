import 'package:flutter/material.dart';
import '../../data/models/plexus_graph_data.dart';
import '../../logic/plexus_logic.dart';

/// Full interactive Plexus Anatomy explorer — ported from PlexusManager + PlexusRenderer.
/// Features: switchable Brachial/Lumbosacral, Discovery/Lesion modes, interactive graph.
class PlexusExplorerView extends StatefulWidget {
  const PlexusExplorerView({super.key});

  @override
  State<PlexusExplorerView> createState() => _PlexusExplorerViewState();
}

class _PlexusExplorerViewState extends State<PlexusExplorerView> {
  final PlexusLogic _logic = PlexusLogic();
  PlexusGraphData? _graphData;
  String _currentPlexus = 'brachial';
  String _mode = 'discovery'; // 'discovery' or 'lesion'
  Set<String> _highlightedNodes = {};
  PlexusNode? _selectedNode;
  LesionEffects? _lesionEffects;
  bool _loading = true;

  // Transform state for pan/zoom
  final TransformationController _transformController =
      TransformationController();

  @override
  void initState() {
    super.initState();
    _loadPlexus(_currentPlexus);
  }

  @override
  void dispose() {
    _transformController.dispose();
    super.dispose();
  }

  Future<void> _loadPlexus(String type) async {
    setState(() {
      _loading = true;
      _selectedNode = null;
      _lesionEffects = null;
      _highlightedNodes = {};
    });

    final data = await PlexusGraphData.loadAsset(
      'assets/data/${type}_plexus.json',
    );
    _logic.loadGraph(data);

    // Compute layout positions
    _computeLayout(data.nodes);

    setState(() {
      _graphData = data;
      _currentPlexus = type;
      _loading = false;
    });

    // Reset zoom and show the left-most part (roots)
    _transformController.value = Matrix4.diagonal3Values(0.7, 0.7, 1.0);
  }

  void _computeLayout(List<PlexusNode> nodes) {
    const columnSpacing = 160.0;
    const rowSpacing = 48.0;

    for (final node in nodes) {
      node.x = (node.level * columnSpacing) + 80;
      node.y = (node.row * rowSpacing) + 40;
    }
  }

  void _handleNodeTap(PlexusNode node) {
    setState(() {
      _selectedNode = node;
      if (_mode == 'discovery') {
        _highlightedNodes = _logic.findAncestors(node.id);
        _lesionEffects = null;
      } else {
        _highlightedNodes = _logic.findDescendants(node.id);
        _lesionEffects = _logic.getLesionEffects(node.id);
      }
    });
  }

  void _clearSelection() {
    setState(() {
      _selectedNode = null;
      _highlightedNodes = {};
      _lesionEffects = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Toolbar
        _buildToolbar(),

        // Main content
        Expanded(
          child: _loading
              ? const Center(child: CircularProgressIndicator())
              : Stack(
                  children: [
                    // Interactive graph
                    GestureDetector(
                      onTap: _clearSelection,
                      child: InteractiveViewer(
                        transformationController: _transformController,
                        boundaryMargin: const EdgeInsets.all(1000),
                        minScale: 0.1,
                        maxScale: 4.0,
                        constrained: false,
                        child: _graphData == null
                            ? const SizedBox.shrink()
                            : SizedBox(
                                width: _computeCanvasSize().width,
                                height: _computeCanvasSize().height,
                                child: CustomPaint(
                                  size: _computeCanvasSize(),
                                  painter: _PlexusGraphPainter(
                                    graphData: _graphData!,
                                    highlightedNodes: _highlightedNodes,
                                    links: _graphData!.links,
                                    onNodeTap: _handleNodeTap,
                                  ),
                                  child: _buildNodeTapTargets(),
                                ),
                              ),
                      ),
                    ),

                    // Legend overlay (top-left to avoid sheet)
                    Positioned(top: 12, left: 12, child: _buildLegend()),

                    // Info panel (Draggable sheet)
                    if (_selectedNode != null)
                      DraggableScrollableSheet(
                        initialChildSize: 0.35,
                        minChildSize: 0.2,
                        maxChildSize: 0.9,
                        snap: true,
                        builder: (context, scrollController) {
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: const BorderRadius.vertical(
                                top: Radius.circular(24),
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.15),
                                  blurRadius: 20,
                                  offset: const Offset(0, -5),
                                ),
                              ],
                            ),
                            child: _buildInfoPanel(scrollController),
                          );
                        },
                      ),
                  ],
                ),
        ),
      ],
    );
  }

  Size _computeCanvasSize() {
    if (_graphData == null) return const Size(800, 600);
    double maxX = 0, maxY = 0;
    for (final node in _graphData!.nodes) {
      if (node.x > maxX) maxX = node.x;
      if (node.y > maxY) maxY = node.y;
    }
    return Size(maxX + 600, maxY + 400);
  }

  Widget _buildNodeTapTargets() {
    if (_graphData == null) return const SizedBox.shrink();
    return Stack(
      children: _graphData!.nodes.map((node) {
        final isHighlighted =
            _highlightedNodes.isEmpty || _highlightedNodes.contains(node.id);
        return Positioned(
          left: node.x - 20,
          top: node.y - 20,
          child: GestureDetector(
            onTap: () => _handleNodeTap(node),
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.transparent,
              ),
              child: Center(
                child: AnimatedOpacity(
                  duration: const Duration(milliseconds: 300),
                  opacity: isHighlighted ? 1.0 : 0.3,
                  child: Container(
                    width: _selectedNode?.id == node.id ? 32 : 26,
                    height: _selectedNode?.id == node.id ? 32 : 26,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: node.color,
                      border: Border.all(
                        color: _selectedNode?.id == node.id
                            ? const Color(0xFFF1C40F)
                            : Colors.white,
                        width: _selectedNode?.id == node.id ? 4 : 2,
                      ),
                      boxShadow: _selectedNode?.id == node.id
                          ? [
                              BoxShadow(
                                color: node.color.withOpacity(0.5),
                                blurRadius: 8,
                              ),
                            ]
                          : null,
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildToolbar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(color: Color(0xFFF1F5F9))),
      ),
      child: Column(
        children: [
          // Plexus selector
          Row(
            children: [
              const Text(
                'NETWORK',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF64748B),
                  letterSpacing: 1.0,
                ),
              ),
              const SizedBox(width: 8),
              _buildPlexusChip('brachial', 'Brachial'),
              const SizedBox(width: 6),
              _buildPlexusChip('lumbosacral', 'Lumbosacral'),
            ],
          ),
          const SizedBox(height: 8),
          // Mode toggle
          Row(
            children: [
              Expanded(
                child: _buildModeButton(
                  'discovery',
                  'Pathfinding',
                  Icons.route,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildModeButton('lesion', 'Lesion Sim', Icons.flash_on),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPlexusChip(String value, String label) {
    final isActive = _currentPlexus == value;
    return GestureDetector(
      onTap: () => _loadPlexus(value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w700,
            color: isActive ? Colors.white : const Color(0xFF64748B),
          ),
        ),
      ),
    );
  }

  Widget _buildModeButton(String mode, String label, IconData icon) {
    final isActive = _mode == mode;
    return GestureDetector(
      onTap: () {
        setState(() {
          _mode = mode;
          _clearSelection();
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF3B82F6) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(10),
          boxShadow: isActive
              ? [
                  BoxShadow(
                    color: const Color(0xFF3B82F6).withValues(alpha: 0.3),
                    blurRadius: 8,
                  ),
                ]
              : null,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 16,
              color: isActive ? Colors.white : const Color(0xFF64748B),
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: isActive ? Colors.white : const Color(0xFF64748B),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLegend() {
    const items = [
      (Color(0xFF3498DB), 'Root'),
      (Color(0xFF27AE60), 'Trunk'),
      (Color(0xFFF39C12), 'Division'),
      (Color(0xFFE74C3C), 'Cord'),
      (Color(0xFF9B59B6), 'Nerve'),
    ];
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.95),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: items.map((item) {
          return Padding(
            padding: const EdgeInsets.only(right: 10),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: item.$1,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 4),
                Text(
                  item.$2,
                  style: const TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF94A3B8),
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildInfoPanel(ScrollController scrollController) {
    if (_mode == 'lesion' && _lesionEffects != null) {
      return _buildLesionPanel(_lesionEffects!, scrollController);
    }
    return _buildDiscoveryPanel(_selectedNode!, scrollController);
  }

  Widget _buildDiscoveryPanel(
    PlexusNode node,
    ScrollController scrollController,
  ) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Drag handle
        Container(
          width: 40,
          height: 4,
          margin: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: const Color(0xFFE2E8F0),
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            controller: scrollController,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        node.label,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 24),
                      onPressed: _clearSelection,
                    ),
                  ],
                ),
                Text(
                  'SEGMENT TYPE: ${node.type.toUpperCase()}',
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF64748B),
                    letterSpacing: 0.5,
                  ),
                ),
                if (node.description != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(12),
                      border: const Border(
                        left: BorderSide(color: Color(0xFF3B82F6), width: 4),
                      ),
                    ),
                    child: Text(
                      node.description!,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF475569),
                        height: 1.6,
                      ),
                    ),
                  ),
                ],
                if (node.muscles.isNotEmpty) ...[
                  const SizedBox(height: 14),
                  const Text(
                    'Primary Motor Innervation:',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF1E293B),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: node.muscles.map((m) {
                      return Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFECFDF5),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.check,
                              size: 14,
                              color: Color(0xFF065F46),
                            ),
                            const SizedBox(width: 4),
                            Flexible(
                              child: Text(
                                m,
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: Color(0xFF065F46),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLesionPanel(
    LesionEffects effects,
    ScrollController scrollController,
  ) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 40,
          height: 4,
          margin: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: const Color(0xFFE2E8F0),
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            controller: scrollController,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'Lesion: ${effects.node.label}',
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 24),
                      onPressed: _clearSelection,
                    ),
                  ],
                ),
                // Damage badge
                Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF2F2),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFFFEE2E2)),
                  ),
                  child: const Text(
                    'DAMAGE SIMULATION',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFFDC2626),
                      letterSpacing: 1.0,
                    ),
                  ),
                ),
                // Prognosis cards
                _buildPrognosisItem('Sensory', effects.sensoryPrognosis),
                const SizedBox(height: 6),
                _buildPrognosisItem('Motor', effects.motorPrognosis),
                if (effects.affectedMuscles.isNotEmpty) ...[
                  const SizedBox(height: 14),
                  const Text(
                    'Compromised Myotomes:',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFFDC2626),
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...effects.affectedMuscles.map((m) {
                    return Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(bottom: 4),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFFF1F2),
                        borderRadius: BorderRadius.circular(8),
                        border: const Border(
                          left: BorderSide(color: Color(0xFFF43F5E), width: 3),
                        ),
                      ),
                      child: Text(
                        m,
                        style: const TextStyle(
                          fontSize: 13,
                          color: Color(0xFF9F1239),
                        ),
                      ),
                    );
                  }),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPrognosisItem(String label, String value) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Text(
            '$label: ',
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: Color(0xFF64748B),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontSize: 13, color: Color(0xFF1E293B)),
            ),
          ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// CUSTOM PAINTER — renders the graph lines (nodes are rendered as widgets above)
// ────────────────────────────────────────────────────────────────────────────

class _PlexusGraphPainter extends CustomPainter {
  final PlexusGraphData graphData;
  final Set<String> highlightedNodes;
  final List<PlexusLink> links;
  final Function(PlexusNode) onNodeTap;

  _PlexusGraphPainter({
    required this.graphData,
    required this.highlightedNodes,
    required this.links,
    required this.onNodeTap,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final nodeMap = <String, PlexusNode>{};
    for (final node in graphData.nodes) {
      nodeMap[node.id] = node;
    }

    // Draw links
    for (final link in links) {
      final source = nodeMap[link.source];
      final target = nodeMap[link.target];
      if (source == null || target == null) continue;

      final isHighlighted =
          highlightedNodes.isEmpty ||
          (highlightedNodes.contains(link.source) &&
              highlightedNodes.contains(link.target));

      final paint = Paint()
        ..color = isHighlighted
            ? (highlightedNodes.isNotEmpty
                  ? const Color(0xFFF1C40F)
                  : const Color(0xFF999999))
            : const Color(0xFF999999).withValues(alpha: 0.15)
        ..strokeWidth = isHighlighted && highlightedNodes.isNotEmpty ? 4.0 : 3.0
        ..style = PaintingStyle.stroke;

      // Draw horizontal Bezier curve
      final path = Path();
      path.moveTo(source.x, source.y);
      final midX = (source.x + target.x) / 2;
      path.cubicTo(midX, source.y, midX, target.y, target.x, target.y);
      canvas.drawPath(path, paint);
    }

    // Draw node labels
    for (final node in graphData.nodes) {
      final isHighlighted =
          highlightedNodes.isEmpty || highlightedNodes.contains(node.id);
      final opacity = isHighlighted ? 1.0 : 0.3;

      final textPainter = TextPainter(
        text: TextSpan(
          text: node.label,
          style: TextStyle(
            fontSize: 9,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF334155).withValues(alpha: opacity),
          ),
        ),
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();

      // Background pill
      final labelRect = Rect.fromCenter(
        center: Offset(node.x, node.y + 22),
        width: textPainter.width + 8,
        height: 14,
      );
      final pillPaint = Paint()
        ..color = Colors.white.withValues(alpha: opacity * 0.85);
      canvas.drawRRect(
        RRect.fromRectAndRadius(labelRect, const Radius.circular(3)),
        pillPaint,
      );

      textPainter.paint(
        canvas,
        Offset(node.x - textPainter.width / 2, node.y + 15),
      );
    }
  }

  @override
  bool shouldRepaint(covariant _PlexusGraphPainter oldDelegate) {
    return oldDelegate.highlightedNodes != highlightedNodes ||
        oldDelegate.graphData != graphData;
  }
}
