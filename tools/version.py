#!/usr/bin/env python3
"""Auto-version the web app's ?v= cache-bust tags from content hashes.

Replaces the hand-maintained ?v= query tags (the recurring pain): each local
.js/.css file that is referenced with a ?v= tag gets a tag equal to a short
hash of its content. Because a file's content includes the tags of the files
it imports, the hashes are computed in dependency order, so a change to any
file cascades a new tag up through everything that (transitively) imports it.

Usage (run before committing/deploying a web change):
    python3 tools/version.py            # rewrite tags in place
    python3 tools/version.py --check    # exit 1 if any tag is stale (CI)

It is idempotent: with no source change, it makes no edits. Keeps the
"no build step / serve the repo root" architecture — this only edits the
?v= query strings, never the code or the import paths.
"""
import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Files whose ?v= tags we manage, and which we hash.
SCAN = sorted(
    [*(ROOT / "src").rglob("*.js"), *(ROOT / "css").glob("*.css"), ROOT / "index.html"]
)
# A reference to a local .js/.css file carrying a ?v= tag. Group 1 = path
# (no scheme, so https://cdn/...d3.js without ?v= is never touched), 2 = tag.
REF = re.compile(r"(?<![\w:/])([\w./\-]+\.(?:js|css))\?v=[\w.\-]+")


def resolve(ref_path, from_file):
    """Resolve a reference to an absolute file path, or None if off-disk."""
    if ref_path.startswith("./") or ref_path.startswith("../"):
        target = (from_file.parent / ref_path).resolve()
    else:  # index.html uses repo-root-relative paths like src/... or css/...
        target = (ROOT / ref_path).resolve()
    return target if target.exists() else None


def main() -> int:
    check_only = "--check" in sys.argv
    text = {f: f.read_text() for f in SCAN}

    # Dependency edges: F -> every SCAN file it references with a ?v= tag.
    deps: dict[Path, set[Path]] = {f: set() for f in SCAN}
    scanset = set(SCAN)
    for f in SCAN:
        for m in REF.finditer(text[f]):
            t = resolve(m.group(1), f)
            if t in scanset:
                deps[f].add(t)

    # Topological order (Kahn). deps point to prerequisites, so emit a file
    # only after all files it references are already done.
    done: list[Path] = []
    remaining = {f: set(deps[f]) for f in SCAN}
    while remaining:
        ready = sorted(f for f, d in remaining.items() if not d)
        if not ready:
            cyc = sorted(str(f.relative_to(ROOT)) for f in remaining)
            print("ERROR: import cycle among ?v= files; cannot order:", *cyc, sep="\n  ")
            return 2
        for f in ready:
            done.append(f)
            del remaining[f]
        for d in remaining.values():
            d.difference_update(ready)

    # Rewrite each file's tags using already-final hashes of its deps, then
    # hash the file (now final because all its deps are done).
    hashes: dict[Path, str] = {}
    changed = []
    for f in done:
        def sub(m, _f=f):
            t = resolve(m.group(1), _f)
            if t in hashes:
                return f"{m.group(1)}?v={hashes[t]}"
            return m.group(0)  # off-disk / unmanaged: leave as-is

        new = REF.sub(sub, text[f])
        hashes[f] = hashlib.sha1(new.encode()).hexdigest()[:8]
        if new != text[f]:
            changed.append(f)
            text[f] = new

    if check_only:
        if changed:
            print("STALE ?v= tags in:", *(str(f.relative_to(ROOT)) for f in changed), sep="\n  ")
            return 1
        print("All ?v= tags up to date.")
        return 0

    for f in changed:
        f.write_text(text[f])
    print(f"Versioned {len(SCAN)} files; rewrote {len(changed)}.")
    for f in changed:
        print("  ", f.relative_to(ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
