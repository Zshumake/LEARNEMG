//
//  SupportingViews.swift
//  Ultimate SVG Converter
//
//  Supporting UI components and views
//

import SwiftUI
import PhotosUI

// MARK: - Image Preview View

struct ImagePreviewView: View {
    @ObservedObject var imageProcessor: ImageProcessor
    let onImagePickerTap: () -> Void
    var isCompact: Bool = false
    
    @State private var dragOffset = CGSize.zero
    @State private var isDragging = false
    
    var body: some View {
        ZStack {
            // Background
            RoundedRectangle(cornerRadius: 12)
                .fill(AppTheme.Colors.background)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(AppTheme.Colors.border, lineWidth: 1)
                )
            
            if let previewImage = imageProcessor.previewImage {
                // Live preview
                Image(uiImage: previewImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(
                        VStack {
                            HStack {
                                Spacer()
                                Label("Live Preview", systemImage: "eye.fill")
                                    .font(.caption)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(AppTheme.Colors.success)
                                    .foregroundColor(.white)
                                    .clipShape(Capsule())
                                    .padding(.top, 8)
                                    .padding(.trailing, 8)
                            }
                            Spacer()
                        }
                    )
            } else if let processedImage = imageProcessor.processedImage {
                // Processed image
                Image(uiImage: processedImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(
                        VStack {
                            HStack {
                                Spacer()
                                Label("Processed", systemImage: "checkmark.circle.fill")
                                    .font(.caption)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(AppTheme.Colors.accent)
                                    .foregroundColor(.white)
                                    .clipShape(Capsule())
                                    .padding(.top, 8)
                                    .padding(.trailing, 8)
                            }
                            Spacer()
                        }
                    )
            } else if let originalImage = imageProcessor.originalImage {
                // Original image
                Image(uiImage: originalImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(
                        VStack {
                            HStack {
                                Spacer()
                                Label("Original", systemImage: "photo")
                                    .font(.caption)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(AppTheme.Colors.info)
                                    .foregroundColor(.white)
                                    .clipShape(Capsule())
                                    .padding(.top, 8)
                                    .padding(.trailing, 8)
                            }
                            Spacer()
                        }
                    )
            } else {
                // Placeholder
                Button(action: onImagePickerTap) {
                    VStack(spacing: 12) {
                        Image(systemName: "photo.badge.plus")
                            .font(.system(size: isCompact ? 40 : 60))
                            .foregroundColor(AppTheme.Colors.accent)
                        
                        VStack(spacing: 4) {
                            Text(isCompact ? "Tap to Add Image" : "Tap to Select Image")
                                .font(isCompact ? .headline : .title2)
                                .fontWeight(.medium)
                                .foregroundColor(AppTheme.Colors.text)
                            
                            Text("Choose from Photos")
                                .font(.subheadline)
                                .foregroundColor(AppTheme.Colors.textSecondary)
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .buttonStyle(PlainButtonStyle())
            }
            
            // Processing overlay
            if imageProcessor.isProcessing {
                ProcessingOverlay(
                    progress: imageProcessor.processingProgress,
                    status: imageProcessor.statusMessage
                )
            }
        }
        .onTapGesture {
            if imageProcessor.originalImage != nil {
                onImagePickerTap()
            }
        }
        .gesture(
            DragGesture()
                .onChanged { value in
                    if !imageProcessor.isProcessing && imageProcessor.originalImage != nil {
                        dragOffset = value.translation
                        isDragging = true
                        
                        // Drag-to-adjust parameters (like radiology software)
                        let horizontalSensitivity: Double = 100
                        let verticalSensitivity: Double = 50
                        
                        let thresholdDelta = value.translation.x / horizontalSensitivity
                        let blurDelta = -value.translation.y / verticalSensitivity
                        
                        let settingsManager = SettingsManager.shared
                        settingsManager.threshold = max(0, min(255, 128 + thresholdDelta))
                        settingsManager.blurRadius = max(0, min(10, 2 + blurDelta))
                        
                        // Provide haptic feedback
                        if abs(thresholdDelta) > 5 || abs(blurDelta) > 1 {
                            let impact = UIImpactFeedbackGenerator(style: .light)
                            impact.impactOccurred()
                        }
                    }
                }
                .onEnded { _ in
                    dragOffset = .zero
                    isDragging = false
                }
        )
        .overlay(
            // Drag indicators
            isDragging ? DragIndicators() : nil
        )
    }
}

// MARK: - Processing Overlay

struct ProcessingOverlay: View {
    let progress: Double
    let status: String
    
    var body: some View {
        ZStack {
            // Background
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.black.opacity(0.7))
            
            VStack(spacing: 16) {
                // Progress circle
                ZStack {
                    Circle()
                        .stroke(Color.white.opacity(0.3), lineWidth: 4)
                        .frame(width: 60, height: 60)
                    
                    Circle()
                        .trim(from: 0, to: progress)
                        .stroke(AppTheme.Colors.accent, style: .init(lineWidth: 4, lineCap: .round))
                        .frame(width: 60, height: 60)
                        .rotationEffect(.degrees(-90))
                        .animation(.easeInOut, value: progress)
                    
                    Text("\(Int(progress * 100))%")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                }
                
                // Status message
                Text(status)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
            }
            .padding()
        }
    }
}

// MARK: - Drag Indicators

struct DragIndicators: View {
    var body: some View {
        VStack {
            HStack {
                // Left indicator
                VStack(spacing: 4) {
                    Image(systemName: "arrow.left")
                        .font(.caption)
                    Text("Darker")
                        .font(.caption2)
                        .fontWeight(.medium)
                }
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.black.opacity(0.7))
                .clipShape(RoundedRectangle(cornerRadius: 6))
                .padding(.leading, 16)
                
                Spacer()
                
                // Right indicator
                VStack(spacing: 4) {
                    Image(systemName: "arrow.right")
                        .font(.caption)
                    Text("Lighter")
                        .font(.caption2)
                        .fontWeight(.medium)
                }
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.black.opacity(0.7))
                .clipShape(RoundedRectangle(cornerRadius: 6))
                .padding(.trailing, 16)
            }
            .padding(.top, 16)
            
            Spacer()
            
            HStack {
                Spacer()
                
                // Vertical indicators
                VStack(spacing: 16) {
                    // Up indicator
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.up")
                            .font(.caption)
                        Text("Less Blur")
                            .font(.caption2)
                            .fontWeight(.medium)
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.black.opacity(0.7))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                    
                    // Down indicator
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.down")
                            .font(.caption)
                        Text("More Blur")
                            .font(.caption2)
                            .fontWeight(.medium)
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.black.opacity(0.7))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                }
                .padding(.trailing, 16)
            }
            .padding(.bottom, 16)
        }
    }
}

// MARK: - Image Picker

struct ImagePicker: UIViewControllerRepresentable {
    let onImagePicked: (UIImage) -> Void
    
    func makeUIViewController(context: Context) -> PHPickerViewController {
        var configuration = PHPickerConfiguration()
        configuration.filter = .images
        configuration.selectionLimit = 1
        
        let picker = PHPickerViewController(configuration: configuration)
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: PHPickerViewController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, PHPickerViewControllerDelegate {
        let parent: ImagePicker
        
        init(_ parent: ImagePicker) {
            self.parent = parent
        }
        
        func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
            picker.dismiss(animated: true)
            
            guard let result = results.first else { return }
            
            result.itemProvider.loadObject(ofClass: UIImage.self) { object, error in
                if let image = object as? UIImage {
                    DispatchQueue.main.async {
                        self.parent.onImagePicked(image)
                    }
                }
            }
        }
    }
}

// MARK: - Export View

struct ExportView: View {
    @ObservedObject var imageProcessor: ImageProcessor
    @State private var fileName = ""
    @State private var isExporting = false
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Header
                VStack(spacing: 8) {
                    Image(systemName: "square.and.arrow.up")
                        .font(.system(size: 40))
                        .foregroundColor(AppTheme.Colors.accent)
                    
                    Text("Export SVG")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(AppTheme.Colors.text)
                    
                    Text("Save your cutting file")
                        .font(.subheadline)
                        .foregroundColor(AppTheme.Colors.textSecondary)
                }
                .padding(.top)
                
                // File name input
                VStack(alignment: .leading, spacing: 8) {
                    Text("File Name")
                        .font(.headline)
                        .foregroundColor(AppTheme.Colors.text)
                    
                    TextField("Enter file name", text: $fileName)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .onAppear {
                            if fileName.isEmpty {
                                let formatter = DateFormatter()
                                formatter.dateFormat = "yyyy-MM-dd_HH-mm-ss"
                                fileName = "SVG_\(formatter.string(from: Date()))"
                            }
                        }
                }
                
                // Export options
                VStack(alignment: .leading, spacing: 12) {
                    Text("Export Options")
                        .font(.headline)
                        .foregroundColor(AppTheme.Colors.text)
                    
                    SettingRow(
                        icon: "gearshape.2",
                        title: "Optimize for Cricut",
                        subtitle: "Best compatibility with Cricut Design Space"
                    ) {
                        Toggle("", isOn: .constant(true))
                            .labelsHidden()
                            .disabled(true)
                    }
                    
                    SettingRow(
                        icon: "doc.text",
                        title: "Include Metadata",
                        subtitle: "Add processing info to SVG file"
                    ) {
                        Toggle("", isOn: .constant(true))
                            .labelsHidden()
                            .disabled(true)
                    }
                }
                
                // Analysis summary
                if let analysis = imageProcessor.currentAnalysis {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Cut Summary")
                            .font(.headline)
                            .foregroundColor(AppTheme.Colors.text)
                        
                        VStack(spacing: 8) {
                            HStack {
                                Text("Complexity:")
                                    .foregroundColor(AppTheme.Colors.textSecondary)
                                Spacer()
                                Label(analysis.complexity.displayName, systemImage: analysis.complexity.icon)
                                    .foregroundColor(analysis.complexity.color)
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                            }
                            
                            HStack {
                                Text("Cut Paths:")
                                    .foregroundColor(AppTheme.Colors.textSecondary)
                                Spacer()
                                Text("\(analysis.cutPaths)")
                                    .fontWeight(.medium)
                                    .foregroundColor(AppTheme.Colors.text)
                            }
                            
                            HStack {
                                Text("Estimated Time:")
                                    .foregroundColor(AppTheme.Colors.textSecondary)
                                Spacer()
                                Text("\(Int(analysis.estimatedMinutes)) minutes")
                                    .fontWeight(.medium)
                                    .foregroundColor(AppTheme.Colors.text)
                            }
                        }
                        .padding()
                        .background(AppTheme.Colors.background)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    }
                }
                
                Spacer()
                
                // Export button
                Button(action: exportSVG) {
                    HStack(spacing: 8) {
                        if isExporting {
                            ProgressView()
                                .scaleEffect(0.8)
                                .tint(.white)
                        } else {
                            Image(systemName: "square.and.arrow.up")
                                .font(.headline)
                        }
                        
                        Text(isExporting ? "Exporting..." : "Export SVG")
                            .font(.headline)
                            .fontWeight(.bold)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(!fileName.isEmpty && !isExporting ? AppTheme.Colors.accent : AppTheme.Colors.textSecondary)
                    )
                    .foregroundColor(.white)
                }
                .disabled(fileName.isEmpty || isExporting)
                .buttonStyle(PlainButtonStyle())
            }
            .padding()
            .navigationBarTitleDisplayMode(.inline)
            .navigationBarItems(
                leading: Button("Cancel") {
                    presentationMode.wrappedValue.dismiss()
                },
                trailing: EmptyView()
            )
        }
        .accentColor(AppTheme.Colors.accent)
    }
    
    private func exportSVG() {
        guard !fileName.isEmpty else { return }
        
        isExporting = true
        
        Task {
            if let svgContent = imageProcessor.exportSVG() {
                // Create document for sharing
                let tempURL = FileManager.default.temporaryDirectory
                    .appendingPathComponent("\(fileName).svg")
                
                do {
                    try svgContent.write(to: tempURL, atomically: true, encoding: .utf8)
                    
                    await MainActor.run {
                        // Share the file
                        let activityViewController = UIActivityViewController(
                            activityItems: [tempURL],
                            applicationActivities: nil
                        )
                        
                        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                           let rootViewController = windowScene.windows.first?.rootViewController {
                            rootViewController.present(activityViewController, animated: true)
                        }
                        
                        isExporting = false
                        
                        // Provide success feedback
                        let notification = UINotificationFeedbackGenerator()
                        notification.notificationOccurred(.success)
                        
                        // Close the export view
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                            presentationMode.wrappedValue.dismiss()
                        }
                    }
                } catch {
                    await MainActor.run {
                        isExporting = false
                        // Handle error
                        print("Export failed: \(error)")
                    }
                }
            } else {
                await MainActor.run {
                    isExporting = false
                    // Handle no content error
                }
            }
        }
    }
}

// MARK: - Settings View

struct SettingsView: View {
    @ObservedObject var settingsManager: SettingsManager
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            List {
                Section("Processing Defaults") {
                    Picker("Default Preset", selection: .constant(PresetType.portrait)) {
                        ForEach(PresetType.allCases, id: \.self) { preset in
                            Text(preset.displayName).tag(preset)
                        }
                    }
                    
                    Picker("Default Material", selection: .constant(MaterialType.cardstock)) {
                        ForEach(MaterialType.allCases, id: \.self) { material in
                            Text(material.displayName).tag(material)
                        }
                    }
                }
                
                Section("Behavior") {
                    Toggle("Auto Process Images", isOn: $settingsManager.autoProcess)
                    Toggle("Live Preview", isOn: $settingsManager.livePreview)
                    Toggle("Auto Optimize", isOn: $settingsManager.autoOptimize)
                }
                
                Section("Actions") {
                    Button("Reset All Settings") {
                        settingsManager.resetToDefaults()
                    }
                    .foregroundColor(AppTheme.Colors.error)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .navigationBarItems(trailing: Button("Done") {
                presentationMode.wrappedValue.dismiss()
            })
        }
    }
}

// MARK: - Onboarding View

struct OnboardingView: View {
    @Binding var isPresented: Bool
    @State private var currentPage = 0
    
    private let pages = OnboardingPage.allPages
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Page indicator
                HStack(spacing: 8) {
                    ForEach(0..<pages.count, id: \.self) { index in
                        Circle()
                            .fill(index == currentPage ? AppTheme.Colors.accent : AppTheme.Colors.textSecondary)
                            .frame(width: 8, height: 8)
                    }
                }
                .padding(.top)
                
                // Page content
                TabView(selection: $currentPage) {
                    ForEach(Array(pages.enumerated()), id: \.offset) { index, page in
                        OnboardingPageView(page: page)
                            .tag(index)
                    }
                }
                .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
                
                // Navigation buttons
                HStack(spacing: 20) {
                    if currentPage > 0 {
                        Button("Previous") {
                            withAnimation {
                                currentPage -= 1
                            }
                        }
                        .buttonStyle(SecondaryButtonStyle())
                    } else {
                        Spacer()
                    }
                    
                    Button(currentPage == pages.count - 1 ? "Get Started" : "Next") {
                        if currentPage == pages.count - 1 {
                            isPresented = false
                        } else {
                            withAnimation {
                                currentPage += 1
                            }
                        }
                    }
                    .buttonStyle(PrimaryButtonStyle())
                }
                .padding(.bottom)
            }
            .padding(.horizontal)
            .navigationBarItems(trailing: Button("Skip") {
                isPresented = false
            })
        }
    }
}

struct OnboardingPageView: View {
    let page: OnboardingPage
    
    var body: some View {
        VStack(spacing: 24) {
            // Icon
            Image(systemName: page.icon)
                .font(.system(size: 80))
                .foregroundColor(AppTheme.Colors.accent)
            
            // Content
            VStack(spacing: 12) {
                Text(page.title)
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(AppTheme.Colors.text)
                    .multilineTextAlignment(.center)
                
                Text(page.description)
                    .font(.body)
                    .foregroundColor(AppTheme.Colors.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(nil)
            }
            
            Spacer()
        }
        .padding(.vertical)
    }
}

struct OnboardingPage {
    let icon: String
    let title: String
    let description: String
    
    static let allPages = [
        OnboardingPage(
            icon: "scissors",
            title: "Welcome to Ultimate SVG Converter",
            description: "Transform any photo into professional cutting files for your Cricut machine with AI-powered processing."
        ),
        OnboardingPage(
            icon: "brain.head.profile",
            title: "AI-Powered Intelligence",
            description: "Automatic face detection, background removal, and smart preset recommendations make perfect cuts effortless."
        ),
        OnboardingPage(
            icon: "wand.and.stars",
            title: "Smart Presets",
            description: "Choose from Portrait, Landscape, Logo/Text, and more. Each preset is optimized for different types of images."
        ),
        OnboardingPage(
            icon: "square.stack.3d.up",
            title: "Material Optimization",
            description: "Select your cutting material and we'll automatically optimize settings for vinyl, cardstock, fabric, and more."
        ),
        OnboardingPage(
            icon: "eye.fill",
            title: "Live Preview",
            description: "See your changes instantly with real-time preview. Drag on the image to quickly adjust brightness and blur."
        ),
        OnboardingPage(
            icon: "square.and.arrow.up",
            title: "Export & Share",
            description: "Export professional SVG files ready for Cricut Design Space. Share directly to your favorite apps."
        )
    ]
}

// MARK: - Button Styles

struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(maxWidth: .infinity)
            .frame(height: 44)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(configuration.isPressed ? AppTheme.Colors.accent.opacity(0.8) : AppTheme.Colors.accent)
            )
            .foregroundColor(.white)
            .font(.headline)
            .fontWeight(.semibold)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(maxWidth: .infinity)
            .frame(height: 44)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(AppTheme.Colors.accent, lineWidth: 2)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(configuration.isPressed ? AppTheme.Colors.accent.opacity(0.1) : Color.clear)
                    )
            )
            .foregroundColor(AppTheme.Colors.accent)
            .font(.headline)
            .fontWeight(.semibold)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}