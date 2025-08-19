import cv2
import numpy as np
from PIL import Image, ImageTk, ImageFilter, ImageEnhance
import os
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import logging
import time
import threading
import json
from pathlib import Path
import svgwrite
import traceback

# Try to import drag and drop support
try:
    from tkinterdnd2 import TkinterDnD, DND_FILES
    DND_AVAILABLE = True
except ImportError:
    DND_AVAILABLE = False

# Set up logging
logging.basicConfig(level=logging.INFO, filename='cricut_converter.log', filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s')

class CricutSVGConverter:
    def __init__(self):
        # Initialize window with drag and drop if available
        if DND_AVAILABLE:
            self.window = TkinterDnD.Tk()
            self.dnd_available = True
        else:
            self.window = tk.Tk()
            self.dnd_available = False
            logging.warning("tkinterdnd2 not available, drag and drop disabled")
            
        self.window.title("Advanced Cricut SVG Converter")
        self.window.geometry("1400x900")
        self.window.configure(bg="#1a1a2e")
        
        # Processing variables
        self.original_image = None
        self.processed_image = None
        self.preview_image = None
        self.contours = None
        self.processing_thread = None
        self.zoom_factor = 1.0
        self.live_preview_enabled = True
        self.preview_update_pending = False
        
        # Settings
        self.settings = {
            'threshold': 128,
            'blur_radius': 2,
            'min_area': 100,
            'simplification': 0.02,
            'edge_detection': 'canny',
            'morphology_size': 3,
            'face_enhancement': True,
            'detail_preservation': 0.5,
            'cutting_complexity': 'medium'
        }
        
        # Presets for different use cases
        self.presets = {
            'portrait': {
                'threshold': 140,
                'blur_radius': 1,
                'min_area': 50,
                'simplification': 0.015,
                'face_enhancement': True,
                'detail_preservation': 0.7
            },
            'silhouette': {
                'threshold': 120,
                'blur_radius': 3,
                'min_area': 200,
                'simplification': 0.03,
                'face_enhancement': False,
                'detail_preservation': 0.3
            },
            'detailed': {
                'threshold': 130,
                'blur_radius': 1,
                'min_area': 25,
                'simplification': 0.01,
                'face_enhancement': True,
                'detail_preservation': 0.8
            },
            'simple': {
                'threshold': 115,
                'blur_radius': 4,
                'min_area': 300,
                'simplification': 0.05,
                'face_enhancement': False,
                'detail_preservation': 0.2
            }
        }
        
        self.setup_ui()
        self.setup_face_detection()
        
    def setup_face_detection(self):
        """Initialize face detection for enhanced portrait processing"""
        try:
            cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            self.face_cascade = cv2.CascadeClassifier(cascade_path)
            self.face_detection_available = True
            logging.info("Face detection initialized successfully")
        except:
            logging.warning("Face detection not available")
            self.face_detection_available = False
            
    def setup_ui(self):
        """Create the user interface with modern design"""
        # Header
        self.setup_header()
        
        # Main container
        main_frame = tk.Frame(self.window, bg="#1a1a2e")
        main_frame.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        # Create three-panel layout
        self.setup_control_panel(main_frame)
        self.setup_preview_panel(main_frame)
        self.setup_analysis_panel(main_frame)
        
    def setup_header(self):
        """Create an attractive header"""
        header_frame = tk.Frame(self.window, bg="#16213e", height=80)
        header_frame.pack(fill="x", padx=15, pady=(15, 0))
        header_frame.pack_propagate(False)
        
        title_frame = tk.Frame(header_frame, bg="#16213e")
        title_frame.pack(expand=True, fill="both")
        
        icon_label = tk.Label(title_frame, text="✂", font=("Arial", 24), 
                             bg="#16213e", fg="#4a90e2")
        icon_label.pack(side="left", padx=(20, 10), pady=20)
        
        title_text = tk.Frame(title_frame, bg="#16213e")
        title_text.pack(side="left", pady=20)
        
        tk.Label(title_text, text="Advanced Cricut SVG Converter", 
                font=("Arial", 18, "bold"), 
                bg="#16213e", fg="#ffffff").pack(anchor="w")
        
        tk.Label(title_text, text="Professional image to cutting file conversion", 
                font=("Arial", 10), 
                bg="#16213e", fg="#8da3c7").pack(anchor="w")
        
        self.header_status = tk.Label(title_frame, text="● Ready", 
                                     font=("Arial", 10), bg="#16213e", fg="#4ade80")
        self.header_status.pack(side="right", padx=20, pady=20)
        
    def setup_control_panel(self, parent):
        """Setup the control panel with modern card-based design"""
        control_container = tk.Frame(parent, bg="#1a1a2e")
        control_container.pack(side="left", fill="y", padx=(0, 15))
        
        control_frame = tk.Frame(control_container, bg="#16213e", relief="flat", bd=0, width=320)
        control_frame.pack(fill="both", expand=True, padx=5, pady=5)
        control_frame.pack_propagate(False)
        
        # File selection card
        self.create_card(control_frame, "📁 Image Selection", self.setup_file_card)
        
        # Live preview toggle
        self.create_card(control_frame, "👁️ Live Preview", self.setup_preview_toggle_card)
        
        # Quick presets card
        self.create_card(control_frame, "⚡ Quick Presets", self.setup_presets_card)
        
        # Material settings card
        self.create_card(control_frame, "🎯 Material Settings", self.setup_material_card)
        
        # Advanced settings card
        self.create_card(control_frame, "⚙️ Advanced Settings", self.setup_advanced_card)
        
        # Processing card
        self.create_card(control_frame, "🚀 Processing", self.setup_processing_card)
        
    def create_card(self, parent, title, setup_func):
        """Create a modern card-style section"""
        card_container = tk.Frame(parent, bg="#16213e")
        card_container.pack(fill="x", padx=10, pady=8)
        
        card_frame = tk.Frame(card_container, bg="#1e2a4a", relief="flat", bd=1)
        card_frame.pack(fill="x", padx=2, pady=2)
        
        header_frame = tk.Frame(card_frame, bg="#1e2a4a", height=40)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        title_label = tk.Label(header_frame, text=title, 
                              font=("Arial", 12, "bold"), 
                              bg="#1e2a4a", fg="#ffffff")
        title_label.pack(anchor="w", pady=5)
        
        content_frame = tk.Frame(card_frame, bg="#1e2a4a")
        content_frame.pack(fill="x", padx=15, pady=(0, 15))
        
        setup_func(content_frame)
        return card_frame
    
    def setup_preview_toggle_card(self, parent):
        """Setup live preview toggle"""
        self.live_preview_var = tk.BooleanVar(value=True)
        
        toggle_frame = tk.Frame(parent, bg="#1e2a4a")
        toggle_frame.pack(fill="x", pady=5)
        
        preview_check = tk.Checkbutton(toggle_frame, text="🔄 Real-time Preview", 
                                      variable=self.live_preview_var,
                                      command=self.toggle_live_preview,
                                      bg="#1e2a4a", fg="#ffffff", selectcolor="#4a90e2",
                                      font=("Arial", 11, "bold"),
                                      activebackground="#1e2a4a", activeforeground="#ffffff")
        preview_check.pack(anchor="w")
        
        tk.Label(toggle_frame, text="See changes as you adjust settings", 
                bg="#1e2a4a", fg="#8da3c7", font=("Arial", 9)).pack(anchor="w", padx=20)
    
    def setup_file_card(self, parent):
        """Setup file selection card content with drag and drop"""
        # Drag and drop area
        drop_frame = tk.Frame(parent, bg="#2a3f63", relief="solid", bd=2, height=100)
        drop_frame.pack(fill="x", pady=(0, 10))
        drop_frame.pack_propagate(False)
        
        # Configure drag and drop if available
        if self.dnd_available:
            drop_frame.drop_target_register(DND_FILES)
            drop_frame.dnd_bind('<<Drop>>', self.handle_drop)
        
        # Drop area content
        drop_content = tk.Frame(drop_frame, bg="#2a3f63")
        drop_content.pack(expand=True, fill="both")
        
        if self.dnd_available:
            tk.Label(drop_content, text="📎 Drag & Drop Image Here", 
                    font=("Arial", 12, "bold"), bg="#2a3f63", fg="#ffffff").pack(expand=True)
            tk.Label(drop_content, text="Supports: JPG, PNG, BMP, TIFF", 
                    font=("Arial", 9), bg="#2a3f63", fg="#8da3c7").pack()
        else:
            tk.Label(drop_content, text="📂 Click Button Below to Load Image", 
                    font=("Arial", 12, "bold"), bg="#2a3f63", fg="#ffffff").pack(expand=True)
            tk.Label(drop_content, text="(Install tkinterdnd2 for drag & drop)", 
                    font=("Arial", 8), bg="#2a3f63", fg="#8da3c7").pack()
        
        # Load button with better contrast
        load_btn = tk.Button(parent, text="📂 Choose Image File", command=self.load_image,
                            bg="#4a90e2", fg="#ffffff", font=("Arial", 11, "bold"),
                            relief="flat", bd=0, padx=20, pady=10,
                            activebackground="#357abd", activeforeground="#ffffff",
                            cursor="hand2")
        load_btn.pack(fill="x", pady=(0, 10))
        
        self.file_label = tk.Label(parent, text="No image loaded", 
                                  bg="#1e2a4a", fg="#8da3c7", wraplength=280,
                                  font=("Arial", 9), justify="left")
        self.file_label.pack(anchor="w")
        
    def handle_drop(self, event):
        """Handle dropped files"""
        if not self.dnd_available:
            return
            
        try:
            files = event.data.split()
            if files:
                file_path = files[0].strip('{}')  # Remove braces if present
                
                # Check if it's an image file
                valid_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif')
                if file_path.lower().endswith(valid_extensions):
                    self.original_image = cv2.imread(file_path)
                    if self.original_image is not None:
                        self.current_image_path = file_path
                        self.file_label.config(text="Loaded: " + Path(file_path).name)
                        self.display_original_image()
                        self.analyze_image_characteristics()
                        self.update_status("✅ Image loaded successfully")
                        if self.live_preview_enabled:
                            self.schedule_preview_update()
                    else:
                        messagebox.showerror("Error", "Could not load the dropped image")
                else:
                    messagebox.showwarning("Warning", "Please drop a valid image file (JPG, PNG, BMP, TIFF)")
        except Exception as e:
            logging.error(f"Error handling dropped file: {e}")
            messagebox.showerror("Error", f"Failed to load dropped file: {str(e)}")
        
    def setup_presets_card(self, parent):
        """Setup presets card with better button visibility"""
        self.preset_var = tk.StringVar(value="portrait")
        
        preset_data = [
            ("👤 Portrait", "portrait", "Best for faces and people"),
            ("🌅 Silhouette", "silhouette", "Simple outlines and shapes"),
            ("🔍 Detailed", "detailed", "Maximum detail preservation"),
            ("⚡ Simple", "simple", "Quick cuts, thick materials")
        ]
        
        for text, value, desc in preset_data:
            preset_frame = tk.Frame(parent, bg="#1e2a4a")
            preset_frame.pack(fill="x", pady=2)
            
            radio = tk.Radiobutton(preset_frame, text=text, variable=self.preset_var, 
                                  value=value, command=self.apply_preset,
                                  bg="#1e2a4a", fg="#ffffff", selectcolor="#4a90e2",
                                  font=("Arial", 10, "bold"),
                                  activebackground="#1e2a4a", activeforeground="#ffffff",
                                  cursor="hand2")
            radio.pack(anchor="w")
            
            tk.Label(preset_frame, text=desc, bg="#1e2a4a", fg="#8da3c7",
                    font=("Arial", 8), wraplength=250).pack(anchor="w", padx=20)
    
    def setup_material_card(self, parent):
        """Setup material selection"""
        tk.Label(parent, text="Target Material:", bg="#1e2a4a", fg="#ffffff",
                font=("Arial", 10, "bold")).pack(anchor="w", pady=(0, 5))
        
        self.material_var = tk.StringVar(value="Cardstock")
        materials = ["Vinyl", "Cardstock", "Poster Board", "Fabric", "Leather", "Chipboard"]
        
        material_menu = ttk.Combobox(parent, textvariable=self.material_var, 
                                    values=materials, state="readonly", font=("Arial", 10))
        material_menu.pack(fill="x", pady=(0, 10))
        material_menu.bind('<<ComboboxSelected>>', self.on_material_change)
        
        self.material_tips = tk.Label(parent, text="💡 Standard settings work well", 
                                     bg="#1e2a4a", fg="#8da3c7", font=("Arial", 9),
                                     wraplength=250, justify="left")
        self.material_tips.pack(anchor="w")
    
    def setup_advanced_card(self, parent):
        """Setup advanced controls"""
        self.threshold_var = tk.IntVar(value=self.settings['threshold'])
        self.blur_var = tk.IntVar(value=self.settings['blur_radius'])
        self.min_area_var = tk.IntVar(value=self.settings['min_area'])
        self.simplification_var = tk.DoubleVar(value=self.settings['simplification'] * 1000)
        self.detail_var = tk.DoubleVar(value=self.settings['detail_preservation'] * 100)
        
        self.create_modern_slider(parent, "🎚️ Threshold", self.threshold_var, 0, 255, 
                                 "Black/white separation point")
        
        self.create_modern_slider(parent, "🌫️ Blur Radius", self.blur_var, 0, 10, 
                                 "Pre-processing smoothing")
        
        self.create_modern_slider(parent, "📏 Min Area", self.min_area_var, 10, 500, 
                                 "Filter out tiny details")
        
        self.create_modern_slider(parent, "✂️ Simplification", self.simplification_var, 1, 50, 
                                 "Reduce cutting complexity")
        
        self.create_modern_slider(parent, "🎯 Detail Level", self.detail_var, 10, 90, 
                                 "Balance detail vs simplicity")
        
        enhance_frame = tk.Frame(parent, bg="#1e2a4a")
        enhance_frame.pack(fill="x", pady=5)
        
        self.face_enhancement_var = tk.BooleanVar(value=self.settings['face_enhancement'])
        face_check = tk.Checkbutton(enhance_frame, text="👥 Face Enhancement", 
                                   variable=self.face_enhancement_var,
                                   command=self.on_face_enhancement_change,
                                   bg="#1e2a4a", fg="#ffffff", selectcolor="#4a90e2",
                                   font=("Arial", 10),
                                   activebackground="#1e2a4a", activeforeground="#ffffff")
        face_check.pack(anchor="w")
    
    def create_modern_slider(self, parent, label, variable, min_val, max_val, tooltip):
        """Create a modern slider with value display"""
        slider_frame = tk.Frame(parent, bg="#1e2a4a")
        slider_frame.pack(fill="x", pady=8)
        
        header_frame = tk.Frame(slider_frame, bg="#1e2a4a")
        header_frame.pack(fill="x")
        
        tk.Label(header_frame, text=label, bg="#1e2a4a", fg="#ffffff", 
                font=("Arial", 9, "bold")).pack(side="left")
        
        value_label = tk.Label(header_frame, text=str(variable.get()), 
                              bg="#4a90e2", fg="white", font=("Arial", 8, "bold"),
                              padx=8, pady=2)
        value_label.pack(side="right")
        
        slider = tk.Scale(slider_frame, from_=min_val, to=max_val, orient="horizontal",
                         variable=variable, bg="#1e2a4a", fg="#ffffff",
                         troughcolor="#2a3f63", activebackground="#4a90e2",
                         highlightthickness=0, bd=0, font=("Arial", 8),
                         command=lambda v: self.update_slider_display(value_label, variable, v))
        slider.pack(fill="x", pady=(5, 0))
        
        tk.Label(slider_frame, text=tooltip, bg="#1e2a4a", fg="#8da3c7",
                font=("Arial", 8), wraplength=250).pack(anchor="w")
        
        variable.trace('w', lambda *args: self.on_slider_change())
    
    def update_slider_display(self, label, variable, value):
        """Update the value display for sliders"""
        label.config(text=str(int(float(value))))
    
    def darken_color(self, color):
        """Darken a hex color for hover effects"""
        color = color.lstrip('#')
        rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))
        darkened = tuple(max(0, int(c * 0.8)) for c in rgb)
        return f"#{darkened[0]:02x}{darkened[1]:02x}{darkened[2]:02x}"
    
    def setup_processing_card(self, parent):
        """Setup processing controls with better button visibility"""
        # Primary action buttons with better contrast
        button_configs = [
            ("🔄 Process to Black & White", self.process_image, "#27ae60", "#ffffff"),
            ("👁️ Preview Cut Lines", self.preview_cut_lines, "#3498db", "#ffffff"),
            ("💾 Export SVG", self.export_svg, "#e74c3c", "#ffffff")
        ]
        
        for text, command, bg_color, fg_color in button_configs:
            btn = tk.Button(parent, text=text, command=command,
                           bg=bg_color, fg=fg_color, font=("Arial", 11, "bold"),
                           relief="flat", bd=0, padx=20, pady=12,
                           activebackground=self.darken_color(bg_color), 
                           activeforeground=fg_color,
                           cursor="hand2")
            btn.pack(fill="x", pady=4)
        
        # Secondary buttons for project management
        project_frame = tk.Frame(parent, bg="#1e2a4a")
        project_frame.pack(fill="x", pady=(15, 0))
        
        project_buttons = [
            ("💾 Save Project", self.save_project, "#f39c12", "#ffffff"),
            ("📁 Load Project", self.load_project, "#f39c12", "#ffffff")
        ]
        
        for text, command, bg_color, fg_color in project_buttons:
            btn = tk.Button(project_frame, text=text, command=command,
                           bg=bg_color, fg=fg_color, font=("Arial", 9, "bold"),
                           relief="flat", bd=0, padx=15, pady=8,
                           activebackground=self.darken_color(bg_color), 
                           activeforeground=fg_color,
                           cursor="hand2")
            btn.pack(side="left", padx=(0, 5), expand=True, fill="x")
        
        # Progress section
        progress_frame = tk.Frame(parent, bg="#1e2a4a")
        progress_frame.pack(fill="x", pady=(15, 5))
        
        tk.Label(progress_frame, text="Progress:", bg="#1e2a4a", fg="#ffffff",
                font=("Arial", 9, "bold")).pack(anchor="w")
        
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(progress_frame, variable=self.progress_var, 
                                           maximum=100)
        self.progress_bar.pack(fill="x", pady=(5, 0))
        
        self.status_label = tk.Label(parent, text="Ready to process", 
                                    bg="#1e2a4a", fg="#4ade80", font=("Arial", 9))
        self.status_label.pack(anchor="w", pady=(5, 0))
        
    def setup_preview_panel(self, parent):
        """Setup the image preview panel with better zoom controls"""
        preview_container = tk.Frame(parent, bg="#1a1a2e")
        preview_container.pack(side="left", fill="both", expand=True, padx=(0, 15))
        
        preview_frame = tk.Frame(preview_container, bg="#16213e", relief="flat", bd=0)
        preview_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        header_frame = tk.Frame(preview_frame, bg="#16213e", height=50)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        tk.Label(header_frame, text="🖼️ Image Preview", 
                font=("Arial", 14, "bold"), 
                bg="#16213e", fg="#ffffff").pack(side="left", pady=10)
        
        zoom_frame = tk.Frame(header_frame, bg="#16213e")
        zoom_frame.pack(side="right", pady=10)
        
        zoom_buttons = [
            ("🔍+", self.zoom_in),
            ("🔍-", self.zoom_out),
            ("⌂", self.reset_view)
        ]
        
        for text, command in zoom_buttons:
            btn = tk.Button(zoom_frame, text=text, command=command,
                           bg="#4a90e2", fg="#ffffff", font=("Arial", 10, "bold"),
                           relief="flat", bd=0, padx=12, pady=6,
                           activebackground="#357abd", activeforeground="#ffffff",
                           cursor="hand2")
            btn.pack(side="left", padx=2)
        
        # Canvas container with drop support
        canvas_container = tk.Frame(preview_frame, bg="#0f1523", relief="solid", bd=1)
        canvas_container.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        # Configure drag and drop for canvas area if available
        if self.dnd_available:
            canvas_container.drop_target_register(DND_FILES)
            canvas_container.dnd_bind('<<Drop>>', self.handle_drop)
        
        self.preview_canvas = tk.Canvas(canvas_container, bg="#0a0f1c", 
                                       highlightthickness=0, relief="flat")
        self.preview_canvas.pack(fill="both", expand=True, padx=3, pady=3)
        
        # Configure canvas for drag and drop as well if available
        if self.dnd_available:
            self.preview_canvas.drop_target_register(DND_FILES)
            self.preview_canvas.dnd_bind('<<Drop>>', self.handle_drop)
        
        # Updated placeholder text
        placeholder_text = "📷\n\n"
        if self.dnd_available:
            placeholder_text += "Drag & Drop Image Here\nor click 'Choose Image File'"
        else:
            placeholder_text += "Click 'Choose Image File'\nto load an image"
        
        self.canvas_placeholder = tk.Label(self.preview_canvas, 
                                          text=placeholder_text,
                                          font=("Arial", 14),
                                          bg="#0a0f1c", fg="#4a5568",
                                          justify="center")
        self.canvas_placeholder.place(relx=0.5, rely=0.5, anchor="center")
        
    def setup_analysis_panel(self, parent):
        """Setup the analysis panel"""
        analysis_container = tk.Frame(parent, bg="#1a1a2e")
        analysis_container.pack(side="right", fill="y")
        
        analysis_frame = tk.Frame(analysis_container, bg="#16213e", relief="flat", bd=0, width=300)
        analysis_frame.pack(fill="both", expand=True, padx=5, pady=5)
        analysis_frame.pack_propagate(False)
        
        header_frame = tk.Frame(analysis_frame, bg="#16213e", height=50)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        tk.Label(header_frame, text="📊 Cut Analysis", 
                font=("Arial", 14, "bold"),
                bg="#16213e", fg="#ffffff").pack(pady=10)
        
        # Metrics
        self.setup_metrics_card(analysis_frame)
        
        # Recommendations
        self.setup_recommendations_card(analysis_frame)
        
    def setup_metrics_card(self, parent):
        """Setup cutting metrics"""
        metrics_card = tk.Frame(parent, bg="#1e2a4a", relief="flat", bd=1)
        metrics_card.pack(fill="x", padx=15, pady=(0, 15))
        
        header = tk.Frame(metrics_card, bg="#1e2a4a")
        header.pack(fill="x", padx=15, pady=(15, 10))
        
        tk.Label(header, text="⚡ Cutting Metrics", 
                font=("Arial", 12, "bold"),
                bg="#1e2a4a", fg="#ffffff").pack(anchor="w")
        
        content = tk.Frame(metrics_card, bg="#1e2a4a")
        content.pack(fill="x", padx=15, pady=(0, 15))
        
        self.create_metric_display(content, "🎯", "Complexity", "Unknown", "#6c757d")
        self.create_metric_display(content, "✂️", "Cut Paths", "0", "#4a90e2")
        self.create_metric_display(content, "📐", "Cut Area", "0%", "#17a2b8")
        self.create_metric_display(content, "⏱️", "Est. Time", "0 min", "#28a745")
        
    def create_metric_display(self, parent, icon, label, value, color):
        """Create a metric display"""
        metric_frame = tk.Frame(parent, bg="#2a3f63", relief="flat", bd=0)
        metric_frame.pack(fill="x", pady=3)
        
        content_frame = tk.Frame(metric_frame, bg="#2a3f63")
        content_frame.pack(fill="x", padx=12, pady=8)
        
        left_frame = tk.Frame(content_frame, bg="#2a3f63")
        left_frame.pack(side="left")
        
        tk.Label(left_frame, text=icon, font=("Arial", 12), 
                bg="#2a3f63", fg=color).pack(side="left", padx=(0, 8))
        
        tk.Label(left_frame, text=label, font=("Arial", 9, "bold"), 
                bg="#2a3f63", fg="#ffffff").pack(side="left")
        
        value_label = tk.Label(content_frame, text=value, 
                              font=("Arial", 10, "bold"),
                              bg="#2a3f63", fg=color)
        value_label.pack(side="right")
        
        setattr(self, f"{label.lower().replace(' ', '_')}_value_label", value_label)
        return metric_frame
        
    def setup_recommendations_card(self, parent):
        """Setup recommendations"""
        rec_card = tk.Frame(parent, bg="#1e2a4a", relief="flat", bd=1)
        rec_card.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        header = tk.Frame(rec_card, bg="#1e2a4a")
        header.pack(fill="x", padx=15, pady=(15, 10))
        
        tk.Label(header, text="💡 Smart Recommendations", 
                font=("Arial", 12, "bold"),
                bg="#1e2a4a", fg="#ffffff").pack(anchor="w")
        
        content_frame = tk.Frame(rec_card, bg="#1e2a4a")
        content_frame.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        self.recommendations_text = tk.Text(content_frame, height=12, width=25,
                                           bg="#2a3f63", fg="#e2e8f0", 
                                           font=("Arial", 9),
                                           wrap="word", relief="flat", bd=0,
                                           padx=12, pady=12)
        self.recommendations_text.pack(fill="both", expand=True)
        
        welcome_text = """🎨 Welcome to Advanced Cricut Converter!

📋 Getting Started:
1. Load an image using the button or drag & drop
2. Choose a preset that matches your project
3. Select your target material
4. Toggle live preview ON to see changes in real-time
5. Adjust settings and watch the preview update
6. Export as SVG for Cricut

💡 Tips:
• Portrait preset works best for faces
• Simple preset for thick materials
• Use material selection for optimization
• Live preview shows black & white conversion
• Green lines show where cuts will be made

Ready to create amazing cuts! 🚀"""
        
        self.recommendations_text.insert("1.0", welcome_text)
        self.recommendations_text.config(state="disabled")
        
    def toggle_live_preview(self):
        """Toggle live preview on/off"""
        self.live_preview_enabled = self.live_preview_var.get()
        if self.live_preview_enabled and self.original_image is not None:
            self.schedule_preview_update()
        elif not self.live_preview_enabled and self.original_image is not None:
            # Show original image when live preview is off
            self.display_original_image()
        
    def schedule_preview_update(self):
        """Schedule a preview update to avoid too frequent updates"""
        if not self.preview_update_pending and self.live_preview_enabled:
            self.preview_update_pending = True
            self.window.after(200, self._delayed_preview_update)
    
    def _delayed_preview_update(self):
        """Perform delayed preview update"""
        self.preview_update_pending = False
        if self.live_preview_enabled and self.original_image is not None:
            self.update_live_preview()
    
    def update_live_preview(self):
        """Update the live preview with current settings"""
        if self.original_image is None or not self.live_preview_enabled:
            return
            
        try:
            # Get current settings
            threshold = self.threshold_var.get()
            blur_radius = self.blur_var.get()
            min_area = self.min_area_var.get()
            face_enhancement = self.face_enhancement_var.get()
            
            # Process image with current settings
            gray = cv2.cvtColor(self.original_image, cv2.COLOR_BGR2GRAY)
            
            # Apply face enhancement if enabled
            if face_enhancement and self.face_detection_available:
                gray = self.enhance_faces(gray)
            
            # Apply blur
            if blur_radius > 0:
                gray = cv2.GaussianBlur(gray, (blur_radius*2+1, blur_radius*2+1), 0)
            
            # Apply threshold
            _, binary = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
            
            # Apply morphology
            kernel = np.ones((self.settings['morphology_size'], 
                            self.settings['morphology_size']), np.uint8)
            binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
            binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
            
            # Find contours for preview
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            filtered_contours = [c for c in contours if cv2.contourArea(c) >= min_area]
            
            # Create preview image
            preview_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
            
            # Draw contours on preview
            if filtered_contours:
                cv2.drawContours(preview_image, filtered_contours, -1, (0, 255, 0), 2)
            
            # Update the display
            self.display_processed_image(preview_image)
            
            # Update metrics in real-time
            self.update_metrics_from_contours(filtered_contours, binary)
            
        except Exception as e:
            logging.error(f"Error updating live preview: {e}")
    
    def display_processed_image(self, image):
        """Display a processed image in the preview canvas"""
        if image is not None:
            self.canvas_placeholder.place_forget()
            
            height, width = image.shape[:2]
            canvas_width = 600
            canvas_height = 600
            
            scale = min(canvas_width/width, canvas_height/height, 1.0)
            new_width = int(width * scale * self.zoom_factor)
            new_height = int(height * scale * self.zoom_factor)
            
            display_image = cv2.resize(image, (new_width, new_height))
            display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
            
            pil_image = Image.fromarray(display_image)
            self.photo_image = ImageTk.PhotoImage(pil_image)
            
            self.preview_canvas.delete("all")
            self.preview_canvas.create_image(canvas_width//2, canvas_height//2, 
                                           image=self.photo_image)
    
    def update_metrics_from_contours(self, contours, binary_image):
        """Update metrics from given contours and binary image"""
        total_contours = len(contours)
        total_points = sum(len(contour) for contour in contours)
        
        if total_points < 100:
            complexity = "Simple"
            complexity_color = "#28a745"
        elif total_points < 500:
            complexity = "Medium"
            complexity_color = "#ffc107"
        else:
            complexity = "Complex"
            complexity_color = "#dc3545"
            
        if binary_image is not None:
            white_pixels = np.sum(binary_image == 255)
            total_pixels = binary_image.size
            cut_percentage = (white_pixels / total_pixels) * 100
        else:
            cut_percentage = 0
            
        estimated_time = total_points / 50
        
        self.complexity_value_label.config(text=complexity, fg=complexity_color)
        self.cut_paths_value_label.config(text=str(total_contours))
        self.cut_area_value_label.config(text=f"{cut_percentage:.1f}%")
        self.est._time_value_label.config(text=f"{estimated_time:.1f} min")
        
        self.header_status.config(text=f"● {complexity} Complexity", fg=complexity_color)
        
    def load_image(self):
        """Load an image file"""
        file_path = filedialog.askopenfilename(
            filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp *.tiff")]
        )
        if file_path:
            try:
                self.original_image = cv2.imread(file_path)
                if self.original_image is not None:
                    self.current_image_path = file_path
                    self.file_label.config(text="Loaded: " + Path(file_path).name)
                    self.display_original_image()
                    self.analyze_image_characteristics()
                    self.update_status("✅ Image loaded successfully")
                    if self.live_preview_enabled:
                        self.schedule_preview_update()
                else:
                    messagebox.showerror("Error", "Could not load image")
            except Exception as e:
                logging.error(f"Error loading image: {e}")
                messagebox.showerror("Error", f"Failed to load image: {str(e)}")
                
    def display_original_image(self):
        """Display the original image"""
        if self.original_image is not None:
            self.canvas_placeholder.place_forget()
            
            height, width = self.original_image.shape[:2]
            canvas_width = 600
            canvas_height = 600
            
            scale = min(canvas_width/width, canvas_height/height, 1.0)
            new_width = int(width * scale * self.zoom_factor)
            new_height = int(height * scale * self.zoom_factor)
            
            display_image = cv2.resize(self.original_image, (new_width, new_height))
            display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
            
            pil_image = Image.fromarray(display_image)
            self.photo_image = ImageTk.PhotoImage(pil_image)
            
            self.preview_canvas.delete("all")
            self.preview_canvas.create_image(canvas_width//2, canvas_height//2, 
                                           image=self.photo_image)
            
    def analyze_image_characteristics(self):
        """Analyze image for recommendations"""
        if self.original_image is None:
            return
            
        gray = cv2.cvtColor(self.original_image, cv2.COLOR_BGR2GRAY)
        height, width = gray.shape
        total_pixels = height * width
        
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / total_pixels
        contrast = np.std(gray)
        
        faces_detected = 0
        if self.face_detection_available:
            faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
            faces_detected = len(faces)
        
        recommendations = []
        
        if faces_detected > 0:
            recommendations.append("👤 Portrait detected - use Portrait preset")
            recommendations.append("✅ Enable face enhancement for better results")
            
        if edge_density > 0.1:
            recommendations.append("🔍 High detail image - increase blur radius")
            recommendations.append("⚡ Consider using Simple preset for easier cutting")
        elif edge_density < 0.05:
            recommendations.append("📐 Low detail image - use Detailed preset")
            
        if contrast < 30:
            recommendations.append("🎚️ Low contrast - adjust threshold carefully")
        elif contrast > 80:
            recommendations.append("✅ High contrast - excellent for cutting")
            
        recommendations.append("\n🔄 Toggle Live Preview ON to see changes in real-time!")
        recommendations.append("🎯 Adjust sliders and watch the preview update instantly")
            
        self.recommendations_text.config(state="normal")
        self.recommendations_text.delete(1.0, tk.END)
        for rec in recommendations:
            self.recommendations_text.insert(tk.END, rec + "\n\n")
        self.recommendations_text.config(state="disabled")
            
    def apply_preset(self):
        """Apply selected preset settings"""
        preset_name = self.preset_var.get()
        if preset_name in self.presets:
            preset = self.presets[preset_name]
            
            self.threshold_var.set(preset['threshold'])
            self.blur_var.set(preset['blur_radius'])
            self.min_area_var.set(preset['min_area'])
            self.simplification_var.set(preset['simplification'] * 1000)
            self.detail_var.set(preset['detail_preservation'] * 100)
            self.face_enhancement_var.set(preset['face_enhancement'])
            
            self.settings.update(preset)
            
            # Trigger live preview update if enabled
            if self.live_preview_enabled:
                self.schedule_preview_update()
            
    def on_slider_change(self):
        """Handle slider changes"""
        self.settings['threshold'] = self.threshold_var.get()
        self.settings['blur_radius'] = self.blur_var.get()
        self.settings['min_area'] = self.min_area_var.get()
        self.settings['simplification'] = self.simplification_var.get() / 1000
        self.settings['detail_preservation'] = self.detail_var.get() / 100
        
        # Trigger live preview update if enabled
        if self.live_preview_enabled:
            self.schedule_preview_update()
    
    def on_face_enhancement_change(self):
        """Handle face enhancement toggle"""
        self.settings['face_enhancement'] = self.face_enhancement_var.get()
        
        # Trigger live preview update if enabled
        if self.live_preview_enabled:
            self.schedule_preview_update()
        
    def on_material_change(self, event=None):
        """Adjust settings based on material"""
        material = self.material_var.get()
        
        material_settings = {
            'Vinyl': {
                'min_area': 50,
                'simplification': 0.01,
                'morphology_size': 2,
                'tip': "💡 Perfect for detailed designs and decals"
            },
            'Cardstock': {
                'min_area': 100,
                'simplification': 0.02,
                'morphology_size': 3,
                'tip': "💡 Great for cards and lightweight projects"
            },
            'Poster Board': {
                'min_area': 150,
                'simplification': 0.025,
                'morphology_size': 4,
                'tip': "💡 Good for signs, avoid fine details"
            },
            'Fabric': {
                'min_area': 200,
                'simplification': 0.03,
                'morphology_size': 5,
                'tip': "💡 Use fabric mat, consider interfacing"
            },
            'Leather': {
                'min_area': 300,
                'simplification': 0.04,
                'morphology_size': 6,
                'tip': "💡 Deep cut blade required, simple shapes only"
            },
            'Chipboard': {
                'min_area': 400,
                'simplification': 0.05,
                'morphology_size': 7,
                'tip': "💡 Maximum pressure, very simple designs"
            }
        }
        
        if material in material_settings:
            settings = material_settings[material]
            self.min_area_var.set(settings['min_area'])
            self.simplification_var.set(settings['simplification'] * 1000)
            self.settings['morphology_size'] = settings['morphology_size']
            self.material_tips.config(text=settings['tip'])
            
            # Trigger live preview update if enabled
            if self.live_preview_enabled:
                self.schedule_preview_update()
            
    def process_image(self):
        """Process the image"""
        if self.original_image is None:
            messagebox.showwarning("Warning", "Please load an image first")
            return
            
        if self.processing_thread and self.processing_thread.is_alive():
            return
            
        self.processing_thread = threading.Thread(target=self._process_image_thread)
        self.processing_thread.start()
        
    def _process_image_thread(self):
        """Process image in separate thread"""
        try:
            self.update_status("🔄 Converting to black & white...")
            self.progress_var.set(10)
            
            gray = cv2.cvtColor(self.original_image, cv2.COLOR_BGR2GRAY)
            self.progress_var.set(20)
            
            if self.settings['face_enhancement'] and self.face_detection_available:
                gray = self.enhance_faces(gray)
                self.update_status("👤 Enhancing faces...")
            self.progress_var.set(30)
            
            if self.settings['blur_radius'] > 0:
                gray = cv2.GaussianBlur(gray, 
                                      (self.settings['blur_radius']*2+1, 
                                       self.settings['blur_radius']*2+1), 0)
                self.update_status("🌫️ Applying smoothing...")
            self.progress_var.set(40)
            
            _, binary = cv2.threshold(gray, self.settings['threshold'], 255, 
                                    cv2.THRESH_BINARY)
            self.update_status("⚫⚪ Converting to black & white...")
            self.progress_var.set(50)
            
            kernel = np.ones((self.settings['morphology_size'], 
                            self.settings['morphology_size']), np.uint8)
            binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
            binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
            self.update_status("🔧 Cleaning up edges...")
            self.progress_var.set(60)
            
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, 
                                         cv2.CHAIN_APPROX_SIMPLE)
            self.update_status("🔍 Finding cut paths...")
            self.progress_var.set(70)
            
            min_area = self.settings['min_area']
            filtered_contours = [c for c in contours if cv2.contourArea(c) >= min_area]
            self.update_status("📏 Filtering details...")
            self.progress_var.set(80)
            
            simplified_contours = []
            for contour in filtered_contours:
                epsilon = self.settings['simplification'] * cv2.arcLength(contour, True)
                simplified = cv2.approxPolyDP(contour, epsilon, True)
                simplified_contours.append(simplified)
            
            self.contours = simplified_contours
            self.processed_image = binary
            self.update_status("✂️ Optimizing for cutting...")
            self.progress_var.set(90)
            
            self.window.after(0, self.update_preview)
            self.window.after(0, self.update_metrics)
            self.progress_var.set(100)
            
            self.update_status("✅ Black & white conversion complete!")
            
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            traceback.print_exc()
            self.window.after(0, lambda: messagebox.showerror("Error", 
                                                            f"Processing failed: {str(e)}"))
            self.update_status("❌ Processing failed")
            
    def enhance_faces(self, gray_image):
        """Apply face-specific enhancements"""
        try:
            faces = self.face_cascade.detectMultiScale(gray_image, 1.1, 4)
            enhanced = gray_image.copy()
            
            for (x, y, w, h) in faces:
                face_region = enhanced[y:y+h, x:x+w]
                face_enhanced = cv2.equalizeHist(face_region)
                alpha = 0.7
                enhanced[y:y+h, x:x+w] = cv2.addWeighted(
                    face_region, 1-alpha, face_enhanced, alpha, 0)
                    
            return enhanced
        except:
            return gray_image
            
    def update_preview(self):
        """Update the preview with processed image"""
        if self.processed_image is not None:
            display_image = cv2.cvtColor(self.processed_image, cv2.COLOR_GRAY2BGR)
            
            if self.contours:
                cv2.drawContours(display_image, self.contours, -1, (0, 255, 0), 2)
            
            self.display_processed_image(display_image)
                                           
    def update_metrics(self):
        """Update cutting metrics display"""
        if self.contours is None:
            return
            
        self.update_metrics_from_contours(self.contours, self.processed_image)
        
    def preview_cut_lines(self):
        """Show cutting lines overlay"""
        if self.processed_image is None or self.contours is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
        
        height, width = self.processed_image.shape
        cut_preview = np.zeros((height, width, 3), dtype=np.uint8)
        cut_preview[:] = (50, 50, 50)
        
        for contour in self.contours:
            area = cv2.contourArea(contour)
            
            if area > 1000:
                color = (0, 255, 0)  # Green for easy cuts
            elif area > 100:
                color = (0, 255, 255)  # Yellow for medium cuts
            else:
                color = (0, 0, 255)  # Red for difficult cuts
            
            cv2.drawContours(cut_preview, [contour], -1, color, 2)
            cv2.fillPoly(cut_preview, [contour], (255, 255, 255))
            cv2.drawContours(cut_preview, [contour], -1, color, 2)
        
        self.preview_cut_image = cut_preview
        self.display_cut_preview()
    
    def display_cut_preview(self):
        """Display the cut line preview"""
        if hasattr(self, 'preview_cut_image'):
            self.display_processed_image(self.preview_cut_image)
            
    def export_svg(self):
        """Export processed image as SVG"""
        if self.contours is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
            
        file_path = filedialog.asksaveasfilename(
            defaultextension=".svg",
            filetypes=[("SVG files", "*.svg")]
        )
        
        if file_path:
            try:
                self.create_svg(file_path)
                messagebox.showinfo("Success", f"SVG exported to: {file_path}")
            except Exception as e:
                logging.error(f"Error exporting SVG: {e}")
                messagebox.showerror("Error", f"Failed to export SVG: {str(e)}")
                
    def create_svg(self, file_path):
        """Create SVG file from contours"""
        height, width = self.processed_image.shape
        width_inches = width / 300
        height_inches = height / 300
        
        dwg = svgwrite.Drawing(file_path, 
                              size=(f"{width_inches}in", f"{height_inches}in"), 
                              viewBox=f"0 0 {width} {height}")
        
        for i, contour in enumerate(self.contours):
            path_data = self.contour_to_svg_path(contour)
            dwg.add(dwg.path(d=path_data, fill='black', stroke='none', id=f'cut_{i}'))
            
        dwg.save()
        
    def contour_to_svg_path(self, contour):
        """Convert contour to SVG path"""
        if len(contour) == 0:
            return ""
        
        points = contour.reshape(-1, 2)
        if len(points) < 3:
            return ""
        
        path_data = f"M {points[0][0]:.2f} {points[0][1]:.2f}"
        
        for point in points[1:]:
            path_data += f" L {point[0]:.2f} {point[1]:.2f}"
        
        path_data += " Z"
        return path_data
        
    def save_project(self):
        """Save project settings"""
        file_path = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("Project files", "*.json")]
        )
        
        if file_path:
            project_data = {
                'settings': self.settings.copy(),
                'material': self.material_var.get(),
                'preset': self.preset_var.get(),
                'image_path': getattr(self, 'current_image_path', ''),
                'live_preview': self.live_preview_enabled,
                'timestamp': time.time()
            }
            
            try:
                with open(file_path, 'w') as f:
                    json.dump(project_data, f, indent=2)
                messagebox.showinfo("Success", "Project saved successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to save project: {str(e)}")
    
    def load_project(self):
        """Load project settings"""
        file_path = filedialog.askopenfilename(
            filetypes=[("Project files", "*.json")]
        )
        
        if file_path:
            try:
                with open(file_path, 'r') as f:
                    project_data = json.load(f)
                
                if 'settings' in project_data:
                    self.settings.update(project_data['settings'])
                    
                if 'material' in project_data:
                    self.material_var.set(project_data['material'])
                if 'preset' in project_data:
                    self.preset_var.set(project_data['preset'])
                if 'live_preview' in project_data:
                    self.live_preview_var.set(project_data['live_preview'])
                    self.live_preview_enabled = project_data['live_preview']
                
                self.threshold_var.set(self.settings.get('threshold', 128))
                self.blur_var.set(self.settings.get('blur_radius', 2))
                self.min_area_var.set(self.settings.get('min_area', 100))
                self.simplification_var.set(self.settings.get('simplification', 0.02) * 1000)
                self.detail_var.set(self.settings.get('detail_preservation', 0.5) * 100)
                self.face_enhancement_var.set(self.settings.get('face_enhancement', True))
                
                messagebox.showinfo("Success", "Project loaded successfully!")
                
                # Trigger preview update if live preview is enabled
                if self.live_preview_enabled and self.original_image is not None:
                    self.schedule_preview_update()
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load project: {str(e)}")
        
    def zoom_in(self):
        """Zoom in preview"""
        self.zoom_factor *= 1.2
        if self.zoom_factor > 5.0:
            self.zoom_factor = 5.0
        self.update_zoom()
        
    def zoom_out(self):
        """Zoom out preview"""
        self.zoom_factor /= 1.2
        if self.zoom_factor < 0.2:
            self.zoom_factor = 0.2
        self.update_zoom()
    
    def update_zoom(self):
        """Update display with zoom"""
        if hasattr(self, 'photo_image'):
            if hasattr(self, 'preview_cut_image'):
                self.display_cut_preview()
            elif self.processed_image is not None:
                self.update_preview()
            elif self.live_preview_enabled:
                self.update_live_preview()
            else:
                self.display_original_image()
                
    def reset_view(self):
        """Reset view"""
        self.zoom_factor = 1.0
        if self.live_preview_enabled and self.original_image is not None:
            self.update_live_preview()
        elif self.original_image is not None:
            self.display_original_image()
            
    def update_status(self, message):
        """Update status label"""
        def update():
            self.status_label.config(text=message)
            if "complete" in message.lower():
                self.header_status.config(text="● Complete", fg="#4ade80")
            elif "processing" in message.lower() or "converting" in message.lower():
                self.header_status.config(text="● Processing...", fg="#fbbf24")
            elif "failed" in message.lower():
                self.header_status.config(text="● Error", fg="#ef4444")
        self.window.after(0, update)
        
    def run(self):
        """Start the application"""
        self.window.mainloop()

# Application entry point
if __name__ == "__main__":
    try:
        app = CricutSVGConverter()
        app.run()
    except Exception as e:
        print(f"Error starting application: {e}")
        traceback.print_exc()