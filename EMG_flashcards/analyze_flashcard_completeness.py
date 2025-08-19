#!/usr/bin/env python3
"""
Analyze completeness of flashcards and identify missing information
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

def analyze_completeness():
    # Load all flashcard files
    complete_extracted = load_json_file("/Volumes/Internal Storage/Working Programs/EMG_flashcards/complete_flashcards_extracted.json")
    final_json = load_json_file("/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards_final.json")
    all_complete = load_json_file("/Volumes/Internal Storage/Working Programs/EMG_flashcards/all_flashcards_complete.json")
    
    print("=== FLASHCARD COMPLETENESS ANALYSIS ===\n")
    
    print(f"Complete extracted from Anki DB: {len(complete_extracted)} cards")
    print(f"Final JSON file: {len(final_json)} cards")
    print(f"All complete JSON: {len(all_complete)} cards")
    
    # Analyze the complete extracted data
    print(f"\n=== ANALYSIS OF COMPLETE EXTRACTED DATA ({len(complete_extracted)} cards) ===")
    
    muscle_cards_only = []
    missing_nerve = []
    missing_roots = []
    missing_clinical = []
    complete_cards = []
    
    for card in complete_extracted:
        # Skip EMG theory/technique cards (these don't have muscle/nerve info)
        if (card.get('muscle', '') and 
            not any(keyword in card.get('muscle', '').lower() for keyword in 
                   ['emg', 'ncs', 'cmap', 'snap', 'recruitment', 'muap', 'amplitude', 'latency', 
                    'conduction', 'nerve conduction', 'radiculopathy', 'sunderland', 'axonal', 
                    'demyelination', 'fibrillation', 'fasciculation', 'myotonic', 'f-wave', 'h-reflex'])):
            
            muscle_cards_only.append(card)
            
            if not card.get('nerve', '').strip():
                missing_nerve.append(card)
            
            if not card.get('roots', '').strip():
                missing_roots.append(card)
                
            if not card.get('clinical_info', '').strip():
                missing_clinical.append(card)
            
            if (card.get('nerve', '').strip() and 
                card.get('roots', '').strip() and 
                card.get('clinical_info', '').strip()):
                complete_cards.append(card)
    
    print(f"Muscle-specific cards: {len(muscle_cards_only)}")
    print(f"Cards missing nerve info: {len(missing_nerve)}")
    print(f"Cards missing root info: {len(missing_roots)}")
    print(f"Cards missing clinical info: {len(missing_clinical)}")
    print(f"Completely filled cards: {len(complete_cards)}")
    
    # Show examples of missing nerve info
    print(f"\n=== CARDS MISSING NERVE INFORMATION ===")
    for card in missing_nerve[:10]:
        print(f"- {card.get('muscle', 'Unknown muscle')} (ID: {card.get('id', 'N/A')})")
    
    print(f"\n=== CARDS MISSING ROOT INFORMATION ===")
    for card in missing_roots[:10]:
        print(f"- {card.get('muscle', 'Unknown muscle')} (ID: {card.get('id', 'N/A')})")
    
    # Generate complete muscle flashcards with all available information
    complete_muscle_flashcards = []
    
    for card in muscle_cards_only:
        if card.get('muscle', '').strip():
            flashcard = {
                "id": card.get('id'),
                "muscle": card.get('muscle', '').strip(),
                "nerve": card.get('nerve', '').strip(),
                "roots": card.get('roots', '').strip(),
                "clinical_info": card.get('clinical_info', '').strip(),
                "question": card.get('question', '').strip(),
                "answers": card.get('answers', []),
                "original_cloze": card.get('original_cloze', '').strip()
            }
            complete_muscle_flashcards.append(flashcard)
    
    # Sort by muscle name
    complete_muscle_flashcards.sort(key=lambda x: x['muscle'].lower())
    
    # Save the complete muscle flashcards
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/complete_muscle_flashcards.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(complete_muscle_flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== COMPLETE MUSCLE FLASHCARDS ===")
    print(f"Generated {len(complete_muscle_flashcards)} complete muscle flashcards")
    print(f"Saved to: {output_file}")
    
    # Create a CSV summary for easy review
    csv_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/muscle_flashcards_summary.csv"
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', 'Muscle', 'Nerve', 'Roots', 'Has Clinical Info', 'Complete'])
        
        for card in complete_muscle_flashcards:
            has_clinical = 'Yes' if card['clinical_info'] else 'No'
            is_complete = 'Yes' if (card['nerve'] and card['roots']) else 'No'
            writer.writerow([
                card['id'],
                card['muscle'],
                card['nerve'],
                card['roots'],
                has_clinical,
                is_complete
            ])
    
    print(f"CSV summary saved to: {csv_file}")
    
    # Show examples of complete cards
    print(f"\n=== EXAMPLES OF COMPLETE CARDS ===")
    for card in complete_cards[:5]:
        print(f"\nMuscle: {card.get('muscle', 'N/A')}")
        print(f"Nerve: {card.get('nerve', 'N/A')}")
        print(f"Roots: {card.get('roots', 'N/A')}")
        print(f"Clinical: {card.get('clinical_info', 'N/A')[:100]}...")
    
    return complete_muscle_flashcards

if __name__ == "__main__":
    complete_cards = analyze_completeness()