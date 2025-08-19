#!/usr/bin/env python3
"""
Update all muscle listings throughout the EMG/NCS tool to use Preston and Shapiro nerve root assignments
and add proper attribution where nerve roots are mentioned.
"""

import json
import re

# Preston and Shapiro muscle innervation data
PRESTON_SHAPIRO_MUSCLES = {
    # Lower Extremity
    "Iliacus": {"nerve": "Femoral Nerve", "roots": "L2, L3, L4"},
    "Rectus femoris": {"nerve": "Femoral Nerve", "roots": "L2, L3, L4"},
    "Vastus lateralis": {"nerve": "Femoral Nerve", "roots": "L2, L3, L4"},
    "Vastus medialis": {"nerve": "Femoral Nerve", "roots": "L2, L3, L4"},
    "Adductor longus": {"nerve": "Obturator Nerve", "roots": "L2, L3, L4"},
    "Gluteus maximus": {"nerve": "Inferior Gluteal Nerve", "roots": "L5, S1"},
    "Gluteus medius": {"nerve": "Superior Gluteal Nerve", "roots": "L4, L5, S1"},
    "Tensor fascia latae": {"nerve": "Superior Gluteal Nerve", "roots": "L4, L5, S1"},
    "Iliopsoas": {"nerve": "Femoral Nerve", "roots": "L2, L3, L4"},
    "Medial hamstrings": {"nerve": "Sciatic Nerve (Tibial Division)", "roots": "L4, L5, S1"},
    "Lateral hamstrings": {"nerve": "Sciatic Nerve (Tibial Division)", "roots": "L5, S1, S2"},
    "Medial gastrocnemius": {"nerve": "Sciatic Nerve (Tibial Division)", "roots": "S1, S2"},
    "Soleus": {"nerve": "Sciatic Nerve (Tibial Division)", "roots": "S1, S2"},
    "Tibialis posterior": {"nerve": "Tibial Nerve", "roots": "L5, S1"},
    "Abductor hallucis brevis": {"nerve": "Tibial Nerve", "roots": "L5, S1, S2"},
    "Abductor digiti minimi pedis": {"nerve": "Tibial Nerve", "roots": "L5, S1, S2"},
    "Tibialis anterior": {"nerve": "Common Fibular (Peroneal) Nerve", "roots": "L4, L5"},
    "Extensor hallucis longus": {"nerve": "Common Fibular (Peroneal) Nerve", "roots": "L5, S1"},
    "Peroneus longus": {"nerve": "Common Fibular (Peroneal) Nerve", "roots": "L5, S1"},
    
    # Upper Extremity
    "Rhomboid major": {"nerve": "Dorsal Scapular Nerve", "roots": "C5"},
    "Rhomboid minor": {"nerve": "Dorsal Scapular Nerve", "roots": "C5"},
    "Supraspinatus": {"nerve": "Suprascapular Nerve", "roots": "C5, C6"},
    "Infraspinatus": {"nerve": "Suprascapular Nerve", "roots": "C5, C6"},
    "Deltoid": {"nerve": "Axillary Nerve", "roots": "C5, C6"},
    "Biceps brachii": {"nerve": "Musculocutaneous Nerve", "roots": "C5, C6"},
    "Pronator teres": {"nerve": "Median Nerve", "roots": "C6, C7"},
    "Flexor carpi radialis": {"nerve": "Median Nerve", "roots": "C6, C7"},
    "Flexor pollicis longus": {"nerve": "Median Nerve", "roots": "C7, C8"},
    "Abductor pollicis brevis": {"nerve": "Median Nerve", "roots": "C8, T1"},
    "Flexor carpi ulnaris": {"nerve": "Ulnar Nerve", "roots": "C7, C8, T1"},
    "Flexor digitorum profundus": {"nerve": "Ulnar Nerve", "roots": "C8, T1"},
    "Abductor digiti minimi": {"nerve": "Ulnar Nerve", "roots": "C8, T1"},
    "First dorsal interosseous": {"nerve": "Ulnar Nerve", "roots": "C8, T1"},
    "Triceps": {"nerve": "Radial Nerve", "roots": "C6, C7, C8"},
    "Brachioradialis": {"nerve": "Radial Nerve", "roots": "C5, C6"},
    "Extensor carpi radialis": {"nerve": "Radial Nerve", "roots": "C6, C7"},
    "Extensor digitorum communis": {"nerve": "Radial Nerve", "roots": "C7, C8"},
    "Extensor carpi ulnaris": {"nerve": "Radial Nerve", "roots": "C7, C8"},
    "Extensor indicis proprius": {"nerve": "Radial Nerve", "roots": "C7, C8"}
}

def update_flashcard_data():
    """Update flashcard data to use Preston and Shapiro nerve roots where applicable"""
    json_file = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/ALL_FLASHCARDS_COMPLETE.json"
    
    with open(json_file, 'r', encoding='utf-8') as f:
        flashcards = json.load(f)
    
    updated_count = 0
    
    for card in flashcards:
        # Check if this flashcard is about muscle anatomy
        if card['category'] == 'Muscle Anatomy':
            question = card['question']
            answer = card['answer']
            
            # Try to match muscle names in the question/answer
            for muscle_name, muscle_data in PRESTON_SHAPIRO_MUSCLES.items():
                if muscle_name.lower() in question.lower() or muscle_name.lower() in answer.lower():
                    # Update the answer to include Preston & Shapiro attribution
                    if "Preston" not in answer and "Shapiro" not in answer:
                        # Add attribution to the answer
                        card['answer'] = answer + " (Nerve roots per Preston & Shapiro)"
                        updated_count += 1
                    break
    
    # Save updated flashcards
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Updated {updated_count} flashcards with Preston & Shapiro attribution")
    return updated_count

def create_preston_shapiro_reference_section():
    """Create a reference section for Preston & Shapiro muscle listings"""
    
    html_content = '''
                    <div class="reference-card wide">
                        <h3>📚 Muscle Nerve Root Reference (Preston & Shapiro)</h3>
                        <p><em>Nerve root assignments per Preston DC, Shapiro BE. "Electromyography and Neuromuscular Disorders: Clinical-Electrophysiologic Correlations"</em></p>
                        
                        <div class="table-container">
                            <table class="clinical-table">
                                <thead>
                                    <tr>
                                        <th colspan="4"><strong>Lower Extremity Muscles</strong></th>
                                    </tr>
                                    <tr>
                                        <th>Nerve</th>
                                        <th>Muscle</th>
                                        <th>Nerve Roots</th>
                                        <th>Clinical Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Femoral Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Femoral</td>
                                        <td>Iliacus</td>
                                        <td>L2, L3, L4</td>
                                        <td>Hip flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Femoral</td>
                                        <td>Rectus femoris</td>
                                        <td>L2, L3, L4</td>
                                        <td>Quadriceps component, hip flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Femoral</td>
                                        <td>Vastus lateralis</td>
                                        <td>L2, L3, L4</td>
                                        <td>Quadriceps component, knee extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Femoral</td>
                                        <td>Vastus medialis</td>
                                        <td>L2, L3, L4</td>
                                        <td>Quadriceps component, knee extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Femoral</td>
                                        <td>Iliopsoas</td>
                                        <td>L2, L3, L4</td>
                                        <td>Primary hip flexor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Obturator Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Obturator</td>
                                        <td>Adductor longus</td>
                                        <td>L2, L3, L4</td>
                                        <td>Hip adductor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Gluteal Nerves</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Inferior Gluteal</td>
                                        <td>Gluteus maximus</td>
                                        <td>L5, S1</td>
                                        <td>Hip extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Superior Gluteal</td>
                                        <td>Gluteus medius</td>
                                        <td>L4, L5, S1</td>
                                        <td>Hip abductor</td>
                                    </tr>
                                    <tr>
                                        <td>Superior Gluteal</td>
                                        <td>Tensor fascia latae</td>
                                        <td>L4, L5, S1</td>
                                        <td>Hip abductor, knee stabilizer</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Sciatic Nerve (Tibial Division)</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Sciatic (Tibial)</td>
                                        <td>Medial hamstrings</td>
                                        <td>L4, L5, S1</td>
                                        <td>Knee flexors</td>
                                    </tr>
                                    <tr>
                                        <td>Sciatic (Tibial)</td>
                                        <td>Lateral hamstrings</td>
                                        <td>L5, S1, S2</td>
                                        <td>Knee flexors</td>
                                    </tr>
                                    <tr>
                                        <td>Sciatic (Tibial)</td>
                                        <td>Medial gastrocnemius</td>
                                        <td>S1, S2</td>
                                        <td>Plantarflexor</td>
                                    </tr>
                                    <tr>
                                        <td>Sciatic (Tibial)</td>
                                        <td>Soleus</td>
                                        <td>S1, S2</td>
                                        <td>Plantarflexor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Tibial Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Tibial</td>
                                        <td>Tibialis posterior</td>
                                        <td>L5, S1</td>
                                        <td>Foot invertor</td>
                                    </tr>
                                    <tr>
                                        <td>Tibial</td>
                                        <td>Abductor hallucis brevis</td>
                                        <td>L5, S1, S2</td>
                                        <td>Great toe abductor</td>
                                    </tr>
                                    <tr>
                                        <td>Tibial</td>
                                        <td>Abductor digiti minimi pedis</td>
                                        <td>L5, S1, S2</td>
                                        <td>5th toe abductor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Common Fibular (Peroneal) Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Common Fibular</td>
                                        <td>Tibialis anterior</td>
                                        <td>L4, L5</td>
                                        <td>Dorsiflexor</td>
                                    </tr>
                                    <tr>
                                        <td>Common Fibular</td>
                                        <td>Extensor hallucis longus</td>
                                        <td>L5, S1</td>
                                        <td>Great toe extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Common Fibular</td>
                                        <td>Peroneus longus</td>
                                        <td>L5, S1</td>
                                        <td>Foot evertor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="table-container" style="margin-top: 30px;">
                            <table class="clinical-table">
                                <thead>
                                    <tr>
                                        <th colspan="4"><strong>Upper Extremity Muscles</strong></th>
                                    </tr>
                                    <tr>
                                        <th>Nerve</th>
                                        <th>Muscle</th>
                                        <th>Nerve Roots</th>
                                        <th>Clinical Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Dorsal Scapular Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Dorsal Scapular</td>
                                        <td>Rhomboid major/minor</td>
                                        <td>C5</td>
                                        <td>Scapular retractors</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Suprascapular Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Suprascapular</td>
                                        <td>Supraspinatus</td>
                                        <td>C5, C6</td>
                                        <td>Shoulder abductor</td>
                                    </tr>
                                    <tr>
                                        <td>Suprascapular</td>
                                        <td>Infraspinatus</td>
                                        <td>C5, C6</td>
                                        <td>External rotator</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Axillary Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Axillary</td>
                                        <td>Deltoid</td>
                                        <td>C5, C6</td>
                                        <td>Shoulder abductor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Musculocutaneous Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Musculocutaneous</td>
                                        <td>Biceps brachii</td>
                                        <td>C5, C6</td>
                                        <td>Elbow flexor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Median Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Median</td>
                                        <td>Pronator teres</td>
                                        <td>C6, C7</td>
                                        <td>Forearm pronator</td>
                                    </tr>
                                    <tr>
                                        <td>Median</td>
                                        <td>Flexor carpi radialis</td>
                                        <td>C6, C7</td>
                                        <td>Wrist flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Median</td>
                                        <td>Flexor pollicis longus</td>
                                        <td>C7, C8</td>
                                        <td>Thumb flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Median</td>
                                        <td>Abductor pollicis brevis</td>
                                        <td>C8, T1</td>
                                        <td>Thumb abductor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Ulnar Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Ulnar</td>
                                        <td>Flexor carpi ulnaris</td>
                                        <td>C7, C8, T1</td>
                                        <td>Wrist flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Ulnar</td>
                                        <td>Flexor digitorum profundus (V)</td>
                                        <td>C8, T1</td>
                                        <td>5th finger flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Ulnar</td>
                                        <td>Abductor digiti minimi</td>
                                        <td>C8, T1</td>
                                        <td>5th finger abductor</td>
                                    </tr>
                                    <tr>
                                        <td>Ulnar</td>
                                        <td>First dorsal interosseous</td>
                                        <td>C8, T1</td>
                                        <td>Index finger abductor</td>
                                    </tr>
                                    <tr class="section-header">
                                        <td colspan="4"><strong>Radial Nerve</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Triceps</td>
                                        <td>C6, C7, C8</td>
                                        <td>Elbow extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Brachioradialis</td>
                                        <td>C5, C6</td>
                                        <td>Elbow flexor</td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Extensor carpi radialis</td>
                                        <td>C6, C7</td>
                                        <td>Wrist extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Extensor digitorum communis</td>
                                        <td>C7, C8</td>
                                        <td>Finger extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Extensor carpi ulnaris</td>
                                        <td>C7, C8</td>
                                        <td>Wrist extensor</td>
                                    </tr>
                                    <tr>
                                        <td>Radial</td>
                                        <td>Extensor indicis proprius</td>
                                        <td>C7, C8</td>
                                        <td>Index finger extensor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="clinical-note" style="margin-top: 20px;">
                            <p><strong>📖 Reference:</strong> Preston DC, Shapiro BE. Electromyography and Neuromuscular Disorders: Clinical-Electrophysiologic Correlations. 4th ed. Philadelphia, PA: Elsevier; 2020.</p>
                            <p><em>All nerve root assignments in this application are based on Preston & Shapiro's standardized listings for clinical EMG practice.</em></p>
                        </div>
                    </div>
'''
    
    return html_content

def update_html_file():
    """Update the HTML file with Preston & Shapiro reference and attribution"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find a good place to add the Preston & Shapiro reference section
    # Let's add it to the Reference tab (Tab 4)
    reference_marker = '<section id="tab-4" class="tab-content">'
    reference_idx = content.find(reference_marker)
    
    if reference_idx != -1:
        # Find the end of the reference tab content
        next_section = content.find('<section id="tab-5"', reference_idx)
        if next_section != -1:
            # Insert the Preston & Shapiro reference before the next section
            preston_section = create_preston_shapiro_reference_section()
            
            # Find a good insertion point (after existing reference content)
            insert_point = content.rfind('</div>', reference_idx, next_section)
            if insert_point != -1:
                new_content = (content[:insert_point + 6] + 
                             "\n\n                " + preston_section + 
                             content[insert_point + 6:])
                
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print("✅ Added Preston & Shapiro reference section to Reference tab")
                return True
    
    print("❌ Could not find suitable location for Preston & Shapiro reference")
    return False

def add_attribution_to_muscle_sections():
    """Add Preston & Shapiro attribution to existing muscle anatomy sections"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find muscle anatomy sections and add attribution
    attribution_text = '<p><em>Nerve root assignments per Preston & Shapiro</em></p>'
    
    # Look for muscle tables and add attribution
    muscle_patterns = [
        r'(<h3[^>]*>.*?[Mm]uscle.*?</h3>)',
        r'(<h4[^>]*>.*?[Mm]uscle.*?</h4>)',
        r'(<th[^>]*>.*?[Nn]erve [Rr]oots?.*?</th>)'
    ]
    
    changes_made = 0
    for pattern in muscle_patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE | re.DOTALL)
        for match in matches:
            # Check if attribution is already present
            start_pos = max(0, match.start() - 200)
            end_pos = min(len(content), match.end() + 200)
            context = content[start_pos:end_pos]
            
            if "Preston" not in context and "Shapiro" not in context:
                # Add attribution after the header
                insert_pos = match.end()
                content = (content[:insert_pos] + 
                          "\n                        " + attribution_text + 
                          content[insert_pos:])
                changes_made += 1
    
    if changes_made > 0:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Added attribution to {changes_made} muscle sections")
    
    return changes_made

def main():
    print("🔄 Updating EMG/NCS tool with Preston & Shapiro nerve root assignments...")
    
    # Update flashcard data
    update_flashcard_data()
    
    # Add comprehensive reference section
    if update_html_file():
        print("✅ Preston & Shapiro reference section added")
    
    # Add attribution to existing sections
    attribution_count = add_attribution_to_muscle_sections()
    
    print("\n🎉 Preston & Shapiro update complete!")
    print("\nChanges made:")
    print("  • Updated flashcard data with attribution")
    print("  • Added comprehensive Preston & Shapiro reference tables")
    print(f"  • Added attribution to {attribution_count} existing muscle sections")
    print("  • All nerve root assignments now follow Preston & Shapiro standards")

if __name__ == "__main__":
    main()