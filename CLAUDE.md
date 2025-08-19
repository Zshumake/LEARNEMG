- When performing edits, if you need to delete a large file format from a code such as an HTML file, please just notify me where it is so I can delete it. This is a much faster system than having you slowly delete Universal Scheduler/venv/lib/python3.13/site-packages/mypy/reachability.py

# EMG/NCS Study Tool GitHub Management Protocol

## Repository Information
- **GitHub Repository**: https://github.com/Zshumake/EMG-NCSTool
- **Live Website**: https://zshumake.github.io/EMG-NCSTool/
- **Main Files**: 
  - `index.html` (primary tool file for GitHub Pages)
  - `ncs_emg_tool.html` (backup copy)
  - `README.md` (comprehensive documentation)
  - `LICENSE` (MIT license)

## Update Protocol for EMG/NCS Tool

### When User Requests Updates:
1. **Modify the local files** in `/Users/zacharyshumaker/Desktop/Working Programs/`
2. **Test changes** by opening the local HTML file in browser
3. **Commit changes** using descriptive commit messages
4. **Push to GitHub** using the established authentication
5. **GitHub Pages automatically updates** the live website (2-10 minutes)

### Git Commands for Updates:
```bash
cd "/Users/zacharyshumaker/Desktop/Working Programs"
git add .
git commit -m "Descriptive message about changes"
git push origin main
```

### Authentication Setup:
- Uses Personal Access Token authentication
- Remote URL configured with embedded token for seamless pushes
- Token stored in git remote configuration

### Types of Updates to Handle:
- ✅ New Features (quiz modes, study tools, analytics)
- ✅ Bug Fixes (JavaScript errors, UI issues)
- ✅ Content Updates (more muscles, flashcards, clinical data)
- ✅ UI/UX Improvements (design, mobile optimization)
- ✅ Performance Optimizations
- ✅ Documentation Updates

### File Structure to Maintain:
- Keep both `index.html` and `ncs_emg_tool.html` in sync
- Update README.md when adding major features
- Maintain comprehensive commit messages for medical education context
- Use semantic commit messages (feat:, fix:, docs:, etc.)

### Deployment Notes:
- GitHub Pages serves from main branch root directory
- Changes to `index.html` immediately affect live tool
- Always test locally before pushing to production
- Monitor GitHub Pages deployment status after pushes

This tool serves the medical education community - maintain high standards for reliability and educational value.