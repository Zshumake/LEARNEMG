"""
Ultimate SVG Converter - Desktop Application
Professional Cricut SVG conversion tool with AI features
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import cv2
import numpy as np
from PIL import Image, ImageTk, ImageFilter, ImageEnhance
import threading
import time
import os
from pathlib import Path
import logging
from typing import Optional, Callable, List, Dict, Any

# Try to import drag and drop support
try:
    from tkinterdnd2 import TkinterDnD, DND_FILES
    DND_AVAILABLE = True
except ImportError:
    DND_AVAILABLE = False

# Import our core engine
from core_engine import (
    UltimateSVGProcessor, ProcessingSettings, MaterialType, PresetType,
    ProcessingResult, CuttingMetrics
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('ultimate_svg_converter.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ModernUI:
    """Modern UI styling and components"""
    
    # Olive Green & Light Brown Theme - Professional and Easy to Read
    COLORS = {
        'primary': '#2d3e2e',          # Dark olive green
        'secondary': '#3e5540',        # Medium olive green
        'accent': '#6b7a47',           # Light olive green
        'surface': '#8b7355',          # Light brown
        'background': '#f5f2e8',       # Cream background
        'success': '#556b2f',          # Dark olive green
        'warning': '#cd853f',          # Peru brown
        'danger': '#a0522d',           # Sienna brown
        'info': '#6b7a47',             # Olive info color
        'text': '#ffffff',             # White text for dark backgrounds
        'text_dark': '#2d3e2e',        # Dark text for light backgrounds
        'text_muted': '#5a6b3b',       # Muted olive text
        'border': '#8b7355',           # Brown borders
        'canvas_bg': '#2d3e2e',        # Dark olive canvas background
        # High-contrast button colors
        'button_primary': '#556b2f',       # Dark olive green
        'button_secondary': '#8b7355',     # Medium brown  
        'button_success': '#6b7a47',       # Light olive
        'button_warning': '#cd853f',       # Peru brown
        'button_danger': '#a0522d',        # Sienna brown
        'button_text': '#ffffff',          # Always white text on buttons
        'button_text_light': '#f5f2e8'     # Cream text on dark buttons
    }
    
    @staticmethod
    def style_button(button: tk.Button, style: str = 'primary', **kwargs):
        """Apply modern styling to buttons with high contrast olive/brown theme"""
        colors = {
            'primary': (ModernUI.COLORS['button_primary'], ModernUI.COLORS['button_text']),
            'success': (ModernUI.COLORS['button_success'], ModernUI.COLORS['button_text']),
            'warning': (ModernUI.COLORS['button_warning'], ModernUI.COLORS['button_text']),
            'danger': (ModernUI.COLORS['button_danger'], ModernUI.COLORS['button_text']),
            'secondary': (ModernUI.COLORS['button_secondary'], ModernUI.COLORS['button_text'])
        }
        
        bg_color, fg_color = colors.get(style, colors['primary'])
        
        # Set default styling
        config = {
            'bg': bg_color,
            'fg': fg_color,
            'font': ('Arial', 11, 'bold'),
            'relief': 'flat',
            'bd': 0,
            'padx': 20,
            'pady': 12,
            'activebackground': ModernUI._darken_color(bg_color),
            'activeforeground': fg_color,
            'cursor': 'hand2'
        }
        
        # Override defaults with any provided kwargs
        config.update(kwargs)
        
        button.config(**config)
    
    @staticmethod
    def _darken_color(color: str, factor: float = 0.8) -> str:
        """Darken a hex color"""
        color = color.lstrip('#')
        rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))
        darkened = tuple(max(0, int(c * factor)) for c in rgb)
        return f"#{darkened[0]:02x}{darkened[1]:02x}{darkened[2]:02x}"
    
    @staticmethod
    def create_card(parent: tk.Widget, title: str) -> tuple:
        """Create a modern card-style container"""
        card_container = tk.Frame(parent, bg=ModernUI.COLORS['secondary'])
        card_container.pack(fill="x", padx=10, pady=8)
        
        card_frame = tk.Frame(card_container, bg=ModernUI.COLORS['accent'], relief="flat", bd=1)
        card_frame.pack(fill="x", padx=2, pady=2)
        
        # Header
        header_frame = tk.Frame(card_frame, bg=ModernUI.COLORS['accent'], height=40)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        title_label = tk.Label(
            header_frame, text=title, 
            font=('Arial', 12, 'bold'), 
            bg=ModernUI.COLORS['accent'], 
            fg=ModernUI.COLORS['text']
        )
        title_label.pack(anchor="w", pady=5)
        
        # Content area
        content_frame = tk.Frame(card_frame, bg=ModernUI.COLORS['accent'])
        content_frame.pack(fill="x", padx=15, pady=(0, 15))
        
        return card_frame, content_frame

class UltimateSVGDesktop:
    """Main desktop application class"""
    
    def __init__(self):
        # Initialize window
        if DND_AVAILABLE:
            self.window = TkinterDnD.Tk()
            self.dnd_available = True
        else:
            self.window = tk.Tk()
            self.dnd_available = False
            logger.warning("tkinterdnd2 not available, drag and drop disabled")
        
        self.window.title("Ultimate SVG Converter - Professional Cricut Tool")
        self.window.geometry("1600x1000")
        self.window.configure(bg=ModernUI.COLORS['primary'])
        self.window.minsize(1200, 800)
        
        # Processing engine
        self.processor = UltimateSVGProcessor()
        self.current_settings = ProcessingSettings()
        
        # UI state
        self.zoom_factor = 1.0
        self.live_preview_enabled = True
        self.preview_update_pending = False
        self.processing_thread = None
        self.current_image_path = None
        
        # UI elements (will be created in setup_ui)
        self.preview_canvas = None
        self.photo_image = None
        self.canvas_placeholder = None
        self.progress_var = None
        self.progress_bar = None
        self.status_label = None
        self.header_status = None
        
        # Control variables
        self.threshold_var = tk.IntVar(value=self.current_settings.threshold)
        self.blur_var = tk.IntVar(value=self.current_settings.blur_radius)
        self.min_area_var = tk.IntVar(value=self.current_settings.min_area)
        self.simplification_var = tk.DoubleVar(value=self.current_settings.simplification * 1000)
        self.detail_var = tk.DoubleVar(value=self.current_settings.detail_preservation * 100)
        self.face_enhancement_var = tk.BooleanVar(value=self.current_settings.face_enhancement)
        self.remove_background_var = tk.BooleanVar(value=self.current_settings.remove_background)
        self.live_preview_var = tk.BooleanVar(value=True)
        self.auto_optimize_var = tk.BooleanVar(value=self.current_settings.auto_optimize)
        self.preset_var = tk.StringVar(value="portrait")
        self.material_var = tk.StringVar(value="cardstock")
        
        # Metrics labels (will be created in setup_ui)
        self.complexity_label = None
        self.cut_paths_label = None
        self.cut_area_label = None
        self.est_time_label = None
        
        # Recommendations text widget
        self.recommendations_text = None
        
        # Bind variable changes to update methods
        self._bind_variables()
        
        # Setup UI
        self.setup_ui()
        
        # Check available features
        self._check_features()
        
        logger.info("Ultimate SVG Desktop initialized successfully")
    
    def _bind_variables(self):
        """Bind control variables to update methods"""
        self.threshold_var.trace('w', self._on_setting_change)
        self.blur_var.trace('w', self._on_setting_change)
        self.min_area_var.trace('w', self._on_setting_change)
        self.simplification_var.trace('w', self._on_setting_change)
        self.detail_var.trace('w', self._on_setting_change)
        self.face_enhancement_var.trace('w', self._on_setting_change)
        self.remove_background_var.trace('w', self._on_setting_change)
    
    def _on_setting_change(self, *args):
        """Handle setting changes"""
        self._update_settings_from_ui()
        if self.live_preview_enabled:
            self._schedule_preview_update()
    
    def _update_settings_from_ui(self):
        """Update settings object from UI controls"""
        self.current_settings.threshold = self.threshold_var.get()
        self.current_settings.blur_radius = self.blur_var.get()
        self.current_settings.min_area = self.min_area_var.get()
        self.current_settings.simplification = self.simplification_var.get() / 1000
        self.current_settings.detail_preservation = self.detail_var.get() / 100
        self.current_settings.face_enhancement = self.face_enhancement_var.get()
        # Background removal is now manual only - don't auto-set
        self.current_settings.remove_background = False
        self.current_settings.auto_optimize = self.auto_optimize_var.get()
        
        # Update material
        material_map = {
            'vinyl': MaterialType.VINYL,
            'cardstock': MaterialType.CARDSTOCK,
            'poster_board': MaterialType.POSTER_BOARD,
            'fabric': MaterialType.FABRIC,
            'leather': MaterialType.LEATHER,
            'chipboard': MaterialType.CHIPBOARD
        }
        self.current_settings.material = material_map.get(self.material_var.get(), MaterialType.CARDSTOCK)
        
        # Update preset
        preset_map = {
            'portrait': PresetType.PORTRAIT,
            'landscape': PresetType.LANDSCAPE,
            'logo_text': PresetType.LOGO_TEXT,
            'silhouette': PresetType.SILHOUETTE,
            'detailed_art': PresetType.DETAILED_ART,
            'simple_shapes': PresetType.SIMPLE_SHAPES
        }
        self.current_settings.preset = preset_map.get(self.preset_var.get())
    
    def setup_ui(self):
        """Create the main user interface"""
        self.setup_header()
        
        # Main container
        main_frame = tk.Frame(self.window, bg=ModernUI.COLORS['primary'])
        main_frame.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        # Three-panel layout
        self.setup_control_panel(main_frame)
        self.setup_preview_panel(main_frame)
        self.setup_analysis_panel(main_frame)
    
    def setup_header(self):
        """Create the application header"""
        header_frame = tk.Frame(self.window, bg=ModernUI.COLORS['secondary'], height=80)
        header_frame.pack(fill="x", padx=15, pady=(15, 0))
        header_frame.pack_propagate(False)
        
        title_frame = tk.Frame(header_frame, bg=ModernUI.COLORS['secondary'])
        title_frame.pack(expand=True, fill="both")
        
        # Icon and title
        icon_label = tk.Label(
            title_frame, text="✂", font=("Arial", 28), 
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['info']
        )
        icon_label.pack(side="left", padx=(20, 15), pady=20)
        
        title_text = tk.Frame(title_frame, bg=ModernUI.COLORS['secondary'])
        title_text.pack(side="left", pady=20)
        
        tk.Label(
            title_text, text="Ultimate SVG Converter", 
            font=("Arial", 20, "bold"), 
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['text']
        ).pack(anchor="w")
        
        tk.Label(
            title_text, text="Professional AI-powered image to Cricut SVG conversion", 
            font=("Arial", 11), 
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['text_muted']
        ).pack(anchor="w")
        
        # Status indicator
        self.header_status = tk.Label(
            title_frame, text="● Ready", 
            font=("Arial", 12, "bold"), 
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['success']
        )
        self.header_status.pack(side="right", padx=20, pady=20)
    
    def setup_control_panel(self, parent):
        """Setup the left control panel"""
        control_container = tk.Frame(parent, bg=ModernUI.COLORS['primary'])
        control_container.pack(side="left", fill="y", padx=(0, 15))
        
        # Scrollable frame
        canvas = tk.Canvas(control_container, bg=ModernUI.COLORS['secondary'], 
                          width=380, highlightthickness=0)
        scrollbar = ttk.Scrollbar(control_container, orient="vertical", command=canvas.yview)
        scrollable_frame = tk.Frame(canvas, bg=ModernUI.COLORS['secondary'])
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        # Enable mouse wheel and two-finger trackpad scrolling
        def _on_mousewheel(event):
            canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        
        # Bind mouse wheel events (works on both Windows and macOS)
        canvas.bind("<MouseWheel>", _on_mousewheel)  # Windows
        canvas.bind("<Button-4>", lambda e: canvas.yview_scroll(-1, "units"))  # Linux/macOS up
        canvas.bind("<Button-5>", lambda e: canvas.yview_scroll(1, "units"))   # Linux/macOS down
        
        # Make the entire scrollable frame focusable for trackpad scrolling
        def _on_frame_click(event):
            canvas.focus_set()
        scrollable_frame.bind("<Button-1>", _on_frame_click)
        canvas.bind("<Button-1>", _on_frame_click)
        
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Create control cards
        self.setup_file_card(scrollable_frame)
        self.setup_quick_actions_card(scrollable_frame)
        self.setup_presets_card(scrollable_frame)
        self.setup_material_card(scrollable_frame)
        self.setup_ai_features_card(scrollable_frame)
        self.setup_advanced_settings_card(scrollable_frame)
        self.setup_processing_card(scrollable_frame)
    
    def setup_file_card(self, parent):
        """Setup file selection card"""
        card, content = ModernUI.create_card(parent, "📁 Image Selection")
        
        # Drag and drop area
        drop_frame = tk.Frame(content, bg=ModernUI.COLORS['surface'], 
                             relief="solid", bd=2, height=100)
        drop_frame.pack(fill="x", pady=(0, 10))
        drop_frame.pack_propagate(False)
        
        if self.dnd_available:
            drop_frame.drop_target_register(DND_FILES)
            drop_frame.dnd_bind('<<Drop>>', self.handle_drop)
        
        drop_content = tk.Frame(drop_frame, bg=ModernUI.COLORS['surface'])
        drop_content.pack(expand=True, fill="both")
        
        if self.dnd_available:
            tk.Label(
                drop_content, text="📎 Drag & Drop Image Here", 
                font=("Arial", 12, "bold"), 
                bg=ModernUI.COLORS['surface'], fg=ModernUI.COLORS['text']
            ).pack(expand=True)
            tk.Label(
                drop_content, text="Supports: JPG, PNG, BMP, TIFF, HEIC", 
                font=("Arial", 9), 
                bg=ModernUI.COLORS['surface'], fg=ModernUI.COLORS['text_muted']
            ).pack()
        else:
            tk.Label(
                drop_content, text="📂 Click Button Below to Load Image", 
                font=("Arial", 12, "bold"), 
                bg=ModernUI.COLORS['surface'], fg=ModernUI.COLORS['text']
            ).pack(expand=True)
        
        # Load button
        load_btn = tk.Button(content, text="📂 Choose Image File", command=self.load_image)
        ModernUI.style_button(load_btn, 'primary')
        load_btn.pack(fill="x", pady=(0, 10))
        
        # File status
        self.file_label = tk.Label(
            content, text="No image loaded", 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'], 
            wraplength=320, font=("Arial", 9), justify="left"
        )
        self.file_label.pack(anchor="w")
    
    def setup_quick_actions_card(self, parent):
        """Setup quick action toggles"""
        card, content = ModernUI.create_card(parent, "⚡ Quick Actions")
        
        # Live preview toggle
        preview_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        preview_frame.pack(fill="x", pady=5)
        
        preview_check = tk.Checkbutton(
            preview_frame, text="🔄 Live Preview", 
            variable=self.live_preview_var,
            command=self.toggle_live_preview,
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
            selectcolor=ModernUI.COLORS['success'],
            font=("Arial", 11, "bold"),
            activebackground=ModernUI.COLORS['accent'], 
            activeforeground=ModernUI.COLORS['text']
        )
        preview_check.pack(anchor="w")
        
        # Auto optimize toggle
        auto_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        auto_frame.pack(fill="x", pady=5)
        
        auto_check = tk.Checkbutton(
            auto_frame, text="🧠 Auto Optimize", 
            variable=self.auto_optimize_var,
            command=self.on_auto_optimize_change,
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
            selectcolor=ModernUI.COLORS['info'],
            font=("Arial", 11, "bold"),
            activebackground=ModernUI.COLORS['accent'], 
            activeforeground=ModernUI.COLORS['text']
        )
        auto_check.pack(anchor="w")
    
    def setup_presets_card(self, parent):
        """Setup presets selection"""
        card, content = ModernUI.create_card(parent, "🎨 Smart Presets")
        
        presets = [
            ("👤 Portrait", "portrait", "Faces and people"),
            ("🌅 Landscape", "landscape", "Scenery and nature"),
            ("📝 Logo/Text", "logo_text", "Clean graphics"),
            ("🌅 Silhouette", "silhouette", "Simple outlines"),
            ("🎨 Detailed Art", "detailed_art", "Maximum detail"),
            ("⚡ Simple Shapes", "simple_shapes", "Basic geometry")
        ]
        
        for text, value, desc in presets:
            preset_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
            preset_frame.pack(fill="x", pady=2)
            
            radio = tk.Radiobutton(
                preset_frame, text=text, variable=self.preset_var, 
                value=value, command=self.apply_preset,
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
                selectcolor=ModernUI.COLORS['info'],
                font=("Arial", 10, "bold"),
                activebackground=ModernUI.COLORS['accent'], 
                activeforeground=ModernUI.COLORS['text']
            )
            radio.pack(anchor="w")
            
            tk.Label(
                preset_frame, text=desc, 
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'],
                font=("Arial", 8), wraplength=300
            ).pack(anchor="w", padx=20)
    
    def setup_material_card(self, parent):
        """Setup material selection"""
        card, content = ModernUI.create_card(parent, "🔧 Target Material")
        
        tk.Label(
            content, text="Select your cutting material:", 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'],
            font=("Arial", 10, "bold")
        ).pack(anchor="w", pady=(0, 5))
        
        materials = [
            ("vinyl", "Vinyl - Fine details"),
            ("cardstock", "Cardstock - Standard"),
            ("poster_board", "Poster Board - Thick"),
            ("fabric", "Fabric - Textile"),
            ("leather", "Leather - Heavy duty"),
            ("chipboard", "Chipboard - Maximum")
        ]
        
        for value, text in materials:
            material_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
            material_frame.pack(fill="x", pady=1)
            
            radio = tk.Radiobutton(
                material_frame, text=text, variable=self.material_var, 
                value=value, command=self.on_material_change,
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
                selectcolor=ModernUI.COLORS['warning'],
                font=("Arial", 9),
                activebackground=ModernUI.COLORS['accent'], 
                activeforeground=ModernUI.COLORS['text']
            )
            radio.pack(anchor="w")
    
    def setup_ai_features_card(self, parent):
        """Setup AI features"""
        card, content = ModernUI.create_card(parent, "🤖 AI Features")
        
        # Background removal
        bg_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        bg_frame.pack(fill="x", pady=5)
        
        if self.processor.bg_remover.available:
            tk.Label(
                bg_frame, text="✅ AI Background Removal Available",
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['success'],
                font=("Arial", 11, "bold")
            ).pack(anchor="w")
            
            tk.Label(
                bg_frame, text="Use 'Apply Background Removal' button in Processing section for best performance",
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'],
                font=("Arial", 8), wraplength=300
            ).pack(anchor="w")
        else:
            tk.Label(
                bg_frame, text="🗑️ Background Removal Unavailable", 
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['danger'], 
                font=("Arial", 11, "bold")
            ).pack(anchor="w")
            tk.Label(
                bg_frame, text="Install 'rembg' package: pip install rembg", 
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'], 
                font=("Arial", 8)
            ).pack(anchor="w", pady=(5, 0))
        
        # Face enhancement
        face_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        face_frame.pack(fill="x", pady=5)
        
        if self.processor.analyzer.face_detection_available:
            face_check = tk.Checkbutton(
                face_frame, text="👥 Face Enhancement", 
                variable=self.face_enhancement_var,
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
                selectcolor=ModernUI.COLORS['info'],
                font=("Arial", 11, "bold"),
                activebackground=ModernUI.COLORS['accent'], 
                activeforeground=ModernUI.COLORS['text']
            )
            face_check.pack(anchor="w")
            
            tk.Label(
                face_frame, text="✨ Enhance facial features automatically", 
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'], 
                font=("Arial", 9)
            ).pack(anchor="w", padx=20)
        else:
            tk.Label(
                face_frame, text="👥 Face Detection Unavailable", 
                bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['danger'], 
                font=("Arial", 11, "bold")
            ).pack(anchor="w")
    
    def setup_advanced_settings_card(self, parent):
        """Setup advanced parameter controls"""
        card, content = ModernUI.create_card(parent, "⚙️ Advanced Settings")
        
        # Create sliders for fine control
        self.create_modern_slider(content, "🎚️ Threshold", self.threshold_var, 0, 255, 
                                "Black/white separation")
        
        self.create_modern_slider(content, "🌫️ Blur Radius", self.blur_var, 0, 10, 
                                "Pre-processing smoothing")
        
        self.create_modern_slider(content, "📏 Min Area", self.min_area_var, 10, 500, 
                                "Filter tiny details")
        
        self.create_modern_slider(content, "✂️ Simplification", self.simplification_var, 1, 50, 
                                "Reduce cut complexity")
        
        self.create_modern_slider(content, "🎯 Detail Level", self.detail_var, 10, 90, 
                                "Detail vs simplicity")
    
    def create_modern_slider(self, parent, label, variable, min_val, max_val, tooltip):
        """Create a modern slider with value display"""
        slider_frame = tk.Frame(parent, bg=ModernUI.COLORS['accent'])
        slider_frame.pack(fill="x", pady=8)
        
        # Header with label and value
        header_frame = tk.Frame(slider_frame, bg=ModernUI.COLORS['accent'])
        header_frame.pack(fill="x")
        
        tk.Label(
            header_frame, text=label, 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'], 
            font=("Arial", 9, "bold")
        ).pack(side="left")
        
        value_label = tk.Label(
            header_frame, text=str(variable.get()), 
            bg=ModernUI.COLORS['info'], fg=ModernUI.COLORS['text'], 
            font=("Arial", 8, "bold"), padx=8, pady=2
        )
        value_label.pack(side="right")
        
        # Slider
        slider = tk.Scale(
            slider_frame, from_=min_val, to=max_val, orient="horizontal",
            variable=variable, bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'],
            troughcolor=ModernUI.COLORS['surface'], activebackground=ModernUI.COLORS['info'],
            highlightthickness=0, bd=0, font=("Arial", 8),
            command=lambda v: self.update_slider_display(value_label, variable, v)
        )
        slider.pack(fill="x", pady=(5, 0))
        
        # Tooltip
        tk.Label(
            slider_frame, text=tooltip, 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text_muted'],
            font=("Arial", 8), wraplength=320
        ).pack(anchor="w")
    
    def update_slider_display(self, label, variable, value):
        """Update slider value display and trigger automatic processing"""
        label.config(text=str(int(float(value))))
        # Automatically process when any slider changes
        if self.processor.original_image is not None:
            self._schedule_preview_update()
    
    def setup_processing_card(self, parent):
        """Setup processing controls"""
        card, content = ModernUI.create_card(parent, "🚀 Processing & Export")
        
        # Background removal button (separate from live preview for speed)
        bg_remove_btn = tk.Button(content, text="🤖 Apply Background Removal", command=self.apply_background_removal)
        ModernUI.style_button(bg_remove_btn, 'success')
        bg_remove_btn.pack(fill="x", pady=4)
        
        preview_btn = tk.Button(content, text="👁️ Preview Cut Lines", command=self.preview_cut_lines)
        ModernUI.style_button(preview_btn, 'primary')
        preview_btn.pack(fill="x", pady=4)
        
        export_btn = tk.Button(content, text="💾 Export SVG", command=self.export_svg)
        ModernUI.style_button(export_btn, 'warning')
        export_btn.pack(fill="x", pady=4)
        
        # Project management
        project_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        project_frame.pack(fill="x", pady=(15, 0))
        
        save_btn = tk.Button(project_frame, text="💾 Save Project", command=self.save_project)
        ModernUI.style_button(save_btn, 'secondary', padx=10, pady=8)
        save_btn.pack(side="left", padx=(0, 5), expand=True, fill="x")
        
        load_btn = tk.Button(project_frame, text="📁 Load Project", command=self.load_project)
        ModernUI.style_button(load_btn, 'secondary', padx=10, pady=8)
        load_btn.pack(side="right", expand=True, fill="x")
        
        # Progress section
        progress_frame = tk.Frame(content, bg=ModernUI.COLORS['accent'])
        progress_frame.pack(fill="x", pady=(15, 5))
        
        tk.Label(
            progress_frame, text="Progress:", 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['text'],
            font=("Arial", 9, "bold")
        ).pack(anchor="w")
        
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(progress_frame, variable=self.progress_var, maximum=100)
        self.progress_bar.pack(fill="x", pady=(5, 0))
        
        self.status_label = tk.Label(
            content, text="Ready to process", 
            bg=ModernUI.COLORS['accent'], fg=ModernUI.COLORS['success'], 
            font=("Arial", 9)
        )
        self.status_label.pack(anchor="w", pady=(5, 0))
    
    def setup_preview_panel(self, parent):
        """Setup the center preview panel"""
        preview_container = tk.Frame(parent, bg=ModernUI.COLORS['primary'])
        preview_container.pack(side="left", fill="both", expand=True, padx=(0, 15))
        
        preview_frame = tk.Frame(preview_container, bg=ModernUI.COLORS['secondary'], relief="flat", bd=0)
        preview_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        # Header
        header_frame = tk.Frame(preview_frame, bg=ModernUI.COLORS['secondary'], height=60)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        tk.Label(
            header_frame, text="🖼️ Image Preview", 
            font=("Arial", 16, "bold"), 
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['text']
        ).pack(side="left", pady=15)
        
        # Zoom controls
        zoom_frame = tk.Frame(header_frame, bg=ModernUI.COLORS['secondary'])
        zoom_frame.pack(side="right", pady=15)
        
        zoom_buttons = [
            ("🔍+", self.zoom_in),
            ("🔍-", self.zoom_out),
            ("⌂", self.reset_view)
        ]
        
        for text, command in zoom_buttons:
            btn = tk.Button(zoom_frame, text=text, command=command)
            ModernUI.style_button(btn, 'primary', padx=12, pady=6)
            btn.pack(side="left", padx=2)
        
        # Canvas area
        canvas_container = tk.Frame(preview_frame, bg=ModernUI.COLORS['primary'], relief="solid", bd=1)
        canvas_container.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        # Configure drag and drop for canvas
        if self.dnd_available:
            canvas_container.drop_target_register(DND_FILES)
            canvas_container.dnd_bind('<<Drop>>', self.handle_drop)
        
        self.preview_canvas = tk.Canvas(
            canvas_container, bg=ModernUI.COLORS['canvas_bg'], 
            highlightthickness=0, relief="flat"
        )
        self.preview_canvas.pack(fill="both", expand=True, padx=3, pady=3)
        
        # Bind canvas resize events
        self.preview_canvas.bind('<Configure>', self.on_canvas_resize)
        
        if self.dnd_available:
            self.preview_canvas.drop_target_register(DND_FILES)
            self.preview_canvas.dnd_bind('<<Drop>>', self.handle_drop)
        
        # Placeholder
        placeholder_text = "📷\n\n"
        if self.dnd_available:
            placeholder_text += "Drag & Drop Image Here\nor click 'Choose Image File'"
        else:
            placeholder_text += "Click 'Choose Image File'\nto load an image"
        
        self.canvas_placeholder = tk.Label(
            self.preview_canvas, 
            text=placeholder_text,
            font=("Arial", 16),
            bg="#0a0f1c", fg="#4a5568",
            justify="center"
        )
        self.canvas_placeholder.place(relx=0.5, rely=0.5, anchor="center")
    
    def setup_analysis_panel(self, parent):
        """Setup the right analysis panel"""
        analysis_container = tk.Frame(parent, bg=ModernUI.COLORS['primary'])
        analysis_container.pack(side="right", fill="y")
        
        analysis_frame = tk.Frame(
            analysis_container, bg=ModernUI.COLORS['secondary'], 
            relief="flat", bd=0, width=350
        )
        analysis_frame.pack(fill="both", expand=True, padx=5, pady=5)
        analysis_frame.pack_propagate(False)
        
        # Header
        header_frame = tk.Frame(analysis_frame, bg=ModernUI.COLORS['secondary'], height=60)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        tk.Label(
            header_frame, text="📊 Cut Analysis", 
            font=("Arial", 16, "bold"),
            bg=ModernUI.COLORS['secondary'], fg=ModernUI.COLORS['text']
        ).pack(pady=15)
        
        # Metrics card
        self.setup_metrics_card(analysis_frame)
        
        # Recommendations card
        self.setup_recommendations_card(analysis_frame)
    
    def setup_metrics_card(self, parent):
        """Setup cutting metrics display"""
        card, content = ModernUI.create_card(parent, "⚡ Cutting Metrics")
        
        # Metrics display
        metrics = [
            ("🎯", "Complexity", "complexity_label", ModernUI.COLORS['text_muted']),
            ("✂️", "Cut Paths", "cut_paths_label", ModernUI.COLORS['info']),
            ("📐", "Cut Area", "cut_area_label", ModernUI.COLORS['info']),
            ("⏱️", "Est. Time", "est_time_label", ModernUI.COLORS['success'])
        ]
        
        for icon, label, attr_name, color in metrics:
            metric_frame = tk.Frame(content, bg=ModernUI.COLORS['surface'], relief="flat", bd=0)
            metric_frame.pack(fill="x", pady=3)
            
            inner_frame = tk.Frame(metric_frame, bg=ModernUI.COLORS['surface'])
            inner_frame.pack(fill="x", padx=12, pady=8)
            
            left_frame = tk.Frame(inner_frame, bg=ModernUI.COLORS['surface'])
            left_frame.pack(side="left")
            
            tk.Label(
                left_frame, text=icon, font=("Arial", 12), 
                bg=ModernUI.COLORS['surface'], fg=color
            ).pack(side="left", padx=(0, 8))
            
            tk.Label(
                left_frame, text=label, font=("Arial", 9, "bold"), 
                bg=ModernUI.COLORS['surface'], fg=ModernUI.COLORS['text']
            ).pack(side="left")
            
            value_label = tk.Label(
                inner_frame, text="Unknown" if label == "Complexity" else "0", 
                font=("Arial", 10, "bold"),
                bg=ModernUI.COLORS['surface'], fg=color
            )
            value_label.pack(side="right")
            
            # Store reference to label
            setattr(self, attr_name, value_label)
    
    def setup_recommendations_card(self, parent):
        """Setup recommendations display"""
        card, content = ModernUI.create_card(parent, "💡 Smart Recommendations")
        
        self.recommendations_text = tk.Text(
            content, height=16, width=32,
            bg=ModernUI.COLORS['surface'], fg=ModernUI.COLORS['text'], 
            font=("Arial", 9),
            wrap="word", relief="flat", bd=0,
            padx=12, pady=12
        )
        self.recommendations_text.pack(fill="both", expand=True)
        
        # Welcome text
        welcome_text = """🎨 Ultimate SVG Converter Ready!

📋 Getting Started:
1. Load an image using drag & drop or the file button
2. Choose a smart preset for your project type
3. Select your target cutting material
4. Toggle Live Preview ON for real-time feedback
5. Adjust advanced settings if needed
6. Process and export as SVG for Cricut

🤖 AI Features:
• Background removal for clean portraits
• Face enhancement for better detail
• Smart preset recommendations
• Material-specific optimization
• Real-time cutting analysis

💡 Pro Tips:
• Use Portrait preset for faces
• Enable background removal for silhouettes
• Live preview shows cutting lines in green
• Different materials need different settings
• Complexity analysis helps estimate cut time

Ready to create amazing cuts! 🚀"""
        
        self.recommendations_text.insert("1.0", welcome_text)
        self.recommendations_text.config(state="disabled")
    
    def _check_features(self):
        """Check and report available features"""
        features = self.processor.get_available_features()
        feature_status = []
        
        if features['face_detection']:
            feature_status.append("✅ Face detection available")
        else:
            feature_status.append("❌ Face detection unavailable")
        
        if features['background_removal']:
            feature_status.append("✅ AI background removal available")
        else:
            feature_status.append("❌ AI background removal unavailable (install rembg)")
        
        if self.dnd_available:
            feature_status.append("✅ Drag & drop support available")
        else:
            feature_status.append("❌ Drag & drop unavailable (install tkinterdnd2)")
        
        logger.info("Feature availability: " + ", ".join(feature_status))
    
    def handle_drop(self, event):
        """Handle dropped files"""
        if not self.dnd_available:
            return
        
        try:
            files = event.data.split()
            if files:
                file_path = files[0].strip('{}')
                
                # Check if it's an image file
                valid_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.heic', '.gif')
                if file_path.lower().endswith(valid_extensions):
                    self.load_image_from_path(file_path)
                else:
                    messagebox.showwarning("Warning", "Please drop a valid image file")
        except Exception as e:
            logger.error(f"Error handling dropped file: {e}")
            messagebox.showerror("Error", f"Failed to load dropped file: {str(e)}")
    
    def load_image(self):
        """Load image from file dialog"""
        file_path = filedialog.askopenfilename(
            title="Select Image File",
            filetypes=[
                ("All Images", "*.jpg *.jpeg *.png *.bmp *.tiff *.heic *.gif"),
                ("JPEG files", "*.jpg *.jpeg"),
                ("PNG files", "*.png"),
                ("All files", "*.*")
            ]
        )
        
        if file_path:
            self.load_image_from_path(file_path)
    
    def load_image_from_path(self, file_path: str):
        """Load image from specified path"""
        try:
            success = self.processor.load_image(file_path)
            if success:
                self.current_image_path = file_path
                self.file_label.config(text=f"Loaded: {Path(file_path).name}")
                self.display_original_image()
                self.analyze_and_recommend()
                self.update_status("✅ Image loaded successfully", 'success')
                
                if self.live_preview_enabled:
                    self._schedule_preview_update()
            else:
                messagebox.showerror("Error", "Could not load the image file")
        except Exception as e:
            logger.error(f"Error loading image: {e}")
            messagebox.showerror("Error", f"Failed to load image: {str(e)}")
    
    def analyze_and_recommend(self):
        """Analyze image and show recommendations"""
        if self.processor.analysis is None:
            return
        
        analysis = self.processor.analysis
        recommendations = self.processor.analyzer.generate_recommendations(analysis)
        
        # Add analysis info to recommendations
        analysis_text = f"""📊 Image Analysis:
• Dimensions: {analysis['dimensions'][0]}×{analysis['dimensions'][1]}
• Content Type: {analysis['content_type'].title()}
• Faces Detected: {analysis['faces_detected']}
• Edge Density: {analysis['edge_density']:.3f}
• Contrast Level: {analysis['contrast']:.1f}

🎯 Smart Recommendations:
"""
        
        for rec in recommendations:
            analysis_text += f"• {rec}\n"
        
        analysis_text += f"""
🤖 Auto-Optimization:
• Recommended Preset: {self.processor.analyzer.recommend_preset(analysis).value.title()}
• Best Material: Depends on detail level
• Processing Tips: Adjust threshold if contrast is low

Ready to process! 🚀"""
        
        self.recommendations_text.config(state="normal")
        self.recommendations_text.delete(1.0, tk.END)
        self.recommendations_text.insert(1.0, analysis_text)
        self.recommendations_text.config(state="disabled")
        
        # Auto-apply recommended preset if auto-optimize is enabled
        if self.auto_optimize_var.get():
            recommended_preset = self.processor.analyzer.recommend_preset(analysis)
            preset_map = {
                PresetType.PORTRAIT: "portrait",
                PresetType.LANDSCAPE: "landscape",
                PresetType.LOGO_TEXT: "logo_text",
                PresetType.SILHOUETTE: "silhouette",
                PresetType.DETAILED_ART: "detailed_art",
                PresetType.SIMPLE_SHAPES: "simple_shapes"
            }
            self.preset_var.set(preset_map.get(recommended_preset, "portrait"))
            self.apply_preset()
    
    def display_original_image(self):
        """Display the original image in the preview canvas"""
        if self.processor.original_image is None:
            return
        
        try:
            self.canvas_placeholder.place_forget()
            
            image = self.processor.original_image
            height, width = image.shape[:2]
            
            # Get actual canvas size
            self.preview_canvas.update()
            canvas_width = self.preview_canvas.winfo_width()
            canvas_height = self.preview_canvas.winfo_height()
            
            # Use minimum canvas size if not initialized yet
            if canvas_width <= 1:
                canvas_width = 800
            if canvas_height <= 1:
                canvas_height = 600
            
            # Calculate display size to fill canvas
            scale = min(canvas_width/width, canvas_height/height)
            scale = max(scale, 0.1)  # Minimum scale
            new_width = int(width * scale * self.zoom_factor)
            new_height = int(height * scale * self.zoom_factor)
            
            # Resize and convert
            display_image = cv2.resize(image, (new_width, new_height))
            display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
            
            pil_image = Image.fromarray(display_image)
            self.photo_image = ImageTk.PhotoImage(pil_image)
            
            # Display on canvas centered
            self.preview_canvas.delete("all")
            self.current_image_id = self.preview_canvas.create_image(
                canvas_width//2, canvas_height//2, 
                image=self.photo_image
            )
            
            # Bind drag events for radiology-style adjustments
            self.preview_canvas.bind("<Button-1>", self.start_drag)
            self.preview_canvas.bind("<B1-Motion>", self.on_drag)
            self.preview_canvas.bind("<ButtonRelease-1>", self.end_drag)
            
        except Exception as e:
            logger.error(f"Error displaying image: {e}")
    
    def display_processed_image(self, image: np.ndarray):
        """Display processed image with contours"""
        try:
            self.canvas_placeholder.place_forget()
            
            height, width = image.shape[:2]
            
            # Get actual canvas size
            self.preview_canvas.update()
            canvas_width = self.preview_canvas.winfo_width()
            canvas_height = self.preview_canvas.winfo_height()
            
            # Use minimum canvas size if not initialized yet
            if canvas_width <= 1:
                canvas_width = 800
            if canvas_height <= 1:
                canvas_height = 600
            
            # Calculate display size to fill canvas
            scale = min(canvas_width/width, canvas_height/height)
            scale = max(scale, 0.1)  # Minimum scale
            new_width = int(width * scale * self.zoom_factor)
            new_height = int(height * scale * self.zoom_factor)
            
            # Resize and convert
            display_image = cv2.resize(image, (new_width, new_height))
            if len(display_image.shape) == 3:
                display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
            else:
                display_image = cv2.cvtColor(display_image, cv2.COLOR_GRAY2RGB)
            
            pil_image = Image.fromarray(display_image)
            self.photo_image = ImageTk.PhotoImage(pil_image)
            
            # Display on canvas centered
            self.preview_canvas.delete("all")
            self.current_image_id = self.preview_canvas.create_image(
                canvas_width//2, canvas_height//2, 
                image=self.photo_image
            )
            
            # Bind drag events for radiology-style adjustments
            self.preview_canvas.bind("<Button-1>", self.start_drag)
            self.preview_canvas.bind("<B1-Motion>", self.on_drag)
            self.preview_canvas.bind("<ButtonRelease-1>", self.end_drag)
            
        except Exception as e:
            logger.error(f"Error displaying processed image: {e}")
    
    # Radiology-style drag functionality
    def start_drag(self, event):
        """Start drag operation for radiology-style adjustments"""
        if self.processor.original_image is None:
            return
        self.drag_start_x = event.x
        self.drag_start_y = event.y
        self.drag_start_threshold = self.threshold_var.get()
        self.drag_start_blur = self.blur_var.get()
        # Change cursor to indicate drag mode
        self.preview_canvas.config(cursor="crosshair")
        
    def on_drag(self, event):
        """Handle drag motion for real-time parameter adjustment"""
        if self.processor.original_image is None or not hasattr(self, 'drag_start_x'):
            return
        
        # Calculate drag distances
        dx = event.x - self.drag_start_x
        dy = event.y - self.drag_start_y
        
        # Horizontal drag adjusts threshold (reduced sensitivity: 0.5 per pixel for fine control)
        new_threshold = max(0, min(255, self.drag_start_threshold + dx * 0.5))
        self.threshold_var.set(new_threshold)
        
        # Vertical drag adjusts blur (reduced sensitivity: 0.02 per pixel for fine control) 
        new_blur = max(0, min(10, self.drag_start_blur - dy * 0.02))
        self.blur_var.set(new_blur)
        
        # Always update automatically (no need to check live_preview_enabled)
        self._schedule_preview_update()
            
    def end_drag(self, event):
        """End drag operation and trigger high-quality processing"""
        # Reset cursor
        self.preview_canvas.config(cursor="")
        # Clear drag state
        if hasattr(self, 'drag_start_x'):
            delattr(self, 'drag_start_x')
        if hasattr(self, 'drag_start_y'):
            delattr(self, 'drag_start_y')
        
        # Trigger high-quality processing after dragging stops
        self.window.after(500, self._high_quality_preview_update)
    
    def on_canvas_resize(self, event):
        """Handle canvas resize events to rescale image"""
        if self.processor.original_image is not None:
            # Small delay to avoid too many resize updates
            self.window.after(100, self._delayed_canvas_resize)
    
    def _delayed_canvas_resize(self):
        """Delayed canvas resize handler"""
        if self.processor.processed_image is not None:
            self.display_processed_image(self.processor.processed_image)
        elif self.processor.original_image is not None:
            self.display_original_image()
    
    def toggle_live_preview(self):
        """Toggle live preview on/off"""
        self.live_preview_enabled = self.live_preview_var.get()
        if self.live_preview_enabled and self.processor.original_image is not None:
            self._schedule_preview_update()
        elif not self.live_preview_enabled and self.processor.original_image is not None:
            self.display_original_image()
    
    def _schedule_preview_update(self):
        """Schedule a preview update with minimal delay for responsive dragging"""
        if not self.preview_update_pending:
            self.preview_update_pending = True
            # Reduced delay from 300ms to 100ms for faster feedback
            self.window.after(100, self._delayed_preview_update)
    
    def _delayed_preview_update(self):
        """Perform delayed preview update - now always processes automatically"""
        self.preview_update_pending = False
        if self.processor.original_image is not None:
            self.update_live_preview()
    
    def update_live_preview(self):
        """Fast live preview optimized for real-time feedback during dragging"""
        if self.processor.original_image is None:
            return
        
        try:
            # Get current settings
            self._update_settings_from_ui()
            
            # Use FAST preview mode - skip expensive operations for responsiveness
            self._fast_preview_processing()
                    
        except Exception as e:
            logger.error(f"Error updating live preview: {e}")
            # Show original image as fallback
            try:
                self.display_original_image()
            except Exception:
                pass
    
    def _fast_preview_processing(self):
        """Ultra-fast processing for live preview - NO background removal during live adjustments"""
        try:
            # Start with original image - NO background removal for speed
            image = self.processor.original_image.copy()
            
            # Step 1: Convert to grayscale immediately (fast)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) == 3 else image
            
            # Step 2: Fast blur (simplified)
            if self.current_settings.blur_radius > 0:
                # Use faster blur for live preview - simple Gaussian only
                blur_size = max(1, int(self.current_settings.blur_radius))
                gray = cv2.GaussianBlur(gray, (blur_size * 2 + 1, blur_size * 2 + 1), 0)
            
            # Step 3: Fast threshold (instant)
            _, binary = cv2.threshold(gray, int(self.current_settings.threshold), 255, cv2.THRESH_BINARY)
            
            # Step 4: Fast contour detection (simplified)
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            # Step 5: Quick filter by minimum area only (no other filtering)
            min_area = max(10, self.current_settings.min_area // 4)  # Use smaller min area for live preview
            filtered_contours = [c for c in contours if cv2.contourArea(c) >= min_area]
            
            # Create preview with contours
            preview_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
            if filtered_contours:
                cv2.drawContours(preview_image, filtered_contours, -1, (0, 255, 0), 2)
            
            # Display preview
            self.display_processed_image(preview_image)
            
            # Quick metrics update
            self._fast_metrics_update(filtered_contours, binary)
            
        except Exception as e:
            logger.error(f"Fast preview processing failed: {e}")
            self.display_original_image()
    
    def _fast_metrics_update(self, contours, binary_image):
        """Quick metrics update for live preview"""
        try:
            total_contours = len(contours)
            
            # Quick complexity assessment
            if total_contours < 10:
                complexity = "Simple"
                complexity_color = ModernUI.COLORS['success']
            elif total_contours < 50:
                complexity = "Medium"  
                complexity_color = ModernUI.COLORS['warning']
            else:
                complexity = "Complex"
                complexity_color = ModernUI.COLORS['danger']
            
            # Update complexity display
            if hasattr(self, 'complexity_label'):
                self.complexity_label.config(text=complexity, fg=complexity_color)
            
            # Update cut paths count
            if hasattr(self, 'cut_paths_label'):
                self.cut_paths_label.config(text=str(total_contours))
                
            # Quick area calculation
            if hasattr(self, 'cut_area_label'):
                total_pixels = binary_image.size
                white_pixels = cv2.countNonZero(binary_image)
                area_percentage = (white_pixels / total_pixels) * 100 if total_pixels > 0 else 0
                self.cut_area_label.config(text=f"{area_percentage:.1f}%")
                
        except Exception as e:
            logger.error(f"Fast metrics update failed: {e}")
    
    def _high_quality_preview_update(self):
        """High-quality processing after user stops interacting"""
        if self.processor.original_image is None:
            return
        
        try:
            # Get current settings
            self._update_settings_from_ui()
            
            # Clear background removal cache to force fresh processing
            if hasattr(self.processor, '_cached_bg_removed'):
                delattr(self.processor, '_cached_bg_removed')
            
            # Use full processing pipeline for final quality
            result = self.processor.process_image(self.current_settings)
            
            if result and hasattr(result, 'processed_image') and result.processed_image is not None:
                # Create high-quality preview with contours
                preview_image = cv2.cvtColor(result.processed_image, cv2.COLOR_GRAY2BGR)
                if hasattr(result, 'contours') and result.contours:
                    cv2.drawContours(preview_image, result.contours, -1, (0, 255, 0), 2)
                
                # Display preview
                self.display_processed_image(preview_image)
                
                # Update metrics using full result data
                if hasattr(result, 'metrics'):
                    self._update_metrics_from_result(result)
                    
                logger.info("High-quality preview updated")
            else:
                logger.warning("High-quality processing failed, keeping fast preview")
            
        except Exception as e:
            logger.error(f"Error updating high-quality preview: {e}")
    
    def apply_background_removal(self):
        """Apply AI background removal as a separate step"""
        if self.processor.original_image is None:
            messagebox.showwarning("Warning", "Please load an image first")
            return
        
        if not self.processor.bg_remover.available:
            messagebox.showwarning("Warning", "Background removal not available. Install rembg library.")
            return
        
        try:
            # Show processing indicator
            self.window.config(cursor="wait")
            self.window.update()
            
            logger.info("Applying AI background removal...")
            
            # Apply background removal to original image
            bg_removed = self.processor.bg_remover.remove_background(self.processor.original_image)
            
            # Replace the original image with background-removed version
            self.processor.original_image = bg_removed
            
            # Clear any cached data
            if hasattr(self.processor, '_cached_bg_removed'):
                delattr(self.processor, '_cached_bg_removed')
            
            # Update the display
            self.display_original_image()
            
            # Trigger fast preview update
            self._schedule_preview_update()
            
            # Reset cursor
            self.window.config(cursor="")
            
            logger.info("Background removal applied successfully")
            
        except Exception as e:
            self.window.config(cursor="")
            logger.error(f"Background removal failed: {e}")
            messagebox.showerror("Error", f"Background removal failed: {str(e)}")
    
    def _update_metrics_from_result(self, result):
        """Update metrics from processing result"""
        if hasattr(result, 'metrics') and result.metrics:
            metrics = result.metrics
            
            # Update metrics display - metrics is a dict, not an object
            complexity = metrics.get('complexity', 'Unknown')
            if hasattr(self, 'complexity_label'):
                complexity_color = {
                    'Simple': ModernUI.COLORS['success'],
                    'Medium': ModernUI.COLORS['warning'], 
                    'Complex': ModernUI.COLORS['danger']
                }.get(complexity, ModernUI.COLORS['text_muted'])
                
                self.complexity_label.config(
                    text=f"{complexity}",
                    fg=complexity_color
                )
            
            # Update other metric labels if they exist
            if hasattr(self, 'cut_paths_label'):
                self.cut_paths_label.config(text=str(metrics.get('cut_paths', 0)))
            if hasattr(self, 'cut_area_label'): 
                self.cut_area_label.config(text=f"{metrics.get('cut_area_percentage', 0.0):.1f}%")
            if hasattr(self, 'cut_time_label'):
                self.cut_time_label.config(text=f"{metrics.get('estimated_minutes', 0.0):.1f} min")
    
    def _update_metrics_preview(self, contours: List[np.ndarray], binary_image: np.ndarray):
        """Update metrics from preview data"""
        total_contours = len(contours)
        total_points = sum(len(contour) for contour in contours)
        
        # Complexity
        if total_points < 200:
            complexity = "Simple"
            complexity_color = ModernUI.COLORS['success']
        elif total_points < 800:
            complexity = "Medium"
            complexity_color = ModernUI.COLORS['warning']
        else:
            complexity = "Complex"
            complexity_color = ModernUI.COLORS['danger']
        
        # Cut area
        if binary_image is not None:
            white_pixels = np.sum(binary_image == 255)
            total_pixels = binary_image.size
            cut_percentage = (white_pixels / total_pixels) * 100
        else:
            cut_percentage = 0
        
        # Estimated time
        estimated_time = total_points * 0.02 / 60  # Convert to minutes
        
        # Update labels
        self.complexity_label.config(text=complexity, fg=complexity_color)
        self.cut_paths_label.config(text=str(total_contours))
        self.cut_area_label.config(text=f"{cut_percentage:.1f}%")
        self.est_time_label.config(text=f"{estimated_time:.1f} min")
        
        # Update header status
        self.header_status.config(text=f"● {complexity} Complexity", fg=complexity_color)
    
    def apply_preset(self):
        """Apply selected preset"""
        preset_name = self.preset_var.get()
        
        preset_map = {
            'portrait': PresetType.PORTRAIT,
            'landscape': PresetType.LANDSCAPE,
            'logo_text': PresetType.LOGO_TEXT,
            'silhouette': PresetType.SILHOUETTE,
            'detailed_art': PresetType.DETAILED_ART,
            'simple_shapes': PresetType.SIMPLE_SHAPES
        }
        
        preset = preset_map.get(preset_name)
        if preset:
            self.current_settings = self.processor.apply_preset(preset, self.current_settings)
            
            # Update UI controls
            self.threshold_var.set(self.current_settings.threshold)
            self.blur_var.set(self.current_settings.blur_radius)
            self.min_area_var.set(self.current_settings.min_area)
            self.simplification_var.set(self.current_settings.simplification * 1000)
            self.detail_var.set(self.current_settings.detail_preservation * 100)
            self.face_enhancement_var.set(self.current_settings.face_enhancement)
            # Background removal is now manual only - don't auto-set
            
            logger.info(f"Applied preset: {preset_name}")
            
            # Always trigger automatic processing
            if self.processor.original_image is not None:
                self._schedule_preview_update()
                # Also schedule high-quality update after preset change
                self.window.after(800, self._high_quality_preview_update)
    
    def on_material_change(self):
        """Handle material selection change"""
        self._update_settings_from_ui()
        self.current_settings = self.processor.optimize_for_material(
            self.current_settings.material, self.current_settings
        )
        
        # Update UI to reflect optimizations
        self.min_area_var.set(self.current_settings.min_area)
        self.simplification_var.set(self.current_settings.simplification * 1000)
        
        # Always trigger automatic processing  
        if self.processor.original_image is not None:
            self._schedule_preview_update()
            # Also schedule high-quality update after material change
            self.window.after(800, self._high_quality_preview_update)
    
    def on_auto_optimize_change(self):
        """Handle auto-optimize toggle"""
        if self.auto_optimize_var.get() and self.processor.analysis is not None:
            self.current_settings.auto_optimize = True
            optimized = self.processor.auto_optimize_settings(self.current_settings)
            
            # Update UI with optimized settings
            self.threshold_var.set(optimized.threshold)
            self.blur_var.set(optimized.blur_radius)
            self.min_area_var.set(optimized.min_area)
            
            if self.live_preview_enabled:
                self._schedule_preview_update()
    
    def process_image(self):
        """Process the current image"""
        if self.processor.original_image is None:
            messagebox.showwarning("Warning", "Please load an image first")
            return
        
        if self.processing_thread and self.processing_thread.is_alive():
            return
        
        self.processing_thread = threading.Thread(target=self._process_image_thread)
        self.processing_thread.start()
    
    def _process_image_thread(self):
        """Process image in separate thread"""
        try:
            self._update_settings_from_ui()
            
            def progress_callback(percentage: int, message: str):
                self.window.after(0, lambda: self._update_progress(percentage, message))
            
            # Process image
            result = self.processor.process_image(self.current_settings, progress_callback)
            
            # Update UI with results
            self.window.after(0, lambda: self._handle_process_complete(result))
            
        except Exception as e:
            logger.error(f"Processing failed: {e}")
            self.window.after(0, lambda: messagebox.showerror("Error", f"Processing failed: {str(e)}"))
            self.window.after(0, lambda: self.update_status("❌ Processing failed", 'danger'))
    
    def _update_progress(self, percentage: int, message: str):
        """Update progress bar and status"""
        self.progress_var.set(percentage)
        self.update_status(message, 'warning' if percentage < 100 else 'success')
    
    def _handle_process_complete(self, result: ProcessingResult):
        """Handle completed processing"""
        # Display processed image with contours
        display_image = cv2.cvtColor(result.processed_image, cv2.COLOR_GRAY2BGR)
        
        if result.contours:
            cv2.drawContours(display_image, result.contours, -1, (0, 255, 0), 2)
        
        self.display_processed_image(display_image)
        
        # Update metrics
        metrics = result.metrics
        self.complexity_label.config(text=metrics['complexity'])
        self.cut_paths_label.config(text=str(metrics['cut_paths']))
        self.cut_area_label.config(text=f"{metrics['cut_area_percentage']:.1f}%")
        self.est_time_label.config(text=f"{metrics['estimated_time_minutes']:.1f} min")
        
        # Update recommendations
        rec_text = f"""✅ Processing Complete!

📊 Results Summary:
• Processing Time: {result.processing_time:.2f} seconds
• Cut Paths: {metrics['cut_paths']}
• Complexity: {metrics['complexity']}
• Cut Area: {metrics['cut_area_percentage']:.1f}%
• Estimated Cut Time: {metrics['estimated_time_minutes']:.1f} minutes

💡 Recommendations:
"""
        
        for rec in result.recommendations:
            rec_text += f"• {rec}\n"
        
        rec_text += f"""
🎯 Material Optimization:
• Current Material: {self.current_settings.material.value.title()}
• {metrics['recommended_settings']['material_description']}
• Optimal for Material: {'✅ Yes' if metrics['recommended_settings']['optimal_for_material'] else '⚠️ Consider simpler design'}

Ready to export SVG! 🚀"""
        
        self.recommendations_text.config(state="normal")
        self.recommendations_text.delete(1.0, tk.END)
        self.recommendations_text.insert(1.0, rec_text)
        self.recommendations_text.config(state="disabled")
        
        self.update_status("✅ Processing complete - ready to export!", 'success')
    
    def preview_cut_lines(self):
        """Show cutting lines preview"""
        if self.processor.contours is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
        
        try:
            # Create cut preview visualization
            height, width = self.processor.processed_image.shape
            cut_preview = np.zeros((height, width, 3), dtype=np.uint8)
            cut_preview[:] = (40, 40, 40)  # Dark background
            
            # Color-code contours by complexity
            for contour in self.processor.contours:
                area = cv2.contourArea(contour)
                
                if area > 1000:
                    color = (0, 255, 0)    # Green for easy cuts
                elif area > 100:
                    color = (0, 255, 255)  # Yellow for medium cuts
                else:
                    color = (0, 128, 255)  # Orange for detailed cuts
                
                # Fill the area
                cv2.fillPoly(cut_preview, [contour], (255, 255, 255))
                # Draw the cutting line
                cv2.drawContours(cut_preview, [contour], -1, color, 2)
            
            self.display_processed_image(cut_preview)
            self.update_status("👁️ Showing cut lines preview", 'info')
            
        except Exception as e:
            logger.error(f"Error creating cut preview: {e}")
            messagebox.showerror("Error", f"Failed to create cut preview: {str(e)}")
    
    def export_svg(self):
        """Export processed image as SVG"""
        if self.processor.contours is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
        
        # Get save location
        file_path = filedialog.asksaveasfilename(
            title="Save SVG File",
            defaultextension=".svg",
            filetypes=[("SVG files", "*.svg"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                success = self.processor.export_svg(file_path)
                if success:
                    messagebox.showinfo("Success", f"SVG exported successfully!\n\nFile: {file_path}")
                    self.update_status("✅ SVG exported successfully", 'success')
                else:
                    messagebox.showerror("Error", "Failed to export SVG")
            except Exception as e:
                logger.error(f"Export failed: {e}")
                messagebox.showerror("Error", f"Export failed: {str(e)}")
    
    def save_project(self):
        """Save current project settings"""
        file_path = filedialog.asksaveasfilename(
            title="Save Project",
            defaultextension=".json",
            filetypes=[("Project files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                self._update_settings_from_ui()
                success = self.processor.save_project(file_path, self.current_settings)
                if success:
                    messagebox.showinfo("Success", "Project saved successfully!")
                else:
                    messagebox.showerror("Error", "Failed to save project")
            except Exception as e:
                logger.error(f"Save project failed: {e}")
                messagebox.showerror("Error", f"Failed to save project: {str(e)}")
    
    def load_project(self):
        """Load project settings"""
        file_path = filedialog.askopenfilename(
            title="Load Project",
            filetypes=[("Project files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                settings = self.processor.load_project(file_path)
                if settings:
                    self.current_settings = settings
                    
                    # Update UI controls
                    self.threshold_var.set(settings.threshold)
                    self.blur_var.set(settings.blur_radius)
                    self.min_area_var.set(settings.min_area)
                    self.simplification_var.set(settings.simplification * 1000)
                    self.detail_var.set(settings.detail_preservation * 100)
                    self.face_enhancement_var.set(settings.face_enhancement)
                    self.remove_background_var.set(settings.remove_background)
                    self.auto_optimize_var.set(settings.auto_optimize)
                    
                    # Update material and preset
                    material_map = {
                        MaterialType.VINYL: 'vinyl',
                        MaterialType.CARDSTOCK: 'cardstock',
                        MaterialType.POSTER_BOARD: 'poster_board',
                        MaterialType.FABRIC: 'fabric',
                        MaterialType.LEATHER: 'leather',
                        MaterialType.CHIPBOARD: 'chipboard'
                    }
                    self.material_var.set(material_map.get(settings.material, 'cardstock'))
                    
                    if settings.preset:
                        preset_map = {
                            PresetType.PORTRAIT: 'portrait',
                            PresetType.LANDSCAPE: 'landscape',
                            PresetType.LOGO_TEXT: 'logo_text',
                            PresetType.SILHOUETTE: 'silhouette',
                            PresetType.DETAILED_ART: 'detailed_art',
                            PresetType.SIMPLE_SHAPES: 'simple_shapes'
                        }
                        self.preset_var.set(preset_map.get(settings.preset, 'portrait'))
                    
                    messagebox.showinfo("Success", "Project loaded successfully!")
                    
                    if self.live_preview_enabled and self.processor.original_image is not None:
                        self._schedule_preview_update()
                        
                else:
                    messagebox.showerror("Error", "Failed to load project")
            except Exception as e:
                logger.error(f"Load project failed: {e}")
                messagebox.showerror("Error", f"Failed to load project: {str(e)}")
    
    def zoom_in(self):
        """Zoom in preview"""
        self.zoom_factor *= 1.25
        if self.zoom_factor > 5.0:
            self.zoom_factor = 5.0
        self.update_zoom()
    
    def zoom_out(self):
        """Zoom out preview"""
        self.zoom_factor /= 1.25
        if self.zoom_factor < 0.25:
            self.zoom_factor = 0.25
        self.update_zoom()
    
    def reset_view(self):
        """Reset view to original size"""
        self.zoom_factor = 1.0
        self.update_zoom()
    
    def update_zoom(self):
        """Update display with current zoom"""
        if self.processor.original_image is not None:
            if self.processor.processed_image is not None and not self.live_preview_enabled:
                # Show processed image
                display_image = cv2.cvtColor(self.processor.processed_image, cv2.COLOR_GRAY2BGR)
                if self.processor.contours:
                    cv2.drawContours(display_image, self.processor.contours, -1, (0, 255, 0), 2)
                self.display_processed_image(display_image)
            elif self.live_preview_enabled:
                self.update_live_preview()
            else:
                self.display_original_image()
    
    def update_status(self, message: str, status_type: str = 'info'):
        """Update status display"""
        color_map = {
            'success': ModernUI.COLORS['success'],
            'warning': ModernUI.COLORS['warning'],
            'danger': ModernUI.COLORS['danger'],
            'info': ModernUI.COLORS['info']
        }
        
        color = color_map.get(status_type, ModernUI.COLORS['text'])
        
        self.status_label.config(text=message, fg=color)
        
        if "complete" in message.lower() or "success" in message.lower():
            self.header_status.config(text="● Complete", fg=ModernUI.COLORS['success'])
        elif "processing" in message.lower() or "converting" in message.lower():
            self.header_status.config(text="● Processing...", fg=ModernUI.COLORS['warning'])
        elif "failed" in message.lower() or "error" in message.lower():
            self.header_status.config(text="● Error", fg=ModernUI.COLORS['danger'])
    
    def run(self):
        """Start the application"""
        logger.info("Starting Ultimate SVG Converter Desktop")
        self.window.mainloop()

def main():
    """Application entry point"""
    try:
        app = UltimateSVGDesktop()
        app.run()
    except Exception as e:
        logger.error(f"Application startup failed: {e}")
        messagebox.showerror("Startup Error", f"Failed to start application: {str(e)}")

if __name__ == "__main__":
    main()