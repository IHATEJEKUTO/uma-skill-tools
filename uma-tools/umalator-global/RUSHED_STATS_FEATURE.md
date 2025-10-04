# Rushed Status Statistics Feature

## Overview

When running comparisons with the rushed status enabled, the UI now displays comprehensive statistics about how the rushed state affected both horses across all simulations.

## Statistics Displayed

The rushed statistics table appears below the results summary and shows:

### Frequency
- **What it shows**: The percentage of simulations where each horse entered the rushed state
- **Example**: "45.2%" means the horse got rushed in 45.2% of the 500 simulations
- **Shows "Disabled"**: If you've turned off rushed for that horse using the toggle

### Mean Length
- **What it shows**: The average distance (in meters) that the horse stayed in rushed state
- **Calculated from**: All simulations where that horse actually got rushed
- **Example**: "120.5 m" means on average, the rushed state lasted for 120.5 meters

### Min Length
- **What it shows**: The shortest rushed distance across all simulations
- **Example**: "45.2 m" - the horse snapped out of rushed very quickly in the best case

### Max Length  
- **What it shows**: The longest rushed distance across all simulations
- **Example**: "280.7 m" - the horse stayed rushed for a very long time in the worst case

## How to Read the Stats

### Example Display:
```
Rushed Status Statistics (across 500 simulations)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              Uma 1        Uma 2
Frequency     42.6%        38.4%
Mean length   125.3 m      118.7 m
Min length    52.1 m       48.9 m
Max length    285.4 m      272.1 m
```

**Interpretation:**
- Uma 1 got rushed in 42.6% of races (213 out of 500)
- Uma 2 got rushed in 38.4% of races (192 out of 500)
- When Uma 1 got rushed, it lasted 125.3m on average
- Uma 1's rushed ranged from as short as 52.1m to as long as 285.4m

## Why This Matters

### Understanding Impact
The rushed state causes **1.6x HP consumption**, so knowing how often and how long it occurs helps you:
- **Assess risk**: Higher frequency = more likely to affect your actual races
- **Plan HP management**: Longer rushed duration = need more stamina/HP
- **Compare builds**: See which build is less susceptible to rushed

### Wisdom Stat Planning
- **Lower frequency** = Horse has higher wisdom stat or the "Self-Control" skill (202161)
- Use these stats to decide if investing more in wisdom is worthwhile

### Race Strategy
- If rushed frequency is high (>40%), consider:
  - Increasing wisdom stat
  - Adding the "Self-Control" (自制心) skill
  - Building more stamina to handle the HP drain

## When Stats Are Shown

The table only appears when:
1. **After running a comparison** (not available in single-horse mode)
2. **At least one horse has rushed enabled** via the toggles
3. **At least one horse actually got rushed** in the simulations

If you disable both rushed toggles, the statistics table won't show.

## Combining with Run Type Views

Remember that:
- The **statistics table** shows aggregate data across ALL 500 simulations
- The **run type selector** (Minimum/Maximum/Mean/Median) shows that specific simulation's rushed event

Use them together:
1. Look at statistics to understand overall impact
2. Switch between run types to see specific examples of rushed occurring
3. Compare best case (Minimum) vs worst case (Maximum) scenarios

## Technical Notes

- **Rushed length** is calculated as the distance from when rushed starts to when it ends
- The horse can recover from rushed state with a 55% chance every 3 seconds
- Maximum rushed duration is capped at 12 seconds
- Each horse can only enter rushed state **once per race** (fixed in latest version)

