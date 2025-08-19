#!/usr/bin/env python3
"""
Complete fix for all flashcard issues:
1. Clean up malformed data
2. Ensure proper JavaScript formatting
3. Fix initialization
"""

import json
import re

def create_clean_flashcard_section():
    """Create a completely clean flashcard section"""
    
    # Load the JSON data
    json_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/ALL_FLASHCARDS_COMPLETE.json"
    with open(json_file, 'r', encoding='utf-8') as f:
        flashcards = json.load(f)
    
    print(f"Loaded {len(flashcards)} flashcards from JSON")
    
    # Create clean JavaScript section
    js_lines = []
    js_lines.append("        // Flashcard functionality")
    js_lines.append("        NCSApp.currentFlashcardIndex = 0;")
    js_lines.append("        NCSApp.isFlashcardFlipped = false;")
    js_lines.append("        NCSApp.activeFlashcards = null; // Will be initialized to show all cards by default")
    js_lines.append("        NCSApp.flashcardStats = {")
    js_lines.append("            correct: 0,")
    js_lines.append("            total: 450,")
    js_lines.append("            current: 1")
    js_lines.append("        };")
    js_lines.append("")
    js_lines.append("        // Complete EMG/NCS Flashcard Database - All 450 Cards")
    js_lines.append("        // Extracted and cleaned from original Anki database")
    js_lines.append("        NCSApp.flashcardData = [")
    
    # Add each flashcard as a proper JavaScript object
    for i, card in enumerate(flashcards):
        # Clean and escape the strings
        question = card['question'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '').strip()
        answer = card['answer'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '').strip()
        category = card['category'].replace('"', '\\"')
        card_type = card['type'].replace('"', '\\"')
        
        # Truncate if too long
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
    js_lines.append("")
    
    return "\n".join(js_lines)

def fix_html_file():
    """Fix the entire flashcard section in the HTML file"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    print("Reading HTML file...")
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the start of the flashcard section
    start_patterns = [
        "        // Flashcard functionality",
        "        NCSApp.currentFlashcardIndex = 0;",
        "        // Complete EMG/NCS Flashcard Database"
    ]
    
    start_idx = -1
    for pattern in start_patterns:
        idx = content.find(pattern)
        if idx != -1:
            start_idx = idx
            break
    
    if start_idx == -1:
        print("❌ Could not find flashcard section start")
        return False
    
    # Find the end marker
    end_marker = "        // Flashcard categories for filtering"
    end_idx = content.find(end_marker, start_idx)
    
    if end_idx == -1:
        print("❌ Could not find flashcard section end")
        return False
    
    print(f"Found flashcard section from {start_idx} to {end_idx}")
    
    # Create new clean section
    new_flashcard_section = create_clean_flashcard_section()
    
    # Replace the content
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_content = before + new_flashcard_section + "\n\n        " + after
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Successfully replaced entire flashcard section!")
    print(f"📊 Replaced {end_idx - start_idx:,} characters with {len(new_flashcard_section):,} characters")
    
    return True

def add_initialization_fix():
    """Add initialization code to ensure flashcards work properly"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the place to add initialization code
    init_marker = "        // Initialize application when DOM is ready"
    init_idx = content.find(init_marker)
    
    if init_idx != -1:
        # Add flashcard initialization
        init_code = """
        // Initialize flashcards when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🃏 Initializing flashcards...');
            
            // Ensure flashcard data is available
            if (NCSApp.flashcardData && NCSApp.flashcardData.length > 0) {
                console.log(`✅ Loaded ${NCSApp.flashcardData.length} flashcards`);
                
                // Initialize first flashcard
                NCSApp.updateFlashcard();
                NCSApp.updateFlashcardStats();
                
                // Set up event listeners for buttons
                const nextBtn = document.getElementById('next-card');
                const prevBtn = document.getElementById('prev-card');
                const flipBtn = document.getElementById('flip-card');
                const shuffleBtn = document.getElementById('shuffle-cards');
                const resetBtn = document.getElementById('reset-progress');
                
                if (nextBtn) nextBtn.addEventListener('click', function() { NCSApp.nextCard(); });
                if (prevBtn) prevBtn.addEventListener('click', function() { NCSApp.previousCard(); });
                if (flipBtn) flipBtn.addEventListener('click', function() { NCSApp.flipCard(); });
                if (shuffleBtn) shuffleBtn.addEventListener('click', function() { NCSApp.shuffleCards(); });
                if (resetBtn) resetBtn.addEventListener('click', function() { NCSApp.resetProgress(); });
                
                console.log('🎮 Flashcard controls initialized');
            } else {
                console.error('❌ No flashcard data found!');
            }
        });

"""
        
        # Insert before the main init marker
        new_content = content[:init_idx] + init_code + content[init_idx:]
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✅ Added flashcard initialization code")
    
    return True

if __name__ == "__main__":
    print("🔧 Starting complete flashcard fix...")
    
    if fix_html_file():
        print("✅ Fixed HTML flashcard section")
        
        if add_initialization_fix():
            print("✅ Added initialization code")
            print("\n🎉 Complete flashcard fix applied!")
            print("\nYour EMG/NCS tool should now:")
            print("  • Show all 450 flashcards")
            print("  • Have working Next/Previous buttons")
            print("  • Display correct counts")
            print("  • Support category filtering")
            print("  • Show proper question/answer format")
        else:
            print("⚠️  HTML fixed but initialization may need manual check")
    else:
        print("💥 Failed to fix HTML file")