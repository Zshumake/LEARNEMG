#!/usr/bin/env python3
"""
Extract ALL flashcards from the Anki database
This script handles the correct database structure
"""

import sqlite3
import json
import html
import re
from collections import defaultdict

def clean_html(raw_html):
    """Remove HTML tags and decode HTML entities"""
    if not raw_html:
        return ""
    
    # Remove HTML tags
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    
    # Decode HTML entities
    cleantext = html.unescape(cleantext)
    
    # Remove extra whitespace and newlines
    cleantext = re.sub(r'\s+', ' ', cleantext).strip()
    
    # Remove image references that won't work
    cleantext = re.sub(r'\b\w+\.(jpg|jpeg|png|gif|svg)\b', '', cleantext, flags=re.IGNORECASE)
    
    return cleantext

def extract_cloze_content(text):
    """Extract content from cloze deletions like {{c1::answer}}"""
    # Find all cloze patterns
    cloze_pattern = r'\{\{c\d+::([^}]+)(?:::[\d\w]*)*\}\}'
    matches = re.findall(cloze_pattern, text)
    
    # Replace cloze patterns with blanks for the question
    question = re.sub(cloze_pattern, '[...]', text)
    
    # Create answer with filled-in blanks
    answer = text
    for match in re.finditer(cloze_pattern, text):
        full_match = match.group(0)
        content = match.group(1)
        answer = answer.replace(full_match, f"**{content}**")
    
    return clean_html(question), clean_html(answer)

def extract_all_flashcards():
    """Extract all flashcards from the Anki database"""
    db_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/collection.anki2"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all notes
        cursor.execute("SELECT id, mid, flds FROM notes ORDER BY id")
        notes = cursor.fetchall()
        
        all_flashcards = []
        categories = defaultdict(int)
        
        print(f"Found {len(notes)} total notes in database")
        
        for note_id, model_id, fields_blob in notes:
            if not fields_blob:
                continue
                
            # Split fields by the field separator
            fields = fields_blob.split('\x1f')
            
            if len(fields) < 2:
                continue
            
            # Get the first two fields (question and answer)
            field1 = fields[0] if fields[0] else ""
            field2 = fields[1] if len(fields) > 1 and fields[1] else ""
            
            # Handle different card types
            if model_id == 1415557910096:  # Cloze deletion model
                if field1 and '{{c' in field1:
                    question, answer = extract_cloze_content(field1)
                else:
                    question = clean_html(field1)
                    answer = clean_html(field2)
            else:  # Regular cards
                question = clean_html(field1)
                answer = clean_html(field2)
            
            # Skip empty cards
            if not question.strip() or not answer.strip():
                continue
            
            # Determine category based on content
            category = categorize_flashcard(question, answer)
            categories[category] += 1
            
            # Create flashcard object
            flashcard = {
                "id": note_id,
                "question": question,
                "answer": answer,
                "category": category,
                "type": determine_flashcard_type(question, answer)
            }
            
            all_flashcards.append(flashcard)
        
        conn.close()
        
        print(f"\\nExtracted {len(all_flashcards)} flashcards")
        print("\\nCategory breakdown:")
        for cat, count in sorted(categories.items()):
            print(f"  {cat}: {count}")
        
        return all_flashcards
        
    except Exception as e:
        print(f"Error extracting flashcards: {e}")
        import traceback
        traceback.print_exc()
        return []

def categorize_flashcard(question, answer):
    """Determine the category of a flashcard based on its content"""
    content = (question + " " + answer).lower()
    
    # Muscle-related keywords
    if any(keyword in content for keyword in [
        'muscle', 'innervat', 'nerve supply', 'motor', 'c5', 'c6', 'c7', 'c8', 't1', 
        'l1', 'l2', 'l3', 'l4', 'l5', 's1', 's2', 's3', 'median nerve', 'ulnar nerve',
        'radial nerve', 'axillary', 'musculocutaneous', 'tibial', 'peroneal', 'femoral',
        'trapezius', 'deltoid', 'biceps', 'triceps', 'pectoralis', 'latissimus'
    ]):
        return "Muscle Anatomy"
    
    # Nerve conduction keywords
    if any(keyword in content for keyword in [
        'conduction velocity', 'latency', 'amplitude', 'distal latency', 'f-wave',
        'h-reflex', 'snap', 'cmap', 'nerve conduction', 'sensory nerve', 'motor nerve',
        'normal value', 'reference range', 'cv', 'ncs', 'nerve study'
    ]):
        return "Nerve Conduction"
    
    # EMG-specific keywords
    if any(keyword in content for keyword in [
        'fibrillation', 'positive sharp wave', 'fasciculation', 'myotonia', 
        'recruitment', 'motor unit', 'needle emg', 'spontaneous activity',
        'denervation', 'reinnervation', 'polyphasic', 'muap'
    ]):
        return "EMG Findings"
    
    # Anatomy keywords
    if any(keyword in content for keyword in [
        'anatomy', 'plexus', 'root', 'trunk', 'cord', 'branch', 'pathway',
        'brachial plexus', 'lumbar plexus', 'sacral plexus', 'origin', 'insertion'
    ]):
        return "Anatomy"
    
    # Clinical conditions
    if any(keyword in content for keyword in [
        'syndrome', 'neuropathy', 'myopathy', 'radiculopathy', 'plexopathy',
        'carpal tunnel', 'guillain', 'charcot', 'als', 'myasthenia', 'disease',
        'disorder', 'condition', 'diagnosis'
    ]):
        return "Clinical Conditions"
    
    # Study notes or general knowledge
    if any(keyword in content for keyword in [
        'definition', 'normal', 'reference', 'technique', 'method', 'procedure'
    ]):
        return "Study Notes"
    
    # Default category
    return "General Knowledge"

def determine_flashcard_type(question, answer):
    """Determine the type of flashcard based on format"""
    if '[...]' in question:
        return "cloze_deletion"
    elif any(keyword in question.lower() for keyword in ['what', 'which', 'who', 'when', 'where', 'why', 'how']):
        return "q_and_a"
    elif ":" in question or "=" in question:
        return "definition"
    elif len(question.split()) <= 3:
        return "term_definition"
    else:
        return "concept_explanation"

def create_javascript_array(flashcards):
    """Convert flashcards to JavaScript array format"""
    js_lines = []
    js_lines.append("        // Complete EMG/NCS Flashcard Database - All Cards")
    js_lines.append("        // Extracted from original Anki database")
    js_lines.append("        NCSApp.flashcardData = [")
    
    for i, card in enumerate(flashcards):
        # Escape quotes and special characters for JavaScript
        question = card['question'].replace('\\', '\\\\').replace('"', '\\"').replace('\\n', ' ').replace('\\r', '')
        answer = card['answer'].replace('\\', '\\\\').replace('"', '\\"').replace('\\n', ' ').replace('\\r', '')
        category = card['category'].replace('"', '\\"')
        card_type = card['type'].replace('"', '\\"')
        
        # Limit length to prevent overly long cards
        if len(question) > 500:
            question = question[:497] + "..."
        if len(answer) > 1000:
            answer = answer[:997] + "..."
        
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
    
    return "\\n".join(js_lines)

def main():
    print("🔍 Extracting ALL flashcards from Anki database...")
    
    # Extract all flashcards
    flashcards = extract_all_flashcards()
    
    if not flashcards:
        print("❌ No flashcards found!")
        return
    
    # Save as JSON for backup
    json_output = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/ALL_FLASHCARDS_COMPLETE.json"
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Saved {len(flashcards)} flashcards to {json_output}")
    
    # Create JavaScript replacement
    js_code = create_javascript_array(flashcards)
    
    js_output = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/all_flashcards_complete_replacement.txt"
    with open(js_output, 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f"📝 Created JavaScript array at {js_output}")
    print(f"✅ Ready to replace flashcard data with all {len(flashcards)} cards!")

if __name__ == "__main__":
    main()