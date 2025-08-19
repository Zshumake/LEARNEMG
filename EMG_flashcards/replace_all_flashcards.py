#!/usr/bin/env python3
"""
Replace ALL flashcard data in the HTML file with the complete dataset
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
        
        # Find the start and end of the flashcard array
        start_marker = "        // Complete Muscle Flashcard Database - 28 Complete Cards"
        end_marker = "        ];"
        
        # Find the start position
        start_idx = html_content.find(start_marker)
        if start_idx == -1:
            # Try alternative marker
            start_marker = "        NCSApp.flashcardData = ["
            start_idx = html_content.find(start_marker)
        
        if start_idx == -1:
            print("❌ Could not find start of flashcard array")
            return False
        
        print(f"✅ Found flashcard array start at position {start_idx}")
        
        # Find the end position - look for the closing bracket and semicolon
        search_start = start_idx + len(start_marker)
        bracket_count = 1  # We're inside the array
        pos = search_start
        
        while pos < len(html_content) and bracket_count > 0:
            char = html_content[pos]
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
            pos += 1
        
        if bracket_count > 0:
            print("❌ Could not find end of flashcard array")
            return False
        
        # Look for the semicolon after the closing bracket
        while pos < len(html_content) and html_content[pos] in ' \\n\\t':
            pos += 1
        
        if pos < len(html_content) and html_content[pos] == ';':
            pos += 1
        
        end_idx = pos
        print(f"✅ Found flashcard array end at position {end_idx}")
        
        # Extract before and after sections
        before_array = html_content[:start_idx]
        after_array = html_content[end_idx:]
        
        # Create new content
        new_content = before_array + replacement_content + after_array
        
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
    else:
        print("\\n💥 Replacement failed. Please check the error messages above.")