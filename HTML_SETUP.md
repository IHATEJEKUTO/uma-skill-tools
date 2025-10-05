# Running Uma Skill Tools in HTML

This guide explains how to run the Uma Musume skill simulation tools in a web browser.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for browser:**
   ```bash
   npm run build
   ```

3. **Start a local server:**
   ```bash
   npm run start:simple
   ```

4. **Open your browser** and go to `http://localhost:8000`

## What's Included

The HTML setup includes:

- **Interactive Web Interface**: A user-friendly form to configure race simulations
- **Course Selection**: Choose from available race courses
- **Horse Configuration**: Set stats, strategy, mood, and ground conditions
- **Skill Management**: Add and manage skills for your horse
- **Real-time Simulation**: Run multiple race simulations and view results

## Build Options

### Option 1: esbuild (Recommended - Faster)
```bash
# Development build with watch mode
npm run build:dev

# Production build
npm run build
```

### Option 2: Webpack (More features)
```bash
# Development build
npm run build:webpack:dev

# Production build
npm run build:webpack

# Development server with hot reload
npm run serve
```

## File Structure

```
├── index.html              # Main HTML interface
├── src/
│   └── index.ts           # Browser entry point
├── dist/
│   └── bundle.js          # Compiled JavaScript (generated)
├── build.js               # esbuild configuration
├── webpack.config.js      # Webpack configuration
└── HTML_SETUP.md          # This file
```

## Features

### Race Configuration
- **Course Selection**: Choose from all available race courses
- **Running Strategy**: Nige, Senkou, Sasi, Oikomi, Oonige
- **Horse Stats**: Speed, Stamina, Power, Guts, Intelligence
- **Aptitudes**: Speed and Distance aptitude ratings (S-G)
- **Conditions**: Mood (-2 to +2) and Ground conditions

### Simulation
- **Multiple Samples**: Run hundreds or thousands of simulations
- **Statistical Analysis**: View min, max, and average results
- **Skill Effects**: Test different skill combinations
- **Real-time Results**: See results immediately after simulation

## Usage

1. **Select a Course**: Choose from the dropdown menu
2. **Configure Horse**: Set your horse's stats and strategy
3. **Add Skills**: Select skills to test (if any)
4. **Set Parameters**: Choose number of simulations and conditions
5. **Run Simulation**: Click "Run Simulation" to start
6. **View Results**: See statistical analysis of the results

## Technical Details

### Browser Compatibility
- Modern browsers with ES2018 support
- Chrome 63+, Firefox 58+, Safari 12+, Edge 79+

### Dependencies
- **esbuild**: Fast TypeScript/JavaScript bundler
- **webpack**: Alternative bundler with more features
- **TypeScript**: Type-safe JavaScript

### Data Files
The simulation uses these JSON data files:
- `data/course_data.json`: Race course information
- `data/skill_data.json`: Skill definitions and effects
- `data/skillnames.json`: Skill name translations
- `data/tracknames.json`: Track name translations

## Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check that TypeScript files compile without errors
- Verify that data files exist in the `data/` directory

### Runtime Issues
- Check browser console for JavaScript errors
- Ensure the server is running on the correct port
- Verify that `dist/bundle.js` was generated successfully

### Performance
- For large simulations (1000+ samples), consider running in a background worker
- The simulation is single-threaded, so very large sample counts may take time

## Development

### Adding New Features
1. Modify `src/index.ts` to export new functionality
2. Update `index.html` to add UI elements
3. Rebuild with `npm run build:dev`
4. Refresh the browser to see changes

### Customizing the Interface
- Edit `index.html` for UI changes
- Modify CSS styles in the `<style>` section
- Add JavaScript functionality in the `<script>` section

## API Reference

The browser version exposes these main classes:
- `RaceSolver`: Core race simulation engine
- `RaceSolverBuilder`: Builder pattern for configuring simulations
- `HorseParameters`: Horse stats and configuration
- `CourseData`: Race course information
- `Strategy`, `Aptitude`: Enums for horse configuration

## Examples

### Basic Simulation
```javascript
// Get the library
const { RaceSolver, RaceSolverBuilder, HorseParameters, Strategy, Aptitude } = window.UmaSkillTools;

// Create horse parameters
const horse = new HorseParameters(1200, 1200, 1200, 1200, 1200, Strategy.Nige, Aptitude.S, Aptitude.A);

// Build and run simulation
const builder = new RaceSolverBuilder();
builder.setHorse(horse);
builder.setCourse(courseData);
const solver = builder.build();
const result = solver.solve();
```

## License

This project is licensed under the GPL-3.0-or-later license. See the main README.md for details.





