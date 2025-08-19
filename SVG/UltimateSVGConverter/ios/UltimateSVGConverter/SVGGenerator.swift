//
//  SVGGenerator.swift
//  Ultimate SVG Converter
//
//  SVG generation and export functionality
//

import Foundation
import CoreGraphics
import UIKit

struct SVGGenerator {
    
    // MARK: - Public Methods
    
    static func generateSVG(from contours: [CGPath], imageSize: CGSize, dpi: Int = 300) -> String {
        let widthInches = imageSize.width / CGFloat(dpi)
        let heightInches = imageSize.height / CGFloat(dpi)
        
        var svg = createSVGHeader(
            width: widthInches,
            height: heightInches,
            viewBoxWidth: imageSize.width,
            viewBoxHeight: imageSize.height
        )
        
        // Add SVG content
        svg += createSVGStyles()
        
        // Convert contours to paths
        for (index, contour) in contours.enumerated() {
            if let pathData = contourToSVGPath(contour) {
                svg += createSVGPath(pathData: pathData, id: "cut_\(index)")
            }
        }
        
        svg += createSVGFooter()
        
        return svg
    }
    
    static func generateSVGWithMetadata(
        from contours: [CGPath],
        imageSize: CGSize,
        settings: ProcessingSettings,
        analysis: ImageAnalysis?,
        dpi: Int = 300
    ) -> String {
        let widthInches = imageSize.width / CGFloat(dpi)
        let heightInches = imageSize.height / CGFloat(dpi)
        
        var svg = createSVGHeaderWithMetadata(
            width: widthInches,
            height: heightInches,
            viewBoxWidth: imageSize.width,
            viewBoxHeight: imageSize.height,
            settings: settings,
            analysis: analysis
        )
        
        svg += createSVGStyles()
        svg += createCricutOptimizedDefs()
        
        // Group paths by complexity for better Cricut processing
        let groupedPaths = groupPathsByComplexity(contours)
        
        for (complexityLevel, paths) in groupedPaths {
            svg += createSVGGroup(name: complexityLevel)
            
            for (index, path) in paths.enumerated() {
                if let pathData = contourToSVGPath(path) {
                    let pathId = "\(complexityLevel.lowercased())_\(index)"
                    svg += createSVGPath(pathData: pathData, id: pathId)
                }
            }
            
            svg += closeSVGGroup()
        }
        
        svg += createSVGFooter()
        
        return svg
    }
    
    // MARK: - Private Methods - SVG Structure
    
    private static func createSVGHeader(
        width: CGFloat,
        height: CGFloat,
        viewBoxWidth: CGFloat,
        viewBoxHeight: CGFloat
    ) -> String {
        return """
        <?xml version="1.0" encoding="UTF-8"?>
        <svg width="\(String(format: "%.3f", width))in" 
             height="\(String(format: "%.3f", height))in"
             viewBox="0 0 \(String(format: "%.0f", viewBoxWidth)) \(String(format: "%.0f", viewBoxHeight))"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
        
        """
    }
    
    private static func createSVGHeaderWithMetadata(
        width: CGFloat,
        height: CGFloat,
        viewBoxWidth: CGFloat,
        viewBoxHeight: CGFloat,
        settings: ProcessingSettings,
        analysis: ImageAnalysis?
    ) -> String {
        let timestamp = ISO8601DateFormatter().string(from: Date())
        
        var metadata = """
        <?xml version="1.0" encoding="UTF-8"?>
        <svg width="\(String(format: "%.3f", width))in" 
             height="\(String(format: "%.3f", height))in"
             viewBox="0 0 \(String(format: "%.0f", viewBoxWidth)) \(String(format: "%.0f", viewBoxHeight))"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:cricut="http://cricut.com/svg/extensions">
        
        <!-- Metadata -->
        <metadata>
        <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                 xmlns:dc="http://purl.org/dc/elements/1.1/"
                 xmlns:cricut="http://cricut.com/svg/extensions">
        <rdf:Description rdf:about="">
        <dc:title>Ultimate SVG Converter Output</dc:title>
        <dc:creator>Ultimate SVG Converter</dc:creator>
        <dc:date>\(timestamp)</dc:date>
        <dc:format>image/svg+xml</dc:format>
        <cricut:optimizedForCutting>true</cricut:optimizedForCutting>
        <cricut:material>\(settings.targetMaterial.rawValue)</cricut:material>
        <cricut:preset>\(settings.targetMaterial.rawValue)</cricut:preset>
        """
        
        if let analysis = analysis {
            metadata += """
            <cricut:complexity>\(analysis.complexity.rawValue)</cricut:complexity>
            <cricut:cutPaths>\(analysis.cutPaths)</cricut:cutPaths>
            <cricut:estimatedTime>\(String(format: "%.1f", analysis.estimatedMinutes))</cricut:estimatedTime>
            """
        }
        
        metadata += """
        </rdf:Description>
        </rdf:RDF>
        </metadata>
        
        """
        
        return metadata
    }
    
    private static func createSVGStyles() -> String {
        return """
        <!-- Styles -->
        <defs>
        <style type="text/css"><![CDATA[
        .cut-path {
            fill: black;
            stroke: none;
            fill-rule: evenodd;
        }
        .simple-cut {
            fill: #000000;
            stroke: none;
        }
        .medium-cut {
            fill: #000000;
            stroke: none;
        }
        .complex-cut {
            fill: #000000;
            stroke: none;
        }
        ]]></style>
        </defs>
        
        """
    }
    
    private static func createCricutOptimizedDefs() -> String {
        return """
        <!-- Cricut Optimization Definitions -->
        <defs>
        <filter id="smoothEdges" x="0%" y="0%" width="100%" height="100%">
        <feMorphology operator="dilate" radius="0.5"/>
        <feGaussianBlur stdDeviation="0.3"/>
        <feComponentTransfer>
        <feFuncA type="discrete" tableValues="0 .5 .5 .7 .7 .8 .8 .9 .9 1"/>
        </feComponentTransfer>
        </filter>
        
        <clipPath id="cuttingBounds">
        <rect width="\(String(format: "%.0f", 792))" height="\(String(format: "%.0f", 612))" />
        </clipPath>
        </defs>
        
        """
    }
    
    private static func createSVGGroup(name: String) -> String {
        return """
        <g id="\(name.lowercased())-paths" class="\(name.lowercased())-cut">
        """
    }
    
    private static func closeSVGGroup() -> String {
        return "</g>\n"
    }
    
    private static func createSVGPath(pathData: String, id: String) -> String {
        return """
        <path id="\(id)" class="cut-path" d="\(pathData)" />
        """
    }
    
    private static func createSVGFooter() -> String {
        return "</svg>\n"
    }
    
    // MARK: - Path Conversion
    
    private static func contourToSVGPath(_ contour: CGPath) -> String? {
        var pathCommands: [String] = []
        var currentPoint: CGPoint = .zero
        var hasStarted = false
        
        contour.applyWithBlock { element in
            let points = element.pointee.points
            
            switch element.pointee.type {
            case .moveToPoint:
                let point = points[0]
                currentPoint = point
                pathCommands.append("M \(formatCoordinate(point.x)) \(formatCoordinate(point.y))")
                hasStarted = true
                
            case .addLineToPoint:
                let point = points[0]
                if hasStarted {
                    // Use relative line commands for better compression
                    let dx = point.x - currentPoint.x
                    let dy = point.y - currentPoint.y
                    if abs(dx) < 0.1 && abs(dy) < 0.1 {
                        // Skip very small movements
                        return
                    }
                    pathCommands.append("l \(formatCoordinate(dx)) \(formatCoordinate(dy))")
                } else {
                    pathCommands.append("L \(formatCoordinate(point.x)) \(formatCoordinate(point.y))")
                }
                currentPoint = point
                
            case .addQuadCurveToPoint:
                let controlPoint = points[0]
                let endPoint = points[1]
                pathCommands.append("Q \(formatCoordinate(controlPoint.x)) \(formatCoordinate(controlPoint.y)) \(formatCoordinate(endPoint.x)) \(formatCoordinate(endPoint.y))")
                currentPoint = endPoint
                
            case .addCurveToPoint:
                let controlPoint1 = points[0]
                let controlPoint2 = points[1]
                let endPoint = points[2]
                pathCommands.append("C \(formatCoordinate(controlPoint1.x)) \(formatCoordinate(controlPoint1.y)) \(formatCoordinate(controlPoint2.x)) \(formatCoordinate(controlPoint2.y)) \(formatCoordinate(endPoint.x)) \(formatCoordinate(endPoint.y))")
                currentPoint = endPoint
                
            case .closeSubpath:
                pathCommands.append("Z")
                
            @unknown default:
                break
            }
        }
        
        return pathCommands.isEmpty ? nil : pathCommands.joined(separator: " ")
    }
    
    private static func formatCoordinate(_ value: CGFloat) -> String {
        // Format coordinates with appropriate precision for SVG
        if abs(value) < 0.01 {
            return "0"
        }
        return String(format: "%.2f", value)
    }
    
    // MARK: - Path Optimization
    
    private static func groupPathsByComplexity(_ contours: [CGPath]) -> [(String, [CGPath])] {
        var simplePaths: [CGPath] = []
        var mediumPaths: [CGPath] = []
        var complexPaths: [CGPath] = []
        
        for contour in contours {
            let complexity = calculatePathComplexity(contour)
            
            if complexity < 10 {
                simplePaths.append(contour)
            } else if complexity < 30 {
                mediumPaths.append(contour)
            } else {
                complexPaths.append(contour)
            }
        }
        
        var groups: [(String, [CGPath])] = []
        
        if !simplePaths.isEmpty {
            groups.append(("Simple", simplePaths))
        }
        if !mediumPaths.isEmpty {
            groups.append(("Medium", mediumPaths))
        }
        if !complexPaths.isEmpty {
            groups.append(("Complex", complexPaths))
        }
        
        return groups
    }
    
    private static func calculatePathComplexity(_ path: CGPath) -> Int {
        var pointCount = 0
        var curveCount = 0
        
        path.applyWithBlock { element in
            switch element.pointee.type {
            case .moveToPoint, .addLineToPoint:
                pointCount += 1
            case .addQuadCurveToPoint:
                pointCount += 2
                curveCount += 1
            case .addCurveToPoint:
                pointCount += 3
                curveCount += 2
            case .closeSubpath:
                break
            @unknown default:
                break
            }
        }
        
        return pointCount + (curveCount * 2) // Weight curves more heavily
    }
    
    // MARK: - Optimization Methods
    
    static func optimizeForCricut(_ svgContent: String) -> String {
        var optimizedSVG = svgContent
        
        // Remove unnecessary whitespace
        optimizedSVG = optimizedSVG.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
        
        // Optimize path commands
        optimizedSVG = optimizedSVG.replacingOccurrences(of: " L ", with: " l ")
        optimizedSVG = optimizedSVG.replacingOccurrences(of: " M ", with: " m ")
        
        // Remove redundant decimal places
        let decimalPattern = #"(\d+)\.00\b"#
        optimizedSVG = optimizedSVG.replacingOccurrences(of: decimalPattern, with: "$1", options: .regularExpression)
        
        return optimizedSVG
    }
    
    static func validateSVG(_ svgContent: String) -> [String] {
        var warnings: [String] = []
        
        // Check SVG structure
        if !svgContent.contains("<?xml") {
            warnings.append("Missing XML declaration")
        }
        
        if !svgContent.contains("<svg") {
            warnings.append("Missing SVG root element")
        }
        
        if !svgContent.contains("</svg>") {
            warnings.append("Missing SVG closing tag")
        }
        
        // Check for Cricut compatibility
        if !svgContent.contains("viewBox") {
            warnings.append("Missing viewBox attribute (recommended for Cricut)")
        }
        
        // Check path complexity
        let pathMatches = svgContent.matches(of: /<path[^>]*d="([^"]*)"/)
        if pathMatches.count > 1000 {
            warnings.append("Very high path count (\(pathMatches.count)) - may be slow to cut")
        }
        
        // Check for unsupported elements
        let unsupportedElements = ["<image", "<text", "<foreignObject"]
        for element in unsupportedElements {
            if svgContent.contains(element) {
                warnings.append("Contains \(element) which may not be supported by Cricut")
            }
        }
        
        return warnings
    }
    
    // MARK: - Export Utilities
    
    static func createExportData(
        svgContent: String,
        fileName: String,
        options: ExportOptions
    ) -> Data? {
        var finalSVG = svgContent
        
        if options.optimizeForCricut {
            finalSVG = optimizeForCricut(finalSVG)
        }
        
        return finalSVG.data(using: .utf8)
    }
    
    static func estimateFileSize(_ svgContent: String) -> Int {
        return svgContent.utf8.count
    }
    
    static func getFileSizeDescription(_ bytes: Int) -> String {
        let formatter = ByteCountFormatter()
        formatter.allowedUnits = [.useKB, .useMB]
        formatter.countStyle = .file
        return formatter.string(fromByteCount: Int64(bytes))
    }
    
    // MARK: - Debug and Analysis
    
    static func analyzeSVG(_ svgContent: String) -> SVGAnalysis {
        let pathMatches = svgContent.matches(of: /<path[^>]*d="([^"]*)"/)
        let groupMatches = svgContent.matches(of: /<g[^>]*>/)
        
        var totalPathLength = 0
        var commandCounts: [String: Int] = [:]
        
        for match in pathMatches {
            if let pathData = match.output.1 {
                let pathString = String(pathData)
                totalPathLength += pathString.count
                
                // Count different path commands
                let commands = ["M", "L", "C", "Q", "Z", "m", "l", "c", "q", "z"]
                for command in commands {
                    let count = pathString.components(separatedBy: command).count - 1
                    commandCounts[command, default: 0] += count
                }
            }
        }
        
        return SVGAnalysis(
            pathCount: pathMatches.count,
            groupCount: groupMatches.count,
            totalPathLength: totalPathLength,
            commandCounts: commandCounts,
            fileSize: svgContent.utf8.count,
            isOptimized: svgContent.contains("cricut:optimizedForCutting")
        )
    }
}

// MARK: - Supporting Types

struct SVGAnalysis {
    let pathCount: Int
    let groupCount: Int
    let totalPathLength: Int
    let commandCounts: [String: Int]
    let fileSize: Int
    let isOptimized: Bool
    
    var complexity: ComplexityLevel {
        let totalCommands = commandCounts.values.reduce(0, +)
        
        if totalCommands < 100 {
            return .simple
        } else if totalCommands < 500 {
            return .medium
        } else {
            return .complex
        }
    }
    
    var estimatedCuttingTime: Double {
        let totalCommands = commandCounts.values.reduce(0, +)
        return Double(totalCommands) * 0.02 / 60 // 0.02 seconds per command
    }
    
    var description: String {
        return """
        SVG Analysis:
        • Paths: \(pathCount)
        • Groups: \(groupCount)
        • Commands: \(commandCounts.values.reduce(0, +))
        • Complexity: \(complexity.displayName)
        • File Size: \(SVGGenerator.getFileSizeDescription(fileSize))
        • Optimized: \(isOptimized ? "Yes" : "No")
        • Est. Cut Time: \(String(format: "%.1f", estimatedCuttingTime)) min
        """
    }
}

// MARK: - String Extension for Regex

extension String {
    func matches(of regex: some RegexComponent) -> [Regex<some RegexOutput>.Match] {
        do {
            let regex = try Regex(regex)
            return Array(self.matches(of: regex))
        } catch {
            return []
        }
    }
}