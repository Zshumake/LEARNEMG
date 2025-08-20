# 🖼️ Nerve Pathway Image Integration Guide

## Overview
The EMG/NCS pathway explorer now has a **two-column layout** with nerve pathway steps on the left and anatomical diagrams on the right.

## Current Status
✅ **Infrastructure Complete**: Image display system ready  
✅ **Layout**: Professional two-column responsive design  
✅ **Placeholders**: All 13 nerves show "ready for integration" status  
📋 **Ready for Images**: Base64 integration system fully functional  

## Supported Nerves
**Upper Extremity:**
- Median nerve (`median`)
- Ulnar nerve (`ulnar`) 
- Radial nerve (`radial`)
- Musculocutaneous nerve (`musculocutaneous`)
- Axillary nerve (`axillary`)
- Suprascapular nerve (`suprascapular`)

**Lower Extremity:**
- Femoral nerve (`femoral`)
- Tibial nerve (`tibial`)
- Peroneal nerve (`peroneal`)
- Sciatic nerve (`sciatic`)
- Obturator nerve (`obturator`)

**Thoracic/Respiratory:**
- Long thoracic nerve (`long_thoracic`)
- Phrenic nerve (`phrenic`)

## File Naming Convention
Expected format: `{nerve_name}_pathway_base64.txt`

Examples:
- `median_pathway_base64.txt`
- `ulnar_pathway_base64.txt`
- `radial_pathway_base64.txt`
- `sciatic_pathway_base64.txt`
- etc.

## Integration Methods

### Method 1: Using Helper Function (Recommended)
```javascript
// In browser console or as script
NCSApp.addNerveImage('median', 'iVBORw0KGgoAAAANSUhEUgAAA...');
```

### Method 2: Direct Assignment
```javascript
// Direct assignment to nerve data
NCSApp.nerveData.median.image = 'iVBORw0KGgoAAAANSUhEUgAAA...';
NCSApp.displayNerveImage('median'); // Refresh display
```

### Method 3: Python Integration Script
```python
import re

def integrate_nerve_image(nerve_name, base64_file_path, html_file_path):
    # Read base64 data
    with open(base64_file_path, 'r') as f:
        base64_data = f.read().strip()
    
    # Read HTML file
    with open(html_file_path, 'r') as f:
        html_content = f.read()
    
    # Replace the image placeholder
    pattern = f'{nerve_name}: ' + '{{' + '\\s*roots: "[^"]*",\\s*image: null,'
    replacement = f'{nerve_name}: ' + '{{' + '\\n                        roots: "{get_nerve_roots(nerve_name)}",\\n                        image: "{base64_data}",'
    
    updated_html = re.sub(pattern, replacement, html_content)
    
    # Write back to file
    with open(html_file_path, 'w') as f:
        f.write(updated_html)
    
    print(f"✅ Successfully integrated {nerve_name} image")

# Usage
integrate_nerve_image('median', 'median_pathway_base64.txt', 'ncs_emg_tool_v2.html')
```

## How It Works
1. **Selection**: User clicks nerve button
2. **Display**: Two-column layout shows:
   - Left: Interactive pathway steps
   - Right: Anatomical diagram (or ready placeholder)
3. **Responsive**: Stacks vertically on mobile devices
4. **Professional**: Clean styling with proper contrast and spacing

## Visual Result
- **With Image**: High-quality anatomical diagram with pathway overlay
- **Without Image**: Professional placeholder with nerve information and integration status
- **Mobile Friendly**: Responsive design adapts to screen size

## Current Infrastructure Features
✅ Two-column responsive layout  
✅ Base64 image support  
✅ Professional styling  
✅ Error handling  
✅ Mobile optimization  
✅ Helper functions for easy integration  
✅ Debug logging  
✅ Auto-refresh on image addition  

**Ready for your base64 nerve pathway images!** 🚀