//
//  SettingsManager.swift
//  Ultimate SVG Converter
//
//  Manages processing settings and presets
//

import SwiftUI
import Combine

@MainActor
class SettingsManager: ObservableObject {
    static let shared = SettingsManager()
    
    // MARK: - Published Properties
    
    // Core processing parameters
    @Published var threshold: Double = 128 {
        didSet { scheduleAutoSave() }
    }
    
    @Published var blurRadius: Double = 2 {
        didSet { scheduleAutoSave() }
    }
    
    @Published var minArea: Double = 100 {
        didSet { scheduleAutoSave() }
    }
    
    @Published var simplification: Double = 0.02 {
        didSet { scheduleAutoSave() }
    }
    
    @Published var detailPreservation: Double = 0.5 {
        didSet { scheduleAutoSave() }
    }
    
    // AI features
    @Published var faceEnhancement: Bool = true {
        didSet { scheduleAutoSave() }
    }
    
    @Published var removeBackground: Bool = false {
        didSet { scheduleAutoSave() }
    }
    
    // Processing mode
    @Published var currentPreset: PresetType = .portrait {
        didSet { scheduleAutoSave() }
    }
    
    @Published var targetMaterial: MaterialType = .cardstock {
        didSet { 
            optimizeForMaterial()
            scheduleAutoSave() 
        }
    }
    
    // UI preferences
    @Published var livePreview: Bool = true {
        didSet { scheduleAutoSave() }
    }
    
    @Published var autoProcess: Bool = false {
        didSet { scheduleAutoSave() }
    }
    
    @Published var autoOptimize: Bool = true {
        didSet { scheduleAutoSave() }
    }
    
    // MARK: - Private Properties
    
    private var autoSaveTimer: Timer?
    private let userDefaults = UserDefaults.standard
    private let settingsKey = "ProcessingSettings"
    
    // MARK: - Computed Properties
    
    var currentSettings: ProcessingSettings {
        ProcessingSettings(
            threshold: threshold,
            blurRadius: blurRadius,
            minArea: minArea,
            simplification: simplification,
            faceEnhancement: faceEnhancement,
            removeBackground: removeBackground,
            detailPreservation: detailPreservation,
            targetMaterial: targetMaterial,
            autoProcess: autoProcess,
            livePreview: livePreview
        )
    }
    
    // MARK: - Initialization
    
    init() {
        loadSettings()
    }
    
    // MARK: - Public Methods
    
    func applyPreset(_ preset: PresetType) {
        let settings = preset.settings
        
        // Update parameters without triggering auto-save for each
        withAnimation(.easeInOut(duration: 0.3)) {
            threshold = settings.threshold
            blurRadius = settings.blurRadius
            minArea = settings.minArea
            simplification = settings.simplification
            faceEnhancement = settings.faceEnhancement
            removeBackground = settings.removeBackground
            detailPreservation = settings.detailPreservation
        }
        
        scheduleAutoSave()
        
        // Provide haptic feedback
        let impact = UIImpactFeedbackGenerator(style: .medium)
        impact.impactOccurred()
        
        print("Applied preset: \(preset.displayName)")
    }
    
    func optimizeForMaterial() {
        let materialSettings = targetMaterial.materialSettings
        
        // Apply material-specific optimizations
        withAnimation(.easeInOut(duration: 0.2)) {
            minArea = max(minArea, materialSettings.minArea)
            simplification = max(simplification, materialSettings.simplification)
        }
        
        print("Optimized for material: \(targetMaterial.displayName)")
    }
    
    func autoOptimizeForImage(_ analysis: ImageAnalysis) {
        guard autoOptimize else { return }
        
        // Determine best preset based on analysis
        let recommendedPreset = analysis.contentType.recommendedPreset
        
        if recommendedPreset != currentPreset {
            currentPreset = recommendedPreset
            applyPreset(recommendedPreset)
        }
        
        // Fine-tune based on image characteristics
        withAnimation(.easeInOut(duration: 0.3)) {
            // Adjust threshold based on contrast
            if analysis.edgeDensity < 0.05 {
                // Low edge density - might need lower threshold
                threshold = max(threshold - 15, 80)
            } else if analysis.edgeDensity > 0.15 {
                // High edge density - might need higher threshold
                threshold = min(threshold + 15, 200)
            }
            
            // Adjust blur for detail level
            if analysis.edgeDensity > 0.12 {
                blurRadius = min(blurRadius + 1, 5)
                minArea = max(minArea, 150)
            }
            
            // Face-specific optimizations
            if analysis.faceCount > 0 {
                faceEnhancement = true
                removeBackground = true
                threshold = max(threshold, 140)
            }
        }
        
        print("Auto-optimized for image analysis")
    }
    
    func resetToDefaults() {
        withAnimation(.easeInOut(duration: 0.5)) {
            threshold = 128
            blurRadius = 2
            minArea = 100
            simplification = 0.02
            detailPreservation = 0.5
            faceEnhancement = true
            removeBackground = false
            currentPreset = .portrait
            targetMaterial = .cardstock
            livePreview = true
            autoProcess = false
            autoOptimize = true
        }
        
        scheduleAutoSave()
        
        // Provide haptic feedback
        let notification = UINotificationFeedbackGenerator()
        notification.notificationOccurred(.success)
        
        print("Settings reset to defaults")
    }
    
    func saveAsPreset(name: String) -> Bool {
        // Save current settings as a custom preset
        let customSettings = currentSettings
        
        // Store in UserDefaults with custom key
        let customKey = "CustomPreset_\(name)"
        
        if let encoded = try? JSONEncoder().encode(customSettings) {
            userDefaults.set(encoded, forKey: customKey)
            
            // Also save the preset name to a list
            var customPresets = getCustomPresetNames()
            if !customPresets.contains(name) {
                customPresets.append(name)
                userDefaults.set(customPresets, forKey: "CustomPresetNames")
            }
            
            print("Saved custom preset: \(name)")
            return true
        }
        
        return false
    }
    
    func loadCustomPreset(name: String) -> Bool {
        let customKey = "CustomPreset_\(name)"
        
        if let data = userDefaults.data(forKey: customKey),
           let settings = try? JSONDecoder().decode(ProcessingSettings.self, from: data) {
            
            applySettings(settings)
            print("Loaded custom preset: \(name)")
            return true
        }
        
        return false
    }
    
    func getCustomPresetNames() -> [String] {
        return userDefaults.stringArray(forKey: "CustomPresetNames") ?? []
    }
    
    func deleteCustomPreset(name: String) {
        let customKey = "CustomPreset_\(name)"
        userDefaults.removeObject(forKey: customKey)
        
        var customPresets = getCustomPresetNames()
        customPresets.removeAll { $0 == name }
        userDefaults.set(customPresets, forKey: "CustomPresetNames")
        
        print("Deleted custom preset: \(name)")
    }
    
    // MARK: - Project Management
    
    func exportSettingsAsProject(name: String) -> ProjectData {
        return ProjectData(
            name: name,
            createdAt: Date(),
            settings: currentSettings,
            imageData: nil,
            analysis: nil
        )
    }
    
    func importSettingsFromProject(_ project: ProjectData) {
        applySettings(project.settings)
        print("Imported settings from project: \(project.displayName)")
    }
    
    // MARK: - Private Methods
    
    private func applySettings(_ settings: ProcessingSettings) {
        withAnimation(.easeInOut(duration: 0.3)) {
            threshold = settings.threshold
            blurRadius = settings.blurRadius
            minArea = settings.minArea
            simplification = settings.simplification
            faceEnhancement = settings.faceEnhancement
            removeBackground = settings.removeBackground
            detailPreservation = settings.detailPreservation
            targetMaterial = settings.targetMaterial
            autoProcess = settings.autoProcess
            livePreview = settings.livePreview
        }
        
        scheduleAutoSave()
    }
    
    private func loadSettings() {
        guard let data = userDefaults.data(forKey: settingsKey),
              let settings = try? JSONDecoder().decode(ProcessingSettings.self, from: data) else {
            print("No saved settings found, using defaults")
            return
        }
        
        // Apply loaded settings without animation on startup
        threshold = settings.threshold
        blurRadius = settings.blurRadius
        minArea = settings.minArea
        simplification = settings.simplification
        faceEnhancement = settings.faceEnhancement
        removeBackground = settings.removeBackground
        detailPreservation = settings.detailPreservation
        targetMaterial = settings.targetMaterial
        autoProcess = settings.autoProcess
        livePreview = settings.livePreview
        
        print("Settings loaded successfully")
    }
    
    private func saveSettings() {
        let settings = currentSettings
        
        if let encoded = try? JSONEncoder().encode(settings) {
            userDefaults.set(encoded, forKey: settingsKey)
            print("Settings saved")
        } else {
            print("Failed to save settings")
        }
    }
    
    private func scheduleAutoSave() {
        // Cancel existing timer
        autoSaveTimer?.invalidate()
        
        // Schedule new save after a delay to avoid excessive saves
        autoSaveTimer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { _ in
            DispatchQueue.main.async {
                self.saveSettings()
            }
        }
    }
}

// MARK: - Settings Validation

extension SettingsManager {
    
    func validateCurrentSettings() -> [String] {
        var warnings: [String] = []
        
        // Check threshold range
        if threshold < 50 {
            warnings.append("Very low threshold - may create noisy cuts")
        } else if threshold > 200 {
            warnings.append("Very high threshold - may lose important details")
        }
        
        // Check blur settings
        if blurRadius > 5 && minArea < 100 {
            warnings.append("High blur with low min area - consider increasing min area")
        }
        
        // Check material compatibility
        let materialSettings = targetMaterial.materialSettings
        if minArea < materialSettings.minArea {
            warnings.append("Min area too small for \(targetMaterial.displayName)")
        }
        
        if simplification < materialSettings.simplification {
            warnings.append("Simplification too low for \(targetMaterial.displayName)")
        }
        
        return warnings
    }
    
    func getRecommendationsForMaterial(_ material: MaterialType) -> [String] {
        let materialSettings = material.materialSettings
        var recommendations: [String] = []
        
        recommendations.append("📏 Min Area: \(Int(materialSettings.minArea))+ pixels")
        recommendations.append("✂️ Simplification: \(materialSettings.simplification)+")
        recommendations.append("🎯 Max Complexity: \(Int(materialSettings.maxComplexity * 100))%")
        recommendations.append("📐 Thickness: \(materialSettings.recommendedThickness)")
        
        // Material-specific tips
        switch material {
        case .vinyl:
            recommendations.append("💡 Perfect for detailed decals and stickers")
            recommendations.append("⚡ Can handle fine details and small text")
            
        case .cardstock:
            recommendations.append("💡 Great all-around material for cards")
            recommendations.append("⚡ Good balance of detail and durability")
            
        case .posterBoard:
            recommendations.append("💡 Ideal for signs and displays")
            recommendations.append("⚠️ Avoid very fine details")
            
        case .fabric:
            recommendations.append("💡 Use fabric mat and rotary blade")
            recommendations.append("⚠️ Test cut first on scrap material")
            
        case .leather:
            recommendations.append("💡 Use deep-point blade and maximum pressure")
            recommendations.append("⚠️ Simple designs work best")
            
        case .chipboard:
            recommendations.append("💡 Maximum cutting settings required")
            recommendations.append("⚠️ Very simple shapes only")
        }
        
        return recommendations
    }
}

// MARK: - Preset Recommendations

extension SettingsManager {
    
    func getPresetRecommendations(for analysis: ImageAnalysis) -> [(PresetType, String)] {
        var recommendations: [(PresetType, String)] = []
        
        // Face-based recommendations
        if analysis.faceCount > 0 {
            recommendations.append((.portrait, "Perfect for faces and people"))
            if analysis.faceCount > 1 {
                recommendations.append((.silhouette, "Good for group silhouettes"))
            }
        }
        
        // Aspect ratio based
        if analysis.isLandscape {
            recommendations.append((.landscape, "Optimized for wide scenic images"))
        }
        
        // Detail level based
        if analysis.edgeDensity > 0.15 {
            recommendations.append((.detailedArt, "Preserves fine artistic details"))
            recommendations.append((.simpleShapes, "Simplifies complex artwork"))
        } else if analysis.edgeDensity < 0.05 {
            recommendations.append((.logoText, "Great for clean graphics"))
            recommendations.append((.simpleShapes, "Perfect for basic shapes"))
        }
        
        // Complexity based
        switch analysis.complexity {
        case .simple:
            recommendations.append((.simpleShapes, "Matches the simple nature"))
            
        case .medium:
            recommendations.append((.landscape, "Balanced processing"))
            recommendations.append((.portrait, "Good general purpose"))
            
        case .complex:
            recommendations.append((.detailedArt, "Handles complex details"))
            recommendations.append((.silhouette, "Simplifies to essential shapes"))
        }
        
        // Remove duplicates while preserving order
        var seen = Set<PresetType>()
        return recommendations.filter { seen.insert($0.0).inserted }
    }
}

// MARK: - Debug and Diagnostics

extension SettingsManager {
    
    func getCurrentSettingsDescription() -> String {
        let settings = currentSettings
        
        return """
        Current Settings:
        • Preset: \(currentPreset.displayName)
        • Material: \(targetMaterial.displayName)
        • Threshold: \(Int(settings.threshold))
        • Blur: \(Int(settings.blurRadius))
        • Min Area: \(Int(settings.minArea))
        • Simplification: \(String(format: "%.3f", settings.simplification))
        • Face Enhancement: \(settings.faceEnhancement ? "ON" : "OFF")
        • Background Removal: \(settings.removeBackground ? "ON" : "OFF")
        • Live Preview: \(settings.livePreview ? "ON" : "OFF")
        • Auto Process: \(settings.autoProcess ? "ON" : "OFF")
        """
    }
    
    func logCurrentSettings() {
        print("=== Current Settings ===")
        print(getCurrentSettingsDescription())
        print("=======================")
    }
}