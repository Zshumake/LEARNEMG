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

  // Spacing Scale (4px base)
  static const double space4 = 4.0;
  static const double space8 = 8.0;
  static const double space12 = 12.0;
  static const double space16 = 16.0;
  static const double space20 = 20.0;
  static const double space24 = 24.0;
  static const double space32 = 32.0;
  static const double space40 = 40.0;

  // Border Radius Scale
  static const double radiusS = 8.0;
  static const double radiusM = 12.0;
  static const double radiusL = 16.0;
  static const double radiusXL = 20.0;
  static const double radiusRound = 100.0;

  // Module Accent Colors (one per module for tabs, headers, cards)
  static const Color moduleIntro = Color(0xFF6B9F78);       // green (primary)
  static const Color modulePlexus = Color(0xFF0EA5E9);      // sky blue
  static const Color moduleRadiculopathy = Color(0xFFC2410C); // burnt orange
  static const Color moduleNeuropathy = Color(0xFF2563EB);   // blue
  static const Color moduleNCSFundamentals = Color(0xFF0D9488); // teal
  static const Color moduleNCSTechniques = Color(0xFF8B5CF6);  // violet
  static const Color moduleNeedle = Color(0xFF4F46E5);       // indigo
  static const Color modulePatterns = Color(0xFFF59E0B);     // amber
  static const Color moduleNMBasics = Color(0xFF7C3AED);     // purple
  static const Color moduleReports = Color(0xFF059669);      // emerald
  static const Color moduleClinical = Color(0xFF1E293B);     // slate (dark)
  static const Color moduleMuscle = Color(0xFF0D9488);       // teal
  static const Color moduleCases = Color(0xFF6366F1);        // indigo

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
