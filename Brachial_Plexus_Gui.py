import tkinter as tk
from tkinter import ttk, messagebox

muscle_innervations = {
    "trapezius": {"roots": ["C3", "C4"], "nerve": "spinal accessory nerve"},
    "SCM": {"roots": ["C3", "C4"], "nerve": "spinal accessory nerve"},
    "rhomboids": {"roots": ["C4", "C5"], "nerve": "dorsal scapular nerve", "cord": "pre-plexus"},
    "supraspinatus": {"roots": ["C5", "C6"], "nerve": "suprascapular nerve", "cord": "upper trunk"},
    "infraspinatus": {"roots": ["C5", "C6"], "nerve": "suprascapular nerve", "cord": "upper trunk"},
    "biceps brachii": {"roots": ["C5", "C6"], "nerve": "musculocutaneous nerve", "cord": "lateral cord"},
    "brachialis": {"roots": ["C5", "C6"], "nerve": "musculocutaneous nerve", "cord": "lateral cord"},
    "deltoid": {"roots": ["C5", "C6"], "nerve": "axillary nerve", "cord": "posterior cord"},
    "teres minor": {"roots": ["C5", "C6"], "nerve": "axillary nerve", "cord": "posterior cord"},
    "BR": {"roots": ["C5", "C6"], "nerve": "radial nerve", "cord": "posterior cord"},
    "serratus anterior": {"roots": ["C5", "C6", "C7"], "nerve": "long thoracic nerve"},
    "Pec major": {"roots": ["C5", "C6", "C7", "C8", "T1"], "nerve": ["medial pectoral nerves", "lateral pectoral nerves"], "cord": ["medial cord", "lateral cord"]},
    "PT": {"roots": ["C6", "C7"], "nerve": "median nerve", "cord": "lateral cord"},
    "FCR": {"roots": ["C6", "C7"], "nerve": "median nerve", "cord": "lateral cord"},
    "ECRL": {"roots": ["C6", "C7"], "nerve": "radial nerve", "cord": "posterior cord"},
    "triceps": {"roots": ["C6", "C7", "C8"], "nerve": "radial nerve", "cord": "posterior cord"},
    "anconeus": {"roots": ["C6", "C7", "C8"], "nerve": "radial nerve", "cord": "posterior cord"},
    "latissimus dorsi": {"roots": ["C6", "C7", "C8"], "nerve": "thoracodorsal nerve", "cord": "posterior cord"},
    "ECU": {"roots": ["C7", "C8"], "nerve": "radial nerve", "cord": "posterior cord", "branch": "PIN"},
    "BIP": {"roots": ["C7", "C8"], "nerve": "radial nerve", "cord": "posterior cord", "branch": "PIN"},
    "ED": {"roots": ["C7", "C8"], "nerve": "radial nerve", "cord": "posterior cord", "branch": "PIN"},
    "FDS": {"roots": ["C7", "C8"], "nerve": "median nerve", "cord": ["medial cord", "lateral cord"]},
    "PQ": {"roots": ["C7", "C8", "T1"], "nerve": "median nerve", "cord": "medial cord", "branch": "AIN"},
    "FPL": {"roots": ["C7", "C8", "T1"], "nerve": "median nerve", "cord": "medial cord", "branch": "AIN"},
    "FDP 2,3": {"roots": ["C7", "C8", "T1"], "nerve": "median nerve", "cord": "medial cord", "branch": "AIN"},
    "DP 4, 5": {"roots": ["C7", "C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"},
    "APB": {"roots": ["C8", "T1"], "nerve": "median nerve", "cord": "medial cord"},
    "FPB": {"roots": ["C8", "T1"], "nerve": "median nerve", "cord": "medial cord"},
    "lumbricals 1,2": {"roots": ["C8", "T1"], "nerve": "median nerve", "cord": "medial cord"},
    "opponens pollicis": {"roots": ["C8", "T1"], "nerve": "median nerve", "cord": "medial cord"},
    "FCU": {"roots": ["C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"},
    "ADM": {"roots": ["C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"},
    "FDI": {"roots": ["C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"},
    "lumbricals 3,4": {"roots": ["C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"},
    "interossei": {"roots": ["C8", "T1"], "nerve": "ulnar nerve", "cord": "medial cord"}
}

class MusclePathwayGUI:
    def __init__(self, master):
        self.master = master
        master.title("Muscle Innervation Pathway")

        self.muscle_states = {}  # Dictionary to store muscle states

        # Main Frame
        main_frame = ttk.Frame(master, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        master.columnconfigure(0, weight=1)
        master.rowconfigure(0, weight=1)

        # Muscle selection dropdown
        self.muscle_var = tk.StringVar()
        ttk.Label(main_frame, text="Select Muscle:").grid(row=0, column=0, sticky=tk.W, pady=5)
        muscle_choices = list(muscle_innervations.keys())
        muscle_choices.sort()
        ttk.Combobox(main_frame, textvariable=self.muscle_var, values=muscle_choices, state="readonly").grid(row=0, column=1, sticky=(tk.W, tk.E), pady=5)

        # Buttons for marking muscle state
        ttk.Button(main_frame, text="Mark Normal", command=self.mark_normal).grid(row=1, column=0, pady=5, padx=5)
        ttk.Button(main_frame, text="Mark Abnormal", command=self.mark_abnormal).grid(row=1, column=1, pady=5, padx=5)

        # Canvas for chart
        self.chart_canvas = tk.Canvas(main_frame, width=1200, height=600, bg="white")
        self.chart_canvas.grid(row=2, column=0, columnspan=2, pady=5)
        self.update_chart()

        # Configure grid for resizing
        for child in main_frame.winfo_children():
            child.grid_configure(padx=5, pady=5)

    def mark_normal(self):
        muscle = self.muscle_var.get()
        if muscle:
            self.muscle_states[muscle] = "normal"
            self.update_chart()
        else:
            messagebox.showwarning("Warning", "Please select a muscle.")

    def mark_abnormal(self):
        muscle = self.muscle_var.get()
        if muscle:
            self.muscle_states[muscle] = "abnormal"
            self.update_chart()
        else:
            messagebox.showwarning("Warning", "Please select a muscle.")

    def update_chart(self):
        self.chart_canvas.delete("all")  # Clear previous chart

        # Gather all unique components for our chart
        all_roots = sorted(set(root for muscle in muscle_innervations.values() for root in muscle.get('roots', [])))
        all_cords = sorted(set(cord for muscle in muscle_innervations.values() if 'cord' in muscle for cord in (muscle['cord'] if isinstance(muscle['cord'], list) else [muscle['cord']])))
        all_nerves = sorted(set(nerve for muscle in muscle_innervations.values() for nerve in (muscle['nerve'] if isinstance(muscle['nerve'], list) else [muscle['nerve']])))
        muscles = sorted(muscle_innervations.keys())

        # Draw table header
        y = 20
        x_base = 20
        x_offset = 120
        
        self.chart_canvas.create_text(x_base, y, text="Muscle", anchor=tk.W, font=('Arial', 10, 'bold'))
        for i, category in enumerate(['Roots', 'Cords', 'Nerves']):
            self.chart_canvas.create_text(x_base + (i+1)*x_offset, y, text=category, anchor=tk.W, font=('Arial', 10, 'bold'))
        
        y += 20

        # Draw rows for each muscle
        for muscle in muscles:
            self.chart_canvas.create_text(x_base, y, text=muscle, anchor=tk.W)
            muscle_info = muscle_innervations[muscle]
            state = self.muscle_states.get(muscle, None)

            # Draw roots
            for root in all_roots:
                if root in muscle_info.get('roots', []):
                    self.draw_symbol(x_base + x_offset, y, state)
                x_base += 20  # Small increment for spacing
            x_base += 100  # Larger increment to move to the next section

            # Draw cords
            cords = muscle_info.get('cord', [])
            if not isinstance(cords, list):
                cords = [cords]
            for cord in all_cords:
                if cord in cords:
                    self.draw_symbol(x_base + x_offset, y, state)
                x_base += 20
            x_base += 100

            # Draw nerves
            nerves = muscle_info.get('nerve', [])
            if not isinstance(nerves, list):
                nerves = [nerves]
            for nerve in all_nerves:
                if nerve in nerves:
                    self.draw_symbol(x_base + x_offset, y, state)
                x_base += 20

            # Reset x_base for next line
            x_base = 20
            y += 20

    def draw_symbol(self, x, y, state):
        if state == "normal":
            self.chart_canvas.create_oval(x, y - 10, x + 20, y + 10, fill="green", outline="")
            self.chart_canvas.create_line(x + 5, y - 5, x + 15, y + 5, fill="white", width=2)
            self.chart_canvas.create_line(x + 15, y - 5, x + 5, y + 5, fill="white", width=2)
        elif state == "abnormal":
            self.chart_canvas.create_line(x, y - 10, x + 20, y + 10, fill="red", width=3)
            self.chart_canvas.create_line(x, y + 10, x + 20, y - 10, fill="red", width=3)
        else:
            self.chart_canvas.create_text(x + 10, y, text=" ", anchor=tk.CENTER)  # Placeholder

if __name__ == "__main__":
    root = tk.Tk()
    gui = MusclePathwayGUI(root)
    root.mainloop()