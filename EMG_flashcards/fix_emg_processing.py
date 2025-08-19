#!/usr/bin/env python3
"""
Improved processing of z EMG.txt file with better cloze deletion handling
"""

import re
import json
from html import unescape

def clean_html_tags(text):
    """Remove HTML tags and clean up text"""
    if not text:
        return ""
    
    # Remove image tags completely
    text = re.sub(r'<img[^>]*>', '', text)
    
    # Remove HTML tags but keep content
    text = re.sub(r'<[^>]+>', ' ', text)
    
    # Decode HTML entities
    text = unescape(text)
    
    # Clean up whitespace and quotes
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'["""]', '"', text)
    text = text.strip().strip('"')
    
    return text

def extract_cloze_cards(question_text, answer_text):
    """Extract individual flashcards from cloze deletion format"""
    cards = []
    
    # Find all cloze deletions
    cloze_pattern = r'\{\{c(\d+)::([^}:]+)(?:::([^}]*))?\}\}'
    clozes = list(re.finditer(cloze_pattern, question_text))
    
    if not clozes:
        # No cloze deletions, return as regular Q&A
        clean_q = clean_html_tags(question_text)
        clean_a = clean_html_tags(answer_text)
        if len(clean_q) > 10 and len(clean_a) > 10:
            return [{
                'question': clean_q,
                'answer': clean_a,
                'type': 'Standard'
            }]
        return []
    
    # Create a card for each unique cloze number
    cloze_groups = {}
    for match in clozes:
        cloze_num = match.group(1)
        cloze_answer = match.group(2).strip()
        if cloze_num not in cloze_groups:
            cloze_groups[cloze_num] = []
        cloze_groups[cloze_num].append((match, cloze_answer))
    
    # Generate cards for each cloze group
    for cloze_num, group in cloze_groups.items():
        # Create question with blanks for this cloze number
        temp_question = question_text
        answers = []
        
        for match, answer in group:
            # Replace this specific cloze with blank
            temp_question = temp_question.replace(match.group(0), '[BLANK]', 1)
            answers.append(answer)
        
        # Clean the question and answer
        clean_question = clean_html_tags(temp_question)
        clean_answer_text = clean_html_tags(answer_text)
        
        # Create the final answer combining cloze answers and context
        final_answer = " / ".join(answers)
        if clean_answer_text and len(clean_answer_text) > 20:
            final_answer += f" | Context: {clean_answer_text[:200]}..."
        
        if len(clean_question) > 10:
            cards.append({
                'question': clean_question,
                'answer': final_answer,
                'type': 'Cloze'
            })
    
    return cards

def categorize_content(question, answer):
    """Categorize flashcard content"""
    combined = (question + " " + answer).lower()
    
    if any(word in combined for word in ['nerve:', 'roots:', 'innervation', 'muscle']):
        if any(word in combined for word in ['test', 'position', 'examiner']):
            return 'Muscle Testing', 'Intermediate'
        else:
            return 'Muscle Anatomy', 'Easy'
    elif any(word in combined for word in ['plexus', 'trunk', 'cord', 'division']):
        return 'Plexus Anatomy', 'Intermediate'
    elif any(word in combined for word in ['demyelination', 'axonal', 'cmap', 'snap', 'conduction']):
        return 'EMG Principles', 'Hard'
    elif any(word in combined for word in ['waveform', 'amplitude', 'latency']):
        return 'NCS Principles', 'Intermediate'
    else:
        return 'General EMG', 'Easy'

def process_improved():
    """Process the EMG text file with improved handling"""
    input_file = "/Volumes/Internal Storage/Working Programs/z EMG.txt"
    
    print("🔄 Processing z EMG.txt with improved algorithm...")
    
    flashcards = []
    card_id = 1
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for line_num, line in enumerate(lines, 1):
        if line.startswith('#') or line.strip() == '':
            continue
        
        # Split by tabs
        parts = line.strip().split('\t')
        if len(parts) < 2:
            continue
        
        question_raw = parts[0]
        answer_raw = parts[1]
        
        # Extract cards from this line
        extracted_cards = extract_cloze_cards(question_raw, answer_raw)
        
        for card_data in extracted_cards:
            category, difficulty = categorize_content(card_data['question'], card_data['answer'])
            
            flashcard = {
                'id': card_id,
                'question': card_data['question'][:400],  # Reasonable limit
                'answer': card_data['answer'][:400],
                'category': category,
                'type': card_data['type'],
                'difficulty': difficulty,
                'source_line': line_num
            }
            
            flashcards.append(flashcard)
            card_id += 1
        
        if line_num % 100 == 0:
            print(f"✅ Processed {line_num} lines, created {len(flashcards)} flashcards")
    
    print(f"\n🎉 Improved processing complete!")
    print(f"📊 Created {len(flashcards)} flashcards")
    
    return flashcards

def save_improved_flashcards(flashcards):
    """Save the improved flashcards"""
    output_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/improved_emg_flashcards.json"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    
    # Print statistics
    categories = {}
    difficulties = {}
    types = {}
    
    for card in flashcards:
        categories[card['category']] = categories.get(card['category'], 0) + 1
        difficulties[card['difficulty']] = difficulties.get(card['difficulty'], 0) + 1
        types[card['type']] = types.get(card['type'], 0) + 1
    
    print(f"\n💾 Saved to: {output_file}")
    print(f"\n📊 Improved Statistics:")
    print(f"Total flashcards: {len(flashcards)}")
    print("\nBy Category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")
    print("\nBy Difficulty:")
    for diff, count in sorted(difficulties.items()):
        print(f"  {diff}: {count}")
    print("\nBy Type:")
    for typ, count in sorted(types.items()):
        print(f"  {typ}: {count}")
    
    return output_file

if __name__ == "__main__":
    flashcards = process_improved()
    if flashcards:
        output_file = save_improved_flashcards(flashcards)
        print(f"\n✅ Improved flashcards ready: {output_file}")
    else:
        print("❌ No flashcards generated")