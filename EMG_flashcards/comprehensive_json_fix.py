#!/usr/bin/env python3
"""
Comprehensive fix for all flashcard JSON structure issues
"""

import re

def comprehensive_fix():
    """Fix all JSON structure issues in flashcard data"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Running comprehensive JSON structure fix...")
    
    # Find the flashcard data section
    start_marker = "NCSApp.flashcardData = ["
    end_marker = "        ];"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ Could not find flashcard data section")
        return False
    
    # Extract the flashcard section
    flashcard_section = content[start_idx:end_idx + len(end_marker)]
    
    # Multiple fix patterns
    fixes_made = 0
    
    # Fix 1: Missing answer property pattern
    # Matches: question: "...", "answer content", category:
    pattern1 = r'(question: "[^"]*",)\s*\n\s*"([^"]*)",(\s*\n\s*category:)'
    flashcard_section = re.sub(pattern1, r'\1\n                answer: "\2",\3', flashcard_section)
    fixes_made += len(re.findall(pattern1, content))
    
    # Fix 2: Alternative pattern - direct answer string after question
    # Matches entries where there's a nerve root string directly after question
    pattern2 = r'(question: "[^"]*",)\s*\n\s*"([CLS]\d[^"]*\|[^"]*)",(\s*\n\s*category:)'
    flashcard_section = re.sub(pattern2, r'\1\n                answer: "\2",\3', flashcard_section)
    fixes_made += len(re.findall(pattern2, content))
    
    # Fix 3: Entries with muscle names as answers
    pattern3 = r'(question: "\[BLANK\][^"]*",)\s*\n\s*"([A-Z][a-z][^"]*)",(\s*\n\s*category:)'
    flashcard_section = re.sub(pattern3, r'\1\n                answer: "\2",\3', flashcard_section)
    fixes_made += len(re.findall(pattern3, content))
    
    # Fix 4: Remove any truncated entries
    truncated_pattern = r'\{\s*question: "\[BLANK\] Nerve: \[BLAN[^}]*$'
    if re.search(truncated_pattern, flashcard_section, flags=re.MULTILINE | re.DOTALL):
        flashcard_section = re.sub(truncated_pattern, '', flashcard_section, flags=re.MULTILINE | re.DOTALL)
        print("🧹 Removed truncated entry")
    
    # Replace in original content
    new_content = content[:start_idx] + flashcard_section + content[end_idx + len(end_marker):]
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # Validate
    question_count = len(re.findall(r'question:', new_content))
    answer_count = len(re.findall(r'answer:', new_content))
    
    print(f"✅ Applied comprehensive fixes")
    print(f"📊 Results:")
    print(f"  Questions: {question_count}")
    print(f"  Answers: {answer_count}")
    
    if question_count == answer_count:
        print("🎉 JSON structure is now perfectly balanced!")
        return True
    else:
        print(f"⚠️  Still {question_count - answer_count} mismatched entries")
        
        # Let's try a more aggressive approach
        print("🔄 Trying aggressive pattern matching...")
        
        # Find all entries that have question but no answer
        problematic_entries = re.findall(
            r'\{\s*question: "[^"]*",\s*\n\s*"([^"]*)",\s*\n\s*category:',
            new_content,
            flags=re.MULTILINE
        )
        
        print(f"Found {len(problematic_entries)} problematic entries")
        
        if len(problematic_entries) > 0:
            # One more comprehensive pass
            # This will catch any remaining entries
            pattern_final = r'(\{\s*question: "[^"]*",)\s*\n\s*"([^"]*)",(\s*\n\s*category:)'
            new_content = re.sub(
                pattern_final,
                r'\1\n                answer: "\2",\3',
                new_content,
                flags=re.MULTILINE
            )
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Final validation
            final_q_count = len(re.findall(r'question:', new_content))
            final_a_count = len(re.findall(r'answer:', new_content))
            
            print(f"📊 Final Results:")
            print(f"  Questions: {final_q_count}")
            print(f"  Answers: {final_a_count}")
            
            return final_q_count == final_a_count
        
        return False

if __name__ == "__main__":
    if comprehensive_fix():
        print("\n🎉 All flashcard JSON structure issues resolved!")
        print("The EMG tool should now load without JavaScript errors.")
    else:
        print("\n❌ Some issues may still remain")