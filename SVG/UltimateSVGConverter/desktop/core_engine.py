"""
Ultimate SVG Converter - Core Processing Engine
Shared processing logic for desktop and mobile versions
"""

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import logging
import time
from typing import Tuple, List, Optional, Dict, Any
from dataclasses import dataclass
from enum import Enum
import json
import os

# Set up logging first
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Try to enable HEIC support
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIC_AVAILABLE = True
    logger.info("HEIC support enabled via pillow-heif")
except ImportError:
    HEIC_AVAILABLE = False
    logger.warning("HEIC support not available - install pillow-heif for iPhone image support")

# Try to import AI background removal
try:
    import rembg
    from rembg import remove, new_session
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False

class MaterialType(Enum):
    """Supported cutting materials with optimized settings"""
    VINYL = "vinyl"
    CARDSTOCK = "cardstock"
    POSTER_BOARD = "poster_board"
    FABRIC = "fabric"
    LEATHER = "leather"
    CHIPBOARD = "chipboard"

class PresetType(Enum):
    """Smart presets for different image types"""
    PORTRAIT = "portrait"
    LANDSCAPE = "landscape"
    LOGO_TEXT = "logo_text"
    SILHOUETTE = "silhouette"
    DETAILED_ART = "detailed_art"
    SIMPLE_SHAPES = "simple_shapes"

@dataclass
class ProcessingSettings:
    """Complete processing settings configuration"""
    # Core processing
    threshold: int = 128
    blur_radius: int = 2
    min_area: int = 100
    simplification: float = 0.02
    morphology_size: int = 3
    
    # Advanced features
    face_enhancement: bool = True
    remove_background: bool = False
    detail_preservation: float = 0.5
    
    # Material optimization
    material: MaterialType = MaterialType.CARDSTOCK
    
    # Auto features
    auto_optimize: bool = True
    preset: Optional[PresetType] = None

@dataclass
class ProcessingResult:
    """Results from image processing"""
    processed_image: np.ndarray
    contours: List[np.ndarray]
    original_size: Tuple[int, int]
    processing_time: float
    metrics: Dict[str, Any]
    recommendations: List[str]

@dataclass
class CuttingMetrics:
    """Analysis metrics for cutting optimization"""
    complexity: str  # "Simple", "Medium", "Complex"
    cut_paths: int
    cut_area_percentage: float
    estimated_time_minutes: float
    total_points: int
    recommended_settings: Dict[str, Any]

class ImageAnalyzer:
    """Intelligent image analysis and recommendations"""
    
    def __init__(self):
        self.face_cascade = None
        self._initialize_face_detection()
    
    def _initialize_face_detection(self):
        """Initialize face detection if available"""
        try:
            cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            self.face_cascade = cv2.CascadeClassifier(cascade_path)
            self.face_detection_available = True
            logger.info("Face detection initialized successfully")
        except Exception as e:
            logger.warning(f"Face detection not available: {e}")
            self.face_detection_available = False
    
    def analyze_image(self, image: np.ndarray) -> Dict[str, Any]:
        """Comprehensive image analysis"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) == 3 else image
        height, width = gray.shape
        
        # Basic metrics
        total_pixels = height * width
        aspect_ratio = width / height
        
        # Edge analysis
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / total_pixels
        
        # Contrast analysis
        contrast = np.std(gray)
        brightness = np.mean(gray)
        
        # Face detection
        faces_detected = 0
        face_regions = []
        if self.face_detection_available and self.face_cascade is not None:
            faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
            faces_detected = len(faces)
            face_regions = faces.tolist()
        
        # Content classification
        content_type = self._classify_content(aspect_ratio, edge_density, faces_detected, contrast)
        
        return {
            'dimensions': (width, height),
            'aspect_ratio': aspect_ratio,
            'total_pixels': total_pixels,
            'edge_density': edge_density,
            'contrast': contrast,
            'brightness': brightness,
            'faces_detected': faces_detected,
            'face_regions': face_regions,
            'content_type': content_type,
            'is_portrait': aspect_ratio < 1.0,
            'is_landscape': aspect_ratio > 1.3,
            'is_square': 0.9 <= aspect_ratio <= 1.1
        }
    
    def _classify_content(self, aspect_ratio: float, edge_density: float, 
                         faces_detected: int, contrast: float) -> str:
        """Classify image content for preset recommendations"""
        if faces_detected > 0:
            return "portrait"
        elif aspect_ratio > 1.5 and edge_density < 0.05:
            return "landscape"
        elif edge_density > 0.15 and contrast > 60:
            return "detailed_art"
        elif edge_density < 0.03:
            return "simple_shapes"
        elif contrast > 80:
            return "logo_text"
        else:
            return "silhouette"
    
    def recommend_preset(self, analysis: Dict[str, Any]) -> PresetType:
        """Recommend optimal preset based on analysis"""
        content_type = analysis['content_type']
        
        preset_mapping = {
            'portrait': PresetType.PORTRAIT,
            'landscape': PresetType.LANDSCAPE,
            'detailed_art': PresetType.DETAILED_ART,
            'simple_shapes': PresetType.SIMPLE_SHAPES,
            'logo_text': PresetType.LOGO_TEXT,
            'silhouette': PresetType.SILHOUETTE
        }
        
        return preset_mapping.get(content_type, PresetType.PORTRAIT)
    
    def generate_recommendations(self, analysis: Dict[str, Any]) -> List[str]:
        """Generate user-friendly recommendations"""
        recommendations = []
        
        # Face-specific recommendations
        if analysis['faces_detected'] > 0:
            recommendations.append("👤 Portrait detected - use Portrait preset for best results")
            recommendations.append("✅ Enable face enhancement for clearer facial features")
            recommendations.append("🗑️ Consider background removal for clean silhouettes")
        
        # Detail level recommendations
        if analysis['edge_density'] > 0.1:
            recommendations.append("🔍 High detail image - increase blur radius for smoother cuts")
            recommendations.append("⚡ Consider Simple Shapes preset for easier cutting")
        elif analysis['edge_density'] < 0.05:
            recommendations.append("📐 Low detail image - use Detailed Art preset to preserve features")
        
        # Contrast recommendations
        if analysis['contrast'] < 30:
            recommendations.append("🎚️ Low contrast - adjust threshold carefully for best separation")
        elif analysis['contrast'] > 80:
            recommendations.append("✅ High contrast - excellent for clean cutting lines")
        
        # Material recommendations
        if analysis['edge_density'] > 0.12:
            recommendations.append("🧵 High detail - consider Vinyl for fine details")
        elif analysis['edge_density'] < 0.05:
            recommendations.append("📄 Simple design - Cardstock or heavier materials work well")
        
        # Size recommendations
        if analysis['total_pixels'] > 2000000:  # Large image
            recommendations.append("📏 Large image - processing may take longer")
        
        return recommendations

class BackgroundRemover:
    """AI-powered background removal"""
    
    def __init__(self):
        self.session = None
        if REMBG_AVAILABLE:
            try:
                self.session = new_session('u2net')
                self.available = True
                logger.info("Background removal initialized successfully")
            except Exception as e:
                logger.warning(f"Background removal initialization failed: {e}")
                self.available = False
        else:
            self.available = False
            logger.warning("rembg library not available - background removal disabled")
    
    def remove_background(self, image: np.ndarray) -> np.ndarray:
        """Remove background from image"""
        if not self.available:
            logger.warning("Background removal not available")
            return image
        
        try:
            # Convert BGR to RGB for rembg
            if len(image.shape) == 3:
                rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            else:
                rgb_image = image
            
            # Convert to PIL Image
            pil_image = Image.fromarray(rgb_image)
            
            # Remove background
            output = remove(pil_image, session=self.session)
            
            # Convert back to numpy array
            output_array = np.array(output)
            
            # Handle alpha channel - convert to white background
            if output_array.shape[2] == 4:  # RGBA
                # Create white background
                white_bg = np.ones((output_array.shape[0], output_array.shape[1], 3), dtype=np.uint8) * 255
                
                # Alpha compositing
                alpha = output_array[:, :, 3:4] / 255.0
                rgb = output_array[:, :, :3]
                
                # Blend with white background
                result = (rgb * alpha + white_bg * (1 - alpha)).astype(np.uint8)
                
                # Convert back to BGR for OpenCV
                if len(image.shape) == 3:
                    result = cv2.cvtColor(result, cv2.COLOR_RGB2BGR)
                
                return result
            else:
                # Convert back to BGR if needed
                if len(image.shape) == 3:
                    return cv2.cvtColor(output_array, cv2.COLOR_RGB2BGR)
                return output_array
                
        except Exception as e:
            logger.error(f"Background removal failed: {e}")
            return image

class SVGConverter:
    """Convert processed contours to SVG format"""
    
    @staticmethod
    def create_svg_content(contours: List[np.ndarray], image_size: Tuple[int, int], 
                          dpi: int = 300) -> str:
        """Create SVG content from contours"""
        width, height = image_size
        width_inches = width / dpi
        height_inches = height / dpi
        
        # SVG header
        svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width_inches}in" height="{height_inches}in" 
     viewBox="0 0 {width} {height}" 
     xmlns="http://www.w3.org/2000/svg">
<defs>
    <style>
        .cut-path {{ fill: black; stroke: none; }}
    </style>
</defs>
'''
        
        # Add paths for each contour
        for i, contour in enumerate(contours):
            if len(contour) < 3:
                continue
                
            path_data = SVGConverter._contour_to_svg_path(contour)
            svg_content += f'  <path id="cut_{i}" class="cut-path" d="{path_data}" />\n'
        
        svg_content += '</svg>'
        return svg_content
    
    @staticmethod
    def _contour_to_svg_path(contour: np.ndarray) -> str:
        """Convert OpenCV contour to SVG path"""
        if len(contour) == 0:
            return ""
        
        points = contour.reshape(-1, 2)
        if len(points) < 3:
            return ""
        
        # Start path
        path_data = f"M {points[0][0]:.2f} {points[0][1]:.2f}"
        
        # Add lines to other points
        for point in points[1:]:
            path_data += f" L {point[0]:.2f} {point[1]:.2f}"
        
        # Close path
        path_data += " Z"
        return path_data

class UltimateSVGProcessor:
    """Main processing engine combining all features"""
    
    # Material-specific settings
    MATERIAL_SETTINGS = {
        MaterialType.VINYL: {
            'min_area': 50,
            'simplification': 0.01,
            'morphology_size': 2,
            'description': "Fine details, perfect for decals",
            'max_complexity': 0.8
        },
        MaterialType.CARDSTOCK: {
            'min_area': 100,
            'simplification': 0.02,
            'morphology_size': 3,
            'description': "Standard cuts, great for cards",
            'max_complexity': 0.6
        },
        MaterialType.POSTER_BOARD: {
            'min_area': 150,
            'simplification': 0.025,
            'morphology_size': 4,
            'description': "Thicker material, simpler designs",
            'max_complexity': 0.5
        },
        MaterialType.FABRIC: {
            'min_area': 200,
            'simplification': 0.03,
            'morphology_size': 5,
            'description': "Textile cutting, use fabric mat",
            'max_complexity': 0.4
        },
        MaterialType.LEATHER: {
            'min_area': 300,
            'simplification': 0.04,
            'morphology_size': 6,
            'description': "Heavy material, simple shapes only",
            'max_complexity': 0.3
        },
        MaterialType.CHIPBOARD: {
            'min_area': 400,
            'simplification': 0.05,
            'morphology_size': 7,
            'description': "Maximum thickness, very simple designs",
            'max_complexity': 0.2
        }
    }
    
    # Preset configurations
    PRESETS = {
        PresetType.PORTRAIT: {
            'threshold': 145,
            'blur_radius': 1,
            'min_area': 50,
            'simplification': 0.015,
            'face_enhancement': True,
            'remove_background': True,
            'detail_preservation': 0.7,
            'description': "Optimized for faces and people"
        },
        PresetType.LANDSCAPE: {
            'threshold': 125,
            'blur_radius': 2,
            'min_area': 150,
            'simplification': 0.025,
            'face_enhancement': False,
            'remove_background': False,
            'detail_preservation': 0.4,
            'description': "Great for scenery and nature"
        },
        PresetType.LOGO_TEXT: {
            'threshold': 140,
            'blur_radius': 0,
            'min_area': 25,
            'simplification': 0.01,
            'face_enhancement': False,
            'remove_background': True,
            'detail_preservation': 0.8,
            'description': "Clean graphics and text"
        },
        PresetType.SILHOUETTE: {
            'threshold': 120,
            'blur_radius': 3,
            'min_area': 200,
            'simplification': 0.03,
            'face_enhancement': False,
            'remove_background': True,
            'detail_preservation': 0.3,
            'description': "Simple outlines and shapes"
        },
        PresetType.DETAILED_ART: {
            'threshold': 135,
            'blur_radius': 1,
            'min_area': 25,
            'simplification': 0.01,
            'face_enhancement': True,
            'remove_background': False,
            'detail_preservation': 0.85,
            'description': "Maximum detail preservation"
        },
        PresetType.SIMPLE_SHAPES: {
            'threshold': 115,
            'blur_radius': 4,
            'min_area': 300,
            'simplification': 0.05,
            'face_enhancement': False,
            'remove_background': False,
            'detail_preservation': 0.2,
            'description': "Basic geometry and shapes"
        }
    }
    
    def __init__(self):
        self.analyzer = ImageAnalyzer()
        self.bg_remover = BackgroundRemover()
        self.svg_converter = SVGConverter()
        
        # Processing state
        self.original_image = None
        self.processed_image = None
        self.contours = None
        self.analysis = None
        self.last_settings = None
        
        logger.info("Ultimate SVG Processor initialized")
    
    def load_image(self, image_path: str) -> bool:
        """Load image from file path with support for various formats including HEIC"""
        try:
            # First try OpenCV for standard formats
            self.original_image = cv2.imread(image_path)
            
            # If OpenCV fails, try PIL for HEIC and other formats
            if self.original_image is None:
                try:
                    # Use PIL to load the image (supports HEIC)
                    pil_image = Image.open(image_path)
                    # Convert to RGB if needed
                    if pil_image.mode != 'RGB':
                        pil_image = pil_image.convert('RGB')
                    # Convert PIL image to OpenCV format
                    self.original_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
                    logger.info(f"Image loaded via PIL: {image_path}")
                except Exception as pil_error:
                    logger.error(f"Could not load image with PIL: {pil_error}")
                    return False
            else:
                logger.info(f"Image loaded via OpenCV: {image_path}")
            
            if self.original_image is None:
                logger.error(f"Could not load image: {image_path}")
                return False
            
            # Analyze image
            self.analysis = self.analyzer.analyze_image(self.original_image)
            logger.info(f"Image loaded successfully: {image_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error loading image: {e}")
            return False
    
    def load_image_from_array(self, image_array: np.ndarray) -> bool:
        """Load image from numpy array"""
        try:
            self.original_image = image_array.copy()
            self.analysis = self.analyzer.analyze_image(self.original_image)
            logger.info("Image loaded from array successfully")
            return True
        except Exception as e:
            logger.error(f"Error loading image from array: {e}")
            return False
    
    def apply_preset(self, preset: PresetType, settings: ProcessingSettings) -> ProcessingSettings:
        """Apply preset to settings"""
        if preset not in self.PRESETS:
            logger.warning(f"Unknown preset: {preset}")
            return settings
        
        preset_config = self.PRESETS[preset]
        
        # Update settings with preset values
        settings.threshold = preset_config['threshold']
        settings.blur_radius = preset_config['blur_radius']
        settings.min_area = preset_config['min_area']
        settings.simplification = preset_config['simplification']
        settings.face_enhancement = preset_config['face_enhancement']
        settings.remove_background = preset_config['remove_background']
        settings.detail_preservation = preset_config['detail_preservation']
        settings.preset = preset
        
        logger.info(f"Applied preset: {preset.value}")
        return settings
    
    def optimize_for_material(self, material: MaterialType, settings: ProcessingSettings) -> ProcessingSettings:
        """Optimize settings for specific material"""
        if material not in self.MATERIAL_SETTINGS:
            logger.warning(f"Unknown material: {material}")
            return settings
        
        material_config = self.MATERIAL_SETTINGS[material]
        
        # Update material-specific settings
        settings.material = material
        settings.min_area = max(settings.min_area, material_config['min_area'])
        settings.simplification = max(settings.simplification, material_config['simplification'])
        settings.morphology_size = material_config['morphology_size']
        
        logger.info(f"Optimized for material: {material.value}")
        return settings
    
    def auto_optimize_settings(self, settings: ProcessingSettings) -> ProcessingSettings:
        """Automatically optimize settings based on image analysis"""
        if self.analysis is None:
            return settings
        
        # Recommend preset if not already set
        if settings.preset is None:
            recommended_preset = self.analyzer.recommend_preset(self.analysis)
            settings = self.apply_preset(recommended_preset, settings)
        
        # Adjust for image characteristics
        if self.analysis['contrast'] < 30:
            settings.threshold = max(settings.threshold - 10, 80)
        elif self.analysis['contrast'] > 80:
            settings.threshold = min(settings.threshold + 10, 200)
        
        # Adjust for detail level
        if self.analysis['edge_density'] > 0.1:
            settings.blur_radius = min(settings.blur_radius + 1, 5)
            settings.min_area = max(settings.min_area, 100)
        
        logger.info("Applied automatic optimization")
        return settings
    
    def process_image(self, settings: ProcessingSettings, 
                     progress_callback=None) -> ProcessingResult:
        """Main image processing pipeline"""
        if self.original_image is None:
            raise ValueError("No image loaded")
        
        start_time = time.time()
        
        try:
            # Step 1: Preparation
            if progress_callback:
                progress_callback(10, "Preparing image...")
            
            working_image = self.original_image.copy()
            
            # Step 2: Background removal if requested
            if settings.remove_background and self.bg_remover.available:
                if progress_callback:
                    progress_callback(20, "Removing background...")
                working_image = self.bg_remover.remove_background(working_image)
            
            # Step 3: Convert to grayscale
            if progress_callback:
                progress_callback(30, "Converting to grayscale...")
            gray = cv2.cvtColor(working_image, cv2.COLOR_BGR2GRAY) if len(working_image.shape) == 3 else working_image
            
            # Step 4: Face enhancement if requested
            if settings.face_enhancement and self.analyzer.face_detection_available:
                if progress_callback:
                    progress_callback(40, "Enhancing faces...")
                gray = self._enhance_faces(gray)
            
            # Step 5: Apply advanced smoothing for noise reduction
            if settings.blur_radius > 0:
                if progress_callback:
                    progress_callback(50, "Applying advanced smoothing...")
                
                # Use bilateral filter for edge-preserving noise reduction
                if settings.blur_radius >= 3:
                    # For heavy smoothing, use bilateral filter to preserve edges
                    gray = cv2.bilateralFilter(gray, 9, settings.blur_radius * 20, settings.blur_radius * 20)
                elif settings.blur_radius >= 2:
                    # Medium smoothing: combine median filter and Gaussian blur
                    gray = cv2.medianBlur(gray, 5)  # Remove salt-and-pepper noise
                    gray = cv2.GaussianBlur(gray, (settings.blur_radius*2+1, settings.blur_radius*2+1), 0)
                else:
                    # Light smoothing: just Gaussian blur
                    gray = cv2.GaussianBlur(gray, (settings.blur_radius*2+1, settings.blur_radius*2+1), 0)
            
            # Step 6: Threshold to binary
            if progress_callback:
                progress_callback(60, "Converting to black and white...")
            _, binary = cv2.threshold(gray, settings.threshold, 255, cv2.THRESH_BINARY)
            
            # Step 7: Advanced morphological operations for noise removal
            if progress_callback:
                progress_callback(70, "Cleaning edges and removing noise...")
            
            # Use different kernels for different operations
            close_kernel = np.ones((settings.morphology_size, settings.morphology_size), np.uint8)
            open_kernel = np.ones((max(1, settings.morphology_size - 1), max(1, settings.morphology_size - 1)), np.uint8)
            
            # Close gaps first (connect nearby components)
            binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, close_kernel)
            
            # Remove small noise with opening operation
            binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, open_kernel)
            
            # Additional noise removal for very noisy images
            if settings.blur_radius >= 2:
                # Remove very small connected components (noise)
                num_labels, labels = cv2.connectedComponents(binary)
                min_area = settings.min_area // 4  # Quarter of minimum area for noise detection
                
                # Create mask for components to keep
                mask = np.zeros_like(binary)
                for label in range(1, num_labels):
                    component_mask = (labels == label).astype(np.uint8) * 255
                    area = cv2.countNonZero(component_mask)
                    if area >= min_area:
                        mask = cv2.bitwise_or(mask, component_mask)
                
                binary = mask
            
            # Step 8: Find and filter contours
            if progress_callback:
                progress_callback(80, "Finding cut paths...")
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            filtered_contours = [c for c in contours if cv2.contourArea(c) >= settings.min_area]
            
            # Step 9: Simplify contours
            if progress_callback:
                progress_callback(90, "Optimizing for cutting...")
            simplified_contours = []
            for contour in filtered_contours:
                epsilon = settings.simplification * cv2.arcLength(contour, True)
                simplified = cv2.approxPolyDP(contour, epsilon, True)
                simplified_contours.append(simplified)
            
            # Step 10: Calculate metrics
            if progress_callback:
                progress_callback(95, "Calculating metrics...")
            metrics = self._calculate_metrics(simplified_contours, binary, settings)
            
            # Step 11: Generate recommendations
            recommendations = self.analyzer.generate_recommendations(self.analysis)
            
            processing_time = time.time() - start_time
            
            if progress_callback:
                progress_callback(100, "Processing complete!")
            
            # Store results
            self.processed_image = binary
            self.contours = simplified_contours
            self.last_settings = settings
            
            return ProcessingResult(
                processed_image=binary,
                contours=simplified_contours,
                original_size=(self.original_image.shape[1], self.original_image.shape[0]),
                processing_time=processing_time,
                metrics=metrics.__dict__,
                recommendations=recommendations
            )
            
        except Exception as e:
            logger.error(f"Processing failed: {e}")
            raise
    
    def _enhance_faces(self, gray_image: np.ndarray) -> np.ndarray:
        """Apply face-specific enhancements"""
        try:
            faces = self.analyzer.face_cascade.detectMultiScale(gray_image, 1.1, 4)
            enhanced = gray_image.copy()
            
            for (x, y, w, h) in faces:
                face_region = enhanced[y:y+h, x:x+w]
                face_enhanced = cv2.equalizeHist(face_region)
                alpha = 0.7
                enhanced[y:y+h, x:x+w] = cv2.addWeighted(
                    face_region, 1-alpha, face_enhanced, alpha, 0)
            
            return enhanced
        except Exception as e:
            logger.warning(f"Face enhancement failed: {e}")
            return gray_image
    
    def _calculate_metrics(self, contours: List[np.ndarray], binary_image: np.ndarray, 
                          settings: ProcessingSettings) -> CuttingMetrics:
        """Calculate cutting metrics and analysis"""
        total_contours = len(contours)
        total_points = sum(len(contour) for contour in contours)
        
        # Complexity assessment
        if total_points < 200:
            complexity = "Simple"
        elif total_points < 800:
            complexity = "Medium"
        else:
            complexity = "Complex"
        
        # Cut area calculation
        if binary_image is not None:
            white_pixels = np.sum(binary_image == 255)
            total_pixels = binary_image.size
            cut_area_percentage = (white_pixels / total_pixels) * 100
        else:
            cut_area_percentage = 0
        
        # Time estimation (based on empirical data)
        base_time = total_points * 0.02  # 0.02 seconds per point
        material_factor = self.MATERIAL_SETTINGS[settings.material].get('max_complexity', 0.5)
        estimated_time_minutes = (base_time / material_factor) / 60
        
        # Recommended settings
        material_config = self.MATERIAL_SETTINGS[settings.material]
        recommended_settings = {
            'material_description': material_config['description'],
            'complexity_rating': complexity,
            'optimal_for_material': total_points <= (material_config['max_complexity'] * 1000)
        }
        
        return CuttingMetrics(
            complexity=complexity,
            cut_paths=total_contours,
            cut_area_percentage=cut_area_percentage,
            estimated_time_minutes=estimated_time_minutes,
            total_points=total_points,
            recommended_settings=recommended_settings
        )
    
    def export_svg(self, file_path: str) -> bool:
        """Export processed image as SVG"""
        if self.contours is None:
            logger.error("No processed contours available for export")
            return False
        
        try:
            svg_content = self.svg_converter.create_svg_content(
                self.contours, 
                (self.original_image.shape[1], self.original_image.shape[0])
            )
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(svg_content)
            
            logger.info(f"SVG exported successfully: {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"SVG export failed: {e}")
            return False
    
    def save_project(self, file_path: str, settings: ProcessingSettings) -> bool:
        """Save project settings to JSON"""
        try:
            project_data = {
                'version': '1.0',
                'timestamp': time.time(),
                'settings': {
                    'threshold': settings.threshold,
                    'blur_radius': settings.blur_radius,
                    'min_area': settings.min_area,
                    'simplification': settings.simplification,
                    'morphology_size': settings.morphology_size,
                    'face_enhancement': settings.face_enhancement,
                    'remove_background': settings.remove_background,
                    'detail_preservation': settings.detail_preservation,
                    'material': settings.material.value,
                    'auto_optimize': settings.auto_optimize,
                    'preset': settings.preset.value if settings.preset else None
                },
                'analysis': self.analysis,
                'has_rembg': REMBG_AVAILABLE
            }
            
            with open(file_path, 'w') as f:
                json.dump(project_data, f, indent=2)
            
            logger.info(f"Project saved: {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save project: {e}")
            return False
    
    def load_project(self, file_path: str) -> Optional[ProcessingSettings]:
        """Load project settings from JSON"""
        try:
            with open(file_path, 'r') as f:
                project_data = json.load(f)
            
            settings_data = project_data.get('settings', {})
            
            settings = ProcessingSettings(
                threshold=settings_data.get('threshold', 128),
                blur_radius=settings_data.get('blur_radius', 2),
                min_area=settings_data.get('min_area', 100),
                simplification=settings_data.get('simplification', 0.02),
                morphology_size=settings_data.get('morphology_size', 3),
                face_enhancement=settings_data.get('face_enhancement', True),
                remove_background=settings_data.get('remove_background', False),
                detail_preservation=settings_data.get('detail_preservation', 0.5),
                material=MaterialType(settings_data.get('material', 'cardstock')),
                auto_optimize=settings_data.get('auto_optimize', True)
            )
            
            # Handle preset
            preset_value = settings_data.get('preset')
            if preset_value:
                settings.preset = PresetType(preset_value)
            
            logger.info(f"Project loaded: {file_path}")
            return settings
            
        except Exception as e:
            logger.error(f"Failed to load project: {e}")
            return None
    
    def get_available_features(self) -> Dict[str, bool]:
        """Get dictionary of available features"""
        return {
            'face_detection': self.analyzer.face_detection_available,
            'background_removal': self.bg_remover.available,
            'rembg_library': REMBG_AVAILABLE
        }