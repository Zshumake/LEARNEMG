# Ultimate SVG Converter - iOS Edition

Professional AI-powered image to Cricut SVG conversion app for iPhone and iPad with advanced features and intelligent optimization.

## 🚀 Features

### Core Processing
- **Universal image support**: All iOS photo formats including HEIC, JPEG, PNG
- **Real-time processing** with live preview
- **Memory-optimized** for all device types
- **Gesture-based controls** with radiology-style drag adjustments
- **Advanced Core Image** pipeline for professional results

### AI-Powered Intelligence  
- **Vision framework** face detection and enhancement
- **Smart background removal** using Core Image subject highlighting
- **Automatic content analysis** with intelligent preset recommendations
- **Machine learning optimization** for different image types

### Professional Tools
- **6 specialized presets**: Portrait, Landscape, Logo/Text, Silhouette, Detailed Art, Simple Shapes
- **Material-specific optimization**: Vinyl, Cardstock, Poster Board, Fabric, Leather, Chipboard
- **Real-time cutting analysis**: Complexity assessment, path counting, time estimation
- **Dual-mode interface**: Beginner (simplified) and Advanced (full control)

### Native iOS Experience
- **SwiftUI interface** with adaptive layouts for all screen sizes
- **iPhone and iPad optimized** with different layouts for each
- **Native photo picker** integration
- **System sharing** with direct export to Cricut Design Space
- **Haptic feedback** for professional user experience
- **Dark mode optimized** with beautiful theming

## 📱 Requirements

### System Requirements
- iOS 15.0 or later
- iPhone 8 / iPad (6th generation) or newer
- 64-bit processor (A10 Bionic or later)

### Recommended
- iOS 16.0+ for best performance
- iPhone 12 / iPad Air (4th gen) or newer for optimal AI processing
- At least 3GB RAM for large image processing

## 🛠️ Installation & Setup

### Xcode Project Setup

1. **Open Xcode** (14.0 or later required)

2. **Create new iOS project**:
   - Product Name: `UltimateSVGConverter`
   - Bundle Identifier: `com.yourcompany.ultimatesvgconverter`
   - Language: Swift
   - Interface: SwiftUI
   - Minimum Deployment: iOS 15.0

3. **Add the source files**:
   - Copy all `.swift` files to your project
   - Add `Info.plist` configuration
   - Ensure all files are added to the target

4. **Configure capabilities**:
   - Enable "Background Modes" → "Background Processing"
   - Add privacy usage descriptions for Photo Library access

5. **Build and run** on device or simulator

### Project Structure
```
UltimateSVGConverter/
├── UltimateSVGConverterApp.swift      # App entry point
├── ContentView.swift                  # Main interface
├── ImageProcessor.swift               # Core processing engine  
├── Models.swift                       # Data models
├── SettingsManager.swift              # Settings management
├── SupportingViews.swift              # UI components
├── AppTheme.swift                     # Theming and styling
├── SVGGenerator.swift                 # SVG export functionality
├── Info.plist                        # App configuration
└── README.md                          # This file
```

## 🎮 Usage

### Quick Start
1. **Launch the app** on your iPhone or iPad
2. **Tap "Select Image"** to choose from Photos
3. **Choose a preset** that matches your image type
4. **Select your material** (Vinyl, Cardstock, etc.)
5. **Process automatically** or tap "Process Image"  
6. **Export SVG** and share to Cricut Design Space

### Advanced Workflow
1. **Switch to Advanced mode** using the toggle in the header
2. **Enable Live Preview** to see changes in real-time
3. **Drag on the image** to adjust threshold (left/right) and blur (up/down)
4. **Fine-tune parameters** using the sliders
5. **Analyze results** in the metrics panel
6. **Export with metadata** for optimal Cricut compatibility

## 🎨 Smart Presets

- **👤 Portrait**: Face detection + background removal + enhancement
- **🌅 Landscape**: Balanced processing for scenic images
- **📝 Logo/Text**: Maximum precision for graphics and text
- **🌅 Silhouette**: Simple outlines with background removal
- **🎨 Detailed Art**: Preserves maximum artistic detail
- **⚡ Simple Shapes**: Basic geometry optimized for thick materials

## 🔧 Material Optimization

Each material automatically optimizes settings:

- **Vinyl** (50px min): Fine details, perfect for decals
- **Cardstock** (100px min): Standard cuts, good for cards  
- **Poster Board** (150px min): Thicker material, simpler designs
- **Fabric** (200px min): Textile cutting with fabric considerations
- **Leather** (300px min): Heavy-duty cutting, simple shapes only
- **Chipboard** (400px min): Maximum thickness, very simple designs

## 📱 Interface Modes

### Beginner Mode
- **One-tap processing** with smart defaults
- **Visual preset selection** with large icons
- **Auto-optimization** based on image analysis
- **Simplified controls** for ease of use

### Advanced Mode  
- **Live preview** with real-time parameter adjustment
- **Professional sliders** for fine control
- **Drag gesture control** on image preview
- **Comprehensive analysis** and metrics
- **Expert settings** for power users

## 🤖 AI Features

### Face Detection & Enhancement
- **Vision framework** automatic face detection
- **Local histogram equalization** for better contrast
- **Face-specific optimization** in Portrait preset
- **Privacy-first** - all processing happens on device

### Smart Analysis
- **Content type detection** (portrait/landscape/artwork)
- **Edge density analysis** for complexity assessment  
- **Automatic preset recommendations** based on image characteristics
- **Real-time metrics** for cutting optimization

### Background Removal
- **Core Image subject highlighting** for background removal
- **Works with portraits, objects, and logos**
- **Automatic white background** for clean cutting
- **No internet required** - completely on-device

## 📊 Cutting Analysis

Real-time analysis provides:

- **Complexity Rating**: Simple/Medium/Complex with color coding
- **Cut Path Count**: Number of separate cutting operations
- **Cut Area Percentage**: How much of the image will be cut
- **Estimated Time**: Predicted cutting duration in minutes
- **Material Compatibility**: Whether design suits selected material

## 💡 Pro Tips

### Image Selection
1. **Use high-resolution images** (at least 1000px) for best results
2. **Good contrast images** work better than low-contrast ones
3. **Clean backgrounds** make silhouettes easier to create
4. **Portrait orientation** works best for faces

### Processing Tips  
1. **Enable Live Preview** to see changes instantly
2. **Drag on image** for quick threshold/blur adjustment
3. **Start with presets** then fine-tune if needed
4. **Check complexity** before cutting - simple is usually better

### Material Selection
1. **Choose material first** - it optimizes all other settings
2. **Vinyl for details** - can handle fine lines and small text
3. **Cardstock for general use** - good balance of detail and durability
4. **Thicker materials** need simpler designs

### Export & Cutting
1. **Use default export settings** for best Cricut compatibility
2. **Share directly** to Cricut Design Space from export screen
3. **Test cut first** on scrap material for new designs
4. **Complex designs** may take longer to process in Cricut

## 🔧 Troubleshooting

### Common Issues

**App crashes when processing large images**
- The app automatically optimizes image size
- Try with a smaller image first
- Restart the app and try again
- Ensure iOS is up to date

**Processing is very slow**
- Disable Live Preview for faster manual adjustments
- Use a simpler preset like "Simple Shapes"
- Close other apps to free up memory
- Try on a newer device if available

**Poor cutting results**
- Increase the minimum area setting
- Use more blur for smoother edges
- Choose appropriate material settings
- Ensure good image quality to start with

**Export/sharing issues**
- Ensure you have sufficient storage space
- Check that target app (Cricut Design Space) is installed
- Try exporting to Files app first, then importing manually
- Restart both apps if sharing isn't working

### Performance Tips

- **Close Live Preview** when making many adjustments
- **Use WiFi** for sharing large files (though processing is offline)
- **Restart the app** occasionally for optimal performance
- **Keep iOS updated** for best Core Image performance

### Supported Formats

**Import**: JPEG, PNG, HEIC, TIFF, BMP, GIF
**Export**: SVG (optimized for Cricut Design Space)

## 🎯 Output Compatibility

SVG files work perfectly with:
- **Cricut Design Space** (primary target)
- **Silhouette Studio** 
- **Adobe Illustrator**
- **Inkscape** (free alternative)
- **Any SVG-compatible software**

Export features:
- **Cricut-optimized** viewBox and dimensions
- **Professional metadata** with processing info
- **Grouped paths** by complexity level
- **Clean, standards-compliant** SVG format

## 🔄 Updates & Support

The app includes:
- **Automatic settings persistence** across app launches
- **Comprehensive error handling** with helpful messages
- **Performance monitoring** and optimization
- **Detailed logging** for troubleshooting

## 📱 Device Optimization

### iPhone Features
- **Portrait-first interface** optimized for one-handed use
- **Compact controls** with scrollable interface
- **Gesture-heavy interaction** for efficient workflow
- **Haptic feedback** for professional feel

### iPad Features  
- **Landscape layouts** with side-by-side panels
- **Larger preview area** for detailed work
- **Extended control panels** with more space
- **Optimized for Apple Pencil** interactions

## 🚀 Performance

- **Core Image acceleration** for professional image processing
- **Memory-aware processing** prevents crashes on any device
- **Background processing** keeps UI responsive
- **Optimized algorithms** for mobile processors

---

**Ready to create professional cutting files on iOS! ✂️📱**

### Version History
- **v1.0.0**: Initial release with full feature set
  - Professional image processing pipeline
  - 6 smart presets with AI recommendations  
  - Material-specific optimization
  - Dual-mode interface (Beginner/Advanced)
  - Native iOS sharing and export
  - Real-time analysis and preview