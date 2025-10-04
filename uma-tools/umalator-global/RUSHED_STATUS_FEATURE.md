# Rushed Status Feature

## Overview

The "rushed" status is a random debuff that can affect horses at the start of a race. This feature simulates the mechanic where horses get flustered and lose composure, consuming extra stamina and changing their racing strategy.

## Mechanics

### Activation Chance

Each horse rolls for the rushed state before the race starts. The chance is affected by wisdom:

**Formula:** `RushedChance = (6.5 / log10(0.1 * WizStat + 1))² %`

**Examples:**
- 300 Wisdom → 19.00% chance
- 600 Wisdom → 13.26% chance
- 900 Wisdom → 11.01% chance
- 1200 Wisdom → 9.74% chance

### Skill Reduction

**自制心 (Self-Control)** - Skill ID `202161`
- Reduces rushed chance by a flat **3%**
- Example: 19% → 16%

### Activation Timing

If a horse enters the rushed state:
1. A random section between **2 to 9** is chosen
2. The horse enters rushed state as soon as it enters that section
3. The section is determined at race start (not during the race)

### Effects While Rushed

**HP Consumption:**
- Increased to **1.6x** normal rate
- Applied on top of other modifiers (pace down, etc.)

**Position Keeping Strategy** (NOT YET IMPLEMENTED):
- Forces strategy change and succeeds in all position keep wisdom rolls
- Front Runners → Enter speed up mode
- Pace Chasers → Become runners
- Late Surgers → 75% chance runners, 25% chance leaders
- End Closers → 70% chance runners, 20% chance leaders, 10% chance betweeners

Note: Strategy coefficient for base target speed is NOT affected

### Recovery

**Time-based Recovery:**
- Every **3 seconds** while rushed: **55% chance** to snap out of it
- Forced end after **12 seconds** if still affected

**Debuff Extensions** (NOT YET IMPLEMENTED):
- Debuffs worsening rushed state extend timer by **5 seconds**
- This effect can stack multiple times

## Visual Indicators

In the race visualization, rushed periods are marked with:
- **Red exclamation marks** ( ! )
- Displayed as regions on the race track
- Shows exactly when the horse was in rushed state

The indicators appear alongside skill activations, making it easy to see:
- When rushed activated
- How long it lasted
- Impact on race performance

### Multi-Sample Aggregation

When running multiple samples (e.g., 500 simulations):
- Each sample can have a different rushed activation (different section 2-9)
- To avoid cluttering the UI with 500 overlapping indicators, we show only the **most common** rushed pattern
- The algorithm:
  1. Collects all rushed activations across all samples
  2. Groups them by start position (±50m tolerance)
  3. Finds which group occurred most frequently
  4. Displays the average position/duration for that group
  
This gives you a representative visualization of the typical rushed behavior without overwhelming the display.

## Implementation Details

### Core Components

**RaceSolver.ts**
- Added rushed state fields
- `initRushedState()` - Calculates and rolls for rushed
- `updateRushedState()` - Updates rushed status each frame
- `endRushedState()` - Ends rushed and records position
- `rushedActivations` array tracks [start, end] positions

**HpPolicy.ts**
- Modified `getStatusModifier()` to apply 1.6x multiplier
- Checks `state.isRushed` flag

**compare.ts**
- Captures rushed activations from both horses
- Stores in `data.rushed` array

**app.tsx**
- Creates red ! indicators for rushed periods
- Displays alongside skill activations on race track

### Technical Notes

1. **Rushed Check:** Uses `202161` skill ID to detect 自制心
2. **Section Calculation:** `rushedSection = 2 + rng.uniform(8)` gives 2-9
3. **Recovery Check:** Uses floor division to check every 3s boundary
4. **HP Multiplier:** Stacks multiplicatively with pace down (0.6x)

## Testing

### To Test Rushed Mechanic:

1. **High Chance Test:**
   - Create a horse with 300 wisdom (19% chance)
   - Run 100+ simulations
   - Expect ~19 to show rushed status

2. **Low Chance Test:**
   - Create a horse with 1200 wisdom (9.74% chance)
   - Run 100+ simulations
   - Expect ~10 to show rushed status

3. **Self-Control Test:**
   - Add 自制心 (202161) skill
   - Should reduce chance by 3%
   - 300 wisdom: 19% → 16%

4. **HP Consumption Test:**
   - Compare identical horses, one with rushed
   - Rushed horse should finish with less HP
   - Difference should be noticeable in long races

5. **Visual Test:**
   - Look for red ! markers on race track
   - Should appear in sections 2-9
   - Duration should be 3-12 seconds typically

### Known Behaviors

- Rushed can activate multiple times in same section (very rare)
- If rushed lasts full 12s, ends exactly at 12.000s
- Recovery rolls happen at 3.000s, 6.000s, 9.000s, 12.000s
- Visual indicators update immediately when rushed ends

## Future Enhancements

Potential improvements for future versions:

1. **Position Keeping Changes**
   - Implement strategy changes (runner/leader/betweener)
   - Force position keep success on wisdom rolls
   - Add speed up mode for front runners

2. **Debuff Extensions**
   - Track debuff skills that extend rushed
   - Add 5 second extensions
   - Allow multiple stacks

3. **Statistics**
   - Track rushed activation rate
   - Show HP consumption difference
   - Calculate time lost to rushed

4. **UI Enhancements**
   - Show rushed probability in horse panel
   - Display "Rushed!" text during active period
   - Add tooltip with rushed details

## Changelog

### Version 1.0 (Initial Implementation)
- ✅ Rushed chance calculation based on wisdom
- ✅ 自制心 (Self-Control) skill reduction
- ✅ Random section (2-9) selection
- ✅ 1.6x HP consumption multiplier
- ✅ Time-based recovery (55% every 3s, max 12s)
- ✅ Visual indicators (red ! marks)
- ✅ Compare mode support
- ⏳ Position keeping strategy changes (planned)
- ⏳ Debuff extensions (planned)

## References

- Wisdom formula: Based on game mechanics analysis
- Recovery timing: 3 second intervals, 55% chance
- HP multiplier: 1.6x confirmed by testing
- Section range: 2-9 based on game behavior

