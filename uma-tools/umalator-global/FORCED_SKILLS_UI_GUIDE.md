# Forced Skill Activation UI Guide

## Overview

The UI now supports the forced skill activation feature! You can specify exact positions where skills should activate, overriding their normal activation conditions.

## Accessing the UI

The local development server is now running at:
**http://localhost:8000/uma-tools/umalator-global/**

## How to Use Forced Skill Positions

### 1. Add Skills to Your Horse

- Click the "+ Add Skill" button in the horse definition panel
- Select the skills you want to add from the skill picker

### 2. Set Forced Positions

There are two ways to set forced positions for skills:

#### Method A: Inline (Collapsed View)
- Next to each skill in your skill list, you'll see a small input field labeled "@m"
- Enter the position in meters where you want the skill to activate (e.g., `2000` for 2000m)
- Leave it empty for normal activation behavior

#### Method B: Expanded View
- Click on a skill to expand it and see its details
- At the bottom of the expanded skill, you'll see a field labeled "Force @ position (m):"
- Enter the position in meters (e.g., `1500`)
- Leave it empty to clear the forced position

### 3. Run Simulations

- Configure your race settings (course, conditions, etc.)
- Click "Run Comparison" or "Run Basinn Chart"
- Skills with forced positions will activate at exactly the specified positions

## Features

### UI Elements

- **@m input field**: Quick position input next to each skill (collapsed view)
- **Force @ position (m)**: Detailed position input in expanded skill view
- Position values are in meters
- Values are optional - leave empty for normal skill behavior

### State Persistence

- Forced skill positions are saved when you copy the state URL
- Sharing a URL will include your forced skill positions
- Positions are preserved when switching between horses

## Examples

### Testing Skill Timing

1. Add a speed skill to Horse 1
2. Set forced position to `500` meters
3. Add the same speed skill to Horse 2
4. Set forced position to `2000` meters
5. Run comparison to see the impact of activation timing

### Reproducing Race Scenarios

1. Add multiple skills with known activation positions
2. Set each skill's forced position to match the actual race
3. Run simulation to reproduce the exact scenario

### Comparing Natural vs Forced Activation

1. Horse 1: Add skills with no forced positions (natural activation)
2. Horse 2: Add same skills with forced positions at optimal points
3. Compare the results

## Technical Details

- Forced positions override the skill's normal sample policy
- Dynamic conditions still apply (e.g., HP%, phase checks)
- Skills activate within a 10-meter window starting at the specified position
- All samples in a multi-sample run use the same forced position

## Tips

- Use multiples of 10 for cleaner position values (e.g., 500, 1000, 1500)
- Consider the course distance when setting positions
- Forced positions work best for testing specific scenarios
- Clear positions (leave empty) to return to normal behavior

## Troubleshooting

### Skill not activating at forced position
- Check if dynamic conditions are met (HP%, phase, etc.)
- Verify the position is within the course distance
- Ensure the skill is enabled and not conflicting with other skills

### UI not updating
- Try refreshing the page
- Check browser console for errors (F12)
- Clear browser cache if needed

## Development

To rebuild the UI:
```bash
cd /Users/anthony/Documents/uma-skill-tools/uma-tools/umalator-global
node build.mjs
```

To start the dev server:
```bash
node build.mjs --serve 8000
```

## Related Documentation

- See `/Users/anthony/Documents/uma-skill-tools/FORCED_SKILL_ACTIVATION.md` for API documentation
- See `/Users/anthony/Documents/uma-skill-tools/CHANGELOG_FORCED_SKILLS.md` for feature changelog
- See `/Users/anthony/Documents/uma-skill-tools/tools/fixed-skill-example.ts` for code examples

