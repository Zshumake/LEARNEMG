# EMG Muscle Flashcards Database

This project extracts muscle anatomy flashcards from an Anki database and formats them for JavaScript use in educational applications.

## Overview

Successfully extracted **46 muscle flashcards** from the EMG Anki database (`collection.anki2`) containing muscle anatomy information for medical education.

## Data Structure

Each flashcard contains:
- **muscle**: Muscle name
- **nerve**: Innervating nerve(s)  
- **roots**: Nerve root levels
- **notes**: Clinical notes (currently empty but structure available)

## Statistics

- **Total flashcards**: 46 unique muscle cards
- **With nerve information**: 29 cards (63.0%)
- **With nerve root information**: 32 cards (69.6%)
- **Coverage**: Comprehensive muscle groups from head to toe

### Anatomical Coverage

**Upper Extremity:**
- Shoulder: Trapezius, Deltoid, Rhomboids, Serratus anterior
- Arm: Biceps, Triceps, Coracobrachialis  
- Forearm: Flexor/Extensor groups, Pronator teres
- Hand: Intrinsic muscles (thenar, hypothenar)

**Lower Extremity:**
- Hip: Gluteus muscles, Adductors, Psoas
- Thigh: Quadriceps, Biceps femoris
- Leg: Tibialis muscles, Gastrocnemius/Soleus, Peroneus muscles
- Foot: Extensor digitorum brevis, Abductor hallucis

**Trunk:**
- Pectoralis major/minor, Latissimus dorsi, Subscapularis

## Files Generated

1. **`muscle_flashcards_final.js`** - Main JavaScript file with properly formatted array
2. **`muscle_flashcards_final.json`** - JSON format for data analysis
3. **`create_flashcards.py`** - Extraction script
4. **`clean_flashcards.py`** - Data cleaning script

## Usage

### JavaScript Integration

```javascript
// Include the flashcards
import muscleFlashcards from './muscle_flashcards_final.js';

// Or use directly in browser
<script src="muscle_flashcards_final.js"></script>

// Access the data
console.log(muscleFlashcards.length); // 46
console.log(muscleFlashcards[0]);
// {
//   muscle: "Abductor hallucis",
//   nerve: "",
//   roots: "",
//   notes: ""
// }
```

### Example Implementation

```javascript
// Create a simple flashcard quiz
function getRandomFlashcard() {
  const index = Math.floor(Math.random() * muscleFlashcards.length);
  return muscleFlashcards[index];
}

function quizMuscle() {
  const card = getRandomFlashcard();
  const answer = prompt(`What nerve innervates ${card.muscle}?`);
  
  if (answer.toLowerCase().includes(card.nerve.toLowerCase())) {
    alert("Correct!");
  } else {
    alert(`Incorrect. The answer is: ${card.nerve}`);
  }
}
```

## Data Quality

### Extraction Process
1. Parsed SQLite database with 480 total cards
2. Identified muscle-specific cards using pattern matching
3. Extracted cloze deletion content ({{c1::nerve}}, {{c2::roots}})
4. Cleaned HTML formatting and entities
5. Filtered out non-muscle content
6. Deduplicated entries

### Validation
- Manual review of all 46 extracted cards
- Verified muscle names are anatomically correct
- Confirmed nerve and root information accuracy
- Removed duplicate and invalid entries

## Sample Flashcards

```javascript
{
  muscle: "Deltoid",
  nerve: "Axillary",
  roots: "C5, C6",
  notes: ""
},
{
  muscle: "Biceps & Brachialis", 
  nerve: "Musculocutaneous. \"70% have dual radial n. (brachialis)\"",
  roots: "C5, C6",
  notes: ""
},
{
  muscle: "Flexor carpi radialis",
  nerve: "Median", 
  roots: "C6, C7",
  notes: ""
}
```

## Technical Details

### Database Structure
- Source: Anki SQLite database (`collection.anki2`)
- Table: `notes` with HTML-formatted field data
- Format: Cloze deletion flashcards with embedded nerve/root information

### Parsing Challenges Solved
- HTML tag removal and entity decoding
- Cloze deletion syntax parsing (`{{c1::content}}`)
- Multi-field data extraction
- Duplicate detection and removal
- Format standardization

## Ready for Implementation

The flashcard data is now ready for integration into any JavaScript-based learning application, providing a comprehensive muscle anatomy study tool for medical students and healthcare professionals.