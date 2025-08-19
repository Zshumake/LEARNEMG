//
//  ImageProcessor.swift
//  Ultimate SVG Converter
//
//  Core image processing engine with AI features
//

import SwiftUI
import CoreImage
import CoreImage.CIFilterBuiltins
import UIKit
import Vision

@MainActor
class ImageProcessor: ObservableObject {
    // MARK: - Published Properties
    
    @Published var originalImage: UIImage?
    @Published var processedImage: UIImage?
    @Published var previewImage: UIImage?
    @Published var currentAnalysis: ImageAnalysis?
    @Published var isProcessing = false
    @Published var processingProgress: Double = 0
    @Published var statusMessage = "Ready"
    
    // MARK: - Private Properties
    
    private let ciContext = CIContext()
    private var contours: [CGPath] = []
    private let memoryManager = MemoryManager()
    
    // MARK: - Computed Properties
    
    var hasOriginalImage: Bool {
        originalImage != nil
    }
    
    var hasProcessedImage: Bool {
        processedImage != nil
    }
    
    var hasAnalysis: Bool {
        currentAnalysis != nil
    }
    
    // MARK: - Core Functions
    
    func loadImage(_ image: UIImage) async {
        statusMessage = "Loading image..."
        
        // Optimize image for memory constraints
        let optimizedImage = await memoryManager.optimizeImageForProcessing(image)
        
        originalImage = optimizedImage
        processedImage = nil
        previewImage = nil
        currentAnalysis = nil
        
        // Analyze image characteristics
        await analyzeImage(optimizedImage)
        
        statusMessage = "Image loaded successfully"
    }
    
    func processImage() async {
        guard let image = originalImage else {
            statusMessage = "No image loaded"
            return
        }
        
        isProcessing = true
        processingProgress = 0
        
        do {
            // Get current settings
            let settings = SettingsManager.shared
            
            // Step 1: Convert to grayscale
            statusMessage = "Converting to grayscale..."
            processingProgress = 0.1
            
            guard let grayscaleImage = await convertToGrayscale(image, settings: settings) else {
                throw ProcessingError.conversionFailed
            }
            
            // Step 2: Apply threshold
            statusMessage = "Applying threshold..."
            processingProgress = 0.3
            
            guard let binaryImage = await applyThreshold(grayscaleImage, threshold: settings.threshold) else {
                throw ProcessingError.thresholdFailed
            }
            
            // Step 3: Clean up with morphology
            statusMessage = "Cleaning edges..."
            processingProgress = 0.5
            
            let cleanedImage = await applyMorphology(binaryImage)
            
            // Step 4: Find contours
            statusMessage = "Finding cut paths..."
            processingProgress = 0.7
            
            contours = await findContours(cleanedImage, minArea: settings.minArea)
            
            // Step 5: Create preview with contours
            statusMessage = "Creating preview..."
            processingProgress = 0.9
            
            processedImage = await createContourPreview(cleanedImage, contours: contours)
            
            // Step 6: Analyze results
            await analyzeProcessingResults(cleanedImage, contours: contours)
            
            processingProgress = 1.0
            statusMessage = "Processing complete!"
            
        } catch {
            statusMessage = "Processing failed: \(error.localizedDescription)"
            print("Processing error: \(error)")
        }
        
        isProcessing = false
    }
    
    func updateLivePreview() async {
        guard let image = originalImage, !isProcessing else { return }
        
        let settings = SettingsManager.shared
        
        // Quick preview processing
        if let grayscale = await convertToGrayscale(image, settings: settings, quickPreview: true),
           let binary = await applyThreshold(grayscale, threshold: settings.threshold),
           let contours = await findContoursQuick(binary, minArea: settings.minArea) {
            
            previewImage = await createContourPreview(binary, contours: contours)
            
            // Quick analysis for live feedback
            let analysis = await calculateQuickAnalysis(contours, imageSize: binary.size)
            currentAnalysis = analysis
        }
    }
    
    func exportSVG() -> String? {
        guard !contours.isEmpty,
              let imageSize = processedImage?.size else {
            return nil
        }
        
        return SVGGenerator.generateSVG(from: contours, imageSize: imageSize)
    }
}

// MARK: - Private Processing Methods

private extension ImageProcessor {
    
    func analyzeImage(_ image: UIImage) async {
        // Analyze image characteristics for smart recommendations
        guard let ciImage = CIImage(image: image) else { return }
        
        // Basic metrics
        let size = image.size
        let aspectRatio = size.width / size.height
        
        // Edge detection for complexity
        let edges = ciImage.applyingFilter("CIEdges", parameters: [:])
        let edgeDensity = await calculateEdgeDensity(edges)
        
        // Face detection
        let faceCount = await detectFaces(in: image)
        
        // Determine content type
        let contentType = determineContentType(
            aspectRatio: aspectRatio,
            edgeDensity: edgeDensity,
            faceCount: faceCount
        )
        
        // Create initial analysis
        currentAnalysis = ImageAnalysis(
            dimensions: size,
            aspectRatio: aspectRatio,
            edgeDensity: edgeDensity,
            faceCount: faceCount,
            contentType: contentType,
            complexity: .medium,
            cutPaths: 0,
            cutAreaPercentage: 0,
            estimatedMinutes: 0
        )
    }
    
    func convertToGrayscale(_ image: UIImage, settings: SettingsManager, quickPreview: Bool = false) async -> UIImage? {
        guard let ciImage = CIImage(image: image) else { return nil }
        
        var processedImage = ciImage
        
        // Apply background removal if enabled (not in quick preview)
        if settings.removeBackground && !quickPreview {
            processedImage = await removeBackground(processedImage) ?? processedImage
        }
        
        // Apply face enhancement if enabled
        if settings.faceEnhancement {
            processedImage = await enhanceFaces(processedImage, original: image) ?? processedImage
        }
        
        // Convert to grayscale
        let grayscaleFilter = CIFilter.photoEffectMono()
        grayscaleFilter.inputImage = processedImage
        
        guard let outputImage = grayscaleFilter.outputImage else { return nil }
        
        // Apply blur if specified
        if settings.blurRadius > 0 {
            let blurFilter = CIFilter.gaussianBlur()
            blurFilter.inputImage = outputImage
            blurFilter.radius = Float(settings.blurRadius)
            
            if let blurredImage = blurFilter.outputImage {
                processedImage = blurredImage
            } else {
                processedImage = outputImage
            }
        } else {
            processedImage = outputImage
        }
        
        // Convert back to UIImage
        guard let cgImage = ciContext.createCGImage(processedImage, from: processedImage.extent) else {
            return nil
        }
        
        return UIImage(cgImage: cgImage)
    }
    
    func applyThreshold(_ image: UIImage, threshold: Double) async -> UIImage? {
        guard let ciImage = CIImage(image: image) else { return nil }
        
        // Convert threshold from 0-255 to 0-1 range
        let normalizedThreshold = threshold / 255.0
        
        // Apply color controls to create binary image
        let colorControls = CIFilter.colorControls()
        colorControls.inputImage = ciImage
        colorControls.brightness = Float(normalizedThreshold - 0.5) * 2
        colorControls.contrast = 10.0  // High contrast for binary effect
        
        guard let controlledImage = colorControls.outputImage else { return nil }
        
        // Apply posterize for clean binary result
        let posterize = CIFilter.colorPosterize()
        posterize.inputImage = controlledImage
        posterize.levels = 2  // Binary: black or white
        
        guard let posterizedImage = posterize.outputImage,
              let cgImage = ciContext.createCGImage(posterizedImage, from: posterizedImage.extent) else {
            return nil
        }
        
        return UIImage(cgImage: cgImage)
    }
    
    func applyMorphology(_ image: UIImage) async -> UIImage {
        // Simple morphological operations using Core Image
        guard let ciImage = CIImage(image: image) else { return image }
        
        // Apply morphological closing (fill small gaps)
        let dilate = CIFilter.morphologyMaximum()
        dilate.inputImage = ciImage
        dilate.radius = 2
        
        guard let dilated = dilate.outputImage else { return image }
        
        let erode = CIFilter.morphologyMinimum()
        erode.inputImage = dilated
        erode.radius = 2
        
        guard let morphed = erode.outputImage,
              let cgImage = ciContext.createCGImage(morphed, from: morphed.extent) else {
            return image
        }
        
        return UIImage(cgImage: cgImage)
    }
    
    func findContours(_ image: UIImage, minArea: Double) async -> [CGPath] {
        // Convert to Core Graphics for contour detection
        guard let cgImage = image.cgImage else { return [] }
        
        // This is a simplified contour detection
        // In a production app, you might want to use OpenCV or implement
        // more sophisticated contour detection
        
        return await detectShapes(in: cgImage, minArea: minArea)
    }
    
    func findContoursQuick(_ image: UIImage, minArea: Double) async -> [CGPath]? {
        // Faster contour detection for live preview
        guard let cgImage = image.cgImage else { return nil }
        
        return await detectShapes(in: cgImage, minArea: minArea, quickMode: true)
    }
    
    func createContourPreview(_ baseImage: UIImage, contours: [CGPath]) async -> UIImage? {
        let renderer = UIGraphicsImageRenderer(size: baseImage.size)
        
        return renderer.image { context in
            let cgContext = context.cgContext
            
            // Draw base image
            baseImage.draw(at: .zero)
            
            // Draw contours in green
            cgContext.setStrokeColor(UIColor.green.cgColor)
            cgContext.setLineWidth(2.0)
            
            for contour in contours {
                cgContext.addPath(contour)
                cgContext.strokePath()
            }
        }
    }
    
    func removeBackground(_ ciImage: CIImage) async -> CIImage? {
        // Simplified background removal using Core Image
        // In a production app, you might integrate with Vision framework
        // or use more sophisticated background removal techniques
        
        let backgroundFilter = CIFilter.subjectHighlighting()
        backgroundFilter.inputImage = ciImage
        
        return backgroundFilter.outputImage
    }
    
    func enhanceFaces(_ ciImage: CIImage, original: UIImage) async -> CIImage? {
        // Face enhancement using Vision framework
        let faces = await detectFaceRegions(in: original)
        
        guard !faces.isEmpty else { return ciImage }
        
        // Apply local histogram equalization to face regions
        var enhancedImage = ciImage
        
        for faceRect in faces {
            let faceImage = ciImage.cropped(to: faceRect)
            
            // Apply histogram equalization
            let equalizer = CIFilter.localHistogramEqualization()
            equalizer.inputImage = faceImage
            
            if let equalizedFace = equalizer.outputImage {
                // Composite enhanced face back into image
                let compositor = CIFilter.sourceOverCompositing()
                compositor.inputImage = equalizedFace
                compositor.backgroundImage = enhancedImage
                
                enhancedImage = compositor.outputImage ?? enhancedImage
            }
        }
        
        return enhancedImage
    }
    
    func detectFaces(in image: UIImage) async -> Int {
        return await withCheckedContinuation { continuation in
            let request = VNDetectFaceRectanglesRequest { request, error in
                let faceCount = request.results?.count ?? 0
                continuation.resume(returning: faceCount)
            }
            
            guard let cgImage = image.cgImage else {
                continuation.resume(returning: 0)
                return
            }
            
            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            try? handler.perform([request])
        }
    }
    
    func detectFaceRegions(in image: UIImage) async -> [CGRect] {
        return await withCheckedContinuation { continuation in
            let request = VNDetectFaceRectanglesRequest { request, error in
                let faces = request.results?.compactMap { result in
                    guard let faceResult = result as? VNFaceObservation else { return nil }
                    
                    // Convert normalized coordinates to image coordinates
                    let imageSize = image.size
                    return CGRect(
                        x: faceResult.boundingBox.origin.x * imageSize.width,
                        y: (1 - faceResult.boundingBox.origin.y - faceResult.boundingBox.height) * imageSize.height,
                        width: faceResult.boundingBox.width * imageSize.width,
                        height: faceResult.boundingBox.height * imageSize.height
                    )
                } ?? []
                
                continuation.resume(returning: faces)
            }
            
            guard let cgImage = image.cgImage else {
                continuation.resume(returning: [])
                return
            }
            
            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            try? handler.perform([request])
        }
    }
    
    func detectShapes(in cgImage: CGImage, minArea: Double, quickMode: Bool = false) async -> [CGPath] {
        // Simplified shape detection
        // In a production app, you would implement more sophisticated
        // contour detection algorithms
        
        let width = cgImage.width
        let height = cgImage.height
        
        // Create bitmap data
        guard let data = cgImage.dataProvider?.data,
              let bytes = CFDataGetBytePtr(data) else {
            return []
        }
        
        // Simple edge detection and path creation
        var paths: [CGPath] = []
        let stride = cgImage.bytesPerRow
        
        // Scan for white regions and create simple rectangular paths
        // This is a very basic implementation - in production you'd want
        // proper contour tracing algorithms
        
        let scanStep = quickMode ? 10 : 5
        
        for y in stride(from: 0, to: height - 20, by: scanStep) {
            for x in stride(from: 0, to: width - 20, by: scanStep) {
                let pixelIndex = y * stride + x * 4
                
                if pixelIndex < CFDataGetLength(data) - 4 {
                    let brightness = bytes[pixelIndex] // Red channel for grayscale
                    
                    if brightness > 200 { // White pixel threshold
                        // Create a small rectangular path
                        let path = CGMutablePath()
                        let rect = CGRect(
                            x: CGFloat(x),
                            y: CGFloat(y),
                            width: CGFloat(scanStep * 2),
                            height: CGFloat(scanStep * 2)
                        )
                        
                        if rect.width * rect.height >= minArea {
                            path.addRect(rect)
                            paths.append(path)
                        }
                    }
                }
            }
        }
        
        return paths
    }
    
    func calculateEdgeDensity(_ edgeImage: CIImage) async -> Double {
        // Calculate the density of edges in the image
        // This is a simplified implementation
        
        guard let cgImage = ciContext.createCGImage(edgeImage, from: edgeImage.extent) else {
            return 0.0
        }
        
        // Count non-zero pixels
        let width = cgImage.width
        let height = cgImage.height
        let totalPixels = width * height
        
        guard let data = cgImage.dataProvider?.data,
              let bytes = CFDataGetBytePtr(data) else {
            return 0.0
        }
        
        var edgePixels = 0
        let stride = cgImage.bytesPerRow
        
        for y in 0..<height {
            for x in 0..<width {
                let pixelIndex = y * stride + x * 4
                if pixelIndex < CFDataGetLength(data) {
                    let brightness = bytes[pixelIndex]
                    if brightness > 50 { // Edge threshold
                        edgePixels += 1
                    }
                }
            }
        }
        
        return Double(edgePixels) / Double(totalPixels)
    }
    
    func determineContentType(aspectRatio: Double, edgeDensity: Double, faceCount: Int) -> ContentType {
        if faceCount > 0 {
            return .portrait
        } else if aspectRatio > 1.5 && edgeDensity < 0.05 {
            return .landscape
        } else if edgeDensity > 0.15 {
            return .detailedArt
        } else if edgeDensity < 0.03 {
            return .simpleShapes
        } else {
            return .logoText
        }
    }
    
    func analyzeProcessingResults(_ image: UIImage, contours: [CGPath]) async {
        let cutPaths = contours.count
        let totalPoints = contours.reduce(0) { sum, path in
            return sum + estimatePathComplexity(path)
        }
        
        // Calculate complexity
        let complexity: ComplexityLevel
        if totalPoints < 200 {
            complexity = .simple
        } else if totalPoints < 800 {
            complexity = .medium
        } else {
            complexity = .complex
        }
        
        // Calculate cut area (simplified)
        let imageSize = image.size
        let totalArea = imageSize.width * imageSize.height
        let cutArea = contours.reduce(0.0) { sum, path in
            return sum + estimatePathArea(path)
        }
        let cutAreaPercentage = (cutArea / totalArea) * 100
        
        // Estimate cutting time
        let estimatedMinutes = Double(totalPoints) * 0.02 / 60 // 0.02 seconds per point
        
        // Update analysis
        currentAnalysis = ImageAnalysis(
            dimensions: imageSize,
            aspectRatio: imageSize.width / imageSize.height,
            edgeDensity: currentAnalysis?.edgeDensity ?? 0,
            faceCount: currentAnalysis?.faceCount ?? 0,
            contentType: currentAnalysis?.contentType ?? .portrait,
            complexity: complexity,
            cutPaths: cutPaths,
            cutAreaPercentage: cutAreaPercentage,
            estimatedMinutes: estimatedMinutes
        )
    }
    
    func calculateQuickAnalysis(_ contours: [CGPath], imageSize: CGSize) async -> ImageAnalysis {
        let cutPaths = contours.count
        let totalPoints = contours.reduce(0) { sum, path in
            return sum + estimatePathComplexity(path)
        }
        
        let complexity: ComplexityLevel
        if totalPoints < 200 {
            complexity = .simple
        } else if totalPoints < 800 {
            complexity = .medium
        } else {
            complexity = .complex
        }
        
        // Quick area estimation
        let totalArea = imageSize.width * imageSize.height
        let cutArea = contours.reduce(0.0) { sum, path in
            return sum + estimatePathArea(path)
        }
        let cutAreaPercentage = (cutArea / totalArea) * 100
        
        let estimatedMinutes = Double(totalPoints) * 0.02 / 60
        
        return ImageAnalysis(
            dimensions: imageSize,
            aspectRatio: imageSize.width / imageSize.height,
            edgeDensity: currentAnalysis?.edgeDensity ?? 0,
            faceCount: currentAnalysis?.faceCount ?? 0,
            contentType: currentAnalysis?.contentType ?? .portrait,
            complexity: complexity,
            cutPaths: cutPaths,
            cutAreaPercentage: cutAreaPercentage,
            estimatedMinutes: estimatedMinutes
        )
    }
    
    func estimatePathComplexity(_ path: CGPath) -> Int {
        // Estimate the number of points/complexity of a path
        var pointCount = 0
        
        path.applyWithBlock { element in
            switch element.pointee.type {
            case .moveToPoint, .addLineToPoint:
                pointCount += 1
            case .addQuadCurveToPoint:
                pointCount += 2
            case .addCurveToPoint:
                pointCount += 3
            case .closeSubpath:
                break
            @unknown default:
                break
            }
        }
        
        return pointCount
    }
    
    func estimatePathArea(_ path: CGPath) -> Double {
        // Estimate the area covered by a path
        let boundingBox = path.boundingBox
        return Double(boundingBox.width * boundingBox.height)
    }
}

// MARK: - Memory Manager

class MemoryManager {
    private let maxImageSize: CGFloat = 2048
    private let memoryWarningThreshold: Int = 100_000_000 // 100MB
    
    func optimizeImageForProcessing(_ image: UIImage) async -> UIImage {
        let currentSize = image.size
        let maxDimension = max(currentSize.width, currentSize.height)
        
        // Check if resizing is needed
        if maxDimension > maxImageSize {
            let scaleFactor = maxImageSize / maxDimension
            let newSize = CGSize(
                width: currentSize.width * scaleFactor,
                height: currentSize.height * scaleFactor
            )
            
            return await resizeImage(image, to: newSize) ?? image
        }
        
        return image
    }
    
    private func resizeImage(_ image: UIImage, to newSize: CGSize) async -> UIImage? {
        let renderer = UIGraphicsImageRenderer(size: newSize)
        
        return renderer.image { _ in
            image.draw(in: CGRect(origin: .zero, size: newSize))
        }
    }
    
    func checkMemoryPressure() -> Bool {
        let info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &count) {
            $0.withMemoryRebound(to: mach_msg_type_number_t.self, capacity: 1) { count in
                task_info(
                    mach_task_self_,
                    task_flavor_t(MACH_TASK_BASIC_INFO),
                    UnsafeMutablePointer<integer_t>.init(mutating: &info as! UnsafePointer<integer_t>),
                    count
                )
            }
        }
        
        if kerr == KERN_SUCCESS {
            let memoryUsed = Int(info.resident_size)
            return memoryUsed > memoryWarningThreshold
        }
        
        return false
    }
}

// MARK: - Error Types

enum ProcessingError: LocalizedError {
    case conversionFailed
    case thresholdFailed
    case contourDetectionFailed
    case exportFailed
    
    var errorDescription: String? {
        switch self {
        case .conversionFailed:
            return "Failed to convert image to grayscale"
        case .thresholdFailed:
            return "Failed to apply threshold to image"
        case .contourDetectionFailed:
            return "Failed to detect cutting paths"
        case .exportFailed:
            return "Failed to export SVG file"
        }
    }
}