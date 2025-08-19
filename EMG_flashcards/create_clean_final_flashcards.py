#!/usr/bin/env python3
"""
Create the final, clean version of muscle flashcards with properly formatted names
"""

import json
import re

def clean_muscle_name_final(muscle_name):
    """Final cleanup of muscle names"""
    if not muscle_name:
        return ""
    
    # Remove embedded nerve/root info from muscle names
    muscle_name = re.sub(r'Nerve:.*?Roots:.*?T1', '', muscle_name)
    muscle_name = re.sub(r'Nerve:.*?Roots:.*?S2', '', muscle_name)
    muscle_name = re.sub(r'Nerve:.*?Roots:.*?L5', '', muscle_name)
    muscle_name = re.sub(r'Nerve:.*?Roots:.*', '', muscle_name)
    
    # Clean up specific cases
    replacements = {
        'Adductor pollicisNerve: Ulnar nerveRoots: C8, T1': 'Adductor pollicis',
        'BrachioradialisNerve: RadialRoots: C5, C6': 'Brachioradialis',
        'Flexor digitorum superficialisNerve: MedianRoots: C7, C8, T1': 'Flexor digitorum superficialis',
        'Gluteus maximusNerve: Inferior glutealRoots: L5, S1, S2': 'Gluteus maximus',
        'Tibialis posteriorNerve: TibialRoots: L5, S1': 'Tibialis posterior',
        'Supra-spinatus and infra-spinatus and teres': 'Supraspinatus, Infraspinatus, and Teres minor',
        'Biceps and Brachialis': 'Biceps brachii and Brachialis',
        'Pectoralis major and minor': 'Pectoralis major and Pectoralis minor',
        'Rhomboid Major and minor': 'Rhomboid major and Rhomboid minor',
        'Gluteus medius/min and tensor fascia': 'Gluteus medius, Gluteus minimus, and Tensor fasciae latae',
        'Peroneus longus and brevis': 'Fibularis (Peroneus) longus and Fibularis (Peroneus) brevis',
        'Gastrocnemius and soleus': 'Gastrocnemius and Soleus',
        'Extensor digitorum longus / Indicis / digit minimi': 'Extensor digitorum, Extensor indicis, and Extensor digiti minimi'
    }
    
    for old, new in replacements.items():
        if old in muscle_name:
            muscle_name = new
            break
    
    # General cleanup
    muscle_name = muscle_name.strip()
    
    return muscle_name

def main():
    # Load the final flashcards
    with open("/Volumes/Internal Storage/Working Programs/EMG_flashcards/final_complete_muscle_flashcards.json", 'r') as f:
        flashcards = json.load(f)
    
    # Clean up muscle names and create final version
    clean_flashcards = []
    
    for card in flashcards:
        clean_muscle = clean_muscle_name_final(card['muscle'])
        
        if clean_muscle:  # Only include if we have a clean muscle name
            clean_card = {
                "id": len(clean_flashcards) + 1,
                "muscle": clean_muscle,
                "nerve": card['nerve'],
                "roots": card['roots'],
                "clinical_info": card['clinical_info'],
                "question": f"What nerve innervates {clean_muscle}?",
                "nerve_answer": card['nerve'],
                "root_question": f"What are the nerve roots for {clean_muscle}?",
                "root_answer": card['roots'],
                "combined_question": f"{clean_muscle} - Nerve: _____, Roots: _____",
                "type": "muscle_flashcard"
            }
            clean_flashcards.append(clean_card)
    
    # Sort alphabetically
    clean_flashcards.sort(key=lambda x: x['muscle'].lower())
    
    # Re-number
    for i, card in enumerate(clean_flashcards, 1):
        card['id'] = i
    
    # Save final clean version
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/FINAL_CLEAN_MUSCLE_FLASHCARDS.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(clean_flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"=== FINAL CLEAN MUSCLE FLASHCARDS ===")
    print(f"Created {len(clean_flashcards)} clean, complete muscle flashcards")
    print(f"Saved to: {output_file}")
    
    print(f"\n=== COMPLETE LIST OF MUSCLES WITH NERVE AND ROOT INFO ===")
    print("ID | Muscle | Nerve | Roots")
    print("-" * 80)
    
    for card in clean_flashcards:
        print(f"{card['id']:2d} | {card['muscle']:35s} | {card['nerve']:25s} | {card['roots']}")
    
    # Statistics
    print(f"\n=== STATISTICS ===")
    print(f"Total muscle flashcards: {len(clean_flashcards)}")
    
    with_clinical = sum(1 for card in clean_flashcards if card['clinical_info'])
    print(f"Cards with clinical information: {with_clinical}")
    
    # Nerve distribution
    nerve_counts = {}
    for card in clean_flashcards:
        nerve = card['nerve']
        nerve_counts[nerve] = nerve_counts.get(nerve, 0) + 1
    
    print(f"\nNerve distribution:")
    for nerve, count in sorted(nerve_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"  {nerve}: {count} muscle(s)")
    
    print(f"\n=== SAMPLE FLASHCARD FORMAT ===")
    sample = clean_flashcards[0]
    print(f"Question: {sample['question']}")
    print(f"Answer: {sample['nerve_answer']}")
    print(f"Question: {sample['root_question']}")
    print(f"Answer: {sample['root_answer']}")
    print(f"Combined: {sample['combined_question']}")
    print(f"Answers: {sample['nerve_answer']} | {sample['root_answer']}")
    
    return clean_flashcards

if __name__ == "__main__":
    main()