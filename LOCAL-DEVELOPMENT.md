# 🧠 ERNEST Local Development Setup

## ⚠️ Why Direct HTML Opening Doesn't Work

When you double-click `index.html` to open it directly in a browser, you see:
- ❌ White background with unstyled text
- ❌ CSS styles not loading  
- ❌ JavaScript features broken
- ❌ Images failing to load

This happens because browsers block local file access for security (CORS restrictions).

## ✅ Solution: Local HTTP Server

You need to run a local HTTP server to properly test the ERNEST system.

### Method 1: Using the Provided Script (Easiest)

**On Mac/Linux:**
```bash
./start-local-server.sh
```

**On Windows:**
```bash
start-local-server.bat
```

Then open: **http://localhost:8080**

### Method 2: Manual Python Server

```bash
cd /Users/zacharyshumaker/Desktop/Working\ Programs
python3 -m http.server 8080
```

### Method 3: Node.js Server (if you have Node.js)

```bash
cd /Users/zacharyshumaker/Desktop/Working\ Programs
npx http-server -p 8080
```

## 🔧 Local Development Workflow

1. **Start Server**: Run `./start-local-server.sh`
2. **Open Browser**: Go to `http://localhost:8080`
3. **Make Changes**: Edit HTML, CSS, or JS files
4. **Refresh Browser**: See changes immediately (Cmd+R / Ctrl+R)
5. **Test Thoroughly**: Ensure everything works locally
6. **Commit**: Only commit to GitHub when everything works locally

## 🎯 Expected Result

When running locally via HTTP server, you should see:
- ✅ **Full ERNEST interface** with green/brown styling
- ✅ **Working tabs** and navigation
- ✅ **Interactive buttons** and modals  
- ✅ **Proper typography** and layout
- ✅ **Debug console** showing initialization messages

## 🚨 Important Notes

- **Never open `index.html` directly** - always use the local server
- **Test locally first** before committing to GitHub
- **Server must be running** while you develop and test
- **Use Ctrl+C** to stop the server when done