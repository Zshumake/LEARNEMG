#!/bin/bash
# Build the presenter package: the HTML lecture deck plus a styled PDF of the
# annotated case-contents guide.
#
# Usage: bash build_presentation_package.sh
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/presentation-package"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$OUT"

# 1. Copy the lecture deck + its one asset
cp "$HERE/brachial-plexus-lecture.html" "$OUT/Brachial-Plexus-Lecture.html"
cp "$HERE/werewolf.jpeg"                "$OUT/werewolf.jpeg"

# 2. Render annotated-guide markdown -> styled HTML via pandoc, then -> PDF via Chrome
STYLE_CSS="$OUT/_guide_style.css"
cat > "$STYLE_CSS" <<'CSS'
@page { size: Letter; margin: 0.55in 0.6in; }
body {
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    color: #0f172a;
    font-size: 10.5pt;
    line-height: 1.45;
    max-width: 100%;
}
h1 {
    color: #0d9488;
    font-size: 22pt;
    border-bottom: 3px solid #0d9488;
    padding-bottom: 6px;
    margin-top: 28px;
    page-break-before: always;
}
h1:first-of-type { page-break-before: auto; }
h2 {
    color: #dc2626;
    font-size: 14pt;
    margin-top: 14px;
    margin-bottom: 6px;
}
h3 {
    color: #1e40af;
    font-size: 11pt;
    margin-top: 14px;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
p { margin: 4px 0; }
ol, ul { margin: 4px 0 8px 0; padding-left: 22px; }
li { margin-bottom: 2px; }
strong { color: #0f172a; }
table {
    border-collapse: collapse;
    width: 100%;
    margin: 8px 0 14px 0;
    font-size: 9pt;
    page-break-inside: avoid;
}
th {
    background: #f1f5f9;
    color: #0f172a;
    font-weight: 700;
    text-align: left;
    padding: 5px 7px;
    border: 1px solid #cbd5e1;
}
td {
    padding: 5px 7px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
}
tr:nth-child(even) td { background: #f8fafc; }
hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 18px 0;
}
code {
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 9.5pt;
}
CSS

pandoc "$HERE/presenter-annotated-guide.md" \
    --from gfm \
    --to html5 \
    --standalone \
    --metadata title="Case Contents Guide -- Brachial Plexus Lecture" \
    --css "_guide_style.css" \
    --output "$OUT/_guide.html"

"$CHROME" \
    --headless \
    --disable-gpu \
    --no-pdf-header-footer \
    --print-to-pdf="$OUT/Case-Contents-Guide.pdf" \
    "file://$OUT/_guide.html" 2>/dev/null

# 3. Copy the quick cheat sheet PDF as a second reference
cp "$HERE/presenter-cheat-sheet.pdf" "$OUT/Quick-Cheat-Sheet.pdf"

# 4. Clean up temp files
rm -f "$OUT/_guide.html" "$OUT/_guide_style.css"

echo ""
echo "Presentation package built at: $OUT"
ls -lh "$OUT"
