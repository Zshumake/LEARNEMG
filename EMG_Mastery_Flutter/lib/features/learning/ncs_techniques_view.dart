import 'package:flutter/material.dart';
import '../../core/widgets/video_player_widget.dart';

/// NCS Techniques teaching module.
/// Ported from NCSTechniquesData.js and Techniques.js.
class NCSTechniquesView extends StatefulWidget {
  const NCSTechniquesView({super.key});

  @override
  State<NCSTechniquesView> createState() => _NCSTechniquesViewState();
}

enum _ContentMode { videos, protocols }

enum _Extremity { upper, lower }

class _NCSTechniquesViewState extends State<NCSTechniquesView> {
  _ContentMode _mode = _ContentMode.videos;
  _Extremity _extremity = _Extremity.upper;

  // Track gallery indices for each protocol card by their title
  final Map<String, int> _galleryIndices = {};

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHero(),
          _buildPlacementPrimer(),
          _buildModeToggle(),
          _buildExtremityFilter(),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: _mode == _ContentMode.videos
                ? _buildVideoSection()
                : _buildProtocolSection(),
          ),

          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 50),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0D9488), Color(0xFF0E7490), Color(0xFF4338CA)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Techniques & Protocols',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: -1,
            ),
          ),
          const SizedBox(height: 15),
          Text(
            'Mastering Electrodiagnostic Medicine requires absolute precision. Watch the technical execution in the video series, or study the exact anatomical landmarks, distance protocols, and clinical pitfalls in the picture guides below.',
            style: TextStyle(
              fontSize: 16,
              color: Colors.white.withValues(alpha: 0.9),
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildModeToggle() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Expanded(
            child: _modeButton(
              'Instructional Videos',
              _ContentMode.videos,
              const Color(0xFF0D9488),
            ),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: _modeButton(
              'Picture Protocols',
              _ContentMode.protocols,
              const Color(0xFF8B5CF6),
            ),
          ),
        ],
      ),
    );
  }

  Widget _modeButton(String title, _ContentMode mode, Color color) {
    final isActive = _mode == mode;
    return GestureDetector(
      onTap: () => setState(() => _mode = mode),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          gradient: isActive
              ? LinearGradient(colors: [color, color.withValues(alpha: 0.8)])
              : null,
          color: isActive ? null : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isActive ? Colors.transparent : color.withValues(alpha: 0.3),
            width: 2,
          ),
          boxShadow: isActive
              ? [
                  BoxShadow(
                    color: color.withValues(alpha: 0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Center(
          child: Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              color: isActive ? Colors.white : const Color(0xFF64748B),
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPlacementPrimer() {
    return Container(
      margin: const EdgeInsets.fromLTRB(20, 30, 20, 10),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Text(
                'The Fundamentals of Placement',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          const Text(
            'Before diving into specific nerves, understand the universal rule of NCS: G1 represents the recording electrode, and G2 represents the reference electrode.',
            style: TextStyle(
              fontSize: 15,
              color: Color(0xFF475569),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          Column(
            children: [
              _primerSection(
                'Motor (CMAP)',
                'G1 must be placed squarely on the thickest part of the muscle belly. G2 must be placed distally on an electrically "dead" spot, typically the tendon or nearest distal joint. The machine calculates the difference between the active muscle and the dead joint.',
                const Color(0xFF0D9488),
              ),
              const SizedBox(height: 15),
              _primerSection(
                'Sensory (SNAP)',
                'G1 is placed directly over the sensory nerve exactly 14 cm away from the stimulator. G2 is placed 3-4 cm distally along the nerve path. Accurate distance measurement down to the millimeter is mandatory, as sensory signals are tiny and travel infinitely fast.',
                const Color(0xFF8B5CF6),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _primerSection(String title, String desc, Color color) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFCBD5E1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              color: color,
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: const TextStyle(
              fontSize: 12,
              color: Color(0xFF475569),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExtremityFilter() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 25, left: 20, right: 20),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _filterChip('Upper Extremity', _Extremity.upper),
          const SizedBox(width: 10),
          _filterChip('Lower Extremity', _Extremity.lower),
        ],
      ),
    );
  }

  Widget _filterChip(String title, _Extremity extremity) {
    final isActive = _extremity == extremity;
    final color = _mode == _ContentMode.videos
        ? const Color(0xFF0D9488)
        : const Color(0xFF8B5CF6);

    return GestureDetector(
      onTap: () => setState(() => _extremity = extremity),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? color.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: isActive ? color : const Color(0xFFE2E8F0)),
        ),
        child: Text(
          title,
          style: TextStyle(
            fontWeight: isActive ? FontWeight.w800 : FontWeight.w600,
            color: isActive ? color : const Color(0xFF64748B),
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  Widget _buildVideoSection() {
    final videos = _extremity == _Extremity.upper
        ? _ncsTechniquesData.upperVideos
        : _ncsTechniquesData.lowerVideos;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sectionHeader(
          '${_extremity == _Extremity.upper ? 'Upper' : 'Lower'} Extremity Techniques',
        ),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 1,
            mainAxisSpacing: 20,
            childAspectRatio: 1.6,
          ),
          itemCount: videos.length,
          itemBuilder: (context, index) => _VideoCard(video: videos[index]),
        ),
      ],
    );
  }

  Widget _buildProtocolSection() {
    final data = _extremity == _Extremity.upper
        ? _upperProtocols
        : _lowerProtocols;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var entry in data.entries) ...[
          _sectionHeader(entry.key),
          const SizedBox(height: 10),
          ...entry.value.map(
            (p) => _ProtocolCard(
              protocol: p,
              currentIndex: _galleryIndices[p.title] ?? 0,
              onPageChanged: (idx) =>
                  setState(() => _galleryIndices[p.title] = idx),
            ),
          ),
          const SizedBox(height: 30),
        ],
      ],
    );
  }

  Widget _sectionHeader(String title) {
    return Container(
      padding: const EdgeInsets.only(bottom: 15, top: 10),
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0xFFE2E8F0), width: 2)),
      ),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w900,
          color: Color(0xFF0F172A),
        ),
      ),
    );
  }
}

// ── CUSTOM COMPONENTS ──────────────────────────────────────────

class _VideoCard extends StatelessWidget {
  final _VideoData video;
  const _VideoCard({required this.video});

  @override
  Widget build(BuildContext context) {
    final videoId = video.url;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
          ),
        ],
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (videoId.isNotEmpty)
            Expanded(child: AppVideoPlayer(videoId: videoId))
          else
            const Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.video_camera_back_outlined,
                      color: Colors.grey,
                      size: 40,
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Video not available",
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Text(
              video.title,
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
                fontSize: 14,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}

class _ProtocolCard extends StatelessWidget {
  final _ProtocolData protocol;
  final int currentIndex;
  final Function(int) onPageChanged;

  const _ProtocolCard({
    required this.protocol,
    required this.currentIndex,
    required this.onPageChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
          ),
        ],
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Gallery
          if (protocol.images.isNotEmpty)
            SizedBox(
              height: 220,
              child: Stack(
                children: [
                  PageView.builder(
                    itemCount: protocol.images.length,
                    onPageChanged: onPageChanged,
                    itemBuilder: (context, index) => Container(
                      padding: const EdgeInsets.all(8),
                      child: Image.asset(
                        protocol.images[index],
                        fit: BoxFit.contain,
                        errorBuilder: (context, error, stackTrace) => Center(
                          child: Icon(
                            Icons.broken_image_outlined,
                            color: Colors.grey.withValues(alpha: 0.5),
                            size: 48,
                          ),
                        ),
                      ),
                    ),
                  ),
                  if (protocol.images.length > 1) ...[
                    Positioned(
                      left: 10,
                      top: 100,
                      child: _navBtn(
                        Icons.chevron_left,
                        () => onPageChanged(
                          (currentIndex - 1) % protocol.images.length,
                        ),
                      ),
                    ),
                    Positioned(
                      right: 10,
                      top: 100,
                      child: _navBtn(
                        Icons.chevron_right,
                        () => onPageChanged(
                          (currentIndex + 1) % protocol.images.length,
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 15,
                      right: 15,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '${currentIndex + 1} / ${protocol.images.length}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),

          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  protocol.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 15),
                const Text(
                  'THE PROTOCOL',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF64748B),
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  protocol.protocol,
                  style: const TextStyle(
                    fontSize: 14,
                    height: 1.6,
                    color: Color(0xFF334155),
                  ),
                ),
                const SizedBox(height: 20),

                // Resident Pearl
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF5F3FF),
                    borderRadius: BorderRadius.circular(12),
                    border: const Border(
                      left: BorderSide(color: Color(0xFF8B5CF6), width: 4),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        children: [
                          Icon(
                            Icons.lightbulb_outline,
                            size: 16,
                            color: Color(0xFF8B5CF6),
                          ),
                          SizedBox(width: 6),
                          Text(
                            'RESIDENT PEARL',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                              color: Color(0xFF8B5CF6),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        protocol.pearl,
                        style: const TextStyle(
                          fontSize: 13,
                          color: Color(0xFF475569),
                          height: 1.5,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _navBtn(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: const BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4)],
        ),
        child: Icon(icon, size: 20, color: Colors.blueGrey),
      ),
    );
  }
}

// ── DATA MODELS & CONSTANTS ─────────────────────────────────────

class _VideoData {
  final String title;
  final String url;
  const _VideoData(this.title, this.url);
}

class _ProtocolData {
  final String title;
  final List<String> images;
  final String protocol;
  final String pearl;
  const _ProtocolData({
    required this.title,
    required this.images,
    required this.protocol,
    required this.pearl,
  });
}

const _ncsTechniquesData = (
  upperVideos: [
    _VideoData("Median Sensory Technique", "86j7cNLIX0U"),
    _VideoData("Ulnar Sensory Technique", "i9Naurf0eWU"),
    _VideoData("Median-Radial Comparison", "nMaxrbpyR-0"),
    _VideoData("Dorsal Ulnar Cutaneous", "U-60ft_8klI"),
    _VideoData("Median Motor Technique", "cdVrcgeBgIg"),
    _VideoData("Ulnar Motor Technique", "UmFYJDMucOY"),
  ],
  lowerVideos: [
    _VideoData("Superficial Fibular Sensory", "M1sE2FT8YQg"),
    _VideoData("Sural Sensory Technique", "zP1yAU5DW2s"),
    _VideoData("Common Fibular Motor", "G1bsDinxuF8"),
    _VideoData("Tibial Motor Technique", "pWeH6kCa9lo"),
    _VideoData("Popliteal Fossa Anatomy", "nMaxrbpyR-0"),
  ],
);

final _upperProtocols = {
  "Motor Protocols": [
    _ProtocolData(
      title: "Median Motor",
      images: [
        "assets/images/ncs/median_motor_at_wrist.png",
        "assets/images/ncs/median_motor_at_elbow.png",
      ],
      protocol:
          "Place the active recording electrode (G1) directly over the center belly of the Abductor Pollicis Brevis (APB) muscle. Place the reference electrode (G2) precisely on the first MCP joint of the thumb. Stimulate the median nerve at the wrist, running between the FCR and palmaris longus tendons, exactly 8 cm proximal to G1. For the proximal stimulation, shock directly over the brachial artery pulse in the antecubital fossa.",
      pearl:
          "If the current is turned up too high at the wrist, the electrical field can spread sideways and accidentally stimulate the adjacent ulnar nerve. This is called 'co-stimulation' and will ruin your waveform. Also, if the waveform from the elbow stimulation looks surprisingly larger than the wrist stimulation, you must look for an anomalous crossover connection (Martin-Gruber anastomosis) in the forearm.",
    ),
    _ProtocolData(
      title: "Median Motor Palmar",
      images: [
        "assets/images/ncs/median_motor_at_wrist.png",
        "assets/images/ncs/median_motor_at_elbow.png",
      ],
      protocol:
          "Keep the exact same recording setup over the Abductor Pollicis Brevis (APB). Keep the standard wrist stimulation at exactly 8 cm. Add a second stimulation point in the palm of the hand, exactly 7 cm distal to the wrist stimulation site.",
      pearl:
          "We do this to isolate the carpal tunnel. If conduction is significantly slower crossing from the palm to the wrist compared to from the wrist to the elbow, the hold-up is definitively across the wrist joint. We look for a palm-to-wrist ratio greater than 1.2 to confirm a conduction block across the ligament.",
    ),
    _ProtocolData(
      title: "Ulnar Motor",
      images: [
        "assets/images/ncs/ulnar_motor_at_the_wrist.png",
        "assets/images/ncs/ulnar_motor_ncs_below_the_elbow.png",
        "assets/images/ncs/ulnar_motor_ncs_above_the_elbow.png",
      ],
      protocol:
          "Place G1 over the dense belly of the Abductor Digiti Minimi (ADM) muscle. Place G2 on the 5th MCP joint of the pinky. Stimulate at the medial wrist next to the FCU tendon, 8 cm proximal to G1. Next, stimulate below the elbow (exactly 3 cm distal to the medial epicondyle). Finally, stimulate above the elbow on the medial humerus, ensuring a 10 to 12 cm gap from the below-elbow site.",
      pearl:
          "The ulnar nerve slips tightly behind the medial epicondyle (the funny bone). If you fail to bend the patient's elbow to at least 90 degrees during the study, the nerve becomes slack and winds around the bone. This slack falsely increases your distance measurement, resulting in an artificially calculated slow conduction velocity that mimics a neuropathy when the nerve is perfectly healthy. Always flex the elbow.",
    ),
    _ProtocolData(
      title: "Deep Ulnar Motor (FDI)",
      images: ["assets/images/ncs/deep_ulnar_motor_branch.png"],
      protocol:
          "Place G1 on the prominent First Dorsal Interosseous (FDI) muscle in the web space between the thumb and index finger. Place G2 on the thumb MCP joint. Use the exact same three ulnar stimulation sites (wrist, below elbow, above elbow) as the standard ulnar motor study.",
      pearl:
          "Why record way over here? The standard ulnar motor study (recording from the ADM) evaluates the superficial branch in the hand. The deep motor branch dives further underneath the hand muscles to supply the FDI. If a patient compresses the nerve in Guyon's Canal next to the pisiform bone, it often specifically crushes this deep branch, sparing the ADM entirely. Recording from the FDI catches this isolated damage.",
    ),
    _ProtocolData(
      title: "Radial Motor",
      images: [
        "assets/images/ncs/radial_motor_distal_stim.png",
        "assets/images/ncs/radial_motor_stim_at_elbow.png",
        "assets/images/ncs/radial_motor_stim_below_spiral_groove.png",
        "assets/images/ncs/radial_motor_stim_above_spiral_groove.png",
      ],
      protocol:
          "Have the patient fully pronate their hand. Place G1 over the Extensor Indicis Proprius (EIP), typically two fingerbreadths proximal to the ulnar styloid on the back of the forearm. Stimulate the forearm over the ulna bone (5 to 7 cm proximal to G1). Then, stimulate at the elbow in the groove between the biceps and brachioradialis. Finally, perform stimulations both below and above the spiral groove on the posterior humerus.",
      pearl:
          "Because the EIP muscle lies parallel to several other extensors, the initial deflection of your waveform might actually drop down (a positive deflection) rather than shoot up (negative), simply due to volume conduction from nearby muscles firing first. Do not waste time repositioning electrodes to fix this; it is perfectly normal for the radial motor study.",
    ),
  ],
  "Sensory Protocols": [
    _ProtocolData(
      title: "Median Sensory",
      images: ["assets/images/ncs/median_sensory_ncs.png"],
      protocol:
          "Place ring electrodes on the middle finger. Ensure G1 is at the PIP joint and G2 is at the DIP joint. Stimulate antidromically at the wrist, directly over the median nerve, precisely 14 cm proximal to G1. You can perform a segmental study by also stimulating in the mid-palm, 7 cm distal to the wrist stimulation.",
      pearl:
          "This is the gold standard test for Carpal Tunnel Syndrome. If the electrical signal slows down significantly as it tries to squeeze through the wrist compared to its speed through the palm, the diagnosis is confirmed. If you see a messy, thick artifact on your screen just before the waveform, visually rotate the anode (the red prong) of your stimulator until the artifact shrinks.",
    ),
    _ProtocolData(
      title: "Ulnar Sensory",
      images: ["assets/images/ncs/ulnar_sensory_ncs.png"],
      protocol:
          "Place ring electrodes on the little finger (Digit 5). G1 goes at the MCP joint, and G2 sits 3 to 4 cm distally near the DIP joint. Stimulate the medial wrist adjacent to the FCU tendon, 14 cm proximal to G1.",
      pearl:
          "When testing the ulnar sensory nerve, the electrical shock often hits the adjacent ulnar motor fibers by accident. This triggers a massive muscle twitch in the hand, and the electrical volume of that muscle firing can completely eclipse the tiny sensory nerve waveform on your screen. If this happens, ask the patient to splay their fingers wide open to physically move the twitching muscles further away from your recording rings.",
    ),
    _ProtocolData(
      title: "Dorsal Ulnar Cutaneous",
      images: ["assets/images/ncs/dorsal_ulnar_cutaneous_ncs.png"],
      protocol:
          "Have the patient rest their hand completely pronated. Place G1 on the back of the hand in the web space between the ring and little fingers. Place G2 a few centimeters distally over the little finger. Stimulate just proximal to the prominent ulnar styloid bone on the wrist, maintaining an exact 8 cm distance.",
      pearl:
          "This nerve branches off the main ulnar nerve halfway up the forearm and travels to the back of the hand. It entirely bypasses Guyon's Canal at the wrist. Thus, if a patient has hand numbness and this nerve tests completely normal, the injury must be happening downstream inside Guyon's Canal. If this nerve tests poorly, the injury must be higher up closer to the elbow.",
    ),
    _ProtocolData(
      title: "Radial Sensory",
      images: ["assets/images/ncs/radial_sensory_study.png"],
      protocol:
          "Place G1 over the superficial sensory branch of the radial nerve. The easiest way to find this is to have the patient forcefully extend their thumb upward like hitchhiking; place the electrode over the prominent extensor tendons. Stimulate on the distal radius bone, 14 cm proximal to G1.",
      pearl:
          "This nerve travels superficially along the edge of the forearm. Because it separates from the deep motor branch (the PIN) at the elbow, it is a critical diagnostic tool. If the patient has a 'wrist drop' but a perfectly healthy radial sensory response, the lesion must be isolated to the deep motor branch deep in the forearm.",
    ),
    _ProtocolData(
      title: "Medial Antebrachial Cutaneous",
      images: ["assets/images/ncs/medial_antebrachial_cutaneous.png"],
      protocol:
          "Place G1 on the medial surface of the forearm, 12 cm down an imaginary line drawn from the medial elbow to the ulnar wrist. Place G2 3 to 4 cm further down that line. Stimulate the medial elbow, specifically at the midpoint between the biceps tendon and the medial epicondyle.",
      pearl:
          "This is a purely sensory study essential for evaluating a lower trunk brachial plexopathy or true neurogenic Thoracic Outlet Syndrome. You only need a very small amount of electrical current (5 to 15 mA) to fire this purely cutaneous nerve. Do not over-stimulate.",
    ),
    _ProtocolData(
      title: "Lateral Antebrachial Cutaneous",
      images: ["assets/images/ncs/lateral_antebrachial_cutaneous.png"],
      protocol:
          "Place G1 on the lateral surface of the forearm, 12 cm down an imaginary line drawn from the lateral elbow to the radial wrist. Stimulate right in the antecubital fossa, sitting just lateral to the massive biceps tendon cord.",
      pearl:
          "This nerve is the sensory continuation of the musculocutaneous nerve. If you apply too much electrical current in the elbow pit during stimulation, the electricity will leak directly into the massive biceps muscle belly below. The resulting gigantic muscle artifact will obliterate the tiny sensory response you are trying to read.",
    ),
  ],
  "Comparison Studies": [
    _ProtocolData(
      title: "Lumbrical-Interossei Comparison",
      images: [
        "assets/images/ncs/ulnar_median_motor_comparsion_median_stim.png",
        "assets/images/ncs/ulnar_median_motor_comparsion_ulnar_stim.png",
      ],
      protocol:
          "You will use the exact same recording setup for both stimulations. Place G1 slightly lateral to the midpoint of the 3rd metacarpal bone. Place G2 on the index finger MCP joint. First, stimulate the median nerve at the wrist to fire the 2nd lumbrical muscle. Next, stimulate the ulnar nerve at the wrist to fire the 1st palmar interosseous muscle. Ensure both stimulation distances are exactly 10 cm.",
      pearl:
          "This is a highly sensitive test for severe Carpal Tunnel Syndrome or when a patient already has underlying peripheral neuropathy. In a normal hand, the signals fired from the median and ulnar nerves should arrive at almost the exact same millisecond (less than 0.5 ms difference). Because both nerves are firing different muscles located physically next to each other, you remove variables like temperature and skin thickness from the equation.",
    ),
    _ProtocolData(
      title: "Median vs Ulnar - Digit 4",
      images: [
        "assets/images/ncs/ulnar_to_median_sensory_comparison_median_stim.png",
        "assets/images/ncs/ulnar_to_median_sensory_comparison_ulnar_stim.png",
      ],
      protocol:
          "Place recording rings on the ring finger (Digit 4) with G1 at the MCP joint and G2 near the DIP. Leave the rings perfectly still. First, stimulate the median nerve at the wrist, ensuring an exact distance of 14 cm. Next, stimulate the ulnar nerve at the wrist, adjusting to ensure an exact distance of 14 cm.",
      pearl:
          "The skin of the ring finger has split 'dual-innervation': the lateral side feels with the median nerve, and the medial side feels with the ulnar nerve. By recording the entire finger's sensation, we can send a median signal and an ulnar signal on a completely identical 'race track'. If the median signal arrives significantly later (greater than 0.5 ms difference), you have proven the median nerve was delayed passing through the carpal tunnel, confirming entrapment.",
    ),
    _ProtocolData(
      title: "Median vs Radial - Digit 1",
      images: [
        "assets/images/ncs/radian_vs_median_sensory_comparison_median_stim.png",
        "assets/images/ncs/radian_vs_median_sensory_comparison_radial_stim.png",
      ],
      protocol:
          "Place recording rings on the thumb (Digit 1) with G1 at the MCP and G2 distally. First, stimulate the median nerve at the wrist at exactly 10 cm. Next, stimulate the radial nerve over the radius bone in the forearm, ensuring the distance remains exactly 10 cm.",
      pearl:
          "Like the ring finger race, we are racing the median nerve against the radial nerve into the thumb. The superficial radial nerve runs completely outside the carpal tunnel, serving as a perfect control group. If the median nerve loses the 10 cm race by more than 0.5 ms, it proves the hold-up is localized solely to the wrist ligament.",
    ),
  ],
  "Palmar Mixed Studies": [
    _ProtocolData(
      title: "Median Palmar Mixed",
      images: [
        "assets/images/ncs/median_vs_ulnar_palmar_mixed_median_record.png",
      ],
      protocol:
          "Here, we record 'backwards' (orthodromically). Place the G1 recording electrode on the median nerve at the wrist, right between the FCR and palmaris longus tendons. Stimulate the thick skin of the mid-palm, exactly 8 cm distal to G1, aiming the cathode toward the web space between the index and middle fingers.",
      pearl:
          "This technique evaluates the short, highly localized 'mixed' nerve segment (containing both returning sensory fibers and outgoing motor fibers) travelling straight through the carpal tunnel. The 8 cm measurement must be absolutely perfect, straight down to the millimeter. Even a 1 cm measurement error on such a short distance will mathematically ruin the calculated velocity and trigger a false-positive diagnosis.",
    ),
    _ProtocolData(
      title: "Ulnar Palmar Mixed",
      images: [
        "assets/images/ncs/median_vs_ulnar_palmar_mixed_ulnar_record.png",
      ],
      protocol:
          "Place the G1 recording electrode on the ulnar nerve at the medial wrist adjacent to the FCU. Stimulate the mid-palm exactly 8 cm distal to G1, aiming toward the web space between the ring and little fingers.",
      pearl:
          "This serves as the sibling control test for the median palmar mixed study. We race the median palmar signal through the carpal tunnel against the ulnar palmar signal travelling safely through Guyon's canal. If the median time drops more than 0.4 ms behind the ulnar time, you have caught the earliest, most subtle evidence of Carpal Tunnel Syndrome before the standard full-length studies even begin to show disease.",
    ),
  ],
};

final _lowerProtocols = {
  "Motor Protocols": [
    _ProtocolData(
      title: "Tibial Motor (AHB)",
      images: [
        "assets/images/ncs/tibial_motor_at_the_ankle.png",
        "assets/images/ncs/tibial_motor_at_the_popliteal_fossa.png",
      ],
      protocol:
          "Place G1 precisely 1 cm superior and 1 cm posterior to the prominent navicular bone on the inner foot. This rests squarely on the Abductor Hallucis Brevis (AHB) belly. Place G2 on the first MTP joint of the great toe. Stimulate at the medial ankle exactly 9 cm proximal to G1, tracing just behind the medial malleolus. For the proximal stimulation, shock directly over the popliteal artery pulse centrally behind the knee.",
      pearl:
          "The tibial nerve is deeply embedded beneath heavy fascia and fat behind the knee joint. You will need to thrust the stimulator aggressively into the tissue and turn the electrical current up significantly higher than usual to punch the signal through to the nerve. Because the electricity has a long way to travel physically down the leg, the waveform 'pile' will inevitably spread out and the amplitude can drop up to 50% from the ankle to the knee. This drop is completely normal physiological dispersion, not a conduction block.",
    ),
    _ProtocolData(
      title: "Peroneal Motor (EDB)",
      images: [
        "assets/images/ncs/fibular_peroneal_motor_at_the_ankle.png",
        "assets/images/ncs/fibular_peronal_motor_at_the_fibular_head.png",
        "assets/images/ncs/fibular_peronal_motor_at_the_popliteal_fossa.png",
      ],
      protocol:
          "Place G1 on the fleshy bump of the Extensor Digitorum Brevis (EDB) on the top-lateral aspect of the foot. Place G2 on the MTP joint of the little toe. First, stimulate the anterior ankle lateral to the thick tibialis anterior tendon, exactly 9 cm proximal to G1. Next, stimulate the lateral calf, 1 to 2 fingerbreadths directly below the bony fibular head. Finally, stimulate the popliteal fossa slightly laterally, exactly 10 to 12 cm proximal to the below-fibular head site.",
      pearl:
          "Crucially, you MUST always perform three distinct stimulations to thoroughly bracket the fibular neck (above the neck, below the neck, and ankle). This bone is the 'danger zone' for nerve crush injuries. If your amplitude fired from below the fibula is magically larger than the amplitude fired at the ankle, suspect an accessory deep peroneal nerve anomalous connection arriving from behind the lateral malleolus.",
    ),
    _ProtocolData(
      title: "Peroneal Motor (TA)",
      images: [
        "assets/images/ncs/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png",
        "assets/images/ncs/fibular_motor_over_tibialis_anterior_at_the_popliteal_fossa.png",
      ],
      protocol:
          "Place G1 on the massive muscular belly of the Tibialis Anterior (TA) on the front of the shin, approximately 1/3 down from the knee. Place G2 down at the anterior ankle joint. Stimulate first on the lateral calf below the fibular head, and then again higher up in the lateral popliteal fossa.",
      pearl:
          "The standard EDB foot recording can often be tiny or entirely absent in perfectly healthy older adults due to lifelong wear and tight shoes permanently crushing the muscle. To confirm a true peroneal nerve injury, record from this massive shin muscle instead. The signal is gigantic and incredibly robust, making it the superior test for isolating conduction slowing exactly across the fibular neck.",
    ),
    _ProtocolData(
      title: "Femoral Motor",
      images: ["assets/images/ncs/femoral_motor_study.png"],
      protocol:
          "Place G1 directly over the anterior mid-thigh on the Rectus Femoris muscle. Place G2 squarely on the kneecap. Press the stimulator deeply into the inguinal groin crease, just lateral to the heavy pulse of the femoral artery.",
      pearl:
          "This test is notoriously difficult to execute on obese patients because copious amounts of adipose tissue block the electrical current from reaching the deep femoral nerve. Even with the stimulator cranked to maximum output (>50mA) and pressing firmly into the pelvis, you may fail to reach the nerve. Measure side-to-side (left leg vs right leg) for diagnostic comparison, as absolute values vary wildly.",
    ),
    _ProtocolData(
      title: "Medial Plantar Motor",
      images: [
        "assets/images/ncs/medial_plantar_motor_study_at_medial_malleolus.png",
      ],
      protocol:
          "Place G1 slightly proximal and posterior to the prominent navicular bone on the inner foot, resting centrally on the Abductor Hallucis Brevis (AHB). Stimulate precisely at the medial ankle behind the medial malleolus, exactly 9 cm proximal to G1.",
      pearl:
          "This targeted test is exquisite for definitively diagnosing Tarsal Tunnel Syndrome as the tibial nerve passes beneath the flexor retinaculum. Because amplitudes vary significantly in the general population, you absolutely must perform a strict side-to-side comparison of the sick foot against the asymptomatic foot to confirm suspected pathology.",
    ),
    _ProtocolData(
      title: "Lateral Plantar Motor",
      images: ["assets/images/ncs/lateral_plantar_motor.png"],
      protocol:
          "Place G1 on the Abductor Digiti Quinti Pedis (ADQP) located cleanly on the lateral edge of the foot beneath the 5th metatarsal. Stimulate at the medial ankle behind the medial malleolus. The distance is anatomically variable depending on foot length.",
      pearl:
          "Like the medial plantar motor protocol, this specifically tests for downstream branches trapped in Tarsal Tunnel Syndrome. Because the active recording electrode is on the opposite side of the foot from the medial ankle stimulation, the electrical current inherently runs diagonally through the foot anatomy, requiring careful technique.",
    ),
  ],
  "Sensory Protocols": [
    _ProtocolData(
      title: "Superficial Fibular Sensory",
      images: [
        "assets/images/ncs/superficial_fibular_peroneal_sensory_stud.png",
      ],
      protocol:
          "Place G1 laterally on the ankle, positioned precisely between the thick tibialis anterior tendon and the prominent lateral malleolus bone. Place G2 3 to 4 cm distally along the dorsum of the foot. Stimulate over the lateral calf. While 14 cm is the textbook standard, a shorter 7 to 12 cm distance is often significantly easier to obtain on the ward.",
      pearl:
          "This nerve represents the crucial sensory branch splitting off the common fibular (peroneal) nerve. If a patient presents with a severe foot drop, achieving a perfectly healthy superficial sensory response on this nerve definitively localizes the injury deep into the motor branch (akin to testing the radial sensory nerve in the arm). Be sure to calculate the true conduction velocity from the onset latency mark, never the peak latency.",
    ),
    _ProtocolData(
      title: "Sural Sensory",
      images: ["assets/images/ncs/sural_sensory_study.png"],
      protocol:
          "Instruct the patient to roll completely onto their side with the recording leg facing upward for optimal access. Place G1 horizontally just behind the lateral malleolus at the ankle. Place G2 exactly 3 to 4 cm distal. Stimulate firmly on the posterior-lateral calf. Again, the 14 cm standard can be shortened to 10 to 12 cm for challenging anatomy.",
      pearl:
          "The sural nerve is the workhorse screening tool for virtually any length-dependent peripheral polyneuropathy (like diabetic neuropathy). Because it is purely sensory and relatively superficial, it classically dies off very early in generalized systemic disease. A completely absent sural response on both legs is often the first definitive, quantifiable proof of peripheral nerve deterioration.",
    ),
    _ProtocolData(
      title: "Saphenous Sensory",
      images: ["assets/images/ncs/saphenous_sensory_study.png"],
      protocol:
          "Place G1 on the medial-anterior ankle, tucked snugly between the medial malleolus and the tibialis anterior tendon. Place G2 3 to 4 cm distally on the foot. Stimulate the medial calf inside the muscular groove between the tibia bone and the bulky medial gastrocnemius muscle belly.",
      pearl:
          "This purely sensory nerve originates from the femoral nerve high in the thigh. It is notoriously fragile; it is often frustratingly small or completely unrecordable in perfectly healthy adults over the age of forty. If you suspect an isolated femoral nerve injury or a high lumbar plexus lesion, you must compare the sick leg to the healthy leg to prove objective signal loss.",
    ),
    _ProtocolData(
      title: "Lateral Femoral Cutaneous",
      images: ["assets/images/ncs/lateral_femoral_cutaneous_sensory_study.png"],
      protocol:
          "Place G1 on the anterior thigh, tracing an imaginary line downward directly from the Anterior Superior Iliac Spine (ASIS) to the lateral edge of the patella. Place G2 3 to 4 cm distally down the leg. Drive the stimulator deep into the inguinal crease, exactly 1 cm medial to the ASIS bone, sitting entirely above the inguinal ligament. Maintain a 12 cm gap.",
      pearl:
          "This purely sensory nerve classically gets pinched tightly under the inguinal ligament, causing Meralgia Paresthetica (the infamous 'tight belt syndrome'). Anatomical variation here is wild: in 80% of patients the nerve drops straight down near the ASIS, but occasionally it drifts vastly medial. Finding it requires immense patience and heavy pressure. Always perform a side-to-side comparison.",
    ),
    _ProtocolData(
      title: "Medial Plantar Sensory",
      images: ["assets/images/ncs/medial_plantar_sensory.png"],
      protocol:
          "Place G1 securely slightly proximal and posterior to the medial malleolus. Wrap ring electrodes around the great toe (digit 1), ensuring the active cathode sits proximally at the MTP joint to fire orthodromically up the leg.",
      pearl:
          "Sensory testing on the dense, calloused sole of the foot is incredibly difficult. Even in robust young adults, the electrical signal may be microscopically small or entirely absent. You will almost certainly need to meticulously average numerous shocks on your machine to pull the true sensory waveform out of the baseline background noise.",
    ),
    _ProtocolData(
      title: "Lateral Plantar Sensory",
      images: ["assets/images/ncs/lateral_plantar_sensory.png"],
      protocol:
          "Maintain the exact same G1 recording position behind the medial malleolus. Move your stimulating ring electrodes sequentially to the little toe (digit 5), hooking the active cathode as far proximal on the MTP joint as physically possible.",
      pearl:
          "Like the medial sensory test, this is exquisitely difficult to obtain through thick plantar fascia. If the orthodromic approach (stimulating the toes and recording the ankle) completely fails due to tough skin, you can reverse the polarity and fire antidromically (stimulating the ankle and recording the toes), which occasionally yields a cleaner artifact profile.",
    ),
  ],
  "Mixed & Late Responses": [
    _ProtocolData(
      title: "Medial Plantar Mixed",
      images: ["assets/images/ncs/medial_plantar_mixed_study.png"],
      protocol:
          "Place the recording G1 electrode on the main tibial nerve trunk at the medial ankle, slightly proximal and posterior to the medial malleolus. Measure exactly 14 cm distally onto the thick sole of the foot. To find the stimulation site, measure 7 cm straight down into the sole, and then 7 cm parallel aiming toward the web space between the first and second toes.",
      pearl:
          "Firing both sensory and motor fibers simultaneously creates a significantly larger, more robust 'mixed' waveform than a pure orthodromic sensory study. Therefore, when evaluating a patient for Tarsal Tunnel Syndrome, checking these mixed distal responses is technically much easier and far more reliable than fighting through foot calluses for tiny sensory signals.",
    ),
    _ProtocolData(
      title: "Lateral Plantar Mixed",
      images: ["assets/images/ncs/lateral_plantar_mixed_study.png"],
      protocol:
          "Keep the G1 recording electrode anchored firmly on the tibial nerve trunk behind the medial malleolus. Measure exactly 14 cm diagonally across the sole of the foot. The stimulation site sits 7 cm straight down into the heel, and then 7 cm parallel aiming laterally toward the web space between the fourth and fifth toes.",
      pearl:
          "Just like the medial mixed study, this massive mixed signal is the superior choice for exposing focal slowing in the tarsal tunnel beneath the flexor retinaculum. Again, perfectly healthy adults over forty may spontaneously lose these signals entirely to age-related axonal loss, so always perform bilateral comparisons before diagnosing unilateral entrapment.",
    ),
    _ProtocolData(
      title: "Soleus H-Reflex",
      images: ["assets/images/ncs/soleus_h_reflex.png"],
      protocol:
          "Place G1 slightly distal to the junction of the medial and lateral bellies of the gastrocnemius muscle (approx 2 fingerbreadths above the soleus insertion onto the Achilles tendon). Place G2 on the Achilles tendon itself. Stimulate the tibial nerve at the popliteal fossa. Crucially, the cathode (black prong) MUST face proximally/superiorly (towards the spinal cord) rather than distally like a normal motor NCS, because you are trying to measure the afferent Ia sensory fibers traveling UP to the cord, not the efferent motor fibers traveling DOWN.",
      pearl:
          "This is the electrical equivalent of striking the Achilles tendon with a reflex hammer. The electrical signal travels all the way up the sensory nerve into the spinal cord, synapses in the S1 nerve root, and physically fires back down the motor nerve to twitch the calf. If a patient has an aggressive S1 radiculopathy (a pinched nerve in their lower spine), this elegant, long-distance loop will be delayed or completely destroyed.",
    ),
  ],
};
