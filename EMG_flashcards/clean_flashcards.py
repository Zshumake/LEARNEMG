#!/usr/bin/env python3
"""
Clean and filter the extracted muscle flashcards
Remove non-muscle entries and create final dataset
"""
import json

def is_valid_muscle_name(muscle_name):
    """Determine if this is a valid muscle name"""
    if not muscle_name or len(muscle_name) < 3:
        return False
    
    muscle_lower = muscle_name.lower().strip()
    
    # Skip clearly invalid entries
    invalid_terms = [
        'muscle atrophy', 'muscle belly', 'muscle fibers', 'loss of muscle',
        'single muscle', 'both muscle', 'radial n. muscles', 'muscles',
        'hip adductor canal', 'posterior cutaneous', 'deep peroneal (aka',
        'stimulating posterior', 'posterior', '1 flexor'
    ]
    
    for term in invalid_terms:
        if term in muscle_lower:
            return False
    
    # Must contain actual muscle terminology
    valid_muscle_terms = [
        'trapezius', 'deltoid', 'biceps', 'triceps', 'flexor', 'extensor',
        'abductor', 'adductor', 'pronator', 'supinator', 'brachialis',
        'quadriceps', 'gastrocnemius', 'soleus', 'tibialis', 'peroneus',
        'gluteus', 'rhomboid', 'serratus', 'pectoralis', 'latissimus',
        'supraspinatus', 'infraspinatus', 'subscapularis', 'teres',
        'carpi', 'pollicis', 'digitorum', 'hallucis', 'brevis', 'longus',
        'major', 'minor', 'anterior', 'posterior', 'medius', 'maximus',
        'coracobrachialis', 'iliopsoas', 'psoas', 'iliacus'
    ]
    
    return any(term in muscle_lower for term in valid_muscle_terms)

def clean_muscle_name(name):
    """Clean up muscle name formatting"""
    # Remove leading numbers
    name = re.sub(r'^\d+\s*', '', name)
    # Capitalize properly
    return name.strip()

def main():
    # Load the extracted flashcards
    input_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards.json"
    
    with open(input_file, 'r') as f:
        flashcards = json.load(f)
    
    print(f"Starting with {len(flashcards)} flashcards")
    
    # Filter to valid muscle cards only
    valid_flashcards = []
    for card in flashcards:
        if is_valid_muscle_name(card['muscle']):
            # Clean up the muscle name
            card['muscle'] = clean_muscle_name(card['muscle'])
            valid_flashcards.append(card)
    
    print(f"After filtering: {len(valid_flashcards)} valid muscle flashcards")
    
    # Sort alphabetically
    valid_flashcards.sort(key=lambda x: x['muscle'].lower())
    
    # Generate final JavaScript file
    js_content = generate_clean_javascript(valid_flashcards)
    
    # Save files
    js_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards_final.js"
    json_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards_final.json"
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(valid_flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"\nFinal files created:")
    print(f"JavaScript: {js_path}")
    print(f"JSON: {json_path}")
    
    # Print statistics
    total = len(valid_flashcards)
    with_nerve = sum(1 for card in valid_flashcards if card['nerve'])
    with_roots = sum(1 for card in valid_flashcards if card['roots'])
    
    print(f"\nFinal Statistics:")
    print(f"Total muscle flashcards: {total}")
    print(f"With nerve information: {with_nerve} ({with_nerve/total*100:.1f}%)")
    print(f"With root information: {with_roots} ({with_roots/total*100:.1f}%)")
    
    # Show all flashcards
    print(f"\nComplete List of {total} Muscle Flashcards:")
    print("=" * 50)
    for i, card in enumerate(valid_flashcards, 1):
        print(f"{i:2d}. {card['muscle']}")
        if card['nerve']:
            print(f"    Nerve: {card['nerve']}")
        if card['roots']:
            print(f"    Roots: {card['roots']}")
        print()

def generate_clean_javascript(cards):
    """Generate the final clean JavaScript file"""
    js_lines = [
        "/**",
        " * EMG Muscle Flashcards Database",
        f" * {len(cards)} muscle flashcards extracted from Anki database",
        " * ",
        " * Structure:",
        " * - muscle: Muscle name",
        " * - nerve: Innervating nerve(s)",
        " * - roots: Nerve root levels",
        " * - notes: Clinical notes (currently empty)",
        " */",
        "",
        "const muscleFlashcards = ["
    ]
    
    for i, card in enumerate(cards):
        muscle = card['muscle'].replace('\\', '\\\\').replace('"', '\\"')
        nerve = card['nerve'].replace('\\', '\\\\').replace('"', '\\"')
        roots = card['roots'].replace('\\', '\\\\').replace('"', '\\"')
        notes = card['notes'].replace('\\', '\\\\').replace('"', '\\"')
        
        js_lines.append("  {")
        js_lines.append(f'    muscle: "{muscle}",')
        js_lines.append(f'    nerve: "{nerve}",')
        js_lines.append(f'    roots: "{roots}",')
        js_lines.append(f'    notes: "{notes}"')
        js_lines.append("  }" + ("," if i < len(cards) - 1 else ""))
    
    js_lines.extend([
        "];",
        "",
        "// Export for different module systems",
        "if (typeof module !== 'undefined' && module.exports) {",
        "  module.exports = muscleFlashcards;",
        "}",
        "",
        "if (typeof window !== 'undefined') {",
        "  window.muscleFlashcards = muscleFlashcards;",
        "}",
        "",
        "// Also export as default for ES6 modules",
        "export default muscleFlashcards;"
    ])
    
    return "\n".join(js_lines)

if __name__ == "__main__":
    import re
    main()