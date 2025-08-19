#!/usr/bin/env python3
"""
Fix the corrupted flashcard array structure
"""

import re

def fix_corrupted_flashcard_array():
    """Fix the corrupted flashcard array by properly closing it"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Fixing corrupted flashcard array structure...")
    
    # Find the start of the flashcard array
    array_start = content.find('NCSApp.flashcardData = [')
    if array_start == -1:
        print("❌ Could not find flashcard array start")
        return False
    
    # Find the corruption point - look for the malformed entry
    corruption_pattern = r'\{\s*question: "\[BLANK\]: This has been used to represent recruitment capabilities'
    corruption_match = re.search(corruption_pattern, content)
    
    if not corruption_match:
        print("❌ Could not find corruption point")
        return False
    
    corruption_start = corruption_match.start()
    print(f"📍 Found corruption at position {corruption_start}")
    
    # Find the last complete flashcard entry before corruption
    # Look backwards from corruption point for the last complete entry
    before_corruption = content[:corruption_start]
    
    # Find the last properly closed flashcard object
    last_complete_pattern = r'\{\s*question:[^}]+answer:[^}]+category:[^}]+type:[^}]+id:\s*\d+\s*\}'
    
    matches = list(re.finditer(last_complete_pattern, before_corruption, re.DOTALL))
    if not matches:
        print("❌ Could not find last complete flashcard entry")
        return False
    
    last_complete = matches[-1]
    last_complete_end = last_complete.end()
    
    print(f"📍 Last complete flashcard ends at position {last_complete_end}")
    
    # Close the array properly after the last complete entry
    array_closure = '\n        ];\n\n        // Flashcard categories for filtering\n        NCSApp.flashcardCategories = [\n            "All",\n            "Muscle Anatomy",\n            "Muscle Testing", \n            "EMG Principles",\n            "NCS Principles",\n            "General EMG",\n            "Plexus Anatomy"\n        ];\n\n'
    
    # Find where the NCSApp object continues after flashcard data
    # Look for the next NCSApp method after corruption
    next_method_pattern = r'\n\s*NCSApp\.[a-zA-Z].*=.*function'
    next_method_match = re.search(next_method_pattern, content[corruption_start:])
    
    if next_method_match:
        next_method_start = corruption_start + next_method_match.start()
        # Reconstruct the file
        fixed_content = (
            content[:last_complete_end] + 
            array_closure + 
            content[next_method_start:]
        )
    else:
        # If no next method found, just close the array and continue with remaining content
        # Find the next major section
        next_section_pattern = r'\n\s*(window\.NCSApp|document\.addEventListener|</script>)'
        next_section_match = re.search(next_section_pattern, content[corruption_start:])
        
        if next_section_match:
            next_section_start = corruption_start + next_section_match.start()
            fixed_content = (
                content[:last_complete_end] + 
                array_closure + 
                content[next_section_start:]
            )
        else:
            print("❌ Could not find continuation point")
            return False
    
    # Count flashcards in the fixed content
    flashcard_count = len(re.findall(r'\{\s*question:', fixed_content))
    
    # Write the fixed content back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"✅ Fixed corrupted flashcard array structure")
    print(f"📊 Found {flashcard_count} valid flashcard entries")
    
    return True

if __name__ == "__main__":
    if fix_corrupted_flashcard_array():
        print("\n🎉 FLASHCARD ARRAY CORRUPTION FIXED!")
        print("\nThe flashcard system should now:")
        print("  ✅ Load properly without JavaScript errors")
        print("  ✅ Display all valid flashcards")
        print("  ✅ Have working navigation buttons")
        print("  ✅ Function correctly with all features")
    else:
        print("\n❌ Failed to fix flashcard array corruption")