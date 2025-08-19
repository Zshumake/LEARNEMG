#!/usr/bin/env python3
"""
Add missing flashcard functions to make the flashcard system work
"""

import re

def add_missing_flashcard_functions():
    """Add all missing flashcard functions to the NCSApp object"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔧 Adding missing flashcard functions...")
    
    # Find where to insert the functions (after NCSApp object definition)
    insertion_point = content.find('window.NCSApp = NCSApp;')
    if insertion_point == -1:
        print("❌ Could not find NCSApp object")
        return False
    
    # Move back to insert before window assignment
    insert_before = content.rfind('};', 0, insertion_point)
    if insert_before == -1:
        print("❌ Could not find insertion point")
        return False
    
    # Add the missing flashcard functions
    flashcard_functions = '''
        // Flashcard Functions
        NCSApp.updateFlashcard = function() {
            const activeCards = this.activeFlashcards || this.flashcardData;
            if (!activeCards || activeCards.length === 0) {
                console.error('No flashcard data available');
                return;
            }
            
            const card = activeCards[this.currentFlashcardIndex];
            
            // Update question side
            const questionElement = document.getElementById('flashcard-question');
            if (questionElement) {
                questionElement.innerHTML = `
                    <div class="question-content">
                        <h3>Question ${this.currentFlashcardIndex + 1}</h3>
                        <p>${card.question}</p>
                    </div>
                `;
            }
            
            // Update answer side
            const answerElement = document.getElementById('flashcard-answer');
            if (answerElement) {
                answerElement.innerHTML = `
                    <div class="answer-content">
                        <h3>Answer</h3>
                        <p>${card.answer}</p>
                        <small class="category-tag">${card.category}</small>
                    </div>
                `;
            }
            
            // Update card counter
            const counterElement = document.getElementById('card-counter');
            if (counterElement) {
                counterElement.textContent = `${this.currentFlashcardIndex + 1} / ${activeCards.length}`;
            }
        };
        
        NCSApp.nextCard = function() {
            const activeCards = this.activeFlashcards || this.flashcardData;
            if (this.currentFlashcardIndex < activeCards.length - 1) {
                this.currentFlashcardIndex++;
            } else {
                this.currentFlashcardIndex = 0; // Loop back to first card
            }
            this.isFlashcardFlipped = false;
            this.updateFlashcard();
            this.updateFlashcardStats();
        };
        
        NCSApp.previousCard = function() {
            const activeCards = this.activeFlashcards || this.flashcardData;
            if (this.currentFlashcardIndex > 0) {
                this.currentFlashcardIndex--;
            } else {
                this.currentFlashcardIndex = activeCards.length - 1; // Loop to last card
            }
            this.isFlashcardFlipped = false;
            this.updateFlashcard();
            this.updateFlashcardStats();
        };
        
        NCSApp.flipCard = function() {
            const cardElement = document.getElementById('flashcard');
            if (cardElement) {
                this.isFlashcardFlipped = !this.isFlashcardFlipped;
                if (this.isFlashcardFlipped) {
                    cardElement.classList.add('flipped');
                } else {
                    cardElement.classList.remove('flipped');
                }
            }
        };
        
        NCSApp.shuffleCards = function() {
            if (!this.flashcardData || this.flashcardData.length === 0) return;
            
            // Fisher-Yates shuffle
            const cards = [...this.flashcardData];
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            
            this.activeFlashcards = cards;
            this.currentFlashcardIndex = 0;
            this.isFlashcardFlipped = false;
            this.updateFlashcard();
            this.updateFlashcardStats();
        };
        
        NCSApp.resetProgress = function() {
            this.currentFlashcardIndex = 0;
            this.isFlashcardFlipped = false;
            this.activeFlashcards = null; // Reset to show all cards
            this.flashcardStats.correct = 0;
            this.updateFlashcard();
            this.updateFlashcardStats();
        };
        
        NCSApp.updateFlashcardStats = function() {
            const activeCards = this.activeFlashcards || this.flashcardData;
            const statsElement = document.getElementById('flashcard-stats');
            if (statsElement && activeCards) {
                statsElement.innerHTML = `
                    <span>Cards: ${activeCards.length}</span>
                    <span>Current: ${this.currentFlashcardIndex + 1}</span>
                `;
            }
        };
        
        NCSApp.filterCards = function(category) {
            if (!category || category === 'all') {
                this.activeFlashcards = null; // Show all cards
            } else {
                this.activeFlashcards = this.flashcardData.filter(card => 
                    card.category === category
                );
            }
            this.currentFlashcardIndex = 0;
            this.isFlashcardFlipped = false;
            this.updateFlashcard();
            this.updateFlashcardStats();
        };

    '''
    
    # Insert the functions
    new_content = content[:insert_before] + flashcard_functions + content[insert_before:]
    
    # Also remove duplicate initialization blocks
    init_pattern = r'(\s*// Initialize flashcards when DOM is ready[\s\S]*?}\s*\);)'
    matches = list(re.finditer(init_pattern, new_content))
    
    if len(matches) > 1:
        # Remove all but the first initialization block
        for match in reversed(matches[1:]):
            new_content = new_content[:match.start()] + new_content[match.end():]
        print(f"✅ Removed {len(matches) - 1} duplicate initialization blocks")
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Added all missing flashcard functions")
    return True

if __name__ == "__main__":
    if add_missing_flashcard_functions():
        print("\n🎉 FLASHCARD FUNCTIONS ADDED SUCCESSFULLY!")
        print("\nYour flashcard system should now work properly:")
        print("  ✅ updateFlashcard() function added")
        print("  ✅ nextCard() and previousCard() functions added") 
        print("  ✅ flipCard() function added")
        print("  ✅ shuffleCards() and resetProgress() functions added")
        print("  ✅ Duplicate initialization blocks removed")
    else:
        print("\n❌ Failed to add flashcard functions")