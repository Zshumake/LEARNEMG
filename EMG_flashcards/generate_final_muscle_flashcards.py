#!/usr/bin/env python3
"""
Generate final, complete muscle flashcards for medical education
Focus on cards with complete nerve and root information
"""

import json
import csv

def load_json_file(filepath):
    """Load JSON file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return []

def is_muscle_card(muscle_name):
    """Check if this is actually a muscle card vs EMG theory"""
    if not muscle_name:
        return False
    
    muscle_name_lower = muscle_name.lower()
    
    # Skip EMG theory and technique cards
    exclude_keywords = [
        'emg', 'ncs', 'cmap', 'snap', 'recruitment', 'muap', 'amplitude', 'latency', 
        'conduction', 'nerve conduction', 'radiculopathy', 'sunderland', 'axonal', 
        'demyelination', 'fibrillation', 'fasciculation', 'myotonic', 'f-wave', 'h-reflex',
        'stimulus', 'artifact', 'grid', 'sweep', 'sensitivity', 'phase cancellation',
        'collateral sprouting', 'anodal block', 'signal to noise', 'averaging',
        'chronology', 'electrodiagnostic', 'aidp', 'cidp', 'gbs', 'botulism',
        'critical illness', 'cts', 'carpal tunnel', 'cubital tunnel', 'guyon',
        'arcade', 'anterior interosseous', 'posterior interosseous', 'radial tunnel',
        'wartenberg', 'froment', 'martin-gruber', 'riche-cannieu', 'ssep', 
        'somatosensory', 'tarsal tunnel', 'peroneal', 'acquired neuropathies'
    ]
    
    # Skip if contains EMG theory keywords
    if any(keyword in muscle_name_lower for keyword in exclude_keywords):
        return False
    
    # Skip if it's clearly not a muscle (starts with symbols, contains {{c1::, etc.)
    if (muscle_name.startswith('{{') or 
        muscle_name.startswith('*') or 
        '::' in muscle_name or
        muscle_name.strip() == '' or
        len(muscle_name.strip()) < 3):
        return False
    
    return True

def clean_muscle_name(name):
    """Clean up muscle name"""
    if not name:
        return ""
    
    # Remove HTML tags
    import re
    name = re.sub(r'<[^>]+>', '', name)
    
    # Remove cloze deletion syntax
    name = re.sub(r'\{\{c\d+::', '', name)
    name = re.sub(r'::.*?\}\}', '', name)
    name = re.sub(r'\}\}', '', name)
    
    # Clean up common suffixes that got cut off
    name = name.replace(' and', ' and minor')
    name = name.replace(' &', ' and')
    
    return name.strip()

def clean_clinical_info(clinical):
    """Clean up clinical information"""
    if not clinical:
        return ""
    
    # Remove excessive pipes and clean up
    clinical = clinical.replace('|', ' - ')
    clinical = ' '.join(clinical.split())  # Remove extra whitespace
    
    return clinical

def main():
    # Load the complete extracted data
    complete_extracted = load_json_file("/Volumes/Internal Storage/Working Programs/EMG_flashcards/complete_flashcards_extracted.json")
    
    print("=== GENERATING FINAL MUSCLE FLASHCARDS ===\n")
    
    # Filter for actual muscle cards with complete information
    final_muscle_flashcards = []
    
    for card in complete_extracted:
        muscle = clean_muscle_name(card.get('muscle', ''))
        nerve = card.get('nerve', '').strip()
        roots = card.get('roots', '').strip()
        
        # Only include if it's a real muscle and has nerve/root info
        if (is_muscle_card(muscle) and nerve and roots):
            
            # Create clean flashcard
            flashcard = {
                "id": len(final_muscle_flashcards) + 1,
                "muscle": muscle,
                "nerve": nerve,
                "roots": roots,
                "clinical_info": clean_clinical_info(card.get('clinical_info', '')),
                "question_format": f"{muscle} - Nerve: ____, Roots: ____",
                "answer_nerve": nerve,
                "answer_roots": roots,
                "original_question": card.get('question', ''),
                "type": "muscle_nerve_root"
            }
            
            final_muscle_flashcards.append(flashcard)
    
    # Sort alphabetically by muscle name
    final_muscle_flashcards.sort(key=lambda x: x['muscle'].lower())
    
    # Re-number after sorting
    for i, card in enumerate(final_muscle_flashcards, 1):
        card['id'] = i
    
    print(f"Generated {len(final_muscle_flashcards)} complete muscle flashcards with nerve and root information")
    
    # Save to JSON
    output_json = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/final_complete_muscle_flashcards.json"
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(final_muscle_flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to: {output_json}")
    
    # Create detailed CSV
    csv_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/final_muscle_flashcards.csv"
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', 'Muscle', 'Nerve', 'Roots', 'Clinical Info', 'Question Format'])
        
        for card in final_muscle_flashcards:
            writer.writerow([
                card['id'],
                card['muscle'],
                card['nerve'],
                card['roots'],
                card['clinical_info'][:100] + '...' if len(card['clinical_info']) > 100 else card['clinical_info'],
                card['question_format']
            ])
    
    print(f"CSV saved to: {csv_file}")
    
    # Print first 10 examples
    print(f"\n=== FIRST 10 COMPLETE MUSCLE FLASHCARDS ===")
    for card in final_muscle_flashcards[:10]:
        print(f"\n{card['id']}. {card['muscle']}")
        print(f"   Nerve: {card['nerve']}")
        print(f"   Roots: {card['roots']}")
        if card['clinical_info']:
            print(f"   Clinical: {card['clinical_info'][:80]}...")
    
    # Show some statistics
    print(f"\n=== STATISTICS ===")
    muscles_with_clinical = sum(1 for card in final_muscle_flashcards if card['clinical_info'])
    print(f"Cards with clinical information: {muscles_with_clinical}/{len(final_muscle_flashcards)}")
    
    # Group by nerve roots to show distribution
    root_distribution = {}
    for card in final_muscle_flashcards:
        roots = card['roots']
        root_distribution[roots] = root_distribution.get(roots, 0) + 1
    
    print(f"\nMost common nerve root combinations:")
    for roots, count in sorted(root_distribution.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {roots}: {count} muscles")
    
    return final_muscle_flashcards

if __name__ == "__main__":
    cards = main()