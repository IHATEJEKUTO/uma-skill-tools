# Setup Notes for Forced Skills UI

## Issues Fixed

### 1. Missing Symlink
**Problem:** Build was failing with "Could not resolve ../uma-skill-tools/..." errors

**Solution:** Created a symbolic link in `/uma-tools/` pointing to the parent directory:
```bash
cd /Users/anthony/Documents/uma-skill-tools/uma-tools
rm -rf uma-skill-tools
ln -s .. uma-skill-tools
```

This allows the TypeScript imports like `import { ... } from '../uma-skill-tools/...'` to resolve correctly.

### 2. Worker Deserialization Issue
**Problem:** `uma1.forcedSkillPositions.get is not a function` error in simulator.worker.js

**Root Cause:** When sending data to the web worker via `postMessage()`, Immutable Maps are serialized to plain JavaScript objects. When reconstructing the `HorseState` in the worker, we weren't restoring `forcedSkillPositions` as an Immutable Map.

**Solution:** Updated `simulator.worker.ts` to properly restore the `forcedSkillPositions` Map:

```typescript
// Before (broken):
const uma1_ = new HorseState(uma1).set('skills', SkillSet(uma1.skills));

// After (fixed):
const uma1_ = new HorseState(uma1)
    .set('skills', SkillSet(uma1.skills))
    .set('forcedSkillPositions', ImmMap(uma1.forcedSkillPositions || {}));
```

This was applied to both `runChart()` and `runCompare()` functions.

## Server Access

The development server is running at:
- **URL:** http://localhost:8080/uma-tools/umalator-global/
- **Port:** 8080 (changeable via `--serve PORT` flag)

## Files Modified

1. **uma-tools/components/HorseDefTypes.ts**
   - Added `forcedSkillPositions: ImmMap()` field to HorseState

2. **uma-tools/components/HorseDef.tsx**
   - Added position input fields in skill list
   - Added `handlePositionChange()` handler
   - Updated `handleSkillClick()` to prevent clicks on inputs
   - Updated `skillList` memo to include position inputs

3. **uma-tools/components/HorseDef.css**
   - Added styles for `.forcedPositionInput`, `.forcedPositionWrapper`, `.forcedPositionLabel`

4. **uma-tools/umalator/compare.ts**
   - Updated to use `addSkillAtPosition()` when forced positions are set

5. **uma-tools/umalator/app.tsx**
   - Added `ImmMap` import
   - Updated deserialization to restore `forcedSkillPositions` Maps

6. **uma-tools/umalator/simulator.worker.ts**
   - Added `ImmMap` import
   - Fixed `runChart()` to restore `forcedSkillPositions`
   - Fixed `runCompare()` to restore `forcedSkillPositions` for both umas

## Development Commands

### Start Dev Server
```bash
cd /Users/anthony/Documents/uma-skill-tools/uma-tools/umalator-global
node build.mjs --serve 8080
```

### Build for Production
```bash
cd /Users/anthony/Documents/uma-skill-tools/uma-tools/umalator-global
node build.mjs
```

### Stop Server
```bash
pkill -f "node build.mjs"
# or just Ctrl+C in the terminal
```

## Testing the Feature

1. Open http://localhost:8080/uma-tools/umalator-global/
2. Add skills to a horse
3. Click a skill to expand it
4. Enter a position (e.g., `2000`) in the "Force @ position (m):" field
5. Or use the inline `@m` input next to collapsed skills
6. Run a comparison - the skill will activate at that exact position

## Known Limitations

- Forced positions are in meters
- Dynamic conditions (HP%, phase checks) still apply
- Position must be within the course distance
- Values persist in URL state when sharing links

## Troubleshooting

### Build errors about missing modules
- Check that the symlink exists: `ls -la /Users/anthony/Documents/uma-skill-tools/uma-tools/uma-skill-tools`
- Should show: `uma-skill-tools -> ..`
- If not, recreate it as shown in "Missing Symlink" section above

### "is not a function" errors in worker
- Make sure you've rebuilt after updating simulator.worker.ts
- Clear browser cache and reload
- Check browser console for specific error messages

### Server won't start on port 8080
- Port may be in use - try a different port: `node build.mjs --serve 8081`
- Or kill the process using the port: `lsof -ti:8080 | xargs kill`

