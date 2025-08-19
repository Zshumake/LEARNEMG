#!/usr/bin/env python3
"""
Emergency fix for the JavaScript syntax errors in the EMG tool
"""

import re

def fix_html_file():
    """Fix all the JavaScript syntax errors"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🚨 Emergency fix starting...")
    
    # Fix 1: Remove misplaced attribution text from JavaScript code
    problematic_patterns = [
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>\.forEach',
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>\s*\.',
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>[^<>\n]*</li>',
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>[^<>\n]*</div>',
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>[^<>\n]*\w+',
        r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>\s*(?=[a-zA-Z\'\"])'
    ]
    
    for pattern in problematic_patterns:
        content = re.sub(pattern, '', content, flags=re.MULTILINE)
    
    # Fix 2: Clean up flashcard data with proper HTML tag removal
    def clean_flashcard_answer(match):
        answer = match.group(1)
        # Remove HTML tags
        answer = re.sub(r'<[^>]+>', '', answer)
        # Fix common HTML entities
        answer = answer.replace('&nbsp;', ' ')
        answer = answer.replace('&quot;', '"')
        answer = answer.replace('&lt;', '<')
        answer = answer.replace('&gt;', '>')
        answer = answer.replace('&amp;', '&')
        # Clean up whitespace
        answer = re.sub(r'\s+', ' ', answer).strip()
        return f'"{answer}"'
    
    # Fix flashcard answers that contain HTML
    content = re.sub(r'answer: "([^"]*<[^"]*)"', clean_flashcard_answer, content)
    
    # Fix 3: Ensure proper JavaScript object structure
    # Remove any standalone attribution paragraphs that got mixed into JavaScript
    js_section_start = content.find("const NCSApp = {")
    js_section_end = content.find("window.NCSApp = NCSApp;") + len("window.NCSApp = NCSApp;")
    
    if js_section_start != -1 and js_section_end != -1:
        js_section = content[js_section_start:js_section_end]
        # Remove HTML paragraphs from JavaScript section
        js_section = re.sub(r'<p><em>Nerve root assignments per Preston & Shapiro</em></p>', '', js_section)
        js_section = re.sub(r'<[^>]+>', '', js_section)  # Remove any remaining HTML tags
        
        # Reconstruct the content
        content = content[:js_section_start] + js_section + content[js_section_end:]
    
    # Fix 4: Ensure proper syntax around forEach calls
    content = re.sub(r'\.steps\s*<[^>]*>.*?</[^>]*>\s*\.forEach', '.steps.forEach', content, flags=re.DOTALL)
    
    # Write the fixed content back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Emergency fixes applied!")
    return True

if __name__ == "__main__":
    if fix_html_file():
        print("🎉 JavaScript syntax errors should be resolved!")
        print("Please test the EMG tool functionality.")
    else:
        print("❌ Emergency fix failed")