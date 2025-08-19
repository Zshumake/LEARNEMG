// ImageProcessor.swift - Core Processing Engine
import Foundation
import UIKit
import CoreImage
import Vision
import UniformTypeIdentifiers

// MARK: - Memory Management
class MemoryManager {
    static let shared = MemoryManager()
    
    private let maxImageDimension: CGFloat = 1500
    private let memoryThresholdMB: Double = 100
    
    func optimizeImageForProcessing(_ image: UIImage) -> UIImage {
        let memoryUsage = getMemoryUsageMB()
        
        if memoryUsage > memoryThresholdMB {
            Logger.shared.log("High memory usage: \(memoryUsage)MB - resizing aggressively", level: .warning)
            return resizeImageAggressively(image)
        }
        
        return resizeImageIfNeeded(image)
    }
    
    private func resizeImageIfNeeded(_ image: UIImage) -> UIImage {
        let size = image.size
        let maxDimension = max(size.width, size.height)
        
        if maxDimension <= maxImageDimension {
            return image
        }
        
        let scale = maxImageDimension / maxDimension
        let newSize = CGSize(width: size.width * scale, height: size.height * scale)
        
        return resizeImage(image, to: newSize) ?? image
    }
    
    private func resizeImageAggressively(_ image: UIImage) -> UIImage {
        let aggressiveMaxDimension: CGFloat = 800
        let size = image.size
        let maxDimension = max(size.width, size.height)
        
        let scale = aggressiveMaxDimension / maxDimension
        let newSize = CGSize(width: size.width * scale, height: size.height * scale)
        
        return resizeImage(image, to: newSize) ?? image
    }
    
    private func resizeImage(_ image: UIImage, to newSize: CGSize) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        defer { UIGraphicsEndImageContext() }
        
        image.draw(in: CGRect(origin: .zero, size: newSize))
        return UIGraphicsGetImageFromCurrentImageContext()
    }
    
    func getMemoryUsageMB() -> Double {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        
        if kerr == KERN_SUCCESS {
            return Double(info.resident_size) / 1024.0 / 1024.0
        }
        return 0
    }
}

// MARK: - Error Types
enum CricutError: LocalizedError {
    case imageProcessingFailed(reason: String)
    case memoryPressure
    case invalidImageFormat
    case exportFailed(reason: String)
    case fileAccessDenied
    
    var errorDescription: String? {
        switch self {
        case .imageProcessingFailed(let reason):
            return "Processing failed: \(reason)"
        case .memoryPressure:
            return "Image too large for processing"
        case .invalidImageFormat:
            return "Unsupported image format"
        case .exportFailed(let reason):
            return "Export failed: \(reason)"
        case .fileAccessDenied:
            return "Cannot access photo library"
        }
    }
    
    var recoverySuggestion: String? {
        switch self {
        case .imageProcessingFailed:
            return "Try adjusting the threshold or blur settings"
        case .memoryPressure:
            return "The image will be automatically resized for better performance"
        case .invalidImageFormat:
            return "Try using a JPG or PNG image"
        case .exportFailed:
            return "Check available storage and try again"
        case .fileAccessDenied:
            return "Grant photo access in Settings > Privacy"
        }
    }
}

// MARK: - Logging System
class Logger {
    static let shared = Logger()
    
    private let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm:ss"
        return formatter
    }()
    
    func log(_ message: String, level: LogLevel = .info) {
        let timestamp = dateFormatter.string(from: Date())
        print("[\(timestamp)] [\(level.rawValue)] \(message)")
    }
    
    enum LogLevel: String {
        case debug = "DEBUG"
        case info = "INFO"
        case warning = "WARN"
        case error = "ERROR"
    }
}

// MARK: - Image Processor
class ImageProcessor: ObservableObject {
    @Published var originalImage: UIImage?
    @Published var processedImage: UIImage?
    @Published var displayImage: UIImage?
    @Published var contours: [ContourPath] = []
    @Published var isProcessing = false
    
    var onAlert: ((String) -> Void)?
    var onError: ((CricutError) -> Void)?
    
    private let context = CIContext()
    private var backgroundRemovalEnabled = false
    private var currentThreshold: Float = 128
    private var currentBlur: Float = 2
    
    struct ContourPath {
        let path: UIBezierPath
        let area: CGFloat
    }
    
    func updateProcessing(threshold: Float, blur: Float) {
        guard let original = originalImage else { return }
        
        let optimizedImage = MemoryManager.shared.optimizeImageForProcessing(original)
        
        currentThreshold = threshold
        currentBlur = blur
        isProcessing = true
        
        DispatchQueue.global(qos: .userInitiated).async {
            do {
                let processed = try self.processImageSafely(optimizedImage, threshold: threshold, blur: blur)
                let contours = self.findContours(in: processed)
                
                DispatchQueue.main.async {
                    self.processedImage = processed
                    self.displayImage = self.createDisplayImage(processed, contours: contours)
                    self.contours = contours
                    self.isProcessing = false
                }
            } catch {
                DispatchQueue.main.async {
                    self.isProcessing = false
                    self.onAlert?("Processing failed: \(error.localizedDescription)")
                }
            }
        }
    }
    
    private func processImageSafely(_ image: UIImage, threshold: Float, blur: Float) throws -> UIImage {
        let memoryUsage = MemoryManager.shared.getMemoryUsageMB()
        if memoryUsage > 150 {
            throw CricutError.memoryPressure
        }
        
        return processImage(image, threshold: threshold, blur: blur)
    }
    
    private func processImage(_ image: UIImage, threshold: Float, blur: Float) -> UIImage {
        guard let ciImage = CIImage(image: image) else { return image }
        
        var workingImage = ciImage
        
        if backgroundRemovalEnabled {
            workingImage = removeBackground(from: workingImage) ?? workingImage
        }
        
        let grayscaleFilter = CIFilter.photoEffectMono()
        grayscaleFilter.inputImage = workingImage
        workingImage = grayscaleFilter.outputImage ?? workingImage
        
        if blur > 0 {
            let blurFilter = CIFilter.gaussianBlur()
            blurFilter.inputImage = workingImage
            blurFilter.radius = blur
            workingImage = blurFilter.outputImage ?? workingImage
        }
        
        let thresholdFilter = CIFilter.colorControls()
        thresholdFilter.inputImage = workingImage
        thresholdFilter.brightness = (threshold - 128) / 255.0 * 2
        thresholdFilter.contrast = 50.0
        workingImage = thresholdFilter.outputImage ?? workingImage
        
        let posterizeFilter = CIFilter.colorPosterize()
        posterizeFilter.inputImage = workingImage
        posterizeFilter.levels = 2
        workingImage = posterizeFilter.outputImage ?? workingImage
        
        guard let cgImage = context.createCGImage(workingImage, from: workingImage.extent) else {
            return image
        }
        
        return UIImage(cgImage: cgImage)
    }
    
    func toggleBackgroundRemoval(enabled: Bool) {
        backgroundRemovalEnabled = enabled
    }
    
    private func removeBackground(from image: CIImage) -> CIImage? {
        let backgroundFilter = CIFilter.colorControls()
        backgroundFilter.inputImage = image
        backgroundFilter.brightness = 0.2
        backgroundFilter.contrast = 1.5
        
        return backgroundFilter.outputImage
    }
    
    private func findContours(in image: UIImage) -> [ContourPath] {
        guard let cgImage = image.cgImage else { return [] }
        
        let width = cgImage.width
        let height = cgImage.height
        
        var contours: [ContourPath] = []
        
        let rect1 = CGRect(x: width/4, y: height/4, width: width/2, height: height/2)
        let path1 = UIBezierPath(rect: rect1)
        contours.append(ContourPath(path: path1, area: rect1.width * rect1.height))
        
        return contours
    }
    
    private func createDisplayImage(_ processed: UIImage, contours: [ContourPath]) -> UIImage {
        UIGraphicsBeginImageContextWithOptions(processed.size, false, processed.scale)
        defer { UIGraphicsEndImageContext() }
        
        processed.draw(at: .zero)
        
        UIColor.green.setStroke()
        for contour in contours {
            contour.path.lineWidth = 2.0
            contour.path.stroke()
        }
        
        return UIGraphicsGetImageFromCurrentImageContext() ?? processed
    }
    
    func autoProcessImage() {
        guard let original = originalImage else { return }
        
        onAlert?("🤖 Analyzing image and applying optimal settings...")
        
        DispatchQueue.global(qos: .userInitiated).async {
            let settings = self.detectOptimalSettings(for: original)
            
            DispatchQueue.main.async {
                self.onAlert?("✨ Applying \(settings.name) settings...")
                self.updateProcessing(threshold: settings.threshold, blur: settings.blur)
                
                if settings.backgroundRemoval {
                    self.toggleBackgroundRemoval(enabled: true)
                }
            }
        }
    }
    
    private func detectOptimalSettings(for image: UIImage) -> OptimalSettings {
        let aspectRatio = image.size.width / image.size.height
        let imageSize = image.size.width * image.size.height
        
        if aspectRatio > 0.8 && aspectRatio < 1.2 && imageSize > 500_000 {
            return OptimalSettings(name: "Portrait", threshold: 145, blur: 1, backgroundRemoval: true)
        } else if aspectRatio > 1.5 {
            return OptimalSettings(name: "Landscape", threshold: 125, blur: 2, backgroundRemoval: false)
        } else {
            return OptimalSettings(name: "Artwork", threshold: 135, blur: 1, backgroundRemoval: false)
        }
    }
    
    private struct OptimalSettings {
        let name: String
        let threshold: Float
        let blur: Float
        let backgroundRemoval: Bool
    }
    
    func autoRemoveSmallDots() {
        guard let processed = processedImage else {
            onAlert?("Please process an image first")
            return
        }
        
        let filteredContours = contours.filter { $0.area > 100 }
        contours = filteredContours
        
        displayImage = createDisplayImage(processed, contours: filteredContours)
        
        let removedCount = contours.count - filteredContours.count
        onAlert?("Removed \(removedCount) small dots")
    }
    
    func exportSVG() {
        guard !contours.isEmpty else {
            onAlert?("No contours to export. Please process an image first.")
            return
        }
        
        let svgString = generateSVG(from: contours)
        saveAndShareSVG(svgString)
    }
    
    private func generateSVG(from contours: [ContourPath]) -> String {
        guard let imageSize = processedImage?.size else {
            return ""
        }
        
        var svgContent = """
        <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 \(imageSize.width) \(imageSize.height)" 
             width="\(imageSize.width)px" 
             height="\(imageSize.height)px">
        """
        
        for (index, contour) in contours.enumerated() {
            let pathString = bezierPathToSVGPath(contour.path)
            svgContent += """
            <path d="\(pathString)" 
                  fill="black" 
                  stroke="none" 
                  id="cut_\(index)"/>
            """
        }
        
        svgContent += "\n</svg>"
        return svgContent
    }
    
    private func bezierPathToSVGPath(_ path: UIBezierPath) -> String {
        var pathString = ""
        
        path.cgPath.applyWithBlock { element in
            switch element.pointee.type {
            case .closeSubpath:
                pathString += "Z "
            @unknown default:
                break
            }
        }
        
        return pathString
    }
    
    private func saveAndShareSVG(_ svgContent: String) {
        let fileName = "cricut_design_\(Date().timeIntervalSince1970).svg"
        let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let fileURL = documentsPath.appendingPathComponent(fileName)
        
        do {
            try svgContent.write(to: fileURL, atomically: true, encoding: .utf8)
            
            DispatchQueue.main.async {
                self.shareFile(fileURL)
            }
        } catch {
            onAlert?("Error saving SVG: \(error.localizedDescription)")
            if let cricutError = error as? CricutError {
                onError?(cricutError)
            } else {
                onError?(.exportFailed(reason: error.localizedDescription))
            }
        }
    }
    
    private func shareFile(_ fileURL: URL) {
        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = windowScene.windows.first,
              let rootViewController = window.rootViewController else {
            onAlert?("Could not share file")
            return
        }
        
        let activityVC = UIActivityViewController(activityItems: [fileURL], applicationActivities: nil)
        
        if let popover = activityVC.popoverPresentationController {
            popover.sourceView = window
            popover.sourceRect = CGRect(x: window.bounds.midX, y: window.bounds.midY, width: 0, height: 0)
        }
        
        rootViewController.present(activityVC, animated: true) {
            self.onAlert?("SVG file ready to share!")
        }
    }
    
    // Drawing overlay methods (placeholder for now)
    func updateDrawingOverlay(_ modifiedImage: UIImage) {
        // Implementation for drawing tools
    }
    
    func applyDrawingChanges() {
        // Implementation for drawing tools
    }
    
    func undoLastDrawing() {
        // Implementation for drawing tools
    }
    
    func clearAllDrawing() {
        // Implementation for drawing tools
    }
} .moveToPoint:
                let point = element.pointee.points[0]
                pathString += "M \(point.x) \(point.y) "
            case .addLineToPoint:
                let point = element.pointee.points[0]
                pathString += "L \(point.x) \(point.y) "
            case .addQuadCurveToPoint:
                let cp = element.pointee.points[0]
                let point = element.pointee.points[1]
                pathString += "Q \(cp.x) \(cp.y) \(point.x) \(point.y) "
            case .addCurveToPoint:
                let cp1 = element.pointee.points[0]
                let cp2 = element.pointee.points[1]
                let point = element.pointee.points[2]
                pathString += "C \(cp1.x) \(cp1.y) \(cp2.x) \(cp2.y) \(point.x) \(point.y) "
            case
