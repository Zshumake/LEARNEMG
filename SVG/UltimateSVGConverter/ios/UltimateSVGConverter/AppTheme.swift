//
//  AppTheme.swift
//  Ultimate SVG Converter
//
//  App-wide theming and styling
//

import SwiftUI

struct AppTheme {
    
    // MARK: - Colors
    
    struct Colors {
        // Primary colors
        static let primary = Color("PrimaryColor") // Will fallback to default if not found
        static let accent = Color("AccentColor") // Will fallback to system accent
        
        // Background colors
        static let background = Color(UIColor.systemBackground)
        static let secondaryBackground = Color(UIColor.secondarySystemBackground)
        static let surface = Color(UIColor.systemGroupedBackground)
        
        // Text colors
        static let text = Color(UIColor.label)
        static let textSecondary = Color(UIColor.secondaryLabel)
        static let textTertiary = Color(UIColor.tertiaryLabel)
        
        // Semantic colors
        static let success = Color.green
        static let warning = Color.orange
        static let error = Color.red
        static let info = Color.blue
        
        // Border and separator colors
        static let border = Color(UIColor.separator)
        static let divider = Color(UIColor.opaqueSeparator)
        
        // Custom app colors
        static let cricutGreen = Color(red: 0.2, green: 0.8, blue: 0.4)
        static let processingBlue = Color(red: 0.3, green: 0.6, blue: 0.9)
        static let previewOrange = Color(red: 1.0, green: 0.6, blue: 0.2)
        
        // Material-specific colors
        static let vinylPurple = Color(red: 0.6, green: 0.4, blue: 0.8)
        static let cardstockBrown = Color(red: 0.7, green: 0.5, blue: 0.3)
        static let fabricBlue = Color(red: 0.2, green: 0.5, blue: 0.8)
        static let leatherTan = Color(red: 0.8, green: 0.6, blue: 0.4)
    }
    
    // MARK: - Typography
    
    struct Typography {
        static let largeTitle = Font.largeTitle.weight(.bold)
        static let title = Font.title.weight(.semibold)
        static let title2 = Font.title2.weight(.semibold)
        static let title3 = Font.title3.weight(.medium)
        static let headline = Font.headline.weight(.semibold)
        static let body = Font.body
        static let callout = Font.callout
        static let subheadline = Font.subheadline
        static let footnote = Font.footnote
        static let caption = Font.caption.weight(.medium)
        static let caption2 = Font.caption2
        
        // Custom app fonts
        static let buttonText = Font.headline.weight(.semibold)
        static let cardTitle = Font.subheadline.weight(.semibold)
        static let metricValue = Font.title3.weight(.bold)
        static let statusText = Font.caption.weight(.medium)
    }
    
    // MARK: - Spacing
    
    struct Spacing {
        static let tiny: CGFloat = 4
        static let small: CGFloat = 8
        static let medium: CGFloat = 16
        static let large: CGFloat = 24
        static let extraLarge: CGFloat = 32
        static let huge: CGFloat = 48
        
        // Specific use cases
        static let cardPadding: CGFloat = 16
        static let sectionSpacing: CGFloat = 20
        static let buttonHeight: CGFloat = 44
        static let minimumTouchTarget: CGFloat = 44
    }
    
    // MARK: - Corner Radius
    
    struct CornerRadius {
        static let small: CGFloat = 6
        static let medium: CGFloat = 8
        static let large: CGFloat = 12
        static let extraLarge: CGFloat = 16
        static let round: CGFloat = 50 // For circular elements
        
        // Specific use cases
        static let button: CGFloat = 12
        static let card: CGFloat = 12
        static let sheet: CGFloat = 16
    }
    
    // MARK: - Shadows
    
    struct Shadows {
        static let small = Shadow(
            color: .black.opacity(0.1),
            radius: 2,
            x: 0,
            y: 1
        )
        
        static let medium = Shadow(
            color: .black.opacity(0.15),
            radius: 4,
            x: 0,
            y: 2
        )
        
        static let large = Shadow(
            color: .black.opacity(0.2),
            radius: 8,
            x: 0,
            y: 4
        )
        
        static let card = Shadow(
            color: .black.opacity(0.1),
            radius: 6,
            x: 0,
            y: 3
        )
    }
    
    struct Shadow {
        let color: Color
        let radius: CGFloat
        let x: CGFloat
        let y: CGFloat
    }
    
    // MARK: - Animation
    
    struct Animation {
        static let quick = SwiftUI.Animation.easeInOut(duration: 0.2)
        static let medium = SwiftUI.Animation.easeInOut(duration: 0.3)
        static let slow = SwiftUI.Animation.easeInOut(duration: 0.5)
        static let spring = SwiftUI.Animation.spring(response: 0.6, dampingFraction: 0.8)
        
        // Specific animations
        static let buttonPress = SwiftUI.Animation.easeInOut(duration: 0.1)
        static let slideIn = SwiftUI.Animation.easeOut(duration: 0.4)
        static let fadeIn = SwiftUI.Animation.easeInOut(duration: 0.3)
        static let bounce = SwiftUI.Animation.spring(response: 0.4, dampingFraction: 0.6)
    }
    
    // MARK: - Layout
    
    struct Layout {
        // Grid columns
        static let compactGridColumns = [
            GridItem(.flexible()),
            GridItem(.flexible())
        ]
        
        static let regularGridColumns = [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ]
        
        static let metricGridColumns = [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ]
        
        // Breakpoints
        static let compactWidth: CGFloat = 400
        static let regularWidth: CGFloat = 600
        static let largeWidth: CGFloat = 800
        
        // Content widths
        static let maxContentWidth: CGFloat = 1200
        static let sidebarWidth: CGFloat = 320
        static let panelWidth: CGFloat = 350
    }
}

// MARK: - View Extensions

extension View {
    
    // MARK: - Shadow Modifiers
    
    func cardShadow() -> some View {
        self.shadow(
            color: AppTheme.Shadows.card.color,
            radius: AppTheme.Shadows.card.radius,
            x: AppTheme.Shadows.card.x,
            y: AppTheme.Shadows.card.y
        )
    }
    
    func lightShadow() -> some View {
        self.shadow(
            color: AppTheme.Shadows.small.color,
            radius: AppTheme.Shadows.small.radius,
            x: AppTheme.Shadows.small.x,
            y: AppTheme.Shadows.small.y
        )
    }
    
    func mediumShadow() -> some View {
        self.shadow(
            color: AppTheme.Shadows.medium.color,
            radius: AppTheme.Shadows.medium.radius,
            x: AppTheme.Shadows.medium.x,
            y: AppTheme.Shadows.medium.y
        )
    }
    
    // MARK: - Card Styling
    
    func cardStyle() -> some View {
        self
            .padding(AppTheme.Spacing.cardPadding)
            .background(AppTheme.Colors.surface)
            .clipShape(RoundedRectangle(cornerRadius: AppTheme.CornerRadius.card))
            .cardShadow()
    }
    
    func surfaceStyle() -> some View {
        self
            .background(AppTheme.Colors.surface)
            .clipShape(RoundedRectangle(cornerRadius: AppTheme.CornerRadius.medium))
    }
    
    // MARK: - Border Styling
    
    func borderStyle(_ color: Color = AppTheme.Colors.border, width: CGFloat = 1) -> some View {
        self.overlay(
            RoundedRectangle(cornerRadius: AppTheme.CornerRadius.medium)
                .stroke(color, lineWidth: width)
        )
    }
    
    // MARK: - Responsive Layout
    
    @ViewBuilder
    func adaptiveLayout<Content: View>(
        compact: () -> Content,
        regular: () -> Content
    ) -> some View {
        GeometryReader { geometry in
            if geometry.size.width < AppTheme.Layout.compactWidth {
                compact()
            } else {
                regular()
            }
        }
    }
    
    // MARK: - Haptic Feedback
    
    func hapticFeedback(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) -> some View {
        self.onTapGesture {
            let impact = UIImpactFeedbackGenerator(style: style)
            impact.impactOccurred()
        }
    }
    
    func successHaptic() -> some View {
        self.onAppear {
            let notification = UINotificationFeedbackGenerator()
            notification.notificationOccurred(.success)
        }
    }
    
    func errorHaptic() -> some View {
        self.onAppear {
            let notification = UINotificationFeedbackGenerator()
            notification.notificationOccurred(.error)
        }
    }
    
    // MARK: - Conditional Modifiers
    
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
    
    @ViewBuilder
    func ifLet<Value, Content: View>(
        _ value: Value?,
        transform: (Self, Value) -> Content
    ) -> some View {
        if let value = value {
            transform(self, value)
        } else {
            self
        }
    }
}

// MARK: - Color Extensions

extension Color {
    // Hex color initializer
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    // Dynamic colors for light/dark mode
    static func dynamic(light: Color, dark: Color) -> Color {
        Color(UIColor { traitCollection in
            traitCollection.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light)
        })
    }
    
    // Material-specific colors
    static var materialColors: [MaterialType: Color] {
        [
            .vinyl: AppTheme.Colors.vinylPurple,
            .cardstock: AppTheme.Colors.cardstockBrown,
            .posterBoard: AppTheme.Colors.warning,
            .fabric: AppTheme.Colors.fabricBlue,
            .leather: AppTheme.Colors.leatherTan,
            .chipboard: Color.gray
        ]
    }
    
    // Complexity colors
    static var complexityColors: [ComplexityLevel: Color] {
        [
            .simple: AppTheme.Colors.success,
            .medium: AppTheme.Colors.warning,
            .complex: AppTheme.Colors.error
        ]
    }
}

// MARK: - Device Detection

struct DeviceInfo {
    static let isPhone = UIDevice.current.userInterfaceIdiom == .phone
    static let isPad = UIDevice.current.userInterfaceIdiom == .pad
    static let isLandscape = UIScreen.main.bounds.width > UIScreen.main.bounds.height
    
    static var screenSize: CGSize {
        UIScreen.main.bounds.size
    }
    
    static var isCompact: Bool {
        screenSize.width < AppTheme.Layout.compactWidth
    }
    
    static var isRegular: Bool {
        screenSize.width >= AppTheme.Layout.regularWidth
    }
    
    static var isLarge: Bool {
        screenSize.width >= AppTheme.Layout.largeWidth
    }
}

// MARK: - Accessibility

extension View {
    func accessibilityLabel(_ label: String, hint: String? = nil) -> some View {
        self
            .accessibilityLabel(label)
            .ifLet(hint) { view, hint in
                view.accessibilityHint(hint)
            }
    }
    
    func accessibilityAction(_ name: String, action: @escaping () -> Void) -> some View {
        self.accessibilityAction(named: name, action)
    }
}

// MARK: - Environment Values

private struct AppThemeKey: EnvironmentKey {
    static let defaultValue = AppTheme.self
}

extension EnvironmentValues {
    var appTheme: AppTheme.Type {
        get { self[AppThemeKey.self] }
        set { self[AppThemeKey.self] = newValue }
    }
}