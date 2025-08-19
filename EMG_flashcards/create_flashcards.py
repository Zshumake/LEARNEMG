#!/usr/bin/env python3
"""
EMG Muscle Flashcards Extractor
Extracts all muscle flashcard data from Anki database and formats for JavaScript use
"""
import sqlite3
import re
import html
import json

def clean_html(text):
    """Remove HTML tags and decode HTML entities"""
    if not text:
        return ""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Decode HTML entities
    text = html.unescape(text)
    # Clean up whitespace and special characters
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace('&nbsp;', ' ')
    return text

def extract_muscle_name(text):
    """Extract muscle name from various formats"""
    # Try different patterns in order of preference
    
    # Pattern 1: Bold text in first field
    bold_match = re.search(r'<b>([^<]+)</b>', text)
    if bold_match:
        muscle = clean_html(bold_match.group(1))
        if len(muscle) > 2 and is_muscle_name(muscle):
            return muscle
    
    # Pattern 2: Cloze deletion with muscle name {{c3::Muscle Name}}
    cloze_match = re.search(r'\{\{c\d+::([^}:]+?)(?:::.*?)?\}\}', text)
    if cloze_match:
        muscle = clean_html(cloze_match.group(1))
        if len(muscle) > 2 and is_muscle_name(muscle):
            return muscle
    
    return ""

def is_muscle_name(text):
    """Check if text appears to be a muscle name"""
    if not text or len(text) < 3:
        return False
    
    text_lower = text.lower()
    
    # Skip non-muscle terms
    skip_terms = [
        'test', 'position', 'examiner', 'patient', 'initial', 'final',
        'emg', 'ncs', 'edx', 'findings', 'syndrome', 'injury', 'disorder',
        'velocity', 'amplitude', 'latency', 'conduction', 'stimulation',
        'pathophys', 'etiology', 'clinical', 'treatment', 'dx', 'course'
    ]
    
    for term in skip_terms:
        if term in text_lower:
            return False
    
    # Must contain muscle-related terms
    muscle_terms = [
        'muscle', 'muscular', 'trapezius', 'deltoid', 'biceps', 'triceps', 
        'flexor', 'extensor', 'abductor', 'adductor', 'pronator', 'supinator',
        'brachialis', 'quadriceps', 'gastrocnemius', 'soleus', 'tibialis',
        'peroneus', 'gluteus', 'rhomboid', 'serratus', 'pectoralis',
        'latissimus', 'supraspinatus', 'infraspinatus', 'subscapularis',
        'teres', 'carpi', 'pollicis', 'digitorum', 'hallucis', 'brevis',
        'longus', 'major', 'minor', 'anterior', 'posterior', 'medius',
        'maximus', 'semitendinosus', 'semimembranosus', 'sartorius',
        'gracilis', 'pectineus', 'iliopsoas', 'piriformis'
    ]
    
    return any(term in text_lower for term in muscle_terms)

def extract_nerve_root_info(text):
    """Extract nerve and root information from text"""
    nerve = ""
    roots = ""
    
    # Extract nerve information
    nerve_patterns = [
        r'Nerve:\s*\{\{c\d+::([^}]+?)\}\}',
        r'nerve:\s*\{\{c\d+::([^}]+?)\}\}',
        r'Innervation:\s*\{\{c\d+::([^}]+?)\}\}',
    ]
    
    for pattern in nerve_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            nerve_content = match.group(1)
            if '::' in nerve_content:
                nerve_content = nerve_content.split('::')[0]
            nerve = clean_html(nerve_content.strip())
            break
    
    # Extract roots information
    roots_patterns = [
        r'Root[s]?:\s*\{\{c\d+::([^}]+?)\}\}',
        r'root[s]?:\s*\{\{c\d+::([^}]+?)\}\}',
        r'Nerve\s+Root[s]?:\s*\{\{c\d+::([^}]+?)\}\}',
    ]
    
    for pattern in roots_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            roots_content = match.group(1)
            if '::' in roots_content:
                roots_content = roots_content.split('::')[0]
            roots = clean_html(roots_content.strip())
            # Clean up roots formatting
            roots = re.sub(r'\s*,\s*', ', ', roots)
            roots = re.sub(r'\s+', ' ', roots)
            break
    
    return nerve, roots

def extract_clinical_notes(fields):
    """Extract clinical notes from muscle test descriptions"""
    notes = []
    
    for field in fields[1:]:  # Skip first field
        field_clean = clean_html(field)
        # Look for clinical test information
        if (len(field_clean) > 30 and 
            any(term in field_clean.lower() for term in ['test', 'position', 'examiner', 'patient']) and
            not re.search(r'\.(jpg|png|gif|jpeg)', field, re.IGNORECASE)):
            
            # Extract meaningful clinical information
            clinical_note = field_clean
            # Remove common boilerplate
            clinical_note = re.sub(r'Muscle Test[^.]*\.', '', clinical_note)
            clinical_note = re.sub(r'(Initial|Final) Position[^.]*\.', '', clinical_note)
            clinical_note = clinical_note.strip()
            
            if len(clinical_note) > 20:
                notes.append(clinical_note[:150])
                break  # Take only first meaningful note
    
    return notes[0] if notes else ""

def parse_flashcard(field_data):
    """Parse a single flashcard record"""
    fields = field_data.split('\x1f')
    
    if not fields:
        return None
    
    # Extract muscle name
    muscle_name = extract_muscle_name(fields[0])
    if not muscle_name:
        return None
    
    # Extract nerve and root information from all relevant fields
    combined_text = " ".join(fields[:3])
    nerve, roots = extract_nerve_root_info(combined_text)
    
    # Extract clinical notes
    notes = extract_clinical_notes(fields)
    
    return {
        "muscle": muscle_name,
        "nerve": nerve,
        "roots": roots,
        "notes": notes
    }

def main():
    print("EMG Muscle Flashcards Extractor")
    print("=" * 40)
    
    # Connect to database
    db_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/collection.anki2"
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT flds FROM notes")
        rows = cursor.fetchall()
        conn.close()
    except Exception as e:
        print(f"Error reading database: {e}")
        return
    
    print(f"Processing {len(rows)} total cards from database...")
    
    # Extract flashcards
    flashcards = []
    for row in rows:
        card = parse_flashcard(row[0])
        if card:
            flashcards.append(card)
    
    print(f"Extracted {len(flashcards)} muscle flashcards")
    
    # Remove duplicates and clean up
    seen_muscles = set()
    unique_cards = []
    
    for card in flashcards:
        # Normalize muscle name for deduplication
        muscle_key = card['muscle'].lower().strip()
        muscle_key = re.sub(r'\s+', ' ', muscle_key)
        
        if muscle_key not in seen_muscles:
            seen_muscles.add(muscle_key)
            
            # Clean up the card data
            card['muscle'] = card['muscle'].strip()
            card['nerve'] = card['nerve'].strip()
            card['roots'] = card['roots'].strip()
            card['notes'] = card['notes'].strip()
            
            unique_cards.append(card)
    
    print(f"After deduplication: {len(unique_cards)} unique muscle flashcards")
    
    # Sort alphabetically by muscle name
    unique_cards.sort(key=lambda x: x['muscle'].lower())
    
    # Generate JavaScript output
    js_content = generate_javascript(unique_cards)
    
    # Save files
    js_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards.js"
    json_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards.json"
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(unique_cards, f, indent=2, ensure_ascii=False)
    
    print(f"\\nFiles created:")
    print(f"JavaScript: {js_path}")
    print(f"JSON: {json_path}")
    
    # Display statistics
    print_statistics(unique_cards)
    
    # Show sample cards
    print("\\nSample flashcards:")
    for i, card in enumerate(unique_cards[:10]):
        print(f"{i+1:2d}. {card['muscle']}")
        if card['nerve']:
            print(f"    Nerve: {card['nerve']}")
        if card['roots']:
            print(f"    Roots: {card['roots']}")
        if card['notes']:
            print(f"    Notes: {card['notes'][:80]}{'...' if len(card['notes']) > 80 else ''}")
        print()

def generate_javascript(cards):
    """Generate JavaScript array with proper formatting"""
    js_lines = [
        "// EMG Muscle Flashcards Database",
        f"// Extracted {len(cards)} muscle flashcards from Anki database",
        "// Each flashcard contains: muscle name, nerve, nerve roots, clinical notes",
        "// Generated automatically from collection.anki2",
        "",
        "const flashcards = ["
    ]
    
    for i, card in enumerate(cards):
        # Escape quotes and special characters
        muscle = card['muscle'].replace('\\\\', '\\\\\\\\').replace('"', '\\\\"').replace("'", "\\\\'")
        nerve = card['nerve'].replace('\\\\', '\\\\\\\\').replace('"', '\\\\"').replace("'", "\\\\'")
        roots = card['roots'].replace('\\\\', '\\\\\\\\').replace('"', '\\\\"').replace("'", "\\\\'")
        notes = card['notes'][:200].replace('\\\\', '\\\\\\\\').replace('"', '\\\\"').replace("'", "\\\\'")
        
        js_lines.append("  {")
        js_lines.append(f'    muscle: "{muscle}",')
        js_lines.append(f'    nerve: "{nerve}",')
        js_lines.append(f'    roots: "{roots}",')
        js_lines.append(f'    notes: "{notes}{"..." if len(card["notes"]) > 200 else ""}"')
        js_lines.append("  }" + ("," if i < len(cards) - 1 else ""))
    
    js_lines.extend([
        "];",
        "",
        "// Export for use in other modules",
        "if (typeof module !== 'undefined' && module.exports) {",
        "  module.exports = flashcards;",
        "}",
        "",
        "// Also make available globally",
        "if (typeof window !== 'undefined') {",
        "  window.muscleFlashcards = flashcards;",
        "}"
    ])
    
    return "\\n".join(js_lines)

def print_statistics(cards):
    """Print statistics about the extracted flashcards"""
    total = len(cards)
    with_nerve = sum(1 for card in cards if card['nerve'])
    with_roots = sum(1 for card in cards if card['roots'])
    with_notes = sum(1 for card in cards if card['notes'])
    
    print(f"\\nStatistics:")
    print(f"Total flashcards: {total}")
    print(f"With nerve information: {with_nerve} ({with_nerve/total*100:.1f}%)")
    print(f"With root information: {with_roots} ({with_roots/total*100:.1f}%)")
    print(f"With clinical notes: {with_notes} ({with_notes/total*100:.1f}%)")
    
    # Count by body region based on nerve roots
    cervical = sum(1 for card in cards if 'C' in card['roots'])
    lumbar = sum(1 for card in cards if 'L' in card['roots'])
    sacral = sum(1 for card in cards if 'S' in card['roots'])
    thoracic = sum(1 for card in cards if 'T' in card['roots'])
    
    print(f"\\nBy nerve root region:")
    print(f"Cervical (C): {cervical}")
    print(f"Thoracic (T): {thoracic}")
    print(f"Lumbar (L): {lumbar}")
    print(f"Sacral (S): {sacral}")

if __name__ == "__main__":
    main()