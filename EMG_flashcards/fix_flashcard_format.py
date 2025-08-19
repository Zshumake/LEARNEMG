#!/usr/bin/env python3
"""
Fix the malformed flashcard data in the HTML file
The current data is stored as one big string instead of proper JavaScript objects
"""

import json

def fix_flashcard_data():
    """Fix the malformed flashcard data"""
    
    # Load the correct flashcard data
    json_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/ALL_FLASHCARDS_COMPLETE.json"
    with open(json_file, 'r', encoding='utf-8') as f:
        flashcards = json.load(f)
    
    print(f"Loaded {len(flashcards)} flashcards from JSON")
    
    # Create properly formatted JavaScript
    js_lines = []
    js_lines.append("        // Complete EMG/NCS Flashcard Database - All 450 Cards")
    js_lines.append("        // Extracted and properly formatted from original Anki database")
    js_lines.append("        NCSApp.flashcardData = [")
    
    for i, card in enumerate(flashcards):
        # Escape quotes and clean up the text
        question = card['question'].replace('\\', '\\\\').replace('"', '\\"').replace('\\n', ' ').replace('\\r', '').strip()
        answer = card['answer'].replace('\\', '\\\\').replace('"', '\\"').replace('\\n', ' ').replace('\\r', '').strip()
        category = card['category'].replace('"', '\\"')
        card_type = card['type'].replace('"', '\\"')
        
        # Limit length to prevent overly long content
        if len(question) > 300:
            question = question[:297] + "..."
        if len(answer) > 500:
            answer = answer[:497] + "..."
        
        js_lines.append("            {")
        js_lines.append(f'                question: "{question}",')
        js_lines.append(f'                answer: "{answer}",')
        js_lines.append(f'                category: "{category}",')
        js_lines.append(f'                type: "{card_type}",')
        js_lines.append(f'                id: {card["id"]}')
        
        if i < len(flashcards) - 1:
            js_lines.append("            },")
        else:
            js_lines.append("            }")
    
    js_lines.append("        ];")
    
    return "\\n".join(js_lines)

def replace_in_html():
    """Replace the malformed data in the HTML file"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    print("Reading HTML file...")
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the malformed flashcard data
    start_marker = "        // Complete EMG/NCS Flashcard Database - All Cards"
    end_marker = "        // Flashcard categories for filtering"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1:
        print("❌ Could not find start marker")
        return False
    
    if end_idx == -1:
        print("❌ Could not find end marker")
        return False
    
    print(f"Found malformed data from {start_idx} to {end_idx}")
    
    # Generate new flashcard data
    new_flashcard_data = fix_flashcard_data()
    
    # Replace the content
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_content = before + new_flashcard_data + "\\n\\n        " + after
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Successfully fixed flashcard data!")
    print(f"📊 Replaced {end_idx - start_idx:,} characters with {len(new_flashcard_data):,} characters")
    
    return True

if __name__ == "__main__":
    success = replace_in_html()
    if success:
        print("\\n🎉 Flashcard data has been properly formatted!")
        print("The app should now show all 450 flashcards correctly.")
    else:
        print("\\n💥 Failed to fix flashcard data.")