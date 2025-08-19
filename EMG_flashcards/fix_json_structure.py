#!/usr/bin/env python3
"""
Fix the malformed JSON structure in the flashcard data
"""

import re

def fix_flashcard_json():
    """Fix all missing 'answer:' properties in flashcard data"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Fixing malformed flashcard JSON structure...")
    
    # Find the flashcard data section
    start_marker = "NCSApp.flashcardData = ["
    end_marker = "        ];"
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("❌ Could not find flashcard data section")
        return False
    
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1:
        print("❌ Could not find end of flashcard data section")
        return False
    
    # Extract the flashcard section
    flashcard_section = content[start_idx:end_idx + len(end_marker)]
    
    # Fix pattern: question: "...", "answer text", should be question: "...", answer: "answer text",
    # This pattern captures lines that start with quote after question and comma
    pattern = r'(question: "[^"]*",)\s*\n\s*"([^"]*)",(\s*\n\s*category:)'
    
    def fix_missing_answer(match):
        question_part = match.group(1)
        answer_content = match.group(2)
        rest = match.group(3)
        return f'{question_part}\n                answer: "{answer_content}",{rest}'
    
    # Apply the fix
    fixed_section = re.sub(pattern, fix_missing_answer, flashcard_section, flags=re.MULTILINE)
    
    # Count how many fixes were made
    fixes_made = len(re.findall(pattern, flashcard_section, flags=re.MULTILINE))
    
    # Also fix any truncated entries at the end
    # Look for incomplete entries
    truncated_pattern = r'\{\s*question: "\[BLANK\] Nerve: \[BLAN[^}]*$'
    if re.search(truncated_pattern, fixed_section):
        # Remove the truncated entry
        fixed_section = re.sub(truncated_pattern, '', fixed_section, flags=re.MULTILINE | re.DOTALL)
        print("🧹 Removed truncated flashcard entry")
    
    # Replace in the original content
    new_content = content[:start_idx] + fixed_section + content[end_idx + len(end_marker):]
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Fixed {fixes_made} malformed JSON entries")
    return True

def validate_json_structure():
    """Quick validation of the fixed JSON structure"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count flashcard objects
    question_count = len(re.findall(r'question:', content))
    answer_count = len(re.findall(r'answer:', content))
    
    print(f"📊 Validation Results:")
    print(f"  Questions found: {question_count}")
    print(f"  Answers found: {answer_count}")
    
    if question_count == answer_count:
        print("✅ JSON structure appears balanced")
        return True
    else:
        print("❌ Mismatch between questions and answers")
        return False

if __name__ == "__main__":
    if fix_flashcard_json():
        if validate_json_structure():
            print("\n🎉 Flashcard JSON structure fixed successfully!")
        else:
            print("\n⚠️  Some issues may remain")
    else:
        print("\n❌ Failed to fix JSON structure")