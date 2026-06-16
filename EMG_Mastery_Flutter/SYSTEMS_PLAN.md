# Flutter Systems Plan: EMG/NCS Mastery

This document outlines the big-picture planning for every system required to build the native iOS/Android version of the app.

---

## 1. Core Framework & Navigation (The Pathway)
The primary interface will be the **Learning Pathway**. 
- **System**: `Navigator 2.0` or `Go Router` for deep linking and state-aware navigation.
- **UI**: A vertically scrolling `SliverList` or `SliverGrid` representing the board. 
- **Logic**: Each module card will be a reusable widget that takes a `ModuleModel` and handles its own unlocked/completed states.

## 2. Global Audio & Podcast Engine
Since the podcasts are a central pillar of the learning experience, we need a high-performance audio engine.
- **System**: `just_audio` with `audio_service`.
- **UI**: A persistent floating Action Button (FAB) or a mini-player bar that stays across page transitions.
- **Features**: Speed control (1x, 1.5x, 2x), background playback, and lock screen controls.

## 3. Dynamic Content Rendering Engine
Our medical content is currently stored in large JS/JSON structures.
- **System**: A "Widget Factory" pattern. We define a list of `ContentNode` objects (e.g., `TextNode`, `AlertNode`, `DiagramNode`, `TableNode`).
- **UI**: A dynamic screen that iterates through these nodes and renders the corresponding Flutter widget.
- **Flexibility**: Allows us to update clinical content without re-coding the UI.

## 4. Clinical Simulation & Interactive Tools
Interactive localization tools (Muscle Lab, Plexus) will be rebuilt natively.
- **System**: `CustomPainter` for drawing nerve paths and `InteractiveViewer` for zooming/panning anatomy diagrams.
- **UI**: High-fidelity SVG rendering with touch-hit-areas for specific nerves/muscles.
- **Logic**: Real-time feedback engine that calculates localization based on user input.

## 5. Ernest: The AI Guide (Animations)
Ernest provides a friendly, welcoming atmosphere.
- **System**: `Rive` for vector animations. This is far superior to SVG-CSS animations on mobile.
- **Integration**: `ErnestController` that triggers specific animations (Wave, Think, Dance) based on user interactions.

## 6. Global State & Persistence
- **System**: `Riverpod` or `BLoC` for state management.
- **Persistence**: `Hive` (NoSQL) for high-speed local storage of module progress and PGY level settings.

---

## Next Steps:
1. Initialize the Flutter project with `flutter create`.
2. Map the existing JSON content to Dart `Models`.
3. Implement the `ThemeManager` with our medical-style color palette.
