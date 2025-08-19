# Ultimate SVG Converter - Desktop Edition

Professional AI-powered image to Cricut SVG conversion tool with advanced features and intelligent optimization.

## 🚀 Features

### Core Processing
- **Multi-format support**: JPG, PNG, BMP, TIFF, HEIC, GIF
- **Intelligent thresholding** with live preview
- **Gaussian blur** for smooth edges
- **Morphological operations** for clean results
- **Contour optimization** for efficient cutting

### AI-Powered Features
- **Background removal** using U2-Net AI model
- **Face detection and enhancement** for portraits
- **Smart preset recommendations** based on content analysis
- **Automatic parameter optimization**

### Professional Tools
- **6 specialized presets**: Portrait, Landscape, Logo/Text, Silhouette, Detailed Art, Simple Shapes
- **Material-specific optimization**: Vinyl, Cardstock, Poster Board, Fabric, Leather, Chipboard
- **Real-time cutting analysis**: Complexity assessment, time estimation, cut path visualization
- **Live preview** with instant parameter feedback

### Advanced Interface
- **Modern dark theme** with card-based layout
- **Drag & drop** file loading (with tkinterdnd2)
- **Zoom controls** for detailed preview
- **Scrollable control panel** with Mac trackpad support
- **Smart recommendations** panel with contextual tips

## 📋 Requirements

### Python Version
- Python 3.8 or higher

### Required Packages
```bash
pip install -r requirements.txt
```

### Core Dependencies
- `opencv-python` - Image processing
- `pillow` - Image manipulation
- `numpy` - Numerical operations
- `svgwrite` - SVG generation

### Optional but Recommended
- `tkinterdnd2` - Drag and drop support
- `rembg` - AI background removal (large download ~1.7GB for models)

## 🛠️ Installation

1. **Clone or download** the files to your local machine

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Optional: Install AI features**:
   ```bash
   pip install rembg
   ```
   Note: This will download large AI models (~1.7GB) on first use.

4. **Optional: Install drag & drop support**:
   ```bash
   pip install tkinterdnd2
   ```

## 🎮 Usage

### Quick Start
1. **Run the application**:
   ```bash
   python ultimate_svg_desktop.py
   ```

2. **Load an image**:
   - Drag & drop an image file onto the preview area
   - Or click "Choose Image File" button

3. **Choose settings**:
   - Select a smart preset that matches your image type
   - Choose your target cutting material
   - Enable AI features if desired

4. **Process and export**:
   - Click "Process Image" to convert
   - Review the cutting analysis
   - Click "Export SVG" to save for Cricut

### Advanced Workflow
1. **Enable Live Preview** to see changes in real-time
2. **Enable Auto Optimize** for intelligent parameter adjustment
3. **Use Advanced Settings** to fine-tune parameters
4. **Preview Cut Lines** to see exactly where cuts will be made
5. **Save/Load Projects** to reuse settings

## 🎨 Smart Presets

- **👤 Portrait**: Optimized for faces with background removal
- **🌅 Landscape**: Great for scenery with balanced detail
- **📝 Logo/Text**: Clean graphics with maximum precision
- **🌅 Silhouette**: Simple outlines for easy cutting
- **🎨 Detailed Art**: Maximum detail preservation
- **⚡ Simple Shapes**: Basic geometry for thick materials

## 🔧 Material Optimization

Each material has optimized settings for best results:

- **Vinyl**: Fine details, minimum 50px areas
- **Cardstock**: Standard cuts, good for cards
- **Poster Board**: Thicker material, simpler designs
- **Fabric**: Textile cutting with fabric mat
- **Leather**: Heavy-duty cutting, simple shapes only
- **Chipboard**: Maximum thickness, very simple designs

## 🤖 AI Features

### Background Removal
- Powered by U2-Net neural network
- Automatic subject detection
- Perfect for portraits and silhouettes
- Requires `rembg` package

### Face Enhancement
- Automatic face detection using OpenCV
- Histogram equalization for better contrast
- Preserves facial features in processing

### Smart Analysis
- Content type detection (portrait/landscape/artwork)
- Complexity analysis for cutting optimization
- Automatic preset recommendations
- Real-time cutting metrics

## 📊 Cutting Analysis

The tool provides comprehensive cutting analysis:

- **Complexity Rating**: Simple/Medium/Complex
- **Cut Path Count**: Number of separate cutting operations
- **Cut Area Percentage**: How much of the image will be cut
- **Estimated Time**: Predicted cutting duration
- **Material Compatibility**: Whether design suits selected material

## 💡 Pro Tips

1. **Use Live Preview** to see changes instantly as you adjust settings
2. **Enable Auto Optimize** for intelligent parameter suggestions
3. **Portrait preset + Background removal** works great for face silhouettes
4. **Higher threshold values** create more white (cut) areas
5. **Lower blur values** preserve fine details
6. **Increase min area** to remove tiny details that won't cut well
7. **Choose material first** - it optimizes all other settings automatically

## 🔧 Troubleshooting

### Common Issues

**"Background removal unavailable"**
- Install rembg: `pip install rembg`
- First use downloads ~1.7GB of AI models

**"Drag & drop not working"**
- Install tkinterdnd2: `pip install tkinterdnd2`
- Use "Choose Image File" button as alternative

**"Face detection unavailable"**
- Usually works with standard OpenCV installation
- Try reinstalling: `pip uninstall opencv-python && pip install opencv-python`

**Processing is slow**
- Large images take longer to process
- Disable live preview for faster manual adjustments
- Consider resizing very large images before processing

**Export SVG issues**
- Ensure you have write permissions to the target directory
- Try exporting to your desktop or documents folder
- Check that filename doesn't contain special characters

### Performance Tips

- **Disable live preview** when making many quick adjustments
- **Use Auto Optimize** to get good settings quickly
- **Start with presets** then fine-tune if needed
- **Process smaller images** for faster results

## 📁 File Structure

```
desktop/
├── ultimate_svg_desktop.py    # Main application
├── core_engine.py             # Processing engine
├── requirements.txt           # Python dependencies
├── README.md                 # This file
└── ultimate_svg_converter.log # Application log file
```

## 🎯 Output

The tool generates standard SVG files compatible with:
- Cricut Design Space
- Silhouette Studio
- Adobe Illustrator
- Inkscape
- Any SVG-compatible software

SVG files include:
- Proper dimensions in inches (300 DPI)
- Black-filled paths for cutting regions
- Cricut-optimized viewBox settings
- W3C-compliant SVG format

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the application log file: `ultimate_svg_converter.log`
3. Ensure all requirements are properly installed
4. Try processing with a simple test image first

## 🔄 Updates

The application automatically logs its activities to `ultimate_svg_converter.log` for debugging purposes. This file contains detailed information about processing steps, errors, and feature availability.

---

**Happy crafting! ✂️🎨**