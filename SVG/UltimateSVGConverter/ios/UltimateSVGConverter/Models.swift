//
//  Models.swift
//  Ultimate SVG Converter
//
//  Data models and supporting types
//

import SwiftUI
import UIKit

// MARK: - App Mode

enum AppMode: CaseIterable {
    case beginner
    case advanced
    
    var displayName: String {
        switch self {
        case .beginner: return "Beginner"
        case .advanced: return "Advanced"
        }
    }
    
    var icon: String {
        switch self {
        case .beginner: return "wand.and.stars"
        case .advanced: return "gearshape.2"
        }
    }
    
    mutating func toggle() {
        self = self == .beginner ? .advanced : .beginner
    }
}

// MARK: - Preset Types

enum PresetType: String, CaseIterable, Codable {
    case portrait = "portrait"
    case landscape = "landscape"
    case logoText = "logo_text"
    case silhouette = "silhouette"
    case detailedArt = "detailed_art"
    case simpleShapes = "simple_shapes"
    
    var displayName: String {
        switch self {
        case .portrait: return "Portrait"
        case .landscape: return "Landscape"
        case .logoText: return "Logo/Text"
        case .silhouette: return "Silhouette"
        case .detailedArt: return "Detailed Art"
        case .simpleShapes: return "Simple Shapes"
        }
    }
    
    var icon: String {
        switch self {
        case .portrait: return "person.circle"
        case .landscape: return "photo"
        case .logoText: return "textformat"
        case .silhouette: return "figure.walk"
        case .detailedArt: return "paintbrush"
        case .simpleShapes: return "square.on.circle"
        }
    }
    
    var description: String {
        switch self {
        case .portrait: return "Optimized for faces and people"
        case .landscape: return "Great for scenery and nature"
        case .logoText: return "Clean graphics and text"
        case .silhouette: return "Simple outlines and shapes"
        case .detailedArt: return "Maximum detail preservation"
        case .simpleShapes: return "Basic geometry for thick materials"
        }
    }
    
    var settings: ProcessingSettings {
        switch self {
        case .portrait:
            return ProcessingSettings(
                threshold: 145,
                blurRadius: 1,
                minArea: 50,
                simplification: 0.015,
                faceEnhancement: true,
                removeBackground: true,
                detailPreservation: 0.7
            )
        case .landscape:
            return ProcessingSettings(
                threshold: 125,
                blurRadius: 2,
                minArea: 150,
                simplification: 0.025,
                faceEnhancement: false,
                removeBackground: false,
                detailPreservation: 0.4
            )
        case .logoText:
            return ProcessingSettings(
                threshold: 140,
                blurRadius: 0,
                minArea: 25,
                simplification: 0.01,
                faceEnhancement: false,
                removeBackground: true,
                detailPreservation: 0.8
            )
        case .silhouette:
            return ProcessingSettings(
                threshold: 120,
                blurRadius: 3,
                minArea: 200,
                simplification: 0.03,
                faceEnhancement: false,
                removeBackground: true,
                detailPreservation: 0.3
            )
        case .detailedArt:
            return ProcessingSettings(
                threshold: 135,
                blurRadius: 1,
                minArea: 25,
                simplification: 0.01,
                faceEnhancement: true,
                removeBackground: false,
                detailPreservation: 0.85
            )
        case .simpleShapes:
            return ProcessingSettings(
                threshold: 115,
                blurRadius: 4,
                minArea: 300,
                simplification: 0.05,
                faceEnhancement: false,
                removeBackground: false,
                detailPreservation: 0.2
            )
        }
    }
}

// MARK: - Material Types

enum MaterialType: String, CaseIterable, Codable {
    case vinyl = "vinyl"
    case cardstock = "cardstock"
    case posterBoard = "poster_board"
    case fabric = "fabric"
    case leather = "leather"
    case chipboard = "chipboard"
    
    var displayName: String {
        switch self {
        case .vinyl: return "Vinyl"
        case .cardstock: return "Cardstock"
        case .posterBoard: return "Poster Board"
        case .fabric: return "Fabric"
        case .leather: return "Leather"
        case .chipboard: return "Chipboard"
        }
    }
    
    var icon: String {
        switch self {
        case .vinyl: return "rectangle.and.pencil.and.ellipse"
        case .cardstock: return "doc.plaintext"
        case .posterBoard: return "newspaper"
        case .fabric: return "tshirt"
        case .leather: return "briefcase"
        case .chipboard: return "square.stack.3d.up"
        }
    }
    
    var description: String {
        switch self {
        case .vinyl: return "Fine details, perfect for decals"
        case .cardstock: return "Standard cuts, great for cards"
        case .posterBoard: return "Thicker material, simpler designs"
        case .fabric: return "Textile cutting, use fabric mat"
        case .leather: return "Heavy material, simple shapes only"
        case .chipboard: return "Maximum thickness, very simple"
        }
    }
    
    var materialSettings: MaterialSettings {
        switch self {
        case .vinyl:
            return MaterialSettings(
                minArea: 50,
                simplification: 0.01,
                maxComplexity: 0.8,
                recommendedThickness: "Thin"
            )
        case .cardstock:
            return MaterialSettings(
                minArea: 100,
                simplification: 0.02,
                maxComplexity: 0.6,
                recommendedThickness: "Medium"
            )
        case .posterBoard:
            return MaterialSettings(
                minArea: 150,
                simplification: 0.025,
                maxComplexity: 0.5,
                recommendedThickness: "Thick"
            )
        case .fabric:
            return MaterialSettings(
                minArea: 200,
                simplification: 0.03,
                maxComplexity: 0.4,
                recommendedThickness: "Variable"
            )
        case .leather:
            return MaterialSettings(
                minArea: 300,
                simplification: 0.04,
                maxComplexity: 0.3,
                recommendedThickness: "Very Thick"
            )
        case .chipboard:
            return MaterialSettings(
                minArea: 400,
                simplification: 0.05,
                maxComplexity: 0.2,
                recommendedThickness: "Maximum"
            )
        }
    }
}

// MARK: - Content Types

enum ContentType: String, CaseIterable, Codable {
    case portrait = "portrait"
    case landscape = "landscape"
    case logoText = "logo_text"
    case silhouette = "silhouette"
    case detailedArt = "detailed_art"
    case simpleShapes = "simple_shapes"
    
    var displayName: String {
        switch self {
        case .portrait: return "Portrait"
        case .landscape: return "Landscape"
        case .logoText: return "Logo/Text"
        case .silhouette: return "Silhouette"
        case .detailedArt: return "Detailed Art"
        case .simpleShapes: return "Simple Shapes"
        }
    }
    
    var recommendedPreset: PresetType {
        switch self {
        case .portrait: return .portrait
        case .landscape: return .landscape
        case .logoText: return .logoText
        case .silhouette: return .silhouette
        case .detailedArt: return .detailedArt
        case .simpleShapes: return .simpleShapes
        }
    }
}

// MARK: - Complexity Levels

enum ComplexityLevel: String, CaseIterable, Codable {
    case simple = "simple"
    case medium = "medium"
    case complex = "complex"
    
    var displayName: String {
        switch self {
        case .simple: return "Simple"
        case .medium: return "Medium"
        case .complex: return "Complex"
        }
    }
    
    var color: Color {
        switch self {
        case .simple: return AppTheme.Colors.success
        case .medium: return AppTheme.Colors.warning
        case .complex: return AppTheme.Colors.error
        }
    }
    
    var icon: String {
        switch self {
        case .simple: return "checkmark.circle.fill"
        case .medium: return "exclamationmark.circle.fill"
        case .complex: return "xmark.circle.fill"
        }
    }
}

// MARK: - Processing Settings

struct ProcessingSettings: Codable {
    var threshold: Double = 128
    var blurRadius: Double = 2
    var minArea: Double = 100
    var simplification: Double = 0.02
    var faceEnhancement: Bool = true
    var removeBackground: Bool = false
    var detailPreservation: Double = 0.5
    
    // Material-specific optimization
    var targetMaterial: MaterialType = .cardstock
    
    // Auto features
    var autoProcess: Bool = false
    var livePreview: Bool = true
    
    mutating func optimizeForMaterial(_ material: MaterialType) {
        let materialSettings = material.materialSettings
        targetMaterial = material
        minArea = max(minArea, materialSettings.minArea)
        simplification = max(simplification, materialSettings.simplification)
    }
}

// MARK: - Material Settings

struct MaterialSettings {
    let minArea: Double
    let simplification: Double
    let maxComplexity: Double
    let recommendedThickness: String
}

// MARK: - Image Analysis

struct ImageAnalysis: Codable {
    let dimensions: CGSize
    let aspectRatio: Double
    let edgeDensity: Double
    let faceCount: Int
    let contentType: ContentType
    
    // Processing results
    let complexity: ComplexityLevel
    let cutPaths: Int
    let cutAreaPercentage: Double
    let estimatedMinutes: Double
    
    var isPortrait: Bool {
        aspectRatio < 1.0
    }
    
    var isLandscape: Bool {
        aspectRatio > 1.3
    }
    
    var isSquare: Bool {
        abs(aspectRatio - 1.0) < 0.1
    }
    
    var recommendations: [String] {
        var recommendations: [String] = []
        
        if faceCount > 0 {
            recommendations.append("👤 Portrait detected - use Portrait preset")
            recommendations.append("✅ Enable face enhancement for better results")
            recommendations.append("🗑️ Consider background removal for clean silhouettes")
        }
        
        if edgeDensity > 0.1 {
            recommendations.append("🔍 High detail image - increase blur for smoother cuts")
            recommendations.append("⚡ Consider Simple Shapes preset for easier cutting")
        } else if edgeDensity < 0.05 {
            recommendations.append("📐 Low detail image - use Detailed Art preset")
        }
        
        if complexity == .complex {
            recommendations.append("⚠️ Complex design - consider vinyl for fine details")
            recommendations.append("🕒 This design will take longer to cut")
        }
        
        return recommendations
    }
}

// MARK: - Export Options

struct ExportOptions: Codable {
    var fileName: String = ""
    var includeMetadata: Bool = true
    var optimizeForCricut: Bool = true
    var dpi: Int = 300
    
    var fileExtension: String {
        ".svg"
    }
    
    var mimeType: String {
        "image/svg+xml"
    }
}

// MARK: - App Settings

class AppSettings: ObservableObject, Codable {
    @Published var hasSeenOnboarding: Bool = false
    @Published var preferredMode: AppMode = .beginner
    @Published var autoSaveProjects: Bool = true
    @Published var showAdvancedMetrics: Bool = false
    @Published var enableHapticFeedback: Bool = true
    @Published var defaultPreset: PresetType = .portrait
    @Published var defaultMaterial: MaterialType = .cardstock
    
    // Coding keys for persistence
    enum CodingKeys: String, CodingKey {
        case hasSeenOnboarding
        case preferredMode
        case autoSaveProjects
        case showAdvancedMetrics
        case enableHapticFeedback
        case defaultPreset
        case defaultMaterial
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        hasSeenOnboarding = try container.decode(Bool.self, forKey: .hasSeenOnboarding)
        preferredMode = try container.decode(AppMode.self, forKey: .preferredMode)
        autoSaveProjects = try container.decode(Bool.self, forKey: .autoSaveProjects)
        showAdvancedMetrics = try container.decode(Bool.self, forKey: .showAdvancedMetrics)
        enableHapticFeedback = try container.decode(Bool.self, forKey: .enableHapticFeedback)
        defaultPreset = try container.decode(PresetType.self, forKey: .defaultPreset)
        defaultMaterial = try container.decode(MaterialType.self, forKey: .defaultMaterial)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(hasSeenOnboarding, forKey: .hasSeenOnboarding)
        try container.encode(preferredMode, forKey: .preferredMode)
        try container.encode(autoSaveProjects, forKey: .autoSaveProjects)
        try container.encode(showAdvancedMetrics, forKey: .showAdvancedMetrics)
        try container.encode(enableHapticFeedback, forKey: .enableHapticFeedback)
        try container.encode(defaultPreset, forKey: .defaultPreset)
        try container.encode(defaultMaterial, forKey: .defaultMaterial)
    }
    
    init() {}
    
    func save() {
        // Save to UserDefaults
        if let encoded = try? JSONEncoder().encode(self) {
            UserDefaults.standard.set(encoded, forKey: "AppSettings")
        }
    }
    
    static func load() -> AppSettings {
        if let data = UserDefaults.standard.data(forKey: "AppSettings"),
           let settings = try? JSONDecoder().decode(AppSettings.self, from: data) {
            return settings
        }
        return AppSettings()
    }
}

// MARK: - Project Data

struct ProjectData: Codable, Identifiable {
    let id = UUID()
    let name: String
    let createdAt: Date
    let settings: ProcessingSettings
    let imageData: Data?
    let analysis: ImageAnalysis?
    
    var displayName: String {
        name.isEmpty ? "Untitled Project" : name
    }
    
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        return formatter.string(from: createdAt)
    }
}

// MARK: - Theme Extension for AppMode

extension AppMode: Codable {
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let rawValue = try container.decode(String.self)
        
        switch rawValue {
        case "beginner": self = .beginner
        case "advanced": self = .advanced
        default: self = .beginner
        }
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .beginner: try container.encode("beginner")
        case .advanced: try container.encode("advanced")
        }
    }
}

// MARK: - CGSize Codable Extension

extension CGSize: Codable {
    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let width = try container.decode(CGFloat.self, forKey: .width)
        let height = try container.decode(CGFloat.self, forKey: .height)
        self.init(width: width, height: height)
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(width, forKey: .width)
        try container.encode(height, forKey: .height)
    }
    
    private enum CodingKeys: String, CodingKey {
        case width, height
    }
}