#!/usr/bin/env python3
"""
Process the z EMG.txt file to create clean, AI-readable flashcard format
Following the instructions provided to:
1. Remove HTML tags
2. Clean up cloze deletions
3. Simplify formatting
4. Create structured CSV/JSON output
"""

import re
import json
import csv
from html import unescape

def clean_html_tags(text):
    """Remove HTML tags from text while preserving content"""
    if not text:
        return ""
    
    # Remove image tags completely
    text = re.sub(r'<img[^>]*>', '', text)
    
    # Remove other HTML tags but keep content
    text = re.sub(r'<[^>]+>', ' ', text)
    
    # Decode HTML entities
    text = unescape(text)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text

def process_cloze_deletions(text):
    """Convert cloze deletions to clean Q&A format"""
    if not text:
        return "", []
    
    # Find all cloze deletions
    cloze_pattern = r'\{\{c(\d+)::([^}]+)(?:::([^}]*))?\}\}'
    clozes = re.findall(cloze_pattern, text)
    
    # Create clean question by replacing clozes with blanks
    clean_question = re.sub(cloze_pattern, '______', text)
    
    # Extract answers
    answers = []
    for cloze_num, answer, hint in clozes:
        # Clean the answer
        clean_answer = clean_html_tags(answer)
        answers.append({
            'number': cloze_num,
            'answer': clean_answer,
            'hint': hint if hint else ''
        })
    
    return clean_question, answers

def categorize_flashcard(question_text, answer_text):
    """Determine the category and difficulty of flashcard"""
    combined_text = (question_text + " " + answer_text).lower()
    
    # Determine category
    if any(word in combined_text for word in ['nerve:', 'roots:', 'muscle', 'innervation']):
        category = 'Muscle Anatomy'
    elif any(word in combined_text for word in ['demyelination', 'axonal', 'conduction', 'cmap', 'snap']):
        category = 'EMG Principles'
    elif any(word in combined_text for word in ['position', 'test', 'examiner']):
        category = 'Muscle Testing'
    elif any(word in combined_text for word in ['plexus', 'trunk', 'cord']):
        category = 'Plexus Anatomy'
    else:
        category = 'General EMG'
    
    # Determine difficulty based on complexity
    cloze_count = len(re.findall(r'\{\{c\d+::', question_text))
    if cloze_count <= 1:
        difficulty = 'Easy'
    elif cloze_count <= 2:
        difficulty = 'Intermediate' 
    else:
        difficulty = 'Hard'
    
    return category, difficulty

def process_emg_txt_file():
    """Process the main EMG txt file"""
    input_file = "/Volumes/Internal Storage/Working Programs/z EMG.txt"
    
    print("🔄 Processing z EMG.txt file...")
    
    flashcards = []
    card_id = 1
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"📄 Found {len(lines)} lines to process")
    
    for line_num, line in enumerate(lines, 1):
        if line.startswith('#') or line.strip() == '':
            continue
        
        # Split by tabs (Anki export format)
        parts = line.strip().split('\t')
        if len(parts) < 2:
            continue
        
        question_raw = parts[0]
        answer_raw = parts[1]
        
        # Process question
        clean_question, cloze_answers = process_cloze_deletions(question_raw)
        clean_question = clean_html_tags(clean_question)
        
        # Process answer
        clean_answer = clean_html_tags(answer_raw)
        
        # Skip if question or answer is too short
        if len(clean_question.strip()) < 5 or len(clean_answer.strip()) < 5:
            continue
        
        # If there are cloze deletions, create separate cards for each
        if cloze_answers:
            for cloze in cloze_answers:
                # Create question with specific cloze highlighted
                specific_question = f"{clean_question.replace('______', f'[{cloze["answer"]}]', 1)} - What goes in the blank?"
                specific_question = specific_question.replace('______', '[BLANK]')
                
                category, difficulty = categorize_flashcard(specific_question, clean_answer)
                
                flashcard = {
                    'id': card_id,
                    'question': specific_question[:500],  # Limit length
                    'answer': f"{cloze['answer']} - {clean_answer[:300]}",  # Include context
                    'category': category,
                    'type': 'Cloze',
                    'difficulty': difficulty,
                    'source_line': line_num,
                    'tags': f"{category.lower().replace(' ', '_')};{difficulty.lower()}"
                }
                
                flashcards.append(flashcard)
                card_id += 1
        else:
            # Regular Q&A card
            category, difficulty = categorize_flashcard(clean_question, clean_answer)
            
            flashcard = {
                'id': card_id,
                'question': clean_question[:500],  # Limit length
                'answer': clean_answer[:500],
                'category': category,
                'type': 'Standard',
                'difficulty': difficulty,
                'source_line': line_num,
                'tags': f"{category.lower().replace(' ', '_')};{difficulty.lower()}"
            }
            
            flashcards.append(flashcard)
            card_id += 1
        
        if line_num % 50 == 0:
            print(f"✅ Processed {line_num} lines, created {len(flashcards)} flashcards")
    
    print(f"\n🎉 Processing complete!")
    print(f"📊 Created {len(flashcards)} clean flashcards from {len(lines)} lines")
    
    return flashcards

def save_flashcards(flashcards):
    """Save flashcards in multiple formats"""
    base_dir = "/Volumes/Internal Storage/Working Programs/EMG_flashcards"
    
    # Save as JSON
    json_file = f"{base_dir}/clean_emg_flashcards.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    print(f"💾 Saved JSON: {json_file}")
    
    # Save as CSV
    csv_file = f"{base_dir}/clean_emg_flashcards.csv"
    if flashcards:
        with open(csv_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=flashcards[0].keys())
            writer.writeheader()
            writer.writerows(flashcards)
        print(f"💾 Saved CSV: {csv_file}")
    
    # Print summary statistics
    categories = {}
    difficulties = {}
    types = {}
    
    for card in flashcards:
        categories[card['category']] = categories.get(card['category'], 0) + 1
        difficulties[card['difficulty']] = difficulties.get(card['difficulty'], 0) + 1
        types[card['type']] = types.get(card['type'], 0) + 1
    
    print("\n📊 Summary Statistics:")
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
    
    return json_file, csv_file

if __name__ == "__main__":
    try:
        flashcards = process_emg_txt_file()
        if flashcards:
            json_file, csv_file = save_flashcards(flashcards)
            print(f"\n✅ Success! Clean flashcard data ready for AI processing:")
            print(f"   JSON: {json_file}")
            print(f"   CSV: {csv_file}")
        else:
            print("❌ No flashcards were generated")
    except Exception as e:
        print(f"💥 Error processing file: {e}")
        import traceback
        traceback.print_exc()