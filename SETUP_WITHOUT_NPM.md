# Running Uma Skill Tools Without npm

Since you don't have Node.js/npm installed, here are several ways to run this project in HTML:

## Option 1: Simple HTML Version (Immediate)

I've created `index-simple.html` which works directly in your browser without any build process:

1. **Open `index-simple.html`** in any modern web browser
2. **Use the interface** to configure and run simulations
3. **No installation required!**

This version includes:
- ✅ Interactive web interface
- ✅ Course and horse configuration
- ✅ Simplified race simulation
- ✅ Results display
- ✅ Works immediately in any browser

## Option 2: Install Node.js (Recommended for full features)

To get the complete simulation with all features:

### Step 1: Install Node.js
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version for Windows
3. Run the installer and follow the instructions
4. Restart your command prompt/PowerShell

### Step 2: Verify Installation
```bash
node --version
npm --version
```

### Step 3: Build the Project
```bash
cd "C:\Users\devje\OneDrive\Documents\GitHub\uma-skill-tools"
npm install
npm run build
npm run start:simple
```

## Option 3: Use Online TypeScript Compiler

If you want to experiment with the TypeScript code without installing anything:

1. Go to [TypeScript Playground](https://www.typescriptlang.org/play)
2. Copy the code from the TypeScript files
3. Compile and run in the browser

## Option 4: Use a Different Build Tool

### Using Deno (Alternative to Node.js)
```bash
# Install Deno from https://deno.land/
deno run --allow-read --allow-write build.ts
```

### Using Bun (Fast alternative)
```bash
# Install Bun from https://bun.sh/
bun install
bun run build
```

## What Each Option Gives You

### Simple HTML Version
- ✅ Works immediately
- ✅ Basic simulation
- ✅ User interface
- ❌ Limited features
- ❌ No skill system
- ❌ Simplified physics

### Full Build Version
- ✅ Complete simulation engine
- ✅ All skill effects
- ✅ Accurate physics
- ✅ Course terrain effects
- ✅ Statistical analysis
- ❌ Requires Node.js installation

## Troubleshooting

### If you get "npm not recognized":
- Node.js is not installed or not in PATH
- Try Option 1 (Simple HTML) instead
- Or install Node.js from the official website

### If the simple version doesn't work:
- Make sure you're opening the HTML file in a modern browser
- Check the browser console for errors
- Try a different browser (Chrome, Firefox, Edge)

### If you want to install Node.js but it's blocked:
- Check with your system administrator
- Try using a portable version of Node.js
- Use the online TypeScript compiler instead

## Quick Start (No Installation)

1. **Download** all the project files
2. **Open** `index-simple.html` in your browser
3. **Configure** your horse and race settings
4. **Click** "Run Simulation"
5. **View** the results!

This gives you a working demonstration of the race simulator without needing any additional software.





