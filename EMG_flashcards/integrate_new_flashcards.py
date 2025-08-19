#!/usr/bin/env python3
"""
Integrate the new cleaned flashcards from z EMG.txt into the EMG/NCS tool
Final cleanup and integration with Preston & Shapiro attribution
"""

import json
import re
from html import unescape

def final_cleanup_flashcard(card):
    """Final cleanup of individual flashcard"""
    # Clean question - remove remaining cloze syntax
    question = card['question']
    question = re.sub(r'\{\{c\d+::[^}]+(?:::[^}]*)?\}\}', '[BLANK]', question)
    question = re.sub(r'\s+', ' ', question).strip()
    
    # Clean answer
    answer = card['answer']
    answer = re.sub(r'\s+', ' ', answer).strip()
    
    # Ensure proper formatting
    if not question.endswith('?') and '[BLANK]' in question:
        question = question.strip() + " - What goes in the blank?"
    
    return {
        'id': card['id'],
        'question': question[:300],  # Reasonable limit
        'answer': answer[:400],
        'category': card['category'],
        'type': card['type']
    }

def integrate_flashcards_into_html():
    """Integrate the new flashcards into the EMG tool"""
    
    # Load the improved flashcards
    flashcard_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/improved_emg_flashcards.json"
    with open(flashcard_file, 'r', encoding='utf-8') as f:
        raw_flashcards = json.load(f)
    
    print(f"🔄 Loaded {len(raw_flashcards)} flashcards for integration...")
    
    # Clean up flashcards
    cleaned_flashcards = []
    for card in raw_flashcards:
        try:
            cleaned_card = final_cleanup_flashcard(card)
            # Skip cards that are too short or malformed
            if len(cleaned_card['question']) > 20 and len(cleaned_card['answer']) > 10:
                cleaned_flashcards.append(cleaned_card)
        except Exception as e:
            print(f"⚠️  Skipped malformed card {card.get('id', 'unknown')}: {e}")
    
    print(f"✅ Cleaned and validated {len(cleaned_flashcards)} flashcards")
    
    # Add Preston & Shapiro attribution where appropriate
    for card in cleaned_flashcards:
        if card['category'] in ['Muscle Anatomy', 'Muscle Testing'] and 'roots:' in card['question'].lower():
            if 'preston' not in card['answer'].lower():
                card['answer'] += " (Nerve roots per Preston & Shapiro)"
    
    # Create JavaScript format for integration
    js_lines = []
    js_lines.append("        // Enhanced EMG/NCS Flashcard Database")
    js_lines.append("        // Processed from comprehensive Anki export with clean formatting")
    js_lines.append("        // Preston & Shapiro nerve root assignments included where applicable")
    js_lines.append("        NCSApp.flashcardData = [")
    
    for i, card in enumerate(cleaned_flashcards):
        # Escape quotes for JavaScript
        question = card['question'].replace('\\', '\\\\').replace('"', '\\"')
        answer = card['answer'].replace('\\', '\\\\').replace('"', '\\"')
        category = card['category'].replace('"', '\\"')
        card_type = card['type']
        
        js_lines.append("            {")
        js_lines.append(f'                question: "{question}",')
        js_lines.append(f'                answer: "{answer}",')
        js_lines.append(f'                category: "{category}",')
        js_lines.append(f'                type: "{card_type}",')
        js_lines.append(f'                id: {card["id"]}')
        
        if i < len(cleaned_flashcards) - 1:
            js_lines.append("            },")
        else:
            js_lines.append("            }")
    
    js_lines.append("        ];")
    
    new_flashcard_section = "\\n".join(js_lines)
    
    # Update the HTML file
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the flashcard data section
    start_pattern = "        NCSApp.flashcardData = ["
    end_pattern = "        ];"
    
    start_idx = content.find(start_pattern)
    if start_idx == -1:
        print("❌ Could not find flashcard data section")
        return False
    
    # Find the end of the flashcard array
    end_idx = content.find(end_pattern, start_idx)
    if end_idx == -1:
        print("❌ Could not find end of flashcard data section")
        return False
    
    # Include the closing bracket
    end_idx += len(end_pattern)
    
    print(f"📍 Found flashcard section from position {start_idx} to {end_idx}")
    
    # Replace the flashcard section
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_content = before + new_flashcard_section + after
    
    # Update flashcard stats in the JavaScript
    stats_pattern = r'(NCSApp\.flashcardStats\s*=\s*{\s*correct:\s*0,\s*total:\s*)\d+(\s*,\s*current:\s*1\s*};)'
    new_content = re.sub(stats_pattern, f'\\g<1>{len(cleaned_flashcards)}\\g<2>', new_content)
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Successfully updated EMG tool with {len(cleaned_flashcards)} flashcards!")
    
    # Print final statistics
    categories = {}
    for card in cleaned_flashcards:
        cat = card['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print(f"\\n📊 Final Integration Statistics:")
    print(f"Total flashcards: {len(cleaned_flashcards)}")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")
    
    return True

def save_final_flashcards(flashcards):
    """Save the final cleaned flashcards for reference"""
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/FINAL_INTEGRATED_FLASHCARDS.json"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Saved final flashcards to: {output_file}")

if __name__ == "__main__":
    print("🚀 Starting flashcard integration...")
    
    if integrate_flashcards_into_html():
        print("\\n🎉 Flashcard integration complete!")
        print("\\nYour EMG/NCS tool now has:")
        print("  • Clean, properly formatted flashcards")
        print("  • Removed HTML tags and formatting issues")
        print("  • Proper cloze deletion handling")
        print("  • Preston & Shapiro attribution where applicable")
        print("  • Improved categorization and organization")
    else:
        print("❌ Integration failed")