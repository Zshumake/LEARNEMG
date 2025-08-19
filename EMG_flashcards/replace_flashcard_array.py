#!/usr/bin/env python3
"""
Replace the flashcard array in the HTML file with clean data
"""

def main():
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    replacement_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/html_flashcard_replacement.txt"
    
    # Read the replacement content
    with open(replacement_file, 'r') as f:
        replacement_content = f.read()
    
    # Read the HTML file
    with open(html_file, 'r') as f:
        html_content = f.read()
    
    # Find the start and end of the flashcard array
    start_marker = "NCSApp.flashcardData = ["
    end_marker = "        ];\n\n        // Flashcard categories for filtering"
    
    start_idx = html_content.find(start_marker)
    end_idx = html_content.find(end_marker)
    
    if start_idx == -1:
        print("ERROR: Could not find start of flashcard array")
        return
    
    if end_idx == -1:
        print("ERROR: Could not find end of flashcard array")
        return
    
    print(f"Found flashcard array from position {start_idx} to {end_idx}")
    
    # Extract before and after
    before_array = html_content[:start_idx]
    after_array = html_content[end_idx:]
    
    # Create new content
    new_content = before_array + replacement_content + "\n\n        // Flashcard categories for filtering" + after_array[len("        ];\n\n        // Flashcard categories for filtering"):]
    
    # Write back to file
    with open(html_file, 'w') as f:
        f.write(new_content)
    
    print("Successfully replaced flashcard array!")
    print(f"Replaced {end_idx - start_idx} characters with {len(replacement_content)} characters")

if __name__ == "__main__":
    main()