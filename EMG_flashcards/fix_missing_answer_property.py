#!/usr/bin/env python3
"""
Fix missing 'answer:' properties in flashcard JSON data
"""

import re

def fix_missing_answer_properties():
    """Fix all missing 'answer:' properties"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Fixing missing 'answer:' properties in flashcard data...")
    
    # Pattern to match entries where the answer text is directly after question without 'answer:' property
    # This matches: question: "...", "answer content here",
    pattern = r'(question: "[^"]*",)\s*\n\s*"([^"]*)",(\s*\n\s*category:)'
    
    def add_answer_property(match):
        question_part = match.group(1)
        answer_content = match.group(2)
        rest = match.group(3)
        return f'{question_part}\n                answer: "{answer_content}",{rest}'
    
    # Apply the fix
    fixed_content = re.sub(pattern, add_answer_property, content, flags=re.MULTILINE)
    
    # Count how many fixes were made
    fixes_made = len(re.findall(pattern, content, flags=re.MULTILINE))
    
    # Also handle the truncated entry at the end
    truncated_pattern = r'\{\s*question: "\[BLANK\] Nerve: \[BLAN[^}]*$'
    if re.search(truncated_pattern, fixed_content, flags=re.MULTILINE | re.DOTALL):
        # Remove the incomplete entry
        fixed_content = re.sub(truncated_pattern, '', fixed_content, flags=re.MULTILINE | re.DOTALL)
        print("🧹 Removed incomplete flashcard entry")
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"✅ Fixed {fixes_made} missing 'answer:' properties")
    
    # Validate the fix
    with open(html_file, 'r', encoding='utf-8') as f:
        new_content = f.read()
    
    question_count = len(re.findall(r'question:', new_content))
    answer_count = len(re.findall(r'answer:', new_content))
    
    print(f"📊 After fix:")
    print(f"  Questions: {question_count}")
    print(f"  Answers: {answer_count}")
    
    if question_count == answer_count:
        print("✅ JSON structure is now balanced!")
        return True
    else:
        print(f"⚠️  Still {question_count - answer_count} unmatched entries")
        return False

if __name__ == "__main__":
    if fix_missing_answer_properties():
        print("\n🎉 All flashcard JSON structure issues resolved!")
    else:
        print("\n⚠️  Some issues may still need attention")