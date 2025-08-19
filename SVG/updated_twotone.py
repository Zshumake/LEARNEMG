        print("All cards created successfully!")
        
    def create_card(self, parent, title, setup_func):
        """Create a modern card-style section"""
        card_container = tk.Frame(parent, bg="#16213e")
        card_container.pack(fill="x", padx=10, pady=8)
        
        card_frame = tk.Frame(card_container, bg="#2c3e50", relief="flat", bd=1)
        card_frame.pack(fill="x", padx=2, pady=2)
        
        header_frame = tk.Frame(card_frame, bg="#2c3e50", height=40)
        header_frame.pack(fill="x", padx=15, pady=(15, 5))
        header_frame.pack_propagate(False)
        
        title_label = tk.Label(header_frame, text=title, 
                              font=("Arial", 12, "bold"), 
                              bg="#2c3e50", fg="#ffffff")
        title_label.pack(anchor="w", pady=5)
        
        content_frame = tk.Frame(card_frame, bg="#2c3e50")
        content_frame.pack(fill="x", padx=15, pady=(0, 15))
        
        setup_func(content_frame)
        return card_frame

    def setup_file_card(self, parent):
        """Setup file selection card content with drag and drop"""
        # Drag and drop area
        drop_frame = tk.Frame(parent, bg="#34495e", relief="solid", bd=2, height=100)
        drop_frame.pack(fill="x", pady=(0, 10))
        drop_frame.pack_propagate(False)
        
        # Configure drag and drop if available
        if self.dnd_available:
            drop_frame.drop_target_register(DND_FILES)
            drop_frame.dnd_bind('<<Drop>>', self.handle_drop)
        
        # Drop area content
        drop_content = tk.Frame(drop_frame, bg="#34495e")
        drop_content.pack(expand=True, fill="both")
        
        if self.dnd_available:
            tk.Label(drop_content, text="📎 Drag & Drop Image Here", 
                    font=("Arial", 12, "bold"), bg="#34495e", fg="#ffffff").pack(expand=True)
            tk.Label(drop_content, text="Supports: JPG, PNG, BMP, TIFF", 
                    font=("Arial", 9), bg="#34495e", fg="#bdc3c7").pack()
        else:
            tk.Label(drop_content, text="📂 Click Button Below to Load Image", 
                    font=("Arial", 12, "bold"), bg="#34495e", fg="#ffffff").pack(expand=True)
            tk.Label(drop_content, text="(Install tkinterdnd2 for drag & drop)", 
                    font=("Arial", 8), bg="#34495e", fg="#bdc3c7").pack()
        
        # Load button
        load_btn = tk.Button(parent, text="📂 Choose Image File", command=self.load_image,
                            bg="#3498db", fg="#ffffff", font=("Arial", 11, "bold"),
                            relief="flat", bd=0, padx=20, pady=10,
                            activebackground="#2980b9", activeforeground="#ffffff",
                            cursor="hand2")
        load_btn.pack(fill="x", pady=(0, 10))
        
        self.file_label = tk.Label(parent, text="No image loaded", 
                                  bg="#2c3e50", fg="#bdc3c7", wraplength=280,
                                  font=("Arial", 9), justify="left")
        self.file_label.pack(anchor="w")

    def setup_background_card(self, parent):
        """Setup background removal controls"""
        self.remove_background_var = tk.BooleanVar(value=False)
        
        bg_frame = tk.Frame(parent, bg="#2c3e50")
        bg_frame.pack(fill="x", pady=5)
        
        if self.rembg_available:
            bg_check = tk.Checkbutton(bg_frame, text="🗑️ Remove Background", 
                                     variable=self.remove_background_var,
                                     command=self.on_background_toggle,
                                     bg="#2c3e50", fg="#ffffff", selectcolor="#27ae60",
                                     font=("Arial", 11, "bold"),
                                     activebackground="#2c3e50", activeforeground="#ffffff")
            bg_check.pack(anchor="w")
            
            tk.Label(bg_frame, text="✨ AI-powered background removal\nPerfect for portraits and silhouettes", 
                    bg="#2c3e50", fg="#bdc3c7", font=("Arial", 9),
                    justify="left").pack(anchor="w", padx=20, pady=(5, 0))
        else:
            tk.Label(bg_frame, text="📦 Background Removal Unavailable", 
                    bg="#2c3e50", fg="#e74c3c", font=("Arial", 11, "bold")).pack(anchor="w")
            
            tk.Label(bg_frame, text="Install 'rembg' package:\npip install rembg", 
                    bg="#2c3e50", fg="#bdc3c7", font=("Arial", 9),
                    justify="left").pack(anchor="w", pady=(5, 0))

    def setup_preview_toggle_card(self, parent):
        """Setup live preview toggle"""
        self.live_preview_var = tk.BooleanVar(value=True)
        
        toggle_frame = tk.Frame(parent, bg="#2c3e50")
        toggle_frame.pack(fill="x", pady=5)
        
        preview_check = tk.Checkbutton(toggle_frame, text="🔄 Real-time Preview", 
                                      variable=self.live_preview_var,
                                      command=self.toggle_live_preview,
                                      bg="#2c3e50", fg="#ffffff", selectcolor="#27ae60",
                                      font=("Arial", 11, "bold"),
                                      activebackground="#2c3e50", activeforeground="#ffffff")
        preview_check.pack(anchor="w")
        
        tk.Label(toggle_frame, text="See changes as you adjust settings", 
                bg="#2c3e50", fg="#bdc3c7", font=("Arial", 9)).pack(anchor="w", padx=20)

    def setup_presets_card(self, parent):
        """Setup enhanced presets card with 6 common photo types"""
        self.preset_var = tk.StringVar(value="portrait")
        
        preset_data = [
            ("👤 Portrait", "portrait", "Perfect for people & faces"),
            ("🏞️ Landscape", "landscape", "Nature & scenery photos"),
            ("📝 Logo/Text", "logo_text", "Clean text & logos"),
            ("🌅 Silhouette", "silhouette", "Simple shape outlines"),
            ("🎨 Detailed Art", "detailed_art", "Complex artwork & drawings"),
            ("⚡ Simple Shapes", "simple_shapes", "Basic geometric forms")
        ]
        
        for text, value, desc in preset_data:
            preset_frame = tk.Frame(parent, bg="#2c3e50")
            preset_frame.pack(fill="x", pady=1)
            
            radio = tk.Radiobutton(preset_frame, text=text, variable=self.preset_var, 
                                  value=value, command=self.apply_preset,
                                  bg="#2c3e50", fg="#ffffff", selectcolor="#3498db",
                                  font=("Arial", 9, "bold"),
                                  activebackground="#2c3e50", activeforeground="#ffffff",
                                  cursor="hand2")
            radio.pack(anchor="w")
            
            tk.Label(preset_frame, text=desc, bg="#2c3e50", fg="#bdc3c7",
                    font=("Arial", 7), wraplength=250).pack(anchor="w", padx=20)

    def setup_touchup_card(self, parent):
        """Setup enhanced manual touch-up tools for removing white dots"""
        # Tool selection with enhanced descriptions
        tool_frame = tk.Frame(parent, bg="#2c3e50")
        tool_frame.pack(fill="x", pady=(0, 10))
        
        tk.Label(tool_frame, text="Cleanup Tools:", bg="#2c3e50", fg="#ffffff",
                font=("Arial", 10, "bold")).pack(anchor="w", pady=(0, 5))
        
        # Enhanced tool buttons with better descriptions
        button_frame = tk.Frame(tool_frame, bg="#2c3e50")
        button_frame.pack(fill="x")
        
        self.paint_btn = tk.Button(button_frame, text="🎨 Fill Dots", 
                                  command=lambda: self.set_drawing_tool("paint"),
                                  bg="#27ae60", fg="#ffffff", font=("Arial", 9, "bold"),
                                  relief="flat", bd=0, padx=8, pady=6,
                                  activebackground="#2ecc71", activeforeground="#ffffff",
                                  cursor="hand2")
        self.paint_btn.pack(side="left", padx=(0, 3), expand=True, fill="x")
        
        self.erase_btn = tk.Button(button_frame, text="✂️ Add Cuts", 
                                  command=lambda: self.set_drawing_tool("erase"),
                                  bg="#e74c3c", fg="#ffffff", font=("Arial", 9, "bold"),
                                  relief="flat", bd=0, padx=8, pady=6,
                                  activebackground="#c0392b", activeforeground="#ffffff",
                                  cursor="hand2")
        self.erase_btn.pack(side="left", expand=True, fill="x")
        
        # Auto white dot removal button
        auto_frame = tk.Frame(parent, bg="#2c3e50")
        auto_frame.pack(fill="x", pady=(5, 10))
        
        auto_btn = tk.Button(auto_frame, text="🪄 Auto-Remove Small Dots", 
                            command=self.auto_remove_white_dots,
                            bg="#9b59b6", fg="#ffffff", font=("Arial", 10, "bold"),
                            relief="flat", bd=0, padx=15, pady=8,
                            activebackground="#8e44ad", activeforeground="#ffffff",
                            cursor="hand2")
        auto_btn.pack(fill="x")
        
        # Drawing mode toggle with enhanced instructions
        drawing_frame = tk.Frame(parent, bg="#2c3e50")
        drawing_frame.pack(fill="x", pady=(10, 0))
        
        self.drawing_mode_var = tk.BooleanVar(value=False)
        drawing_check = tk.Checkbutton(drawing_frame, text="✏️ Enable Cleanup Mode", 
                                      variable=self.drawing_mode_var,
                                      command=self.toggle_drawing_mode,
                                      bg="#2c3e50", fg="#ffffff", selectcolor="#27ae60",
                                      font=("Arial", 10, "bold"),
                                      activebackground="#2c3e50", activeforeground="#ffffff")
        drawing_check.pack(anchor="w")

    def setup_material_card(self, parent):
        """Setup material selection"""
        tk.Label(parent, text="Target Material:", bg="#2c3e50", fg="#ffffff",
                font=("Arial", 10, "bold")).pack(anchor="w", pady=(0, 5))
        
        self.material_var = tk.StringVar(value="Cardstock")
        materials = ["Vinyl", "Cardstock", "Poster Board", "Fabric", "Leather", "Chipboard"]
        
        material_menu = ttk.Combobox(parent, textvariable=self.material_var, 
                                    values=materials, state="readonly", font=("Arial", 10))
        material_menu.pack(fill="x", pady=(0, 10))
        material_menu.bind('<<ComboboxSelected>>', self.on_material_change)
        
        self.material_tips = tk.Label(parent, text="💡 Standard settings work well", 
                                     bg="#2c3e50", fg="#bdc3c7", font=("Arial", 9),
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

    def create_modern_slider(self, parent, label, variable, min_val, max_val, tooltip):
        """Create a modern slider with value display"""
        slider_frame = tk.Frame(parent, bg="#2c3e50")
        slider_frame.pack(fill="x", pady=8)
        
        header_frame = tk.Frame(slider_frame, bg="#2c3e50")
        header_frame.pack(fill="x")
        
        tk.Label(header_frame, text=label, bg="#2c3e50", fg="#ffffff", 
                font=("Arial", 9, "bold")).pack(side="left")
        
        value_label = tk.Label(header_frame, text=str(variable.get()), 
                              bg="#3498db", fg="#ffffff", font=("Arial", 8, "bold"),
                              padx=8, pady=2)
        value_label.pack(side="right")
        
        slider = tk.Scale(slider_frame, from_=min_val, to=max_val, orient="horizontal",
                         variable=variable, bg="#2c3e50", fg="#ffffff",
                         troughcolor="#34495e", activebackground="#3498db",
                         highlightthickness=0, bd=0, font=("Arial", 8),
                         command=lambda v: self.update_slider_display(value_label, variable, v))
        slider.pack(fill="x", pady=(5, 0))
        
        tk.Label(slider_frame, text=tooltip, bg="#2c3e50", fg="#bdc3c7",
                font=("Arial", 8), wraplength=250).pack(anchor="w")
        
        variable.trace('w', lambda *args: self.on_slider_change())

    def setup_processing_card(self, parent):
        """Setup processing controls"""
        # Primary action buttons
        button_configs = [
            ("🔄 Process to Black & White", self.process_image, "#27ae60", "#ffffff"),
            ("👁️ Preview Cut Lines", self.preview_cut_lines, "#3498db", "#ffffff"),
            ("💾 Export SVG", self.export_svg, "#e74c3c", "#ffffff")
        ]
        
        for text, command, bg_color, fg_color in button_configs:
            btn = tk.Button(parent, text=text, command=command,
                           bg=bg_color, fg=fg_color, font=("Arial", 11, "bold"),
                           relief="flat", bd=0, padx=20, pady=12,
                           cursor="hand2")
            btn.pack(fill="x", pady=4)
        
        self.status_label = tk.Label(parent, text="Ready to process", 
                                    bg="#2c3e50", fg="#27ae60", font=("Arial", 9))
        self.status_label.pack(anchor="w", pady=(5, 0))

    def setup_preview_panel(self, parent):
        """Setup the image preview panel with radiology-style controls"""
        preview_container = tk.Frame(parent, bg="#1a1a2e")
        preview_container.pack(side="left", fill="both", expand=True, padx=(0, 15))
        
        preview_frame = tk.Frame(preview_container, bg="#16213e", relief="flat", bd=0)
        preview_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        self.preview_canvas = tk.Canvas(preview_frame, bg="#0a0f1c", 
                                       highlightthickness=0, relief="flat")
        self.preview_canvas.pack(fill="both", expand=True, padx=3, pady=3)
        
        # Bind radiology-style mouse events
        self.preview_canvas.bind("<Button-1>", self.on_canvas_click)
        self.preview_canvas.bind("<B1-Motion>", self.on_canvas_drag)
        self.preview_canvas.bind("<ButtonRelease-1>", self.on_canvas_release)
        
        # Placeholder text
        self.canvas_placeholder = tk.Label(self.preview_canvas, 
                                          text="📷\n\nDrag & Drop Image Here\nor click 'Choose Image File'",
                                          font=("Arial", 12),
                                          bg="#0a0f1c", fg="#7f8c8d",
                                          justify="center")
        self.canvas_placeholder.place(relx=0.5, rely=0.5, anchor="center")

    def setup_analysis_panel(self, parent):
        """Setup the analysis panel"""
        analysis_container = tk.Frame(parent, bg="#1a1a2e")
        analysis_container.pack(side="right", fill="y")
        
        analysis_frame = tk.Frame(analysis_container, bg="#16213e", relief="flat", bd=0, width=300)
        analysis_frame.pack(fill="both", expand=True, padx=5, pady=5)
        analysis_frame.pack_propagate(False)
        
        # Metrics
        self.setup_metrics_card(analysis_frame)
        
        # Recommendations
        self.setup_recommendations_card(analysis_frame)

    def setup_metrics_card(self, parent):
        """Setup cutting metrics"""
        metrics_card = tk.Frame(parent, bg="#2c3e50", relief="flat", bd=1)
        metrics_card.pack(fill="x", padx=15, pady=(0, 15))
        
        header = tk.Frame(metrics_card, bg="#2c3e50")
        header.pack(fill="x", padx=15, pady=(15, 10))
        
        tk.Label(header, text="⚡ Cutting Metrics", 
                font=("Arial", 12, "bold"),
                bg="#2c3e50", fg="#ffffff").pack(anchor="w")
        
        content = tk.Frame(metrics_card, bg="#2c3e50")
        content.pack(fill="x", padx=15, pady=(0, 15))
        
        self.create_metric_display(content, "🎯", "Complexity", "Unknown", "#95a5a6")
        self.create_metric_display(content, "✂️", "Cut Paths", "0", "#3498db")
        self.create_metric_display(content, "📐", "Cut Area", "0%", "#17a2b8")
        self.create_metric_display(content, "⏱️", "Est. Time", "0 min", "#27ae60")

    def create_metric_display(self, parent, icon, label, value, color):
        """Create a metric display"""
        metric_frame = tk.Frame(parent, bg="#34495e", relief="flat", bd=0)
        metric_frame.pack(fill="x", pady=3)
        
        content_frame = tk.Frame(metric_frame, bg="#34495e")
        content_frame.pack(fill="x", padx=12, pady=8)
        
        left_frame = tk.Frame(content_frame, bg="#34495e")
        left_frame.pack(side="left")
        
        tk.Label(left_frame, text=icon, font=("Arial", 12), 
                bg="#34495e", fg=color).pack(side="left", padx=(0, 8))
        
        tk.Label(left_frame, text=label, font=("Arial", 9, "bold"), 
                bg="#34495e", fg="#ffffff").pack(side="left")
        
        value_label = tk.Label(content_frame, text=value, 
                              font=("Arial", 10, "bold"),
                              bg="#34495e", fg=color)
        value_label.pack(side="right")
        
        # Create proper attribute names by replacing spaces and special characters
        attr_name = label.lower().replace(' ', '_').replace('.', '_') + "_value_label"
        setattr(self, attr_name, value_label)
        return metric_frame

    def setup_recommendations_card(self, parent):
        """Setup recommendations"""
        rec_card = tk.Frame(parent, bg="#2c3e50", relief="flat", bd=1)
        rec_card.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        header = tk.Frame(rec_card, bg="#2c3e50")
        header.pack(fill="x", padx=15, pady=(15, 10))
        
        tk.Label(header, text="💡 Smart Recommendations", 
                font=("Arial", 12, "bold"),
                bg="#2c3e50", fg="#ffffff").pack(anchor="w")
        
        content_frame = tk.Frame(rec_card, bg="#2c3e50")
        content_frame.pack(fill="both", expand=True, padx=15, pady=(0, 15))
        
        self.recommendations_text = tk.Text(content_frame, height=12, width=25,
                                           bg="#34495e", fg="#ecf0f1", 
                                           font=("Arial", 9),
                                           wrap="word", relief="flat", bd=0,
                                           padx=12, pady=12)
        self.recommendations_text.pack(fill="both", expand=True)
        
        welcome_text = """🎨 Welcome to Advanced Cricut Converter!

📋 Getting Started:
1. Load an image using the button or drag & drop
2. Choose a preset that matches your project
3. Use drawing tools to clean up white dots
4. Export as SVG for Cricut

Ready to create amazing cuts! 🚀"""
        
        self.recommendations_text.insert("1.0", welcome_text)
        self.recommendations_text.config(state="disabled")

    # Core functionality methods
    def load_image(self):
        """Load an image file"""
        file_path = filedialog.askopenfilename(
            filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp *.tiff")],
            title="Select Image File"
        )
        if file_path:
            try:
                self.original_image = cv2.imread(file_path)
                if self.original_image is not None:
                    self.current_image_path = file_path
                    self.file_label.config(text="Loaded: " + Path(file_path).name)
                    self.display_original_image()
                    self.update_status("✅ Image loaded successfully")
                else:
                    messagebox.showerror("Error", "Could not load image")
            except Exception as e:
                logging.error(f"Error loading image: {e}")
                messagebox.showerror("Error", f"Failed to load image: {str(e)}")

    def handle_drop(self, event):
        """Handle dropped files"""
        if not self.dnd_available:
            return
        try:
            files = event.data.split()
            if files:
                file_path = files[0].strip('{}')
                valid_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif')
                if file_path.lower().endswith(valid_extensions):
                    self.original_image = cv2.imread(file_path)
                    if self.original_image is not None:
                        self.current_image_path = file_path
                        self.file_label.config(text="Loaded: " + Path(file_path).name)
                        self.display_original_image()
                        self.update_status("✅ Image loaded successfully")
                    else:
                        messagebox.showerror("Error", "Could not load the dropped image")
                else:
                    messagebox.showwarning("Warning", "Please drop a valid image file")
        except Exception as e:
            logging.error(f"Error handling dropped file: {e}")
            messagebox.showerror("Error", f"Failed to load dropped file: {str(e)}")

    def display_original_image(self):
        """Display the original image"""
        if self.original_image is not None:
            try:
                self.canvas_placeholder.place_forget()
                
                height, width = self.original_image.shape[:2]
                canvas_width = 600
                canvas_height = 600
                
                scale = min(canvas_width/width, canvas_height/height, 1.0)
                new_width = int(width * scale)
                new_height = int(height * scale)
                
                display_image = cv2.resize(self.original_image, (new_width, new_height))
                display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
                
                pil_image = Image.fromarray(display_image)
                self.photo_image = ImageTk.PhotoImage(pil_image)
                
                self.preview_canvas.delete("all")
                self.preview_canvas.create_image(canvas_width//2, canvas_height//2, 
                                               image=self.photo_image)
            except Exception as e:
                logging.error(f"Error displaying image: {e}")

    def get_current_source_image(self):
        """Get the current source image"""
        return self.original_image

    def on_background_toggle(self):
        """Handle background removal toggle"""
        # Placeholder for background removal
        pass

    def toggle_live_preview(self):
        """Toggle live preview on/off"""
        self.live_preview_enabled = self.live_preview_var.get()

    def apply_preset(self):
        """Apply selected preset settings"""
        preset_name = self.preset_var.get()
        if preset_name in self.presets:
            try:
                preset = self.presets[preset_name]
                self.threshold_var.set(preset['threshold'])
                self.blur_var.set(preset['blur_radius'])
                self.min_area_var.set(preset['min_area'])
                self.settings.update(preset)
                self.update_status(f"✅ {preset_name} preset applied")
            except Exception as e:
                logging.error(f"Error applying preset: {e}")

    def set_drawing_tool(self, tool):
        """Set the current drawing tool"""
        self.drawing_tool = tool
        if hasattr(self, 'paint_btn') and hasattr(self, 'erase_btn'):
            if tool == "paint":
                self.paint_btn.config(bg="#27ae60", relief="flat")
                self.erase_btn.config(bg="#7f8c8d", relief="raised")
                self.update_status("🎨 Fill Dots mode")
            else:
                self.erase_btn.config(bg="#e74c3c", relief="flat")
                self.paint_btn.config(bg="#7f8c8d", relief="raised")
                self.update_status("✂️ Add Cuts mode")

    def toggle_drawing_mode(self):
        """Toggle drawing mode on/off"""
        self.drawing_mode = self.drawing_mode_var.get()
        if self.drawing_mode:
            if self.processed_image is not None:
                self.preview_canvas.config(cursor="pencil")
                self.update_status("✏️ Cleanup mode enabled")
            else:
                self.drawing_mode_var.set(False)
                self.drawing_mode = False
                messagebox.showwarning("No Processed Image", "Please process an image first")
        else:
            self.preview_canvas.config(cursor="arrow")
            self.update_status("🖱️ Normal mode")

    def auto_remove_white_dots(self):
        """Automatically remove small white dots"""
        if self.processed_image is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
        self.update_status("🪄 Auto-removing small white dots...")

    def on_material_change(self, event=None):
        """Adjust settings based on material"""
        try:
            material = self.material_var.get()
            material_settings = {
                'Vinyl': {'min_area': 50, 'tip': "💡 Perfect for detailed designs"},
                'Cardstock': {'min_area': 100, 'tip': "💡 Great for cards"},
                'Poster Board': {'min_area': 150, 'tip': "💡 Good for signs"},
                'Fabric': {'min_area': 200, 'tip': "💡 Use fabric mat"},
                'Leather': {'min_area': 300, 'tip': "💡 Deep cut blade required"},
                'Chipboard': {'min_area': 400, 'tip': "💡 Maximum pressure"}
            }
            
            if material in material_settings:
                settings = material_settings[material]
                self.min_area_var.set(settings['min_area'])
                self.material_tips.config(text=settings['tip'])
        except Exception as e:
            logging.error(f"Error in material change: {e}")

    def update_slider_display(self, label, variable, value):
        """Update the value display for sliders"""
        label.config(text=str(int(float(value))))

    def on_slider_change(self):
        """Handle slider changes"""
        try:
            self.settings['threshold'] = self.threshold_var.get()
            self.settings['blur_radius'] = self.blur_var.get()
            self.settings['min_area'] = self.min_area_var.get()
        except Exception as e:
            logging.error(f"Error in slider change: {e}")

    def process_image(self):
        """Process the image"""
        if self.original_image is None:
            messagebox.showwarning("Warning", "Please load an image first")
            return
        
        try:
            self.update_status("🔄 Processing image...")
            
            # Basic processing
            gray = cv2.cvtColor(self.original_image, cv2.COLOR_BGR2GRAY)
            _, binary = cv2.threshold(gray, self.settings['threshold'], 255, cv2.THRESH_BINARY)
            
            # Find contours
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            filtered_contours = [c for c in contours if cv2.contourArea(c) >= self.settings['min_area']]
            
            self.contours = filtered_contours
            self.processed_image = binary
            
            # Display result
            display_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
            if filtered_contours:
                cv2.drawContours(display_image, filtered_contours, -1, (0, 255, 0), 2)
            
            self.display_processed_image(display_image)
            self.update_metrics_from_contours(filtered_contours, binary)
            self.update_status("✅ Processing complete!")
            
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            messagebox.showerror("Error", f"Processing failed: {str(e)}")

    def display_processed_image(self, image):
        """Display a processed image"""
        if image is not None:
            try:
                self.canvas_placeholder.place_forget()
                
                height, width = image.shape[:2]
                canvas_width = 600
                canvas_height = 600
                
                scale = min(canvas_width/width, canvas_height/height, 1.0)
                new_width = int(width * scale)
                new_height = int(height * scale)
                
                display_image = cv2.resize(image, (new_width, new_height))
                display_image = cv2.cvtColor(display_image, cv2.COLOR_BGR2RGB)
                
                pil_image = Image.fromarray(display_image)
                self.photo_image = ImageTk.PhotoImage(pil_image)
                
                self.preview_canvas.delete("all")
                self.preview_canvas.create_image(canvas_width//2, canvas_height//2, 
                                               image=self.photo_image)
            except Exception as e:
                logging.error(f"Error displaying processed image: {e}")

    def update_metrics_from_contours(self, contours, binary_image):
        """Update metrics from contours"""
        total_contours = len(contours)
        total_points = sum(len(contour) for contour in contours)
        
        if total_points < 100:
            complexity = "Simple"
            complexity_color = "#27ae60"
        elif total_points < 500:
            complexity = "Medium"
            complexity_color = "#f39c12"
        else:
            complexity = "Complex"
            complexity_color = "#e74c3c"
            
        if binary_image is not None:
            white_pixels = np.sum(binary_image == 255)
            total_pixels = binary_image.size
            cut_percentage = (white_pixels / total_pixels) * 100
        else:
            cut_percentage = 0
            
        estimated_time = total_points / 50
        
        # Update labels safely
        if hasattr(self, 'complexity_value_label'):
            self.complexity_value_label.config(text=complexity, fg=complexity_color)
        if hasattr(self, 'cut_paths_value_label'):
            self.cut_paths_value_label.config(text=str(total_contours))
        if hasattr(self, 'cut_area_value_label'):
            self.cut_area_value_label.config(text=f"{cut_percentage:.1f}%")
        if hasattr(self, 'est__time_value_label'):
            self.est__time_value_label.config(text=f"{estimated_time:.1f} min")

    def preview_cut_lines(self):
        """Show cutting lines overlay"""
        if self.processed_image is None or self.contours is None:
            messagebox.showwarning("Warning", "Please process an image first")
            return
        
        try:
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
            
            self.display_processed_image(cut_preview)
        except Exception as e:
            logging.error(f"Error previewing cut lines: {e}")

    def export_svg(self):
        """Export processed image as SVG"""
        if self.contours is None or len(self.contours) == 0:
            messagebox.showwarning("Warning", "Please process an image first")
            return
            
        file_path = filedialog.asksaveasfilename(
            defaultextension=".svg",
            filetypes=[("SVG files", "*.svg")],
            title="Save SVG File"
        )
        
        if file_path:
            try:
                self.create_svg(file_path)
                messagebox.showinfo("Success", f"SVG exported successfully!")
            except Exception as e:
                logging.error(f"Error exporting SVG: {e}")
                messagebox.showerror("Error", f"Failed to export SVG: {str(e)}")

    def create_svg(self, file_path):
        """Create SVG file from contours"""
        if self.processed_image is None:
            return
            
        height, width = self.processed_image.shape
        width_inches = width / 300
        height_inches = height / 300
        
        dwg = svgwrite.Drawing(file_path, 
                              size=(f"{width_inches}in", f"{height_inches}in"), 
                              viewBox=f"0 0 {width} {height}")
        
        for i, contour in enumerate(self.contours):
            path_data = self.contour_to_svg_path(contour)
            if path_data:
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

    # Canvas interaction methods
    def on_canvas_click(self, event):
        """Handle canvas click"""
        if self.original_image is None:
            return

    def on_canvas_drag(self, event):
        """Handle canvas drag"""
        if self.original_image is None:
            return

    def on_canvas_release(self, event):
        """Handle canvas release"""
        pass

    def update_status(self, message):
        """Update status label"""
        def update():
            if hasattr(self, 'status_label'):
                self.status_label.config(text=message)
            if "complete" in message.lower():
                self.header_status.config(text="● Complete", fg="#27ae60")
            elif "processing" in message.lower():
                self.header_status.config(text="● Processing...", fg="#f39c12")
            elif "failed" in message.lower():
                self.header_status.config(text="● Error", fg="#e74c3c")
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
        traceback.print_exc()import cv2
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
import platform

# Try to import background removal
try:
    import rembg
    REMBG_AVAILABLE = True
    print("✅ rembg library successfully imported")
except ImportError as e:
    REMBG_AVAILABLE = False
    print(f"❌ rembg library not available: {e}")

# Try to import drag and drop support
try:
    from tkinterdnd2 import TkinterDnD, DND_FILES
    DND_AVAILABLE = True
    print("✅ tkinterdnd2 successfully imported")
except ImportError:
    DND_AVAILABLE = False
    print("❌ tkinterdnd2 not available - drag and drop disabled")

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
        self.background_removed_image = None
        self.processed_image = None
        self.preview_image = None
        self.contours = None
        self.processing_thread = None
        self.zoom_factor = 1.0
        self.live_preview_enabled = True
        self.preview_update_pending = False
        
        # Drawing/touch-up variables
        self.drawing_mode = False
        self.drawing_tool = "paint"  # "paint" or "erase"
        self.brush_size = 10
        self.drawing_overlay = None
        self.last_draw_x = 0
        self.last_draw_y = 0
        
        # Radiology-style drag variables
        self.drag_active = False
        self.drag_start_x = 0
        self.drag_start_y = 0
        self.drag_start_threshold = 128
        self.drag_start_blur = 2
        self.drag_sensitivity = 2.0
        
        # Background removal
        self.bg_removal_session = None
        self.rembg_available = REMBG_AVAILABLE
        print(f"🔍 Background removal available: {self.rembg_available}")
        
        if self.rembg_available:
            try:
                print("🤖 Initializing AI background removal...")
                self.bg_removal_session = rembg.new_session('u2net')
                print("✅ Background removal initialized successfully")
                logging.info("Background removal initialized successfully")
            except Exception as e:
                print(f"❌ Background removal initialization failed: {e}")
                logging.warning(f"Background removal initialization failed: {e}")
                self.rembg_available = False
        
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
            'cutting_complexity': 'medium',
            'remove_background': False
        }
        
        # Enhanced presets for different use cases
        self.presets = {
            'portrait': {
                'threshold': 145,
                'blur_radius': 1,
                'min_area': 40,
                'simplification': 0.012,
                'face_enhancement': True,
                'detail_preservation': 0.8,
                'remove_background': True,
                'morphology_size': 2
            },
            'landscape': {
                'threshold': 125,
                'blur_radius': 2,
                'min_area': 150,
                'simplification': 0.025,
                'face_enhancement': False,
                'detail_preservation': 0.6,
                'remove_background': False,
                'morphology_size': 4
            },
            'logo_text': {
                'threshold': 160,
                'blur_radius': 0,
                'min_area': 30,
                'simplification': 0.008,
                'face_enhancement': False,
                'detail_preservation': 0.9,
                'remove_background': True,
                'morphology_size': 1
            },
            'silhouette': {
                'threshold': 130,
                'blur_radius': 3,
                'min_area': 200,
                'simplification': 0.035,
                'face_enhancement': False,
                'detail_preservation': 0.3,
                'remove_background': True,
                'morphology_size': 5
            },
            'detailed_art': {
                'threshold': 135,
                'blur_radius': 1,
                'min_area': 20,
                'simplification': 0.006,
                'face_enhancement': False,
                'detail_preservation': 0.95,
                'remove_background': False,
                'morphology_size': 2
            },
            'simple_shapes': {
                'threshold': 110,
                'blur_radius': 5,
                'min_area': 400,
                'simplification': 0.06,
                'face_enhancement': False,
                'detail_preservation': 0.2,
                'remove_background': False,
                'morphology_size': 7
            }
        }
        
        # Initialize face detection first
        self.setup_face_detection()
        
        # Setup UI last, after all methods are defined
        self.setup_ui()
        
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
        
        # Create canvas and scrollbar for scrolling
        canvas = tk.Canvas(control_container, bg="#16213e", width=320, highlightthickness=0)
        scrollbar = ttk.Scrollbar(control_container, orient="vertical", command=canvas.yview)
        scrollable_frame = tk.Frame(canvas, bg="#16213e")
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side="left", fill="both", expand=True, padx=5, pady=5)
        scrollbar.pack(side="right", fill="y")
        
        # Bind mousewheel to canvas - Enhanced for Mac trackpad support
        def _on_mousewheel(event):
            try:
                # Check if we're on macOS for different event handling
                if platform.system() == "Darwin":  # macOS
                    # Handle both regular mousewheel and trackpad scrolling
                    if hasattr(event, 'delta'):
                        canvas.yview_scroll(int(-1*(event.delta/120)), "units")
                    else:
                        # Handle trackpad scroll events
                        canvas.yview_scroll(int(-1*event.delta), "units")
                else:
                    # Windows/Linux
                    canvas.yview_scroll(int(-1*(event.delta/120)), "units")
            except Exception as e:
                logging.error(f"Error in mousewheel handler: {e}")
        
        # Bind multiple mouse wheel events for better compatibility
        canvas.bind_all("<MouseWheel>", _on_mousewheel)  # Windows/Linux
        canvas.bind_all("<Button-4>", lambda e: canvas.yview_scroll(-1, "units"))  # Linux
        canvas.bind_all("<Button-5>", lambda e: canvas.yview_scroll(1, "units"))   # Linux
        
        # Mac trackpad specific bindings
        if platform.system() == "Darwin":
            canvas.bind_all("<Button-4>", lambda e: canvas.yview_scroll(-1, "units"))
            canvas.bind_all("<Button-5>", lambda e: canvas.yview_scroll(1, "units"))
            # Two-finger scroll gestures on Mac
            canvas.bind_all("<Shift-MouseWheel>", _on_mousewheel)
        
        # File selection card
        print("Creating file selection card...")
        self.create_card(scrollable_frame, "📁 Image Selection", self.setup_file_card)
        
        # Background removal card
        print("Creating background removal card...")
        self.create_card(scrollable_frame, "🖼️ Background Control", self.setup_background_card)
        
        # Live preview toggle
        print("Creating live preview card...")
        self.create_card(scrollable_frame, "👁️ Live Preview", self.setup_preview_toggle_card)
        
        # Quick presets card
        print("Creating presets card...")
        self.create_card(scrollable_frame, "⚡ Quick Presets", self.setup_presets_card)
        
        # Touch-up tools card
        print("Creating touchup card...")
        self.create_card(scrollable_frame, "🎨 Touch-up Tools", self.setup_touchup_card)
        
        # Material settings card
        print("Creating material card...")
        self.create_card(scrollable_frame, "🎯 Material Settings", self.setup_material_card)
        
        # Advanced settings card
        print("Creating advanced card...")
        self.create_card(scrollable_frame, "⚙️ Advanced Settings", self.setup_advanced_card)
        
        # Processing card
        print("Creating processing card...")
        self.create_card(scrollable_frame, "🚀 Processing", self.setup_processing_card)
        
        print("All cards created successfully!")