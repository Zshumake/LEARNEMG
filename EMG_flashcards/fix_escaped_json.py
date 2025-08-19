#!/usr/bin/env python3
"""
Fix the escaped JSON string format in flashcard data
"""

import re

def fix_escaped_json():
    """Fix the flashcard data that's stored as escaped string"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Fixing escaped JSON flashcard data...")
    
    # The data appears to be one big string with \\n characters
    # Let's find the actual flashcard data
    start_pattern = r'// Enhanced EMG/NCS Flashcard Database\\n.*?NCSApp\.flashcardData = \[\\n'
    match = re.search(start_pattern, content, re.DOTALL)
    
    if not match:
        print("❌ Could not find escaped flashcard data")
        return False
    
    start_idx = match.start()
    
    # Find the end of this escaped string
    # Look for the closing of the array and the semicolon
    end_pattern = r'\\n\s*\];\s*\n'
    end_match = re.search(end_pattern, content[start_idx:])
    
    if not end_match:
        print("❌ Could not find end of escaped flashcard data")
        return False
    
    end_idx = start_idx + end_match.end()
    
    # Extract the problematic section
    problematic_section = content[start_idx:end_idx]
    
    print(f"📍 Found escaped data from position {start_idx} to {end_idx}")
    
    # Process the escaped data
    # First, unescape the \\n to actual newlines for easier processing
    unescaped = problematic_section.replace('\\n', '\n')
    
    # Now fix the missing answer properties
    # Pattern for missing answer property
    pattern = r'(\{\s*question: "[^"]*",)\s*\n\s*"([^"]*)",(\s*\n\s*category:)'
    
    def add_answer_property(match):
        question_part = match.group(1)
        answer_content = match.group(2)
        rest = match.group(3)
        return f'{question_part}\n                answer: "{answer_content}",{rest}'
    
    # Apply the fix
    fixed_section = re.sub(pattern, add_answer_property, unescaped, flags=re.MULTILINE)
    
    # Count fixes made
    fixes_made = len(re.findall(pattern, unescaped, flags=re.MULTILINE))
    
    # Remove any incomplete entries
    truncated_pattern = r'\{\s*question: "\[BLANK\] Nerve: \[BLAN[^}]*$'
    fixed_section = re.sub(truncated_pattern, '', fixed_section, flags=re.MULTILINE | re.DOTALL)
    
    # Re-escape the newlines for JavaScript
    escaped_fixed = fixed_section.replace('\n', '\\n')
    
    # Replace in original content
    new_content = content[:start_idx] + escaped_fixed + content[end_idx:]
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Fixed {fixes_made} missing answer properties in escaped JSON")
    
    # Validate
    question_count = len(re.findall(r'question:', new_content))
    answer_count = len(re.findall(r'answer:', new_content))
    
    print(f"📊 Final validation:")
    print(f"  Questions: {question_count}")
    print(f"  Answers: {answer_count}")
    
    if question_count == answer_count:
        print("🎉 JSON structure is now balanced!")
        return True
    else:
        print(f"⚠️  Still {question_count - answer_count} unmatched entries")
        return False

if __name__ == "__main__":
    if fix_escaped_json():
        print("\n🎉 Escaped JSON flashcard data fixed successfully!")
        print("The EMG tool should now load without JavaScript errors.")
    else:
        print("\n⚠️  Some issues may still need manual attention")