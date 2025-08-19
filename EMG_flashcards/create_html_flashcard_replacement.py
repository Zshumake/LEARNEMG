#!/usr/bin/env python3
"""
Create HTML flashcard replacement code from clean JSON data
"""

import json

def main():
    # Load the clean flashcard data
    with open("/Volumes/Internal Storage/Working Programs/EMG_flashcards/FINAL_CLEAN_MUSCLE_FLASHCARDS.json", 'r') as f:
        flashcards = json.load(f)
    
    # Create the JavaScript array format
    js_code = []
    js_code.append("        // Complete Muscle Flashcard Database - 28 Complete Cards")
    js_code.append("        // Extracted and cleaned from original Anki database")
    js_code.append("        NCSApp.flashcardData = [")
    
    for i, card in enumerate(flashcards):
        # Use clinical_info if available, otherwise generic message
        notes = card.get('clinical_info', '').strip()
        if not notes:
            notes = "Muscle innervation flashcard"
        
        # Escape quotes in the notes
        notes = notes.replace('"', '\\"')
        nerve = card['nerve'].replace('"', '\\"')
        
        js_code.append("            {")
        js_code.append(f'                muscle: "{card["muscle"]}",')
        js_code.append(f'                nerve: "{nerve}",')
        js_code.append(f'                roots: "{card["roots"]}",')
        js_code.append(f'                notes: "{notes}",')
        js_code.append('                category: "Muscle Anatomy",')
        js_code.append('                type: "muscle_flashcard"')
        
        # Add comma except for last item
        if i < len(flashcards) - 1:
            js_code.append("            },")
        else:
            js_code.append("            }")
    
    js_code.append("        ];")
    
    # Write to file
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/html_flashcard_replacement.txt"
    with open(output_file, 'w') as f:
        f.write('\n'.join(js_code))
    
    print(f"Created replacement code with {len(flashcards)} flashcards")
    print(f"Saved to: {output_file}")
    
    # Show first few lines
    print("\nFirst few lines:")
    for line in js_code[:15]:
        print(line)

if __name__ == "__main__":
    main()