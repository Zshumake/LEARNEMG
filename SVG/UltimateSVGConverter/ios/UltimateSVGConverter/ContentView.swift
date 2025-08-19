//
//  ContentView.swift
//  Ultimate SVG Converter
//
//  Professional AI-powered image to Cricut SVG conversion
//

import SwiftUI
import PhotosUI

struct ContentView: View {
    @StateObject private var imageProcessor = ImageProcessor()
    @StateObject private var settingsManager = SettingsManager()
    @State private var showingImagePicker = false
    @State private var showingExportSheet = false
    @State private var showingSettings = false
    @State private var currentMode: AppMode = .beginner
    @State private var showingOnboarding = true
    
    var body: some View {
        NavigationView {
            GeometryReader { geometry in
                VStack(spacing: 0) {
                    // Header
                    HeaderView(
                        currentMode: $currentMode,
                        onSettingsTap: { showingSettings = true },
                        onModeTap: { currentMode.toggle() }
                    )
                    
                    // Main content based on screen size
                    if geometry.size.width > geometry.size.height && geometry.size.width > 800 {
                        // Tablet landscape: side-by-side layout
                        HStack(spacing: 0) {
                            // Controls panel
                            ControlPanelView(
                                imageProcessor: imageProcessor,
                                settingsManager: settingsManager,
                                currentMode: currentMode,
                                onImagePickerTap: { showingImagePicker = true }
                            )
                            .frame(width: 350)
                            
                            Divider()
                            
                            // Image preview
                            ImagePreviewView(
                                imageProcessor: imageProcessor,
                                onImagePickerTap: { showingImagePicker = true }
                            )
                        }
                    } else {
                        // Phone or tablet portrait: scrollable layout
                        ScrollView {
                            VStack(spacing: 20) {
                                // Image preview (compact)
                                ImagePreviewView(
                                    imageProcessor: imageProcessor,
                                    onImagePickerTap: { showingImagePicker = true },
                                    isCompact: true
                                )
                                .frame(height: 300)
                                
                                // Controls
                                ControlPanelView(
                                    imageProcessor: imageProcessor,
                                    settingsManager: settingsManager,
                                    currentMode: currentMode,
                                    onImagePickerTap: { showingImagePicker = true }
                                )
                            }
                            .padding(.horizontal)
                        }
                    }
                    
                    // Bottom action bar
                    if imageProcessor.hasProcessedImage {
                        BottomActionBar(
                            onExport: { showingExportSheet = true }
                        )
                    }
                }
            }
            .navigationBarHidden(true)
            .background(AppTheme.Colors.background.ignoresSafeArea())
        }
        .sheet(isPresented: $showingImagePicker) {
            ImagePicker { image in
                Task {
                    await imageProcessor.loadImage(image)
                    if settingsManager.autoProcess {
                        await imageProcessor.processImage()
                    }
                }
            }
        }
        .sheet(isPresented: $showingExportSheet) {
            ExportView(imageProcessor: imageProcessor)
        }
        .sheet(isPresented: $showingSettings) {
            SettingsView(settingsManager: settingsManager)
        }
        .sheet(isPresented: $showingOnboarding) {
            OnboardingView(isPresented: $showingOnboarding)
        }
        .onChange(of: settingsManager.currentPreset) { _ in
            if imageProcessor.hasOriginalImage && settingsManager.livePreview {
                Task {
                    await imageProcessor.updateLivePreview()
                }
            }
        }
    }
}

// MARK: - Header View

struct HeaderView: View {
    @Binding var currentMode: AppMode
    let onSettingsTap: () -> Void
    let onModeTap: () -> Void
    
    var body: some View {
        HStack {
            // App title
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 8) {
                    Image(systemName: "scissors")
                        .font(.title2)
                        .foregroundColor(AppTheme.Colors.accent)
                    
                    Text("Ultimate SVG Converter")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(AppTheme.Colors.text)
                }
                
                Text("Professional Cricut Tool")
                    .font(.caption)
                    .foregroundColor(AppTheme.Colors.textSecondary)
            }
            
            Spacer()
            
            // Mode toggle
            Button(action: onModeTap) {
                HStack(spacing: 4) {
                    Image(systemName: currentMode.icon)
                        .font(.caption)
                    Text(currentMode.displayName)
                        .font(.caption)
                        .fontWeight(.medium)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(AppTheme.Colors.accent)
                .foregroundColor(.white)
                .clipShape(Capsule())
            }
            
            // Settings button
            Button(action: onSettingsTap) {
                Image(systemName: "gearshape.fill")
                    .font(.title2)
                    .foregroundColor(AppTheme.Colors.textSecondary)
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(AppTheme.Colors.surface)
    }
}

// MARK: - Control Panel

struct ControlPanelView: View {
    @ObservedObject var imageProcessor: ImageProcessor
    @ObservedObject var settingsManager: SettingsManager
    let currentMode: AppMode
    let onImagePickerTap: () -> Void
    
    var body: some View {
        VStack(spacing: 20) {
            // Image loading section
            ImageLoadingSection(
                hasImage: imageProcessor.hasOriginalImage,
                onTap: onImagePickerTap
            )
            
            if imageProcessor.hasOriginalImage {
                // Processing controls based on mode
                switch currentMode {
                case .beginner:
                    BeginnerControlsView(
                        imageProcessor: imageProcessor,
                        settingsManager: settingsManager
                    )
                    
                case .advanced:
                    AdvancedControlsView(
                        imageProcessor: imageProcessor,
                        settingsManager: settingsManager
                    )
                }
                
                // Analysis results
                if imageProcessor.hasAnalysis {
                    AnalysisResultsView(
                        analysis: imageProcessor.currentAnalysis!
                    )
                }
                
                Spacer()
            }
        }
        .padding()
        .background(AppTheme.Colors.surface)
    }
}

// MARK: - Image Loading Section

struct ImageLoadingSection: View {
    let hasImage: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(spacing: 12) {
            Button(action: onTap) {
                VStack(spacing: 8) {
                    Image(systemName: hasImage ? "photo.badge.checkmark" : "photo.badge.plus")
                        .font(.system(size: 32))
                        .foregroundColor(AppTheme.Colors.accent)
                    
                    Text(hasImage ? "Change Image" : "Select Image")
                        .font(.headline)
                        .fontWeight(.medium)
                    
                    Text("Tap to choose from Photos")
                        .font(.caption)
                        .foregroundColor(AppTheme.Colors.textSecondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 20)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(AppTheme.Colors.background)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(AppTheme.Colors.accent, style: .init(lineWidth: 2, dash: [8]))
                        )
                )
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
}

// MARK: - Beginner Controls

struct BeginnerControlsView: View {
    @ObservedObject var imageProcessor: ImageProcessor
    @ObservedObject var settingsManager: SettingsManager
    
    var body: some View {
        VStack(spacing: 16) {
            // Auto-process toggle
            SettingRow(
                icon: "brain",
                title: "Auto Process",
                subtitle: "Process automatically when image loads"
            ) {
                Toggle("", isOn: $settingsManager.autoProcess)
                    .labelsHidden()
            }
            
            // Preset selection
            VStack(alignment: .leading, spacing: 8) {
                Label("Smart Presets", systemImage: "wand.and.rays")
                    .font(.headline)
                    .foregroundColor(AppTheme.Colors.text)
                
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 12) {
                    ForEach(PresetType.allCases, id: \.self) { preset in
                        PresetButton(
                            preset: preset,
                            isSelected: settingsManager.currentPreset == preset,
                            action: {
                                settingsManager.currentPreset = preset
                                settingsManager.applyPreset(preset)
                                
                                if settingsManager.livePreview {
                                    Task {
                                        await imageProcessor.updateLivePreview()
                                    }
                                }
                            }
                        )
                    }
                }
            }
            
            // Material selection
            VStack(alignment: .leading, spacing: 8) {
                Label("Target Material", systemImage: "square.stack.3d.up")
                    .font(.headline)
                    .foregroundColor(AppTheme.Colors.text)
                
                Picker("Material", selection: $settingsManager.targetMaterial) {
                    ForEach(MaterialType.allCases, id: \.self) { material in
                        Text(material.displayName).tag(material)
                    }
                }
                .pickerStyle(SegmentedPickerStyle())
                .onChange(of: settingsManager.targetMaterial) { _ in
                    settingsManager.optimizeForMaterial()
                    
                    if settingsManager.livePreview {
                        Task {
                            await imageProcessor.updateLivePreview()
                        }
                    }
                }
            }
            
            // AI features
            AIFeaturesView(settingsManager: settingsManager)
            
            // Process button
            if !settingsManager.autoProcess {
                ProcessButton(
                    isProcessing: imageProcessor.isProcessing,
                    hasImage: imageProcessor.hasOriginalImage,
                    action: {
                        Task {
                            await imageProcessor.processImage()
                        }
                    }
                )
            }
        }
    }
}

// MARK: - Advanced Controls

struct AdvancedControlsView: View {
    @ObservedObject var imageProcessor: ImageProcessor
    @ObservedObject var settingsManager: SettingsManager
    
    var body: some View {
        VStack(spacing: 16) {
            // Live preview toggle
            SettingRow(
                icon: "eye",
                title: "Live Preview",
                subtitle: "See changes in real-time"
            ) {
                Toggle("", isOn: $settingsManager.livePreview)
                    .labelsHidden()
                    .onChange(of: settingsManager.livePreview) { enabled in
                        if enabled && imageProcessor.hasOriginalImage {
                            Task {
                                await imageProcessor.updateLivePreview()
                            }
                        }
                    }
            }
            
            // Quick presets (compact)
            PresetSelectionCompact(settingsManager: settingsManager) {
                if settingsManager.livePreview {
                    Task {
                        await imageProcessor.updateLivePreview()
                    }
                }
            }
            
            // Advanced parameters
            VStack(alignment: .leading, spacing: 12) {
                Label("Fine Controls", systemImage: "slider.horizontal.3")
                    .font(.headline)
                    .foregroundColor(AppTheme.Colors.text)
                
                ParameterSlider(
                    title: "Threshold",
                    value: $settingsManager.threshold,
                    range: 0...255,
                    step: 1,
                    icon: "adjustments.horizontal"
                ) {
                    if settingsManager.livePreview {
                        Task {
                            await imageProcessor.updateLivePreview()
                        }
                    }
                }
                
                ParameterSlider(
                    title: "Blur",
                    value: $settingsManager.blurRadius,
                    range: 0...10,
                    step: 1,
                    icon: "cloud"
                ) {
                    if settingsManager.livePreview {
                        Task {
                            await imageProcessor.updateLivePreview()
                        }
                    }
                }
                
                ParameterSlider(
                    title: "Min Area",
                    value: $settingsManager.minArea,
                    range: 10...500,
                    step: 5,
                    icon: "viewfinder"
                ) {
                    if settingsManager.livePreview {
                        Task {
                            await imageProcessor.updateLivePreview()
                        }
                    }
                }
            }
            
            // AI features
            AIFeaturesView(settingsManager: settingsManager)
            
            // Process button
            ProcessButton(
                isProcessing: imageProcessor.isProcessing,
                hasImage: imageProcessor.hasOriginalImage,
                action: {
                    Task {
                        await imageProcessor.processImage()
                    }
                }
            )
        }
    }
}

// MARK: - Supporting Views

struct SettingRow<Content: View>: View {
    let icon: String
    let title: String
    let subtitle: String
    let content: () -> Content
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 8) {
                    Image(systemName: icon)
                        .foregroundColor(AppTheme.Colors.accent)
                        .frame(width: 20)
                    
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(AppTheme.Colors.text)
                }
                
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(AppTheme.Colors.textSecondary)
            }
            
            Spacer()
            
            content()
        }
        .padding(.vertical, 4)
    }
}

struct PresetButton: View {
    let preset: PresetType
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: preset.icon)
                    .font(.title2)
                    .foregroundColor(isSelected ? .white : AppTheme.Colors.accent)
                
                Text(preset.displayName)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(isSelected ? .white : AppTheme.Colors.text)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 80)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isSelected ? AppTheme.Colors.accent : AppTheme.Colors.background)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isSelected ? AppTheme.Colors.accent : AppTheme.Colors.border, lineWidth: 1)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}

struct PresetSelectionCompact: View {
    @ObservedObject var settingsManager: SettingsManager
    let onChange: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label("Preset", systemImage: "wand.and.rays")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(AppTheme.Colors.text)
            
            Picker("Preset", selection: $settingsManager.currentPreset) {
                ForEach(PresetType.allCases, id: \.self) { preset in
                    Text(preset.displayName).tag(preset)
                }
            }
            .pickerStyle(MenuPickerStyle())
            .onChange(of: settingsManager.currentPreset) { _ in
                settingsManager.applyPreset(settingsManager.currentPreset)
                onChange()
            }
        }
    }
}

struct ParameterSlider: View {
    let title: String
    @Binding var value: Double
    let range: ClosedRange<Double>
    let step: Double
    let icon: String
    let onChange: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Image(systemName: icon)
                    .foregroundColor(AppTheme.Colors.accent)
                    .frame(width: 16)
                
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(AppTheme.Colors.text)
                
                Spacer()
                
                Text("\(Int(value))")
                    .font(.caption)
                    .foregroundColor(AppTheme.Colors.accent)
                    .fontWeight(.bold)
                    .frame(width: 30)
            }
            
            Slider(value: $value, in: range, step: step)
                .accentColor(AppTheme.Colors.accent)
                .onChange(of: value) { _ in
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                        onChange()
                    }
                }
        }
    }
}

struct AIFeaturesView: View {
    @ObservedObject var settingsManager: SettingsManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label("AI Features", systemImage: "brain.head.profile")
                .font(.headline)
                .foregroundColor(AppTheme.Colors.text)
            
            SettingRow(
                icon: "person.crop.circle.badge.checkmark",
                title: "Face Enhancement",
                subtitle: "Optimize for portraits"
            ) {
                Toggle("", isOn: $settingsManager.faceEnhancement)
                    .labelsHidden()
            }
            
            SettingRow(
                icon: "trash",
                title: "Remove Background",
                subtitle: "AI-powered background removal"
            ) {
                Toggle("", isOn: $settingsManager.removeBackground)
                    .labelsHidden()
            }
        }
    }
}

struct ProcessButton: View {
    let isProcessing: Bool
    let hasImage: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isProcessing {
                    ProgressView()
                        .scaleEffect(0.8)
                        .tint(.white)
                } else {
                    Image(systemName: "waveform.path.ecg")
                        .font(.headline)
                }
                
                Text(isProcessing ? "Processing..." : "Process Image")
                    .font(.headline)
                    .fontWeight(.bold)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(hasImage && !isProcessing ? AppTheme.Colors.accent : AppTheme.Colors.textSecondary)
            )
            .foregroundColor(.white)
        }
        .disabled(!hasImage || isProcessing)
        .buttonStyle(PlainButtonStyle())
    }
}

struct AnalysisResultsView: View {
    let analysis: ImageAnalysis
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Analysis Results", systemImage: "chart.bar.doc.horizontal")
                .font(.headline)
                .foregroundColor(AppTheme.Colors.text)
            
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 8) {
                MetricCard(
                    icon: "target",
                    title: "Complexity",
                    value: analysis.complexity.displayName,
                    color: analysis.complexity.color
                )
                
                MetricCard(
                    icon: "scissors",
                    title: "Cut Paths",
                    value: "\(analysis.cutPaths)",
                    color: AppTheme.Colors.accent
                )
                
                MetricCard(
                    icon: "square.dashed",
                    title: "Cut Area",
                    value: "\(Int(analysis.cutAreaPercentage))%",
                    color: AppTheme.Colors.info
                )
                
                MetricCard(
                    icon: "clock",
                    title: "Est. Time",
                    value: "\(Int(analysis.estimatedMinutes))m",
                    color: AppTheme.Colors.success
                )
            }
        }
    }
}

struct MetricCard: View {
    let icon: String
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            
            Text(value)
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(AppTheme.Colors.text)
            
            Text(title)
                .font(.caption)
                .foregroundColor(AppTheme.Colors.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(AppTheme.Colors.background)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

struct BottomActionBar: View {
    let onExport: () -> Void
    
    var body: some View {
        HStack(spacing: 16) {
            Button("Preview Cuts") {
                // Handle cut preview
            }
            .buttonStyle(SecondaryButtonStyle())
            
            Button("Export SVG") {
                onExport()
            }
            .buttonStyle(PrimaryButtonStyle())
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(AppTheme.Colors.surface)
    }
}

// MARK: - Preview

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .preferredColorScheme(.dark)
    }
}