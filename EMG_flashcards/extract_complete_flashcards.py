#!/usr/bin/env python3
"""
Extract complete flashcard data from Anki database
"""

import sqlite3
import json
import re
import html

def clean_html(text):
    """Remove HTML tags and clean up text"""
    if not text:
        return ""
    
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Decode HTML entities
    text = html.unescape(text)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def extract_muscle_name(text):
    """Extract muscle name from the text"""
    if not text:
        return ""
    
    # Look for text in <b> tags first
    bold_match = re.search(r'<b>(.*?)</b>', text, re.IGNORECASE)
    if bold_match:
        muscle_text = clean_html(bold_match.group(1))
        # Remove common suffixes
        muscle_text = re.sub(r'\s+(upper|lower|middle|major|minor)?\s*$', '', muscle_text, flags=re.IGNORECASE)
        return muscle_text
    
    # Look for text in <div> tags
    div_match = re.search(r'<div[^>]*><b>(.*?)</b>', text, re.IGNORECASE)
    if div_match:
        return clean_html(div_match.group(1))
    
    # Fallback to first line
    lines = text.split('\n')
    if lines:
        return clean_html(lines[0])
    
    return ""

def extract_nerve_info(text):
    """Extract nerve and root information from cloze text"""
    nerve = ""
    roots = ""
    
    if not text:
        return nerve, roots
    
    # Look for cloze patterns
    nerve_match = re.search(r'Nerve:\s*\{\{c\d+::(.*?)(?:::.*?)?\}\}', text, re.IGNORECASE)
    if nerve_match:
        nerve = clean_html(nerve_match.group(1))
    
    roots_match = re.search(r'Roots?:\s*\{\{c\d+::(.*?)(?:::.*?)?\}\}', text, re.IGNORECASE)
    if roots_match:
        roots = clean_html(roots_match.group(1))
    
    return nerve, roots

def extract_clinical_info(text):
    """Extract clinical testing information"""
    if not text:
        return ""
    
    # Look for muscle test information
    clinical_info = []
    
    # Initial position
    initial_match = re.search(r'Initial Position(.*?)(?:Final Position|$)', text, re.DOTALL | re.IGNORECASE)
    if initial_match:
        initial = clean_html(initial_match.group(1))
        if initial:
            clinical_info.append(f"Initial Position: {initial}")
    
    # Final position
    final_match = re.search(r'Final Position(.*?)(?:Trunks:|Divisions:|Cords:|Innervation|$)', text, re.DOTALL | re.IGNORECASE)
    if final_match:
        final = clean_html(final_match.group(1))
        if final:
            clinical_info.append(f"Final Position: {final}")
    
    return " | ".join(clinical_info)

def main():
    db_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/collection.anki2"
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all cloze deletion notes (model ID 1415557910096)
    cursor.execute("SELECT flds FROM notes WHERE mid = 1415557910096")
    rows = cursor.fetchall()
    
    complete_flashcards = []
    
    for i, (flds,) in enumerate(rows):
        try:
            # Split fields (Text and Extra)
            fields = flds.split('\x1f')  # Anki uses \x1f as field separator
            
            if len(fields) >= 1:
                text_field = fields[0]
                extra_field = fields[1] if len(fields) > 1 else ""
                
                # Extract muscle name
                muscle = extract_muscle_name(text_field)
                
                # Extract nerve and root information
                nerve, roots = extract_nerve_info(text_field)
                
                # Extract clinical information
                clinical_info = extract_clinical_info(text_field + " " + extra_field)
                
                # Create cloze question format
                cloze_text = text_field
                
                # Parse cloze deletions to create questions
                cloze_matches = list(re.finditer(r'\{\{c(\d+)::(.*?)(?:::(.*?))?\}\}', cloze_text))
                
                if cloze_matches:
                    # Create question with blanks
                    question = cloze_text
                    answers = []
                    
                    for match in cloze_matches:
                        cloze_num = match.group(1)
                        answer_text = clean_html(match.group(2))
                        hint = match.group(3) if match.group(3) else ""
                        
                        # Replace cloze with blank
                        question = question.replace(match.group(0), "____")
                        
                        answers.append({
                            "answer": answer_text,
                            "hint": hint,
                            "cloze_num": cloze_num
                        })
                    
                    # Clean up the question
                    question = clean_html(question)
                    
                    flashcard = {
                        "id": i + 1,
                        "muscle": muscle,
                        "nerve": nerve,
                        "roots": roots,
                        "question": question,
                        "answers": answers,
                        "clinical_info": clinical_info,
                        "original_cloze": cloze_text,
                        "type": "cloze"
                    }
                    
                    complete_flashcards.append(flashcard)
                    
                    print(f"Card {i+1}: {muscle} - Nerve: {nerve}, Roots: {roots}")
                
        except Exception as e:
            print(f"Error processing card {i+1}: {e}")
            continue
    
    conn.close()
    
    # Save to JSON file
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/complete_flashcards_extracted.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(complete_flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"\nExtracted {len(complete_flashcards)} complete flashcards")
    print(f"Saved to: {output_file}")
    
    # Create a summary of missing information
    missing_nerve = [card for card in complete_flashcards if not card['nerve']]
    missing_roots = [card for card in complete_flashcards if not card['roots']]
    
    print(f"\nCards missing nerve information: {len(missing_nerve)}")
    print(f"Cards missing root information: {len(missing_roots)}")
    
    if missing_nerve:
        print("\nCards missing nerve information:")
        for card in missing_nerve[:10]:  # Show first 10
            print(f"  - {card['muscle']}")
    
    if missing_roots:
        print("\nCards missing root information:")
        for card in missing_roots[:10]:  # Show first 10
            print(f"  - {card['muscle']}")

if __name__ == "__main__":
    main()