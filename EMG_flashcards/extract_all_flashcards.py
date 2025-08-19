#!/usr/bin/env python3
"""
Extract ALL 480 flashcards from the Anki database
This script will extract every single flashcard with proper categorization
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
    
    # Clean up whitespace
    cleantext = re.sub(r'\s+', ' ', cleantext).strip()
    
    return cleantext

def extract_all_flashcards():
    """Extract all flashcards from the Anki database"""
    db_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/collection.anki2"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all notes with their fields
        query = """
        SELECT n.id, n.mid, n.flds, nt.name as notetype_name
        FROM notes n
        JOIN notetypes nt ON n.mid = nt.id
        ORDER BY n.id
        """
        
        cursor.execute(query)
        notes = cursor.fetchall()
        
        all_flashcards = []
        categories = defaultdict(int)
        
        print(f"Found {len(notes)} total notes in database")
        
        for note_id, model_id, fields_blob, notetype_name in notes:
            if not fields_blob:
                continue
                
            # Split fields by the field separator (usually \x1f)
            fields = fields_blob.split('\x1f')
            
            if len(fields) < 2:
                continue
                
            # Clean the fields
            question = clean_html(fields[0])
            answer = clean_html(fields[1]) if len(fields) > 1 else ""
            
            # Skip empty cards
            if not question.strip() and not answer.strip():
                continue
            
            # Determine category based on content analysis
            category = categorize_flashcard(question, answer, notetype_name)
            categories[category] += 1
            
            # Create flashcard object
            flashcard = {
                "id": note_id,
                "question": question,
                "answer": answer,
                "category": category,
                "notetype": notetype_name,
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
        return []

def categorize_flashcard(question, answer, notetype_name):
    """Determine the category of a flashcard based on its content"""
    content = (question + " " + answer).lower()
    
    # Muscle-related keywords
    if any(keyword in content for keyword in [
        'muscle', 'innervat', 'nerve supply', 'motor', 'c5', 'c6', 'c7', 'c8', 't1', 
        'l1', 'l2', 'l3', 'l4', 'l5', 's1', 's2', 's3', 'median nerve', 'ulnar nerve',
        'radial nerve', 'axillary', 'musculocutaneous', 'tibial', 'peroneal', 'femoral'
    ]):
        return "Muscle Anatomy"
    
    # Nerve conduction keywords
    if any(keyword in content for keyword in [
        'conduction velocity', 'latency', 'amplitude', 'distal latency', 'f-wave',
        'h-reflex', 'snap', 'cmap', 'nerve conduction', 'sensory', 'motor nerve'
    ]):
        return "Nerve Conduction"
    
    # EMG-specific keywords
    if any(keyword in content for keyword in [
        'fibrillation', 'positive sharp wave', 'fasciculation', 'myotonia', 
        'recruitment', 'motor unit', 'needle emg', 'spontaneous activity'
    ]):
        return "EMG Findings"
    
    # Clinical conditions
    if any(keyword in content for keyword in [
        'syndrome', 'neuropathy', 'myopathy', 'radiculopathy', 'plexopathy',
        'carpal tunnel', 'guillain', 'charcot', 'als', 'myasthenia'
    ]):
        return "Clinical Conditions"
    
    # Anatomy keywords
    if any(keyword in content for keyword in [
        'anatomy', 'plexus', 'root', 'trunk', 'cord', 'branch', 'pathway'
    ]):
        return "Anatomy"
    
    # Study notes or general knowledge
    if 'note' in notetype_name.lower() or any(keyword in content for keyword in [
        'definition', 'normal value', 'reference', 'technique'
    ]):
        return "Study Notes"
    
    # Default category
    return "General Knowledge"

def determine_flashcard_type(question, answer):
    """Determine the type of flashcard based on format"""
    if any(keyword in question.lower() for keyword in ['what', 'which', 'who', 'when', 'where', 'why', 'how']):
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
    js_lines.append("        // Complete EMG/NCS Flashcard Database - All 480 Cards")
    js_lines.append("        // Extracted from original Anki database")
    js_lines.append("        NCSApp.flashcardData = [")
    
    for i, card in enumerate(flashcards):
        # Escape quotes and special characters
        question = card['question'].replace('"', '\\"').replace('\\', '\\\\')
        answer = card['answer'].replace('"', '\\"').replace('\\', '\\\\')
        category = card['category'].replace('"', '\\"')
        card_type = card['type'].replace('"', '\\"')
        
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
    json_output = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/ALL_FLASHCARDS.json"
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Saved {len(flashcards)} flashcards to {json_output}")
    
    # Create JavaScript replacement
    js_code = create_javascript_array(flashcards)
    
    js_output = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/all_flashcards_replacement.txt"
    with open(js_output, 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f"📝 Created JavaScript array at {js_output}")
    print(f"✅ Ready to replace flashcard data with all {len(flashcards)} cards!")

if __name__ == "__main__":
    main()