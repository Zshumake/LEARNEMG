#!/usr/bin/env python3
"""
EMG Flashcard Processing Script
Processes the complete z EMG.txt Anki export and converts it to JavaScript format
"""

import re
import html
import json

def clean_html(html_text):
    """Remove HTML tags and clean up text"""
    if not html_text:
        return ""
    
    # Remove image tags
    html_text = re.sub(r'<img[^>]*>', '', html_text)
    
    # Remove div tags but keep content
    html_text = re.sub(r'</?div[^>]*>', ' ', html_text)
    
    # Remove other HTML tags but keep content
    html_text = re.sub(r'<[^>]+>', '', html_text)
    
    # Decode HTML entities
    html_text = html.unescape(html_text)
    
    # Clean up whitespace
    html_text = ' '.join(html_text.split())
    
    return html_text.strip()

def extract_cloze_answer(text):
    """Extract the answer from cloze deletion format {{c1::answer}}"""
    if not text:
        return ""
    
    # Find all cloze deletions
    cloze_matches = re.findall(r'\{\{c\d+::(.*?)(?:::.*?)?\}\}', text)
    if cloze_matches:
        # Clean each match
        cleaned_matches = [clean_html(match.strip()) for match in cloze_matches]
        return ', '.join(cleaned_matches)
    
    return ""

def create_cloze_question(text):
    """Convert cloze format to fill-in-the-blank format"""
    if not text:
        return ""
    
    # Replace cloze deletions with blanks
    question = re.sub(r'\{\{c\d+::(.*?)(?:::.*?)?\}\}', '______', text)
    question = clean_html(question)
    
    return question

def determine_category(front_text, back_text):
    """Determine the category based on content"""
    combined_text = (front_text + " " + back_text).lower()
    
    if any(word in combined_text for word in ['muscle', 'nerve', 'root', 'innervation', 'trapezius', 'deltoid', 'biceps', 'triceps']):
        return "Muscle Anatomy"
    elif any(word in combined_text for word in ['demyelination', 'axonal', 'conduction', 'amplitude', 'latency', 'velocity']):
        return "EMG Terminology"
    elif any(word in combined_text for word in ['sunderland', 'classification', 'neuropraxia', 'axonotmesis', 'neurotmesis']):
        return "Nerve Classifications"
    elif any(word in combined_text for word in ['clinical', 'test', 'position', 'patient', 'examiner']):
        return "Clinical Testing"
    elif any(word in combined_text for word in ['fibrillation', 'sharp wave', 'fasciculation', 'muap']):
        return "EMG Findings"
    elif any(word in combined_text for word in ['h-reflex', 'f-wave', 'cmap', 'snap']):
        return "NCS Techniques"
    else:
        return "General EMG"

def determine_type(front_text, back_text):
    """Determine the flashcard type"""
    combined_text = (front_text + " " + back_text).lower()
    
    if any(word in combined_text for word in ['nerve:', 'innervation', 'root']):
        return "muscle_innervation"
    elif any(word in combined_text for word in ['clinical', 'test', 'muscle test']):
        return "clinical_test"
    elif any(word in combined_text for word in ['definition', 'classification', 'terminology']):
        return "terminology"
    else:
        return "clinical_concept"

def determine_difficulty(front_text, back_text):
    """Determine difficulty based on content complexity"""
    combined_text = (front_text + " " + back_text).lower()
    
    # Count complex terms
    complex_terms = ['sunderland', 'wallerian', 'axonotmesis', 'neurotmesis', 'neuropraxia', 
                    'collateral sprouting', 'temporal dispersion', 'phase cancellation']
    
    complex_count = sum(1 for term in complex_terms if term in combined_text)
    
    if complex_count >= 2:
        return "Hard"
    elif complex_count >= 1 or len(combined_text.split()) > 50:
        return "Medium"
    else:
        return "Easy"

def determine_location(front_text, back_text):
    """Determine anatomical location"""
    combined_text = (front_text + " " + back_text).lower()
    
    upper_limb_muscles = ['trapezius', 'deltoid', 'biceps', 'triceps', 'brachialis', 'flexor', 'extensor', 
                         'pronator', 'supinator', 'interosseous', 'pollicis', 'carpi']
    lower_limb_muscles = ['gluteus', 'quadriceps', 'hamstring', 'gastrocnemius', 'tibialis', 
                         'peroneus', 'soleus', 'iliopsoas']
    
    if any(muscle in combined_text for muscle in upper_limb_muscles):
        return "Upper extremity"
    elif any(muscle in combined_text for muscle in lower_limb_muscles):
        return "Lower extremity"
    else:
        return "General"

def extract_muscle_info(front_text):
    """Extract muscle name from front text"""
    # Clean the front text
    cleaned = clean_html(front_text)
    
    # Look for muscle name patterns
    # First try to find muscle name in bold tags
    muscle_match = re.search(r'<b>(.*?)</b>', front_text)
    if muscle_match:
        return clean_html(muscle_match.group(1)).strip()
    
    # Look for cloze deletion with muscle name
    cloze_match = re.search(r'\{\{c\d+::(.*?)::', front_text)
    if cloze_match:
        return clean_html(cloze_match.group(1)).strip()
    
    # Extract first meaningful part before "Nerve:" or other keywords
    parts = cleaned.split()
    if len(parts) > 0:
        # Take first few words as muscle name
        muscle_words = []
        for word in parts:
            if word.lower() in ['nerve:', 'root:', 'roots:']:
                break
            muscle_words.append(word)
        
        if muscle_words:
            return ' '.join(muscle_words[:3])  # Limit to first 3 words
    
    return "EMG Concept"

def extract_nerve_info(front_text, back_text):
    """Extract nerve information"""
    combined_text = front_text + " " + back_text
    
    # Look for nerve information in cloze format first
    nerve_cloze = re.search(r'Nerve:\s*\{\{c\d+::(.*?)(?:::.*?)?\}\}', combined_text, re.IGNORECASE)
    if nerve_cloze:
        return clean_html(nerve_cloze.group(1).strip())
    
    # Look for nerve information in regular format
    nerve_match = re.search(r'Nerve:\s*([^<\n\}]+)', combined_text, re.IGNORECASE)
    if nerve_match:
        return clean_html(nerve_match.group(1).strip())
    
    return ""

def extract_roots_info(front_text, back_text):
    """Extract nerve root information"""
    combined_text = front_text + " " + back_text
    
    # Look for root information in cloze format first
    roots_cloze = re.search(r'Root[s]?:\s*\{\{c\d+::(.*?)(?:::.*?)?\}\}', combined_text, re.IGNORECASE)
    if roots_cloze:
        return clean_html(roots_cloze.group(1).strip())
    
    # Look for root information in regular format
    roots_match = re.search(r'Root[s]?:\s*([^<\n\}]+)', combined_text, re.IGNORECASE)
    if roots_match:
        return clean_html(roots_match.group(1).strip())
    
    return ""

def process_emg_file(file_path):
    """Process the EMG file and extract all flashcards"""
    flashcards = []
    card_id = 1
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Split into lines and process each flashcard
        lines = content.split('\n')
        
        for line in lines[3:]:  # Skip header lines
            if not line.strip() or line.startswith('#'):
                continue
                
            # Split by tab
            parts = line.split('\t')
            if len(parts) < 2:
                continue
                
            front_text = parts[0].strip('"')
            back_text = parts[1].strip('"') if len(parts) > 1 else ""
            
            if not front_text:
                continue
            
            # Extract information
            muscle = extract_muscle_info(front_text)
            nerve = extract_nerve_info(front_text, back_text)
            roots = extract_roots_info(front_text, back_text)
            
            # Create question and answer
            cloze_answer = extract_cloze_answer(front_text)
            cleaned_front = clean_html(front_text)
            cleaned_back = clean_html(back_text)
            
            if cloze_answer:
                # This is a cloze card
                cloze_question = create_cloze_question(front_text)
                answer = cloze_answer
                
                # Generate appropriate question based on content
                if nerve:
                    question = f"What nerve innervates the {muscle}?"
                elif "nerve" in cleaned_front.lower():
                    question = f"What is the nerve innervation for {muscle}?"
                elif "root" in cleaned_front.lower():
                    question = f"What are the nerve roots for {muscle}?"
                else:
                    question = f"Fill in the blanks: {cloze_question}"
            else:
                # Regular Q&A card
                question = cleaned_front if cleaned_front else f"What do you know about {muscle}?"
                answer = cleaned_back if cleaned_back else "No answer provided"
                cloze_question = question
            
            # Clinical context from back text
            clinical_context = clean_html(back_text)
            
            # Determine properties
            category = determine_category(front_text, back_text)
            difficulty = determine_difficulty(front_text, back_text)
            card_type = determine_type(front_text, back_text)
            location = determine_location(front_text, back_text)
            
            flashcard = {
                "id": card_id,
                "muscle": muscle,
                "nerve": nerve,
                "roots": roots,
                "question": question,
                "answer": answer,
                "cloze_question": cloze_question,
                "clinical_context": clinical_context,
                "category": category,
                "difficulty": difficulty,
                "type": card_type,
                "anatomical_location": location
            }
            
            flashcards.append(flashcard)
            card_id += 1
            
    except Exception as e:
        print(f"Error processing file: {e}")
        return []
    
    return flashcards

def generate_javascript_file(flashcards, output_path):
    """Generate the JavaScript file with all flashcards"""
    
    js_content = """const comprehensiveEMGFlashcards = [
"""
    
    for i, card in enumerate(flashcards):
        js_content += "  {\n"
        js_content += f"    id: {card['id']},\n"
        js_content += f"    muscle: {json.dumps(card['muscle'])},\n"
        js_content += f"    nerve: {json.dumps(card['nerve'])},\n"
        js_content += f"    roots: {json.dumps(card['roots'])},\n"
        js_content += f"    question: {json.dumps(card['question'])},\n"
        js_content += f"    answer: {json.dumps(card['answer'])},\n"
        js_content += f"    cloze_question: {json.dumps(card['cloze_question'])},\n"
        js_content += f"    clinical_context: {json.dumps(card['clinical_context'])},\n"
        js_content += f"    category: {json.dumps(card['category'])},\n"
        js_content += f"    difficulty: {json.dumps(card['difficulty'])},\n"
        js_content += f"    type: {json.dumps(card['type'])},\n"
        js_content += f"    anatomical_location: {json.dumps(card['anatomical_location'])}\n"
        js_content += "  }"
        
        if i < len(flashcards) - 1:
            js_content += ","
        js_content += "\n"
    
    js_content += """];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = comprehensiveEMGFlashcards;
}

// Make available globally
if (typeof window !== 'undefined') {
  window.comprehensiveEMGFlashcards = comprehensiveEMGFlashcards;
}

console.log(`Loaded ${comprehensiveEMGFlashcards.length} comprehensive EMG flashcards`);
"""
    
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(js_content)

def main():
    input_file = "/Users/zacharyshumaker/Desktop/Working Programs/z EMG.txt"
    output_file = "/Users/zacharyshumaker/Desktop/Working Programs/comprehensive_emg_flashcards.js"
    
    print("Processing EMG flashcards...")
    flashcards = process_emg_file(input_file)
    
    print(f"Processed {len(flashcards)} flashcards")
    
    # Display some statistics
    categories = {}
    for card in flashcards:
        cat = card['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nCategory breakdown:")
    for cat, count in categories.items():
        print(f"  {cat}: {count} cards")
    
    print(f"\nGenerating JavaScript file: {output_file}")
    generate_javascript_file(flashcards, output_file)
    
    print("Processing complete!")

if __name__ == "__main__":
    main()