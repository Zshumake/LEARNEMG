#!/usr/bin/env python3
"""Generate a concise presenter cheat sheet PDF for the 5-case EMG lecture."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)

import os

OUTPUT = os.path.join(os.path.dirname(__file__), "presenter-cheat-sheet.pdf")

# Colors
TEAL = HexColor("#0d9488")
DARK = HexColor("#0f172a")
RED = HexColor("#dc2626")
BLUE = HexColor("#1e40af")
PURPLE = HexColor("#7c3aed")
GREEN = HexColor("#059669")
AMBER = HexColor("#d97706")
GRAY = HexColor("#64748b")
LIGHT_BG = HexColor("#f8fafc")
LIGHT_RED = HexColor("#fef2f2")
LIGHT_BLUE = HexColor("#eff6ff")
LIGHT_GREEN = HexColor("#f0fdf4")
LIGHT_PURPLE = HexColor("#faf5ff")
LIGHT_TEAL = HexColor("#f0fdfa")

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle('CaseTitle', parent=styles['Heading1'], fontSize=14, textColor=DARK, spaceAfter=4, spaceBefore=12, fontName='Helvetica-Bold'))
styles.add(ParagraphStyle('Dx', parent=styles['Normal'], fontSize=12, textColor=RED, fontName='Helvetica-BoldOblique', spaceAfter=6))
styles.add(ParagraphStyle('SectionHead', parent=styles['Normal'], fontSize=9, textColor=TEAL, fontName='Helvetica-Bold', spaceAfter=2, spaceBefore=6, leading=11))
styles.add(ParagraphStyle('MyBullet', parent=styles['Normal'], fontSize=8, leftIndent=12, bulletIndent=4, spaceAfter=1, leading=10, fontName='Helvetica'))
styles.add(ParagraphStyle('BulletBold', parent=styles['Normal'], fontSize=8, leftIndent=12, bulletIndent=4, spaceAfter=1, leading=10, fontName='Helvetica-Bold'))
styles.add(ParagraphStyle('SmallNote', parent=styles['Normal'], fontSize=7, textColor=GRAY, spaceAfter=2, leading=9, fontName='Helvetica-Oblique'))
styles.add(ParagraphStyle('KeyFinding', parent=styles['Normal'], fontSize=8.5, textColor=RED, fontName='Helvetica-Bold', spaceAfter=2, leading=11))
styles.add(ParagraphStyle('Footer', parent=styles['Normal'], fontSize=7, textColor=GRAY, alignment=TA_CENTER))
styles.add(ParagraphStyle('MainTitle', parent=styles['Title'], fontSize=18, textColor=DARK, spaceAfter=4))
styles.add(ParagraphStyle('SubTitle', parent=styles['Normal'], fontSize=10, textColor=GRAY, alignment=TA_CENTER, spaceAfter=12))

def bullet(text, bold=False):
    style = styles['BulletBold'] if bold else styles['MyBullet']
    return Paragraph(f"&#8226; {text}", style)

def key(text):
    return Paragraph(text, styles['KeyFinding'])

def section(text):
    return Paragraph(text, styles['SectionHead'])

def note(text):
    return Paragraph(text, styles['SmallNote'])

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=HexColor("#e2e8f0"), spaceAfter=4, spaceBefore=4)

def make_table(data, col_widths=None):
    """Small compact table."""
    t = Table(data, colWidths=col_widths, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 7),
        ('LEADING', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), HexColor("#f1f5f9")),
        ('GRID', (0, 0), (-1, -1), 0.4, HexColor("#cbd5e1")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    return t

story = []

# Title page
story.append(Paragraph("Localizing the Lesion", styles['MainTitle']))
story.append(Paragraph("Presenter Cheat Sheet -- 5 Cases", styles['SubTitle']))
story.append(hr())

# ======== CASE 1 ========
story.append(Paragraph("CASE 1: Severe Shoulder Pain Followed by Weakness", styles['CaseTitle']))
story.append(Paragraph("Parsonage-Turner Syndrome (Neuralgic Amyotrophy)", styles['Dx']))
story.append(note("35M painter | No trauma | Viral illness 3 weeks ago | Pain preceded weakness by 10 days"))

story.append(section("DIFFERENTIALS & RULE-OUTS"))
story.append(bullet("C5-C6 Radiculopathy: paraspinals normal + patchy pattern (not single root)"))
story.append(bullet("Upper Trunk Plexopathy: trunk = all muscles in that division; PTS = patchy individual nerves"))
story.append(bullet("Rotator Cuff Tear: no neurogenic EMG findings in a tear"))
story.append(bullet("Mononeuritis Multiplex: vasculitis + systemic sx; PTS = viral prodrome + shoulder predilection"))

story.append(section("PHYSICAL EXAM -- WHY"))
story.append(bullet("Deltoid 2/5: axillary nerve inflamed"))
story.append(bullet("Infraspinatus 2/5: suprascapular nerve inflamed"))
story.append(bullet("Biceps 3/5: musculocutaneous nerve inflamed (less severe = patchy)"))
story.append(bullet("<b>Hand 5/5</b>: C8-T1 spared -- PTS hits shoulder girdle, not hand", bold=True))
story.append(bullet("Biceps reflex 1+: C5-C6 efferent limb weakened; Triceps 2+: C7 spared"))
story.append(bullet("Neg Spurling's: no radiculopathy (PTS = plexus/nerve level)"))

story.append(section("NCS -- WHY"))
story.append(bullet("Median/Ulnar/Radial SNAPs normal: these nerves are NOT affected"))
story.append(key("LABC 5 uV (ABNORMAL): sensory branch of musculocutaneous. Abnormal = post-ganglionic. If C6 root, LABC would be normal (DRG intact)."))
story.append(bullet("Axillary motor 1.5 mV: axonal loss in axillary nerve"))
story.append(bullet("Musculocutaneous motor 2.8 mV: partial axonal loss"))
story.append(bullet("Median/Ulnar motor normal: C8-T1 territory intact"))

story.append(section("EMG -- WHY"))
story.append(bullet("Deltoid 3+ fibs: axillary nerve -- orphaned fibers fibrillate"))
story.append(bullet("Infraspinatus 3+ fibs: suprascapular nerve"))
story.append(bullet("Serratus Anterior 2+ fibs: long thoracic nerve (most commonly hit in PTS)"))
story.append(bullet("Biceps 2+ fibs: musculocutaneous"))
story.append(key("Pronator Teres NORMAL: C6-C7 median muscle SPARED = patchy (not root pattern)"))
story.append(key("C5-C6 Paraspinals NORMAL: post-ganglionic. Root lesion would show paraspinal fibs."))
story.append(note("30% bilateral. 70-80% recover by 2-3 years. AIN variant exists."))

story.append(hr())

# ======== CASE 2 ========
story.append(Paragraph("CASE 2: Hand Weakness After a Fall", styles['CaseTitle']))
story.append(Paragraph("Klumpke's Palsy (Lower Trunk Plexopathy)", styles['Dx']))
story.append(note("24M bike messenger | Grabbed tree branch = upward traction | 4 weeks out, progressive clawing"))

story.append(section("DIFFERENTIALS & RULE-OUTS"))
story.append(bullet("C8-T1 Radiculopathy: MAC + Ulnar SNAPs abnormal (post-ganglionic). In radic, SNAPs = normal."))
story.append(bullet("Combined Ulnar + Median Neuropathy: doesn't explain MAC territory loss or EIP (radial) weakness"))
story.append(bullet("TOS: chronic/positional, not acute traction"))
story.append(bullet("T1 Root Avulsion: NO Horner's = not T1 root"))

story.append(section("PHYSICAL EXAM -- WHY"))
story.append(key("Thenar AND hypothenar atrophy: crosses median/ulnar boundary = proximal to where they split"))
story.append(bullet("Claw hand: lumbricals/interossei (ulnar) weak = MCP hyperextension + IP flexion"))
story.append(bullet("APB/FDI/ADM 2/5: all C8-T1 from different nerves"))
story.append(bullet("Triceps/Deltoid 5/5: C5-C7 upper trunk spared"))
story.append(key("NO Horner's: sympathetic chain at T1 root intact = post-ganglionic trunk lesion"))

story.append(section("NCS -- WHY"))
story.append(bullet("Median sensory (index) normal: C6-C7 lateral cord territory"))
story.append(bullet("Ulnar sensory 5 uV: C8-T1 lower trunk damaged, Wallerian degeneration"))
story.append(key("MAC 4 uV (ABNORMAL): THE MONEY TEST. Abnormal = post-ganglionic. In C8 radic, MAC = normal (DRG intact)."))
story.append(bullet("Both Median motor (APB) 3.5 + Ulnar motor (ADM) 2.5 LOW: C8-T1 fibers through lower trunk"))

story.append(section("EMG -- WHY"))
story.append(bullet("APB + FDI + ADM all 2+ fibs: C8-T1 across median + ulnar nerves"))
story.append(bullet("EIP 1+ fibs: radial C7-C8 -- C8 fibers pass through lower trunk"))
story.append(bullet("Biceps/Deltoid normal: upper trunk spared"))
story.append(key("C8-T1 Paraspinals NORMAL: post-ganglionic (trunk, not root)"))

story.append(PageBreak())

# ======== CASE 3 ========
story.append(Paragraph("CASE 3: Flail Arm After Motorcycle Accident", styles['CaseTitle']))
story.append(Paragraph("Traumatic C5-T1 Root Avulsions", styles['Dx']))
story.append(note("62M construction worker | MVA + clavicle fracture | 6 months out | Complete arm paralysis"))

story.append(section("DIFFERENTIALS & RULE-OUTS"))
story.append(bullet("Cord injury: would be bilateral or have long tract signs (legs)"))
story.append(bullet("MMN: distal-predominant + purely motor; this has sensory loss"))
story.append(bullet("Diabetic polyneuropathy: symmetric stocking-glove; this is unilateral"))

story.append(section("PHYSICAL EXAM -- WHY"))
story.append(bullet("0-1/5 throughout: ALL motor axons C5-T1 destroyed at root level"))
story.append(key("Horner's (ptosis, miosis, anhidrosis): T1 sympathetic fibers avulsed BEFORE leaving spinal canal"))
story.append(bullet("Winged scapula: long thoracic (C5-C7) roots all avulsed"))
story.append(bullet("All reflexes absent: both afferent + efferent limbs disrupted"))

story.append(section("NCS -- THE PATHOGNOMONIC PATTERN"))
story.append(key("ALL SNAPs PRESERVED (Median 28, Ulnar 22, Radial 25) despite COMPLETE ANESTHESIA"))
story.append(Paragraph("<b>Why?</b> DRG sits OUTSIDE spinal canal. Avulsion = tear BETWEEN DRG and cord. Peripheral sensory axon still connected to DRG cell body = no Wallerian degeneration. Brain gets no signal, but the peripheral nerve still works.", styles['Bullet']))
story.append(bullet("ALL motor responses ABSENT: motor neurons in anterior horn. Axons torn from cell bodies = Wallerian degeneration."))

story.append(section("EMG -- WHY"))
story.append(bullet("Every C5-T1 muscle: 3+ fibs, no MUAPs (completely denervated)"))
story.append(key("Cervical Paraspinals C5-T1: 3+ fibs. Posterior ramus branches at root level BEFORE plexus. Abnormal = root-level lesion."))
story.append(note("The triad: preserved SNAPs + abnormal paraspinals + Horner's = root avulsion. Prognosis very poor."))

story.append(hr())

# ======== CASE 4 ========
story.append(Paragraph("CASE 4: Sudden Groin Pain and Buckling Knee", styles['CaseTitle']))
story.append(Paragraph("Femoral Neuropathy from Retroperitoneal Hematoma", styles['Dx']))
story.append(note("68F on warfarin | INR 4.2 | Sudden onset after coughing | Hgb drop 12.5 to 9.8 | TIME-SENSITIVE"))

story.append(section("DIFFERENTIALS & RULE-OUTS"))
story.append(bullet("L3-L4 Radiculopathy: adductors normal (obturator shares roots) + paraspinals normal"))
story.append(bullet("Diabetic Amyotrophy: non-diabetic; amyotrophy = subacute bilateral"))
story.append(bullet("Lumbar Plexopathy: would affect BOTH femoral + obturator. Adductors normal."))
story.append(bullet("Femoral at Inguinal Lig: iliopsoas WEAK = lesion is PROXIMAL to ligament"))

story.append(section("PHYSICAL EXAM -- WHY"))
story.append(bullet("Hip held in flexion (psoas sign): hematoma in iliacus. Extension compresses it = pain."))
story.append(key("Iliopsoas 2/5: femoral nerve branches to iliopsoas arise WITHIN iliac fossa, BEFORE inguinal ligament. Weak = lesion is in retroperitoneum."))
story.append(bullet("Quad 1/5: main femoral motor to quad is damaged"))
story.append(key("Adductors 5/5 (NORMAL): obturator nerve (L2-L4) is SEPARATE from femoral. Normal = not radic/plexopathy."))
story.append(bullet("Patellar reflex absent: femoral efferent limb destroyed"))

story.append(section("NCS -- WHY"))
story.append(bullet("Sural/Superficial Fibular normal: sciatic territory separate from femoral"))
story.append(key("Saphenous ABSENT: sensory branch of femoral. Absent = post-ganglionic. In L3-L4 radic, saphenous = normal (DRG intact)."))
story.append(bullet("Femoral motor ABSENT right, 6.5 left: confirms unilateral femoral nerve lesion"))

story.append(section("EMG -- WHY"))
story.append(key("Iliopsoas 2+ fibs: branches arise PROXIMAL to inguinal lig = lesion in iliac fossa/retroperitoneum"))
story.append(bullet("All quad components 3+ fibs, no MUAPs: complete femoral denervation"))
story.append(bullet("Adductor Longus NORMAL: obturator = separate. Rules out L2-L4 radic + plexopathy."))
story.append(bullet("Glut Med NORMAL: rules out plexopathy"))
story.append(bullet("Paraspinals NORMAL: rules out radiculopathy"))
story.append(note("Treatment: reverse anticoagulation, CT scan, possible surgical decompression"))

story.append(PageBreak())

# ======== CASE 5 ========
story.append(Paragraph("CASE 5: Foot Drop + Hamstring Weakness After Surgery", styles['CaseTitle']))
story.append(Paragraph("Sciatic Nerve Injury at Hip (Post-THA)", styles['Dx']))
story.append(note("67F | R total hip arthroplasty 6 weeks ago | Difficult anatomy | Awoke with foot drop + knee weakness"))

story.append(section("DIFFERENTIALS & RULE-OUTS"))
story.append(bullet("Common Fibular at Fibular Head: tibial muscles (gastroc, tib post) + hamstrings would be NORMAL"))
story.append(bullet("L5-S1 Radiculopathy: glutes + paraspinals would be abnormal"))
story.append(bullet("Lumbosacral Plexopathy: glutes would be abnormal (arise from plexus PROXIMAL to sciatic)"))
story.append(bullet("Cauda Equina: bilateral + saddle anesthesia + bowel/bladder"))

story.append(section("PHYSICAL EXAM -- WHY"))
story.append(key("Glut Med 5/5 + Glut Max 5/5 (BOTH NORMAL): sup/inf gluteal nerves arise from sacral plexus BEFORE sciatic forms. Normal = not plexus/root."))
story.append(bullet("Hamstrings 2/5: sciatic branches to hamstrings in thigh. Weak = lesion proximal to mid-thigh."))
story.append(bullet("TA 0/5, Gastroc 1/5: BOTH divisions affected. Peroneal worse than tibial (fewer fascicles, more vulnerable)."))
story.append(bullet("Saphenous sensation preserved: femoral territory intact = isolated sciatic"))
story.append(bullet("Achilles absent / Patellar normal: tibial arc destroyed, femoral arc intact"))

story.append(section("NCS -- WHY"))
story.append(bullet("Sural + Superficial Fibular ABSENT: both sciatic divisions, post-ganglionic Wallerian degeneration"))
story.append(bullet("Saphenous NORMAL: femoral territory separate"))
story.append(bullet("Fibular motor ABSENT, Tibial motor 1.2 mV: peroneal division more severely affected"))
story.append(bullet("H-reflex ABSENT right: S1 arc disrupted (both limbs through sciatic)"))

story.append(section("EMG -- WHY"))
story.append(bullet("TA/EHL/Peroneus 3+ fibs, no MUAPs: peroneal division completely denervated"))
story.append(bullet("Gastroc/Tib Post 2+ fibs, severely reduced: tibial division less severe"))
story.append(key("BFSH 2+ fibs: ONLY hamstring from peroneal division (branches in thigh). Abnormal = sciatic at hip. In fibular palsy at knee, BFSH = normal."))
story.append(bullet("BF Long Head + Semimembranosus 1+ fibs: tibial hamstrings less affected"))
story.append(key("Glut Max + Glut Med NORMAL: excludes plexopathy/root (branch before sciatic)"))
story.append(bullet("Vastus Lat NORMAL: femoral territory intact"))
story.append(bullet("Paraspinals NORMAL: not radiculopathy"))
story.append(note("Prognosis: 6-18 months partial recovery. Many have permanent foot drop."))

story.append(hr())
story.append(Spacer(1, 8))

# ======== QUICK COMPARISON TABLE ========
story.append(Paragraph("QUICK COMPARISON -- ALL 5 CASES", styles['CaseTitle']))

comp_data = [
    ["", "PTS", "Klumpke", "Root Avulsion", "Retro Hematoma", "Sciatic at Hip"],
    ["Key SNAP", "LABC abn", "MAC abn", "ALL preserved", "Saphenous absent", "Sural/SFib absent"],
    ["Paraspinals", "Normal", "Normal", "ABNORMAL", "Normal", "Normal"],
    ["Key Muscle", "Patchy multi-\nnerve", "Thenar +\nhypothenar", "All C5-T1", "Iliopsoas", "BFSH"],
    ["Key Spared", "Hand,\npronator", "Biceps,\ndeltoid", "None", "Adductors", "Glutes"],
    ["Horner's", "No", "No", "YES", "No", "No"],
    ["Pre/Post\nGanglionic", "Post", "Post", "PRE", "Post", "Post"],
]

comp_table = Table(comp_data, colWidths=[70, 70, 70, 80, 85, 80])
comp_table.setStyle(TableStyle([
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 6.5),
    ('LEADING', (0, 0), (-1, -1), 8),
    ('BACKGROUND', (0, 0), (-1, 0), HexColor("#1e293b")),
    ('TEXTCOLOR', (0, 0), (-1, 0), HexColor("#ffffff")),
    ('BACKGROUND', (0, 1), (0, -1), HexColor("#f1f5f9")),
    ('GRID', (0, 0), (-1, -1), 0.4, HexColor("#cbd5e1")),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 3),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    # Highlight the "PRE" and "ABNORMAL" and "ALL preserved" cells
    ('BACKGROUND', (3, 1), (3, 1), LIGHT_RED),  # ALL preserved
    ('BACKGROUND', (3, 2), (3, 2), LIGHT_RED),  # ABNORMAL paraspinals
    ('BACKGROUND', (3, 5), (3, 5), LIGHT_RED),  # Horner YES
    ('BACKGROUND', (3, 6), (3, 6), LIGHT_RED),  # PRE-ganglionic
]))
story.append(comp_table)

story.append(Spacer(1, 12))
story.append(Paragraph("Dr. Zachary Shumaker -- EMG/NCS Residency Lecture", styles['Footer']))

# Build
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    topMargin=0.5*inch,
    bottomMargin=0.5*inch,
    leftMargin=0.6*inch,
    rightMargin=0.6*inch,
)
doc.build(story)
print(f"PDF created: {OUTPUT}")
