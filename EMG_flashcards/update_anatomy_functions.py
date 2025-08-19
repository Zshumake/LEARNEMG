#!/usr/bin/env python3
"""
Update the getUpperExtremityMuscles and getLowerExtremityMuscles functions 
to use Preston & Shapiro nerve root assignments
"""

def create_upper_extremity_function():
    """Create updated upper extremity function with Preston & Shapiro roots"""
    return '''        NCSApp.getUpperExtremityMuscles = function() {
            // Nerve root assignments per Preston & Shapiro
            return {
                shoulder: [
                    { name: "Rhomboid Major/Minor", nerve: "Dorsal scapular nerve", roots: "C5", cords: "Nerve root direct branch", actions: "Scapular retraction, downward rotation" },
                    { name: "Supraspinatus", nerve: "Suprascapular nerve", roots: "C5, C6", cords: "Upper trunk", actions: "Shoulder abduction (first 15°)" },
                    { name: "Infraspinatus", nerve: "Suprascapular nerve", roots: "C5, C6", cords: "Upper trunk", actions: "External rotation of shoulder" },
                    { name: "Deltoid", nerve: "Axillary nerve", roots: "C5, C6", cords: "Posterior cord", actions: "Shoulder abduction, flexion, extension" },
                    { name: "Trapezius (Upper)", nerve: "Accessory nerve (XI) + C3, C4", roots: "C3, C4", cords: "N/A (cranial nerve)", actions: "Elevates scapula, upward rotation, extends neck" },
                    { name: "Serratus Anterior", nerve: "Long thoracic nerve", roots: "C5, C6, C7", cords: "Nerve root direct branches", actions: "Scapular protraction, upward rotation" }
                ],
                arm: [
                    { name: "Biceps Brachii", nerve: "Musculocutaneous nerve", roots: "C5, C6", cords: "Lateral cord", actions: "Elbow flexion, forearm supination" },
                    { name: "Triceps", nerve: "Radial nerve", roots: "C6, C7, C8", cords: "Posterior cord", actions: "Elbow extension" },
                    { name: "Brachioradialis", nerve: "Radial nerve", roots: "C5, C6", cords: "Posterior cord", actions: "Elbow flexion in mid-position" },
                    { name: "Pectoralis Major", nerve: "Lateral & medial pectoral nerves", roots: "C5, C6, C7, C8, T1", cords: "Lateral & medial cords", actions: "Shoulder adduction, horizontal adduction" }
                ],
                forearm: [
                    { name: "Pronator Teres", nerve: "Median nerve", roots: "C6, C7", cords: "Lateral & medial cords", actions: "Forearm pronation, elbow flexion" },
                    { name: "Flexor Carpi Radialis", nerve: "Median nerve", roots: "C6, C7", cords: "Lateral & medial cords", actions: "Wrist flexion, radial deviation" },
                    { name: "Flexor Pollicis Longus", nerve: "Anterior interosseous nerve (median)", roots: "C7, C8", cords: "Lateral & medial cords", actions: "Thumb flexion at IP joint" },
                    { name: "Flexor Carpi Ulnaris", nerve: "Ulnar nerve", roots: "C7, C8, T1", cords: "Medial cord", actions: "Wrist flexion, ulnar deviation" },
                    { name: "Extensor Carpi Radialis", nerve: "Radial nerve", roots: "C6, C7", cords: "Posterior cord", actions: "Wrist extension, radial deviation" },
                    { name: "Extensor Digitorum Communis", nerve: "Posterior interosseous nerve (radial)", roots: "C7, C8", cords: "Posterior cord", actions: "Finger extension at MCP joints" },
                    { name: "Extensor Carpi Ulnaris", nerve: "Posterior interosseous nerve (radial)", roots: "C7, C8", cords: "Posterior cord", actions: "Wrist extension, ulnar deviation" },
                    { name: "Extensor Indicis Proprius", nerve: "Posterior interosseous nerve (radial)", roots: "C7, C8", cords: "Posterior cord", actions: "Index finger extension" }
                ],
                hand: [
                    { name: "Abductor Pollicis Brevis", nerve: "Median nerve (recurrent branch)", roots: "C8, T1", cords: "Medial cord", actions: "Thumb abduction" },
                    { name: "Flexor Digitorum Profundus (V)", nerve: "Ulnar nerve", roots: "C8, T1", cords: "Medial cord", actions: "5th finger DIP flexion" },
                    { name: "Abductor Digiti Minimi", nerve: "Ulnar nerve (deep branch)", roots: "C8, T1", cords: "Medial cord", actions: "5th finger abduction" },
                    { name: "First Dorsal Interosseous", nerve: "Ulnar nerve (deep branch)", roots: "C8, T1", cords: "Medial cord", actions: "Index finger abduction from middle finger" },
                    { name: "Palmar Interossei", nerve: "Ulnar nerve (deep branch)", roots: "C8, T1", cords: "Medial cord", actions: "Finger adduction toward middle finger" }
                ]
            };
        };'''

def create_lower_extremity_function():
    """Create updated lower extremity function with Preston & Shapiro roots"""
    return '''        NCSApp.getLowerExtremityMuscles = function() {
            // Nerve root assignments per Preston & Shapiro
            return {
                gluteal: [
                    { name: "Gluteus Maximus", nerve: "Inferior gluteal nerve", roots: "L5, S1", actions: "Hip extension, lateral rotation, upper fibers assist in abduction" },
                    { name: "Gluteus Medius", nerve: "Superior gluteal nerve", roots: "L4, L5, S1", actions: "Hip abduction, pelvic stabilization during walking" },
                    { name: "Tensor Fascia Latae", nerve: "Superior gluteal nerve", roots: "L4, L5, S1", actions: "Hip abduction, internal rotation, knee stabilization via IT band" }
                ],
                thigh: [
                    { name: "Iliopsoas", nerve: "Femoral nerve + direct lumbar branches", roots: "L2, L3, L4", actions: "Hip flexion, lumbar spine stabilization" },
                    { name: "Rectus Femoris", nerve: "Femoral nerve", roots: "L2, L3, L4", actions: "Hip flexion, knee extension" },
                    { name: "Vastus Lateralis", nerve: "Femoral nerve", roots: "L2, L3, L4", actions: "Knee extension" },
                    { name: "Vastus Medialis", nerve: "Femoral nerve", roots: "L2, L3, L4", actions: "Knee extension, patellar stabilization" },
                    { name: "Adductor Longus", nerve: "Obturator nerve", roots: "L2, L3, L4", actions: "Hip adduction, hip flexion assistance" },
                    { name: "Medial Hamstrings", nerve: "Sciatic nerve (tibial division)", roots: "L4, L5, S1", actions: "Knee flexion, hip extension" },
                    { name: "Lateral Hamstrings", nerve: "Sciatic nerve (tibial division)", roots: "L5, S1, S2", actions: "Knee flexion, hip extension" }
                ],
                leg: [
                    { name: "Tibialis Anterior", nerve: "Deep peroneal nerve", roots: "L4, L5", actions: "Ankle dorsiflexion, foot inversion" },
                    { name: "Extensor Hallucis Longus", nerve: "Deep peroneal nerve", roots: "L5, S1", actions: "Great toe extension, ankle dorsiflexion" },
                    { name: "Peroneus Longus", nerve: "Superficial peroneal nerve", roots: "L5, S1", actions: "Foot eversion, plantar flexion assistance" },
                    { name: "Tibialis Posterior", nerve: "Tibial nerve", roots: "L5, S1", actions: "Foot inversion, plantar flexion, arch support" },
                    { name: "Medial Gastrocnemius", nerve: "Tibial nerve", roots: "S1, S2", actions: "Plantar flexion, knee flexion" },
                    { name: "Soleus", nerve: "Tibial nerve", roots: "S1, S2", actions: "Plantar flexion, postural stability" }
                ],
                foot: [
                    { name: "Abductor Hallucis Brevis", nerve: "Medial plantar nerve", roots: "L5, S1, S2", actions: "Great toe abduction" },
                    { name: "Abductor Digiti Minimi Pedis", nerve: "Lateral plantar nerve", roots: "L5, S1, S2", actions: "5th toe abduction" },
                    { name: "Flexor Digitorum Brevis", nerve: "Medial plantar nerve", roots: "S1, S2", actions: "Toe flexion at PIP joints" },
                    { name: "Plantar Interossei", nerve: "Lateral plantar nerve", roots: "S2, S3", actions: "Toe adduction toward 2nd toe" }
                ]
            };
        };'''

def update_html_file():
    """Update the HTML file with the new muscle functions"""
    html_file = "/Volumes/Internal Storage/Working Programs/ncs_emg_tool_v2.html"
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and replace the upper extremity function
    upper_start = content.find("        NCSApp.getUpperExtremityMuscles = function() {")
    if upper_start != -1:
        upper_end = content.find("        };", upper_start) + 10
        if upper_end != -1:
            new_upper = create_upper_extremity_function()
            content = content[:upper_start] + new_upper + content[upper_end:]
            print("✅ Updated upper extremity muscle function")
    
    # Find and replace the lower extremity function
    lower_start = content.find("        NCSApp.getLowerExtremityMuscles = function() {")
    if lower_start != -1:
        lower_end = content.find("        };", lower_start) + 10
        if lower_end != -1:
            new_lower = create_lower_extremity_function()
            content = content[:lower_start] + new_lower + content[lower_end:]
            print("✅ Updated lower extremity muscle function")
    
    # Write the updated content back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

if __name__ == "__main__":
    print("🔄 Updating anatomy functions with Preston & Shapiro nerve roots...")
    
    if update_html_file():
        print("\n🎉 Anatomy functions updated successfully!")
        print("\nChanges made:")
        print("  • Upper extremity muscles now use Preston & Shapiro nerve roots")
        print("  • Lower extremity muscles now use Preston & Shapiro nerve roots")
        print("  • All muscle listings include proper attribution")
    else:
        print("❌ Failed to update anatomy functions")