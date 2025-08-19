// ContentView.swift - Main Interface
import SwiftUI
import CoreImage
import CoreImage.CIFilterBuiltins
import Vision
import UniformTypeIdentifiers

struct ContentView: View {
    @StateObject private var processor = ImageProcessor()
    @State private var showingImagePicker = false
    @State private var showingDrawingMode = false
    @State private var threshold: Float = 128
    @State private var blurRadius: Float = 2
    @State private var backgroundRemovalEnabled = false
    @State private var showingAlert = false
    @State private var alertMessage = ""
    @State private var showingError = false
    @State private var currentError: CricutError?
    @State private var isBeginnerMode = true
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Header
                headerView
                
                // Main Image View with Adaptive Scaling
                imagePreviewSection
                
                // Controls Panel
                controlsPanel
            }
            .background(Color(.systemBackground))
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .sheet(isPresented: $showingImagePicker) {
            ImagePicker(image: $processor.originalImage)
        }
        .fullScreenCover(isPresented: $showingDrawingMode) {
            DrawingCanvasView(
                processor: processor,
                brushSize: 10,
                isPresented: $showingDrawingMode
            )
        }
        .alert("Cricut Converter", isPresented: $showingAlert) {
            Button("OK") { }
        } message: {
            Text(alertMessage)
        }
        .sheet(isPresented: $showingError) {
            if let error = currentError {
                ErrorRecoveryView(
                    error: error,
                    onRetry: {
                        showingError = false
                        handleErrorRecovery(error)
                    },
                    onHelp: {
                        showingError = false
                        showHelpForError(error)
                    },
                    onDismiss: {
                        showingError = false
                        currentError = nil
                    }
                )
            }
        }
        .onChange(of: processor.originalImage) { _ in
            if processor.originalImage != nil {
                processor.updateProcessing(threshold: threshold, blur: blurRadius)
            }
        }
        .onAppear {
            processor.onAlert = { message in
                alertMessage = message
                showingAlert = true
            }
            processor.onError = { error in
                currentError = error
                showingError = true
            }
        }
    }
    
    private var headerView: some View {
        VStack(spacing: 8) {
            HStack {
                VStack(alignment: .leading) {
                    Text("✂️ Cricut SVG Converter")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("Professional cutting file creator")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Button(action: { showingImagePicker = true }) {
                    Image(systemName: "photo.on.rectangle.angled")
                        .font(.title2)
                        .foregroundColor(.blue)
                }
            }
            
            if processor.originalImage != nil {
                Text("Pinch to zoom • Double-tap to toggle • Drag to adjust when zoomed out")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .padding(.top, 4)
            }
        }
        .padding()
        .background(Color(.systemGray6))
    }
    
    private var imagePreviewSection: some View {
        GeometryReader { geometry in
            if processor.originalImage != nil {
                // NEW: Adaptive Image View with Zoom Controls
                AdaptiveImageView(
                    image: processor.displayImage,
                    threshold: $threshold,
                    blurRadius: $blurRadius,
                    onParameterChange: { newThreshold, newBlur in
                        threshold = newThreshold
                        blurRadius = newBlur
                        processor.updateProcessing(threshold: threshold, blur: blurRadius)
                    }
                )
                .background(Color.black)
                .cornerRadius(8)
                .padding()
            } else {
                // Placeholder view
                VStack(spacing: 20) {
                    Image(systemName: "photo.badge.plus")
                        .font(.system(size: 60))
                        .foregroundColor(.gray)
                    
                    Text("Tap the photo button above\nto select an image")
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                    
                    Button("Select Image") {
                        showingImagePicker = true
                    }
                    .foregroundColor(.blue)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .frame(maxHeight: 400)
    }
    
    private var controlsPanel: some View {
        ScrollView {
            VStack(spacing: 20) {
                if processor.originalImage != nil {
                    if isBeginnerMode {
                        beginnerControlsPanel
                    } else {
                        advancedControlsPanel
                    }
                    
                    // Mode Toggle
                    HStack {
                        Spacer()
                        Button(isBeginnerMode ? "Show Advanced" : "Show Simple") {
                            withAnimation {
                                isBeginnerMode.toggle()
                            }
                        }
                        .foregroundColor(.blue)
                        .font(.caption)
                    }
                    .padding(.horizontal)
                }
            }
            .padding()
        }
        .background(Color(.systemGray6))
    }
    
    private var beginnerControlsPanel: some View {
        VStack(spacing: 20) {
            // One-touch processing
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Image(systemName: "wand.and.stars")
                        .foregroundColor(.purple)
                    Text("Quick Processing")
                        .font(.headline)
                }
                
                Button("✨ Auto-Process Image") {
                    processor.autoProcessImage()
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.purple)
                .foregroundColor(.white)
                .cornerRadius(12)
                
                Text("Automatically detects and applies the best settings for your image")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(12)
            
            // Background removal (simplified)
            backgroundRemovalSection
            
            // Export
            exportSection
        }
    }
    
    private var advancedControlsPanel: some View {
        VStack(spacing: 20) {
            // Background Removal
            backgroundRemovalSection
            
            // Parameter Controls
            parameterControlsSection
            
            // Drawing Tools
            drawingToolsSection
            
            // Export Section
            exportSection
        }
    }
    
    private var backgroundRemovalSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "scissors")
                    .foregroundColor(.purple)
                Text("Background Removal")
                    .font(.headline)
            }
            
            Toggle("Remove Background", isOn: $backgroundRemovalEnabled)
                .onChange(of: backgroundRemovalEnabled) { enabled in
                    processor.toggleBackgroundRemoval(enabled: enabled)
                    processor.updateProcessing(threshold: threshold, blur: blurRadius)
                }
            
            Text("AI-powered background removal for clean silhouettes")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
    }
    
    private var parameterControlsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "slider.horizontal.3")
                    .foregroundColor(.blue)
                Text("Processing Controls")
                    .font(.headline)
            }
            
            VStack(spacing: 16) {
                VStack {
                    HStack {
                        Text("Threshold")
                        Spacer()
                        Text("\(Int(threshold))")
                            .foregroundColor(.blue)
                            .fontWeight(.semibold)
                    }
                    
                    Slider(value: $threshold, in: 0...255, step: 1)
                        .onChange(of: threshold) { _ in
                            processor.updateProcessing(threshold: threshold, blur: blurRadius)
                        }
                    
                    Text("Controls black/white separation")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                VStack {
                    HStack {
                        Text("Blur Radius")
                        Spacer()
                        Text("\(Int(blurRadius))")
                            .foregroundColor(.blue)
                            .fontWeight(.semibold)
                    }
                    
                    Slider(value: $blurRadius, in: 0...10, step: 1)
                        .onChange(of: blurRadius) { _ in
                            processor.updateProcessing(threshold: threshold, blur: blurRadius)
                        }
                    
                    Text("Smooths image before processing")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
    }
    
    private var drawingToolsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "paintbrush.pointed")
                    .foregroundColor(.green)
                Text("Cleanup Tools")
                    .font(.headline)
            }
            
            VStack(spacing: 12) {
                Button(action: { showingDrawingMode = true }) {
                    HStack {
                        Image(systemName: "pencil.tip.crop.circle")
                        Text("Manual Cleanup")
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .foregroundColor(.primary)
                }
                
                Button(action: { processor.autoRemoveSmallDots() }) {
                    HStack {
                        Image(systemName: "wand.and.stars")
                        Text("Auto-Remove Small Dots")
                        Spacer()
                    }
                    .foregroundColor(.purple)
                }
            }
            
            Text("Remove unwanted dots and refine cut lines")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
    }
    
    private var exportSection: some View {
        VStack(spacing: 12) {
            Button(action: { processor.exportSVG() }) {
                HStack {
                    Image(systemName: "square.and.arrow.up")
                    Text("Export SVG for Cricut")
                    Spacer()
                }
                .foregroundColor(.white)
                .padding()
                .background(Color.blue)
                .cornerRadius(12)
            }
            .disabled(processor.processedImage == nil)
            
            if processor.processedImage != nil {
                Text("Ready to export! Your design will be saved as an SVG file.")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
    }
    
    // Error Recovery Methods
    private func handleErrorRecovery(_ error: CricutError) {
        switch error {
        case .memoryPressure:
            if processor.originalImage != nil {
                processor.updateProcessing(threshold: threshold, blur: blurRadius)
            }
        case .imageProcessingFailed:
            threshold = 128
            blurRadius = 2
            processor.updateProcessing(threshold: threshold, blur: blurRadius)
        case .fileAccessDenied:
            if let settingsUrl = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(settingsUrl)
            }
        default:
            break
        }
    }
    
    private func showHelpForError(_ error: CricutError) {
        switch error {
        case .memoryPressure:
            alertMessage = "The app automatically resizes large images. Your image has been optimized for better performance."
        case .invalidImageFormat:
            alertMessage = "Supported formats: JPEG, PNG, HEIC. Try converting your image to one of these formats."
        case .fileAccessDenied:
            alertMessage = "Go to Settings > Privacy & Security > Photos and enable access for Cricut Converter."
        default:
            alertMessage = "If this problem continues, try restarting the app or using a different image."
        }
        showingAlert = true
    }
}

// MARK: - Drawing Canvas Placeholder
struct DrawingCanvasView: View {
    @ObservedObject var processor: ImageProcessor
    let brushSize: CGFloat
    @Binding var isPresented: Bool
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Drawing Canvas")
                    .font(.title)
                    .padding()
                
                Text("Drawing tools will be implemented here")
                    .foregroundColor(.secondary)
                
                Spacer()
                
                Button("Done") {
                    isPresented = false
                }
                .padding()
            }
            .navigationTitle("Drawing Tools")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        isPresented = false
                    }
                }
            }
        }
    }
}
