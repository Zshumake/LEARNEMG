#!/usr/bin/env python3
"""
Direct fix for missing answer properties - simple string replacement
"""

def direct_fix():
    """Apply direct string replacements for missing answer properties"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Applying direct fixes for missing answer properties...")
    
    # List of specific fixes needed based on the pattern I observed
    fixes = [
        ('                "C5,&nbsp;C6,&nbsp;C7,&nbsp;C8,&nbsp;T1 | Context:', 
         '                answer: "C5,&nbsp;C6,&nbsp;C7,&nbsp;C8,&nbsp;T1 | Context:'),
        ('                "C6,&nbsp;C7,&nbsp;C8 | Context:', 
         '                answer: "C6,&nbsp;C7,&nbsp;C8 | Context:'),
        ('                "C5,&nbsp;C6 | Context:', 
         '                answer: "C5,&nbsp;C6 | Context:'),
        ('                "C6,&nbsp;C7 | Context:', 
         '                answer: "C6,&nbsp;C7 | Context:'),
        ('                "C7,&nbsp;C8 | Context:', 
         '                answer: "C7,&nbsp;C8 | Context:'),
        ('                "C7,&nbsp;C8,&nbsp;T1 | Context:', 
         '                answer: "C7,&nbsp;C8,&nbsp;T1 | Context:'),
        ('                "C8,&nbsp;T1 | Context:', 
         '                answer: "C8,&nbsp;T1 | Context:'),
        ('                "Flexor pollicis longus | Context:', 
         '                answer: "Flexor pollicis longus | Context:'),
    ]
    
    # Apply each fix
    fixes_applied = 0
    for old_text, new_text in fixes:
        if old_text in content:
            content = content.replace(old_text, new_text)
            fixes_applied += 1
            print(f"✅ Fixed: {old_text[:50]}...")
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Applied {fixes_applied} direct fixes")
    
    # Validate
    question_count = len(content.split('question:')) - 1
    answer_count = len(content.split('answer:')) - 1
    
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
    if direct_fix():
        print("\n🎉 Direct fixes applied successfully!")
        print("The EMG tool should now load without JavaScript errors.")
    else:
        print("\n⚠️  Additional fixes may be needed")