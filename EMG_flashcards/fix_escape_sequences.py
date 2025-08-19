#!/usr/bin/env python3
"""
Fix invalid escape sequences in JavaScript
"""

import re

def fix_escape_sequences():
    """Fix all invalid \n escape sequences in JavaScript"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Fixing invalid escape sequences...")
    
    # Find the flashcard section with the problematic escapes
    start_marker = "NCSApp.flashcardData = ["
    end_marker = "        ];"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ Could not find flashcard section")
        return False
    
    flashcard_section = content[start_idx:end_idx]
    
    # Remove the literal \n sequences that are causing syntax errors
    # These should be actual newlines, not literal \n strings
    fixed_section = flashcard_section.replace('\\n', '\n')
    
    # Also fix any other common escape issues
    fixed_section = fixed_section.replace('\\t', '\t')
    
    # Clean up the formatting to be proper JavaScript
    # Replace malformed object starts
    fixed_section = re.sub(r'{\n\s*question:', '            {\n                question:', fixed_section)
    
    # Ensure proper spacing and formatting
    lines = fixed_section.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Skip empty lines within objects
        if line.strip() == '':
            continue
        # Ensure proper indentation
        if 'question:' in line and not line.strip().startswith('{'):
            line = '                ' + line.strip()
        elif any(prop in line for prop in ['answer:', 'category:', 'type:', 'id:']):
            if not line.strip().startswith('}'):
                line = '                ' + line.strip()
        elif line.strip() in ['{', '},', '}']:
            if line.strip() == '{':
                line = '            {'
            elif line.strip() == '},':
                line = '            },'
            elif line.strip() == '}':
                line = '            }'
        
        cleaned_lines.append(line)
    
    fixed_section = '\n'.join(cleaned_lines)
    
    # Reconstruct the full content
    new_content = content[:start_idx] + fixed_section + content[end_idx:]
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Fixed invalid escape sequences")
    
    # Check for NCSApp object definition
    if 'const NCSApp = {' not in new_content:
        print("❌ NCSApp object not properly defined")
        return False
    
    if 'window.NCSApp = NCSApp;' not in new_content:
        print("❌ NCSApp not exposed to window")
        return False
    
    print("✅ NCSApp object properly defined and exposed")
    return True

if __name__ == "__main__":
    if fix_escape_sequences():
        print("\n🎉 Escape sequences fixed!")
        print("JavaScript should now load without syntax errors.")
    else:
        print("\n❌ Additional issues detected")