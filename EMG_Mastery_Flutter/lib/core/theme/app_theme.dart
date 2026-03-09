import 'package:flutter/material.dart';

class AppTheme {
  // Primary Colors (Website Green Theme)
  static const Color primary = Color(0xFF6B9F78);
  static const Color primaryDark = Color(0xFF4F7A5B);
  static const Color secondary = Color(
    0xFF2A2D34,
  ); // The "Ernest" outline color
  static const Color accent = Color(0xFF88DDED); // The "Ernest" cyan accent

  static const Color success = Color(0xFF10B981);
  static const Color danger = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);
  static const Color dark = Color(0xFF2A2D34);
  static const Color light = Color(0xFFF8FAFC);
  static const Color border = Color(0xFFE2E8F0);

  // Text Colors
  static const Color textMain = Color(0xFF334155);
  static const Color textMuted = Color(0xFF64748B);
  static const Color textHeading = Color(0xFF1E293B);

  // Gradients
  static const LinearGradient foundationGradient = LinearGradient(
    colors: [primary, primaryDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient anatomyGradient = LinearGradient(
    colors: [Color(0xFF10B981), Color(0xFF059669)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient terminologyGradient = LinearGradient(
    colors: [accent, Color(0xFF0891B2)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        primary: primary,
        onPrimary: Colors.white,
        secondary: secondary,
        onSecondary: Colors.white,
        surface: Colors.white,
        error: danger,
      ),
      scaffoldBackgroundColor: const Color(0xFFF0F4F1), // Very light green tint
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          color: textHeading,
          fontWeight: FontWeight.bold,
          fontSize: 32,
        ),
        headlineMedium: TextStyle(
          color: textHeading,
          fontWeight: FontWeight.bold,
          fontSize: 24,
        ),
        bodyLarge: TextStyle(color: textMain, fontSize: 16),
        bodyMedium: TextStyle(color: textMuted, fontSize: 14),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: border),
        ),
      ),
    );
  }
}
