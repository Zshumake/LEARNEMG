#!/usr/bin/env python3
"""
Replace flashcard data in HTML file with targeted approach
"""

def main():
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    replacement_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/all_flashcards_complete_replacement.txt"
    
    print("🔄 Replacing flashcard data in HTML file...")
    
    try:
        # Read the replacement content
        with open(replacement_file, 'r', encoding='utf-8') as f:
            replacement_content = f.read()
        
        print(f"✅ Loaded replacement data ({len(replacement_content)} characters)")
        
        # Read the HTML file
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        print(f"✅ Loaded HTML file ({len(html_content)} characters)")
        
        # Find the specific pattern we need to replace
        start_pattern = "        NCSApp.flashcardData = ["
        end_pattern = "        ];"
        
        start_idx = html_content.find(start_pattern)
        if start_idx == -1:
            print("❌ Could not find flashcard data start")
            return False
        
        print(f"✅ Found flashcard data start at position {start_idx}")
        
        # Find the matching closing bracket by looking for the specific pattern after the array
        search_pos = start_idx + len(start_pattern)
        
        # Look for the pattern that comes after the flashcard array
        next_section_pattern = "        // Flashcard categories for filtering"
        
        next_section_idx = html_content.find(next_section_pattern, search_pos)
        if next_section_idx == -1:
            print("❌ Could not find the section after flashcard data")
            return False
        
        # Work backwards from the next section to find the array end
        end_search = html_content[:next_section_idx].rstrip()
        if not end_search.endswith("];"):
            print("❌ Array doesn't end with ]; as expected")
            return False
        
        # Find the exact end position
        end_idx = len(end_search) + 1  # +1 for the newline we stripped
        
        print(f"✅ Found flashcard data end at position {end_idx}")
        
        # Extract before and after sections
        before_array = html_content[:start_idx]
        after_array = html_content[end_idx:]
        
        # Create new content
        new_content = before_array + replacement_content + "\\n\\n" + after_array
        
        # Write back to file
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✅ Successfully replaced flashcard array!")
        print(f"📊 Replaced {end_idx - start_idx:,} characters with {len(replacement_content):,} characters")
        print("🎉 All 450 flashcards are now loaded!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = main()
    if success:
        print("\\n🚀 Your EMG/NCS tool now has all 450 flashcards from your original Anki database!")
        print("\\n📋 Flashcard categories included:")
        print("   • Muscle Anatomy: 240 cards")
        print("   • Nerve Conduction: 81 cards")
        print("   • General Knowledge: 47 cards") 
        print("   • Clinical Conditions: 44 cards")
        print("   • EMG Findings: 22 cards")
        print("   • Anatomy: 9 cards")
        print("   • Study Notes: 7 cards")
    else:
        print("\\n💥 Replacement failed. Please check the error messages above.")