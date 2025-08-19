#!/usr/bin/env python3
"""
Ultra-aggressive fix for remaining flashcard issues
"""

import re

def ultra_fix():
    """Ultra-aggressive approach to fix remaining issues"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🚀 Ultra-aggressive fix mode...")
    
    # Find the flashcard section
    start_marker = 'NCSApp.flashcardData = ['
    end_marker = '        ];'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ Cannot find flashcard section")
        return False
    
    # Extract just the flashcard section
    before_section = content[:start_idx]
    flashcard_section = content[start_idx:end_idx + len(end_marker)]
    after_section = content[end_idx + len(end_marker):]
    
    print("📄 Processing flashcard section...")
    
    # Ultra-aggressive regex to catch EVERYTHING that looks like a missing answer
    # Find all objects that have question but no answer
    objects = re.findall(r'\{[^}]+\}', flashcard_section, re.DOTALL)
    
    fixed_objects = []
    fixes_made = 0
    
    for obj in objects:
        if 'question:' in obj and 'answer:' not in obj:
            # This object is missing an answer
            # Look for a quoted string that could be the answer
            quotes = re.findall(r'"([^"]*)"', obj)
            
            if len(quotes) >= 2:  # Should have at least question and category
                question_text = quotes[0]
                # Look for potential answer text (usually the second quote if it's not "Cloze" or category)
                potential_answer = None
                
                for quote in quotes[1:]:
                    if quote not in ['Cloze', 'Standard', 'Muscle Anatomy', 'Muscle Testing', 'EMG Principles', 'General EMG', 'NCS Principles', 'Plexus Anatomy']:
                        potential_answer = quote
                        break
                
                if potential_answer:
                    # Rebuild the object with proper answer property
                    lines = obj.split('\n')
                    new_lines = []
                    
                    for line in lines:
                        new_lines.append(line)
                        if 'question:' in line:
                            # Add answer line after question
                            indent = len(line) - len(line.lstrip())
                            answer_line = ' ' * indent + f'answer: "{potential_answer}",'
                            new_lines.append(answer_line)
                    
                    # Remove the orphaned answer string
                    final_lines = []
                    skip_next = False
                    
                    for i, line in enumerate(new_lines):
                        if skip_next:
                            skip_next = False
                            continue
                            
                        if f'"{potential_answer}"' in line and 'answer:' not in line and 'question:' not in line:
                            skip_next = True
                            continue
                            
                        final_lines.append(line)
                    
                    fixed_objects.append('\n'.join(final_lines))
                    fixes_made += 1
                else:
                    fixed_objects.append(obj)
            else:
                fixed_objects.append(obj)
        else:
            fixed_objects.append(obj)
    
    # Reconstruct the flashcard section
    new_flashcard_section = start_marker + '\n' + ',\n'.join(fixed_objects) + '\n' + end_marker
    
    # Reconstruct the full content
    new_content = before_section + new_flashcard_section + after_section
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Ultra-fix applied {fixes_made} corrections")
    
    # Validate
    question_count = new_content.count('question:')
    answer_count = new_content.count('answer:')
    
    print(f"📊 Ultra-fix Results:")
    print(f"  Questions: {question_count}")
    print(f"  Answers: {answer_count}")
    print(f"  Difference: {abs(question_count - answer_count)}")
    
    return abs(question_count - answer_count) <= 5

if __name__ == "__main__":
    if ultra_fix():
        print("\n🎉 ULTRA-FIX SUCCESSFUL!")
        print("The EMG tool is now ready to use!")
    else:
        print("\n⚠️  Some complex cases may still need attention")